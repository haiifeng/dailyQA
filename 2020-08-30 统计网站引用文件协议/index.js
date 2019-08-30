/**
 * 算法思路
 * 1.$('script')获取script数组，分析src属性
 * 2.$('link')获取link数组，分析href属性
 * 3.$('img')获取img数组，分析src属性
 * 4.$('a')获取a数组，分析href属性
 */

 function AnalyzeProtocol(){
    var AP={
        total:0,
        // protocal:['http','https'],
        // doman:[],
        script:[],
        link:[],
        img:[],
        // a:[],
        http:{},
        https: {},
        other:[],
        testHttp2Https
    };

    function getFile(){

        [...document.querySelectorAll('script')].filter(item=>item.src!=undefined).map(item=>{
            //排除掉页面直接写的script代码
            let res=splitUrl(item.src);
            if(res.protocal){
                AP.total++;
                AP.script.push(item);
                if(res.protocal=='http'){
                    if(AP.http[res.doman]==undefined){
                        AP.http[res.doman]=[];
                        AP.http[res.doman].push({...res,type:item.tagName.toLowerCase()})
                    }else{
                        AP.http[res.doman].push({...res,type:item.tagName.toLowerCase()})
                    }
                }else{
                    if(AP.https[res.doman]==undefined){
                        AP.https[res.doman]=[];
                        AP.https[res.doman].push(res)
                    }else{
                        AP.https[res.doman].push(res)
                    }
                }
            }else{
                AP.other.push(res)
            }
        });
        [...document.querySelectorAll('link')].filter(item=>item.href!=undefined).map(item=>{
            let res=splitUrl(item.href);
            if(res.protocal){
                AP.total++;
                AP.link.push(item);
                if(res.protocal=='http'){
                    if(AP.http[res.doman]==undefined){
                        AP.http[res.doman]=[];
                        AP.http[res.doman].push({...res,type:item.tagName.toLowerCase()})
                    }else{
                        AP.http[res.doman].push({...res,type:item.tagName.toLowerCase()})
                    }
                }else{
                    if(AP.http[res.doman]==undefined){
                        AP.http[res.doman]=[];
                        AP.http[res.doman].push(res)
                    }else{
                        AP.http[res.doman].push(res)
                    }
                }
            }else{
                AP.other.push(res)
            }
        });
        [...document.querySelectorAll('img')].filter(item=>item.src!=undefined).map(item=>{
            let res=splitUrl(item.src);
            if(res.protocal){
                AP.total++;
                AP.img.push(item);
                if(res.protocal=='http'){
                    if(AP.http[res.doman]==undefined){
                        AP.http[res.doman]=[];
                        AP.http[res.doman].push({...res,type:item.tagName.toLowerCase()})
                    }else{
                        AP.http[res.doman].push({...res,type:item.tagName.toLowerCase()})
                    }
                }else{
                    if(AP.http[res.doman]==undefined){
                        AP.http[res.doman]=[];
                        AP.http[res.doman].push(res)
                    }else{
                        AP.http[res.doman].push(res)
                    }
                }
            }else{
                AP.other.push(res)
            }
        });
        // [...document.querySelectorAll('a')].map(item=>{
        //     let res=splitUrl(item.href);
        //     if(res.protocal){
        //         AP.total++;
        //         AP.a.push(item);
        //         if(res.protocal=='http'){
        //             if(AP.http[res.doman]=undefined){
        //                 AP.http[res.doman]=[];
        //                 AP.http[res.doman].push(res)
        //             }else{
        //                 AP.http[res.doman].push(res)
        //             }
        //         }else{
        //             if(AP.http[res.doman]=undefined){
        //                 AP.http[res.doman]=[];
        //                 AP.http[res.doman].push(res)
        //             }else{
        //                 AP.http[res.doman].push(res)
        //             }
        //         }
        //     }else{
        //         AP.other.push(res)
        //     }
        // });
    }

    //拆分url，返回协议，域名
    function splitUrl(url){
        // var url = "http://hjm100.cn:8080/touch/index.html?game=AB01";
        // [
        //     "http://hjm100.cn:8080",
        //     "http",
        //     "hjm100.cn",
        //     ":8080", 
        // ]
        var reg = new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/)
        var result=url.match(reg); 
        if(!result){
            console.log(url);
            return {
                uri:url
            };
        }
        return {
            protocal:result[1],
            doman:result[2],
            uri:url
        }
    }

    function testHttp2Https(){
        let http=this.http;
        for(let key in http){
            http[key].forEach(item=>appendDom(item));
        }
    }
    function appendDom(item){
        var dom;
        switch (item.type){
            case 'script':
                dom=document.createElement("script");
                dom.src=toHttps(item.uri);
                dom.type='text/javascript';
                break;
            case 'link':
                dom=document.createElement("link");
                dom.href=toHttps(item.uri);
                dom.rel="stylesheet";
                break;
            case 'img':
                dom=document.createElement("img");
                dom.src=toHttps(item.uri);
                dom.alt=toHttps(item.uri);
                break;
        }
        try {
            document.getElementsByTagName("body")[0].appendChild(dom);
        } catch (error) {
            console.warn('添加失败',err,item)
        }
    }

    function toHttps(uri){
        return uri.slice(0, 4) + 's' + uri.slice(4)
    }

    getFile();

    return AP
 
}