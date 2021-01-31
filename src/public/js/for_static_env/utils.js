function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

// ref:
// https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/271835/
Date.prototype.toMyFormatString = function (fmt) { //author: meizz
    var o = {
        "M": this.getMonth() + 1, //月份
        "d": this.getDate(), //日
        "h": this.getHours(), //小時
        "m": this.getMinutes(), //分
        "s": this.getSeconds(), //秒
        "q": Math.floor((this.getMonth()) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            ("" + this.getFullYear())
                .substr(4 - RegExp.$1.length)
        );
    }
    for (var k in o) {
        if (new RegExp("(" + k + "+)").test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (RegExp.$1.length == 1) 
                    ? (o[k])
                    : ("" + o[k]).substr((o[k]).length).padStart(RegExp.$1.length, "0")
            );
        }
    }
    
    return fmt;
}