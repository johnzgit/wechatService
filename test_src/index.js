'use strict';
import path from 'path';
import fs from 'fs';
import thinkjs from 'thinkjs';
import Service from '../lib/index';
let ROOT_PATH = path.dirname(__dirname);
thinkjs.load({
    ROOT_PATH: ROOT_PATH,
    APP_PATH: ROOT_PATH + think.sep + 'app',
    RUNTIME_PATH: ROOT_PATH + think.sep + 'runtime',
    RESOURCE_PATH: ROOT_PATH + think.sep + 'www'
});
let wechatConfig = { //微信公众号相关配置
    token: 'yuguo', //token
    appid: 'wxb44fd5af634cbcf5', //appid
    encodingAESKey: '1RWtmBFCmi7nZokAIB44lVDUPpOuRMibVMvBaRAL2ui',
    appsecret: 'f10b823f3e0b5b4814b98c4a60731ab0',
    menu: { //菜单配置
        "button": [{
            "type": "view",
            "name": "我的战队",
            "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb44fd5af634cbcf5&redirect_uri=http%3a%2f%2ftest.jubaopen.tv/team&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect#!/team/index"
        }, {
            "type": "view",
            "name": "我要赚钱",
            "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb44fd5af634cbcf5&redirect_uri=http%3a%2f%2ftest.jubaopen.tv&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect#!/team/index"
        }, {
            "name": "更多",
            "sub_button": [{
                "type": "view",
                "name": "个人中心",
                "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb44fd5af634cbcf5&redirect_uri=http%3a%2f%2ftest.jubaopen.tv/my&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect#!/team/index"
            }, {
                "type": "click",
                "name": "快速入门",
                "key": "guide"
            }, {
                "type": "click",
                "name": "联系我们",
                "key": "contact"
            }]
        }, ]
    },
    jsConfig: { //前端调用微信js的相关参数配置
        debug: false,
        jsApiList: ['chooseImage', 'uploadImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQZone', 'onMenuShareWeibo', 'onMenuShareQQ', 'hideMenuItems'],
    }
};
describe('think-wechatservice', function() {
    it('test init', async function(done) {
        let service = new Service(wechatConfig);
        done();
    })
})