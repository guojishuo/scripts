const $ = new Env();


// =======================================企业微信机器人通知设置区域===========================================
//此处填你企业微信机器人的 webhook(详见文档 https://work.weixin.qq.com/api/doc/90000/90136/91770)，例如：693a91f6-7xxx-4bc4-97a0-0ec2sifa5aaa
//(环境变量名 QYWX_KEY)
let QYWX_KEY = '644d43a2-80a4-4744-83e0-df0cd5bcb687';

if (process.env.QYWX_KEY) {
    QYWX_KEY = process.env.QYWX_KEY;
}


async function sendNotify(text, desp, params = {}) {
    desp += `\n本脚本开源免费使用 By：guojishuo`;

    await Promise.all([
        qywxBotNotify(text, desp), //企业微信机器人
    ])
}

function qywxBotNotify(text, desp) {
    return new Promise(resolve => {
        const options = {
            url: `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${QYWX_KEY}`,
            json: {
                msgtype: 'text',
                text: {
                    content: ` ${text}\n\n${desp}`,
                },
            },
            headers: {
                'Content-Type': 'application/json',
            },
        };
        if (QYWX_KEY) {
            $.post(options, (err, resp, data) => {
                try {
                    if (err) {
                        console.log('企业微信发送通知消息失败！！\n');
                        console.log(err);
                    } else {
                        data = JSON.parse(data);
                        if (data.errcode === 0) {
                            console.log('企业微信发送通知消息完成。\n');
                        } else {
                            console.log(`${data.errmsg}\n`);
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve(data);
                }
            });
        } else {
            console.log('您未提供企业微信机器人推送所需的QYWX_KEY，取消企业微信推送消息通知\n');
            resolve();
        }
    });
}

module.exports = {
    sendNotify
}


// prettier-ignore
function Env(t, s) {
    return new class {
        post(t, s = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) $httpClient.post(t, (t, e, i) => {
                !t && e && (e.body = i, e.statusCode = e.status), s(t, e, i)
            }); else if (this.isQuanX()) t.method = "POST", $task.fetch(t).then(t => {
                const {statusCode: e, statusCode: i, headers: o, body: h} = t;
                s(null, {status: e, statusCode: i, headers: o, body: h}, h)
            }, t => s(t)); else if (this.isNode()) {
                this.initGotEnv(t);
                const {url: e, ...i} = t;
                this.got.post(e, i).then(t => {
                    const {statusCode: e, statusCode: i, headers: o, body: h} = t;
                    s(null, {status: e, statusCode: i, headers: o, body: h}, h)
                }, t => s(t))
            }
        }

        logErr(t, s) {
            const e = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            e ? $.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : $.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        
    }(t, s)
}

