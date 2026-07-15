import { readFile, readdir, unlink, writeFile } from "node:fs/promises";

const readmePath = new URL("../readme.md", import.meta.url);
const callback = "__dailySentence";
const date = process.argv[2] || new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Shanghai",
}).format(new Date());

const url = new URL("https://sentence.iciba.com/index.php");
url.search = new URLSearchParams({
  c: "dailysentence",
  m: "getdetail",
  title: date,
  callback,
});

const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
if (!response.ok) throw new Error(`ICIBA request failed: ${response.status}`);

const jsonp = await response.text();
const match = jsonp.match(new RegExp(`^${callback}\\(([\\s\\S]*)\\)\\s*$`));
if (!match) throw new Error("Unexpected ICIBA JSONP response");

const data = JSON.parse(match[1]);
if (data.errno !== 0 || !data.content || !data.picture) {
  throw new Error(data.errmsg || "Incomplete ICIBA response");
}

const escapeHtml = (value = "") => String(value).replace(
  /[&<>"']/g,
  (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character],
);

const safeUrl = (value) => {
  const parsed = new URL(value);
  if (parsed.protocol !== "https:") throw new Error("Media URL must use HTTPS");
  return parsed.href;
};

const content = escapeHtml(data.content);
const note = escapeHtml(data.note);
const picture = safeUrl(data.picture);
const extension = new URL(picture).pathname.split(".").pop().toLowerCase();
if (!["jpg", "jpeg", "png", "webp"].includes(extension)) {
  throw new Error("Unsupported picture format");
}

const pictureResponse = await fetch(picture, { signal: AbortSignal.timeout(30_000) });
if (!pictureResponse.ok) {
  throw new Error(`Picture download failed: ${pictureResponse.status}`);
}
if (!pictureResponse.headers.get("content-type")?.startsWith("image/")) {
  throw new Error("Picture response is not an image");
}

const imageName = `daily-sentence.${extension}`;
const imagesDirectory = new URL("../images/", import.meta.url);
await writeFile(new URL(imageName, imagesDirectory), Buffer.from(await pictureResponse.arrayBuffer()));
for (const file of await readdir(imagesDirectory)) {
  if (file.startsWith("daily-sentence.") && file !== imageName) {
    await unlink(new URL(file, imagesDirectory));
  }
}

const listen = data.tts
  ? `\n<p align="center"><a href="${safeUrl(data.tts)}">🔊 Listen</a></p>`
  : "";

const markdown = `## Daily English · ${escapeHtml(data.title)}

<p align="center">
  <img src="./images/${imageName}" alt="${content}" width="720" />
</p>

> ### ${content}
>
> ${note}
${listen}`;

const start = "<!-- DAILY_SENTENCE_START -->";
const end = "<!-- DAILY_SENTENCE_END -->";
const readme = await readFile(readmePath, "utf8");
const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
if (!pattern.test(readme)) throw new Error("Daily sentence markers are missing");

await writeFile(readmePath, readme.replace(pattern, `${start}\n${markdown}\n${end}`));
console.log(`Updated daily sentence for ${data.title}`);
