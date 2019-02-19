import qs from 'qs'; //引用qs模块
/**
 * 时间戳转字符串格式
 * @param timestamp
 * @param n
 * @returns {*}
 * @constructor
 */
function Trans_time_to_str(timestamp, n) {
    timestamp = Number(timestamp);
    if (String(timestamp).length === 10) {
        timestamp = timestamp * 1000; //时间戳要乘1000
    }
    var update = new Date(timestamp);
    var year = update.getFullYear();
    var month = (update.getMonth() + 1 < 10) ? ('0' + (update.getMonth() + 1)) : (update.getMonth() + 1);
    var day = (update.getDate() < 10) ? ('0' + update.getDate()) : (update.getDate());
    var hour = (update.getHours() < 10) ? ('0' + update.getHours()) : (update.getHours());
    var minute = (update.getMinutes() < 10) ? ('0' + update.getMinutes()) : (update.getMinutes());
    var second = (update.getSeconds() < 10) ? ('0' + update.getSeconds()) : (update.getSeconds());
    if (n === 1) {
        return (year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
    } else if (n === 2) {
        return (year + '-' + month + '-' + day);
    } else {
        return 0;
    }
}

(function() {
    const comObj = {};
    comObj.chuoToTimeStr = Trans_time_to_str;
    window.prdr = comObj;
})();

/*
 * @Author: ruby.you
 * @Date:   2017-12-22 16:08:55
 * @Last Modified by:   wyy
 * @Last Modified time: 2019-02-19 15:45:46
 */

var is_debug = false;

/*
 * 向控制台输出日志
 * @param  data data  要输出的日志
 * @return string
 */
function log(data) {
    if (typeof data == 'string') {
        console.log(data);
    } else {
        alert(JSON.stringify(data));
        console.log(JSON.stringify(data));
    }
}
window.log = log;

/**
 * 用于把用utf16编码的字符转换成实体字符，以供后台存储
 * @param  {string} str 将要转换的字符串，其中含有utf16字符将被自动检出
 * @return {string}     转换后的字符串，utf16字符将被转换成&#xxxx;形式的实体字符
 */
function utf16toEntities(str) {
    var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
    str = str.replace(patt, function(char) {
        var H, L, code;
        if (char.length === 2) {
            H = char.charCodeAt(0); // 取出高位
            L = char.charCodeAt(1); // 取出低位
            code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
            return "&#" + code + ";";
        } else {
            return char;
        }
    });
    return str;
}


function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function Trans_php_time_to_str(timestamp, n) {
    timestamp = Number(timestamp);
    if (String(timestamp).length === 10) {
        timestamp = timestamp * 1000; //时间戳要乘1000
    }
    var update = new Date(timestamp);
    var year = update.getFullYear();
    var month = (update.getMonth() + 1 < 10) ? ('0' + (update.getMonth() + 1)) : (update.getMonth() + 1);
    var day = (update.getDate() < 10) ? ('0' + update.getDate()) : (update.getDate());
    var hour = (update.getHours() < 10) ? ('0' + update.getHours()) : (update.getHours());
    var minute = (update.getMinutes() < 10) ? ('0' + update.getMinutes()) : (update.getMinutes());
    var second = (update.getSeconds() < 10) ? ('0' + update.getSeconds()) : (update.getSeconds());
    if (n === 1) {
        return (year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
    } else if (n === 2) {
        return (year + '-' + month + '-' + day);
    } else {
        return 0;
    }
}

function timestamp(url) {
    //  var getTimestamp=Math.random();
    var getTimestamp = new Date().getTime();
    if (url.indexOf("?") > -1) {
        url = url + "&timestamp=" + getTimestamp;
    } else {
        url = url + "?timestamp=" + getTimestamp;
    }
    return url;
}

/*
 * dati Class
 * ruby
 * 2017/8/20
 */
(function() {

    "use strict";

    var m = {};
    m.isAndroid = (/android/gi).test(navigator.appVersion); //是否安卓
    m.isApp = (/mengzhu/gi).test(navigator.appVersion); //是否APP打开
    m.fileName = (location.pathname.match(/\/([^\/?#]+)$/i) || [, ""])[1] //当前路径
    m.local = function() {
        var ls_prefix = "dati_";
        var ls = window.localStorage;
        if (arguments.length == 1) {
            var v = ls.getItem(ls_prefix + arguments[0]);
            if (!v) {
                return;
            }
            if (v.indexOf('obj-') === 0) {
                v = v.slice(4);
                return JSON.parse(v);
            } else if (v.indexOf('str-') === 0) {
                return v.slice(4);
            }
        } else if (arguments.length == 2) {
            var key = ls_prefix + arguments[0];
            var v = arguments[1];
            if (typeof v == 'object') {
                v = JSON.stringify(v);
                v = 'obj-' + v;
            } else {
                v = 'str-' + v;
            }
            if (ls) {
                try {
                    ls.setItem(key, v);
                } catch (e) {
                    ls = window.sessionStorage;
                    ls.setItem(key, v);
                }
            }
        }
    }
    m.rmLocal = function(name) {
        var ls_prefix = "dati_";
        var ls = window.localStorage ? window.localStorage : window.sessionStorage;
        if (name) {
            ls.removeItem(ls_prefix + name);
        }
    }

    m.AUTH_TOKEN = function() {
        return m.local('token');
    }

    m.getUid = function() {
        return m.local('uid');
    };

    m.getUsername = function() {
        return m.local('username');
    };

    m.getAvatar = function() {
            return m.local('avatar');
        }()
        /**
         * 检查是否为URL
         *
         * @param      {<type>}   URL     The url
         * @return     {boolean}  { description_of_the_return_value }
         */
    m.checkURL = function(URL) {
        var str = URL;
        //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
        //下面的代码中应用了转义字符"\"输出一个字符"/"
        var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        var objExp = new RegExp(Expression);
        if (objExp.test(str) == true) {
            return true;
        } else {
            return false;
        }
    }
    m.to = function(url) {
        if (url) {
            m.local("back_url", document.URL);
            m.local("to_url", url);
            window.location.href = url;
        }
    }
    m.back = function() {
        var url = m.local("back_url");
        if (url) {
            window.location.href = url;
        }
    }
    m.isLogin = function() {
        if (m.local("uid") && m.local("token")) {
            return true;
        } else {
            return false;
        }
    }()
    m.getUid = function() {
        return m.local("uid");
    }
    m.ajax = function(url, param, complete, error) {
        let base_url = serverurl;

        // if (m.isLogin) {
        //   param.uid = m.getUid();
        //   param.token = m.AUTH_TOKEN();
        // }
        if (url === "area.json") {
            base_url = base_url.replace('.net/api/', '.net/');
        }
        axios.post(base_url + url, qs.stringify(param))
            .then(function(response) {
                // console.log(response)
                if (response.status == 200) {
                    complete(response.data);
                } else {
                    Toast.fail('服务器迷路了~');
                }
            })
            .catch(function(error) {

                //Toast.fail('请检查网络');
                console.log(error);
            });
    }
    m.weixinSign = function(complete) {
        m.ajax(API.wx.getSign, {
            url: document.URL,
            user_source: 1,
        }, function(ret) {
            complete(ret);
        });
    }
    m.userAjax = function(url, params, callback, error) {

        let base_url = serverurl;
        var params = arguments[1] ? arguments[1] : {}
        params.token = m.AUTH_TOKEN();
        params.uid = m.local('uid');
        var that = m;
        var data = params;
        axios.post(base_url + url, qs.stringify(data))
            .then(function(response) {
                if (response.status == 200) {
                    // console.log(response);
                    var ret = response.data;
                    // if (false) {
                    if (ret.status == 10001) {
                        that.login();
                        return;
                    } else {
                        if (typeof callback === "function") {
                            callback(ret);
                        }
                    }
                } else {
                    Toast.fail('登录失败~');
                    cosnole.log(response);
                }
            })
            .catch(function(er) {
                if (typeof error === "function") {
                    error(er);
                } else {
                    console.log(er);
                    Toast.fail('网络错误');
                }
                console.log(er);
            });
    }

    /**
     * 注销登录
     */
    m.loginOut = function() {
            m.rmLocal('uid');
            m.rmLocal('token');
            m.rmLocal('mobile');
            m.rmLocal('userInfo');
            m.rmLocal('openid');
            return true;
        }
        /**
         * h5 登录
         * @param      {<type>}    type      The type
         * @param      {<type>}    openid    The openid
         * @param      {Function}  callback  The callback
         */
    m.login_auth = function(type, param, callback, error) {
        let userParam = {};
        console.log(param);
        if (type == "wx") {
            userParam = {
                type: "wx",
                openid: param.openid,
                userInfo: param.user,
                deviceid: uuid(),
                user_source: 1,
            };
        } else {
            userParam = {
                type: "mobile",
                mobile: param.mobile,
                code: param.code,
                deviceid: uuid(),
            };
        }
        //console.log(userParam);
        axios.post('/api/user/login', userParam)
            .then(function(response) {
                if (response.status == 200) {
                    var ret = response.data;
                    if (ret.status == 1) {
                        //第一次微信授权登录成功，进行打点
                        if (ret.message === "注册成功") {
                            m.gaClickAys('auth', String(ret.data.uid));
                        }
                        m.local("token", ret.data.token);
                        m.local("avatar", ret.data.avatar);
                        m.local("username", ret.data.username);
                        // m.local("mobile", ret.data.mobile);
                        m.local("uid", ret.data.uid);
                        m.local("userInfo", ret.data);
                        if (typeof callback === "function") {
                            callback(ret);
                        }
                        // Toast.success('登录成功');
                    } else {
                        // Toast.fail(ret.message);
                        if (typeof error === "function") {
                            error(ret);
                        }
                    }
                } else {
                    // Toast.fail('登录失败，由于网络原因');
                    cosnole.log(response);
                    if (typeof error === "function") {
                        error(ret)
                    }
                }
            })
            .catch(function(error) {
                // Toast.fail('请检查网络哦');
                if (typeof error === "function") {
                    error(error);
                }
            });
    }
    m.login_wx = function(code, callback) {
        console.log(serverurl + API.wx.get_wx_auth);
        axios.post(serverurl + API.wx.get_wx_auth, {
                type: "base_info",
                code: code,
                isCallBack: 1,
                user_source: 1,
            })
            .then(function(response) {
                if (response.status == 200) {
                    var ret = response.data;
                    if (ret.status == 1) {
                        if (typeof callback === "function") {
                            callback(ret);
                        }
                    } else {
                        Toast(ret.message);
                    }
                } else {
                    Toast.fail('登录失败');
                    // cosnole.log(response);
                }
            })
            .catch(function(error) {
                console.log(error)
                Toast.fail('授权失败');
            });
    };
    m.formatPrice = function(x) {
            var f = parseFloat(x);
            if (isNaN(f)) {
                return false;
            }
            var f = Math.round(x * 100) / 100;
            var s = f.toString();
            var rs = s.indexOf('.');
            if (rs < 0) {
                rs = s.length;
                s += '.';
            }
            while (s.length <= rs + 2) {
                s += '0';
            }
            return s;
        }
        /**
         * 设置分享内容
         */
    m.share = function(param) {
            let url = location.search;
            if (url.indexOf("?") != -1) {
                url = document.URL + "&invite_uid=" + $dati.getUid()
            } else {
                url = document.URL + "?&invite_uid=" + $dati.getUid()
            };
            var param = param ? param : {
                title: "【答题抽奖】只要你来答，百万奖品任你拿",
                link: url,
                desc: "活动期间随时参与，回答问题就能获得奖励！",
                img: "http://images.ecdpower.net/dati_logo.jpg"
            }
            if (!m.isWeiXin) return;
            m.weixinSign(function(ret) {
                console.dir(ret);
                var sd = ret.data;
                wx.config({
                    debug: false,
                    appId: sd.appId,
                    timestamp: sd.timestamp,
                    nonceStr: sd.nonceStr,
                    signature: sd.signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'showMenuItems', 'hideMenuItems', 'checkJsApi', 'chooseWXPay']
                });
                wx.ready(function() {
                    wx.checkJsApi({
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', 'showMenuItems', 'chooseWXPay']
                    });
                    wx.onMenuShareTimeline({
                        title: param.title || "【答题抽奖】只要你来答，百万奖品任你拿", // 分享标题
                        link: param.link || url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: param.img || "http://images.ecdpower.net/dati_logo.jpg", // 分享图标
                    });
                    wx.onMenuShareAppMessage({
                        title: param.title || "【答题抽奖】只要你来答，百万奖品任你拿", // 分享标题
                        desc: param.desc || "活动期间随时参与，回答问题就能获得奖励！", // 分享描述
                        link: param.link || url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: param.img || "http://images.ecdpower.net/dati_logo.jpg", // 分享图标
                    });
                    wx.showMenuItems({
                        menuList: [
                            'menuItem:readMode',
                            'menuItem:share:timeline',
                            'menuItem:share:appMessage',
                            'menuItem:share:qq',
                            'menuItem:copyUrl',
                            'menuItem:share:QZone',
                        ]
                    });
                });
            });
        }
        /**
         * 隐藏分享
         */
    m.hideShare = function() {

        if (!m.isWeiXin) return;
        m.weixinSign(function(ret) {
            //console.log(ret);
            var sd = ret.data;
            wx.config({
                debug: false,
                appId: sd.appId,
                timestamp: sd.timestamp,
                nonceStr: sd.nonceStr,
                signature: sd.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'showMenuItems', 'hideMenuItems', 'checkJsApi', 'chooseWXPay']
            });
            wx.ready(function() {
                wx.checkJsApi({
                    jsApiList: ['hideMenuItems']
                });
                wx.hideMenuItems({
                    menuList: [
                        'menuItem:readMode',
                        'menuItem:share:timeline',
                        'menuItem:share:appMessage',
                        'menuItem:share:qq',
                        'menuItem:copyUrl',
                        'menuItem:share:QZone',
                    ]
                });
            });
        });
    }

    m.isWeiXin = function() { //是否微信环境
        var e = window.navigator.userAgent.toLowerCase();
        return "micromessenger" == e.match(/MicroMessenger/i);
    }()

    m.validateMobile = function(e) { //验证手机号
        return e = $.trim(e + "").replace(/\s/g, ""), !!/^(13[0-9]|15[012356789]|17[0123456789]|18[0-9]|14[57])[0-9]{8}$/.test($.trim(e));
    }
    m.validateIdNumber = function(e) { //验证身份证
        e = e.replace(/\s+/g, "");
        var t = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
        return !!t.test(e);
    }
    m.setDocumentTitle = function(title) {
        document.title = title;
        var ua = navigator.userAgent;
        if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
            var i = document.createElement('iframe');
            i.src = '/favicon.ico';
            i.style.display = 'none';
            i.onload = function() {
                setTimeout(function() {
                    i.remove();
                }, 9);
            };
            document.body.appendChild(i);
        }
    }


    window.$dati = m;
})();

/**
 * 替换所有空格
 *
 * @class      TransferString (name)
 * @param      替换内容
 * @return     替换完毕的结果
 */
function TransferString(content) {
    var string = content;
    try {
        string = string.replace(/\r\n/g, "<BR>")
        string = string.replace(/\n/g, "<BR>");
    } catch (e) {
        // alert(e.message);
    }
    return string;
}
// alert(entitiestoUtf16(name));
function entitiestoUtf16(str) {
    // 检测出形如&#12345;形式的字符串
    var strObj = utf16toEntities(str);
    var patt = /&#\d+;/g;
    var H, L, code;
    var arr = strObj.match(patt) || [];
    for (var i = 0; i < arr.length; i++) {
        code = arr[i];
        code = code.replace('&#', '').replace(';', '');
        // 高位
        H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
        // 低位
        L = (code - 0x10000) % 0x400 + 0xDC00;
        code = "&#" + code + ";";
        var s = String.fromCharCode(H, L);
        strObj.replace(code, s);
    }
    return strObj;
}

function isEmojiCharacter(substring) {
    for (var i = 0; i < substring.length; i++) {
        var hs = substring.charCodeAt(i);
        if (0xd800 <= hs && hs <= 0xdbff) {
            if (substring.length > 1) {
                var ls = substring.charCodeAt(i + 1);
                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                if (0x1d000 <= uc && uc <= 0x1f77f) {
                    return true;
                }
            }
        } else if (substring.length > 1) {
            var ls = substring.charCodeAt(i + 1);
            if (ls == 0x20e3) {
                return true;
            }
        } else {
            if (0x2100 <= hs && hs <= 0x27ff) {
                return true;
            } else if (0x2B05 <= hs && hs <= 0x2b07) {
                return true;
            } else if (0x2934 <= hs && hs <= 0x2935) {
                return true;
            } else if (0x3297 <= hs && hs <= 0x3299) {
                return true;
            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b || hs == 0x2b50) {
                return true;
            }
        }
    }
}

function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}