import { readFile, writeFile } from "node:fs/promises";

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

const response = await fetch(url);
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
const weekdays = { Wen: "Wed" };
const week = (data.week_info || []).map(({ week: day, date: dayDate, flag }) => {
  const label = `${weekdays[day] || escapeHtml(day)} ${escapeHtml(dayDate.slice(5))}`;
  return flag === "cur" ? `<strong>${label}</strong>` : `<code>${label}</code>`;
}).join(" · ");
const listen = data.tts
  ? `\n<p align="center"><a href="${safeUrl(data.tts)}">🔊 Listen</a></p>`
  : "";

const markdown = `## Daily English · ${escapeHtml(data.title)}

<p align="center">
  <img src="${picture}" alt="${content}" width="720" />
</p>

> ### ${content}
>
> ${note}

<p align="center">
  ${week}
</p>
${listen}`;

const start = "<!-- DAILY_SENTENCE_START -->";
const end = "<!-- DAILY_SENTENCE_END -->";
const readme = await readFile(readmePath, "utf8");
const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
if (!pattern.test(readme)) throw new Error("Daily sentence markers are missing");

await writeFile(readmePath, readme.replace(pattern, `${start}\n${markdown}\n${end}`));
console.log(`Updated daily sentence for ${data.title}`);
