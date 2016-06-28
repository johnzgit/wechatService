'use strict';
import api from 'wechat-api';
import oauth from 'wechat-oauth';
export default class {
    static errorConfig = {
            //错误信息定义
            1020000: {
                errno: 1020000,
                errmsg: '内部错误',
            },
            1020001: {
                errno: 1010001,
                errmsg: '参数为空',
            },
        }
        /**
         * init
         */
    constructor(...args) {
            think.log("初始化微信service");
            this.wechatConfig = args[0]; //接受wechat配置
            //通过配置初始化service
            this.wechatApi = new api(this.wechatConfig.appid, this.wechatConfig.appsecret, this.getAccessToken, this.setAccessToken);
            this.wechatOauth = new oauth(this.wechatConfig.appid, this.wechatConfig.appsecret, this.getWebToken, this.setWebToken);
            //注册js sdk ticket token全局维护方法
            this.wechatApi.registerTicketHandle(this.getTicketToken, this.saveTicketToken);
            //初始化menu
            //          this.createMenu();

        }
        /**
         * 获取media
         * @mediaId
         * 返回微信返回的media对象
         */
    getMedia(mediaId) {
            let _this = this;
            return new Promise(function(resolve, reject) {
                _this.wechatApi.getMedia(mediaId, function(err, result) {
                    if (err) return reject(err);
                    return resolve(result)
                })
            });
        }
        /**
         * 获取微信JS SDK Config的所需参数
         * @url:我方系统的页面url
         * return config配置
         */
    getTicket() {
        let _this = this;
        return new Promise(function(resolve, reject) {
            _this.wechatApi.getLatestTicket(function(err, result) {
                if (err) return reject(err);
                console.log(result);
                return resolve(result)
            })
        });
    }
    getJsConfig(url) {
            let _this = this;
            return new Promise(function(resolve, reject) {
                _this.wechatApi.getJsConfig({
                    debug: _this.wechatConfig.jsConfig.debug,
                    jsApiList: _this.wechatConfig.jsConfig.jsApiList,
                    url: url
                }, function(err, result) {
                    if (err) return reject(err);
                    return resolve(result)
                })
            });
        }
        /**
         * 创建菜单
         * @menuConfig:菜单配置
         * return 无
         */
    createMenu(menuConfig) {
            console.log("初始化微信菜单");
            if (!menuConfig) menuConfig = this.wechatConfig.menu;
            this.wechatApi.createMenu(menuConfig, function(err, result) {
                console.log("初始化微信菜单", err, 'result', result);
            })
        }
        /**
         * 根据openid获取微信用户
         * @openid:openid
         * return 微信用户
         */
    async getUser(openid) {
            let getUserAsync = think.promisify(this.wechatOauth.getUser, this.wechatOauth);
            return await getUserAsync(openid);
        }
        /**
         * 通过code获取微信用户
         * @code:微信的code
         * return 微信用户
         */
    async getUserByCode(code) {
            let getUserByCode = think.promisify(this.wechatOauth.getUserByCode, this.wechatOauth);
            return await getUserByCode(code);
        }
        //  ========== 
        //  = 缓存读写方法 = 
        //  ========== 
        /**
         * 获取ticketToken
         * @type:ticket类型
         * @next:下一步要执行的方法
         * return 无
         */
    async getTicketToken(type, next) {
            let token = await think.cache('wechat_ticketToken_' + type);
            console.log("getTicketToken", token);
            next(null, token);
        }
        /**
         * 保存ticketToken
         * @type:ticket类型
         * @ticketToken:ticketToken
         * @next:下一步要执行的方法
         * return 无
         */
    async saveTicketToken(type, ticketToken, next) {
            console.log("saveTicketToken", ticketToken, 'type:', type);
            await think.cache('wechat_ticketToken_' + type, ticketToken);
            return next(null);
        }
        /**
         * 获取webToken
         * @openid:微信openid
         * @next:下一步要执行的方法
         * return 无
         */
    async getWebToken(openid, next) {
            let token = await think.cache('wechat_webtoken_' + openid);
            next(null, token);
        }
        /**
         * 设置webToken
         * @openid:微信openid
         * @token:webToken
         * @next:下一步要执行的方法
         * return 无
         */
    async setWebToken(openid, token, next) {
            await think.cache('wechat_webtoken_' + openid, token);
            return next()
        }
        /**
         * 获取access_token
         * @next:下一步执行的方法
         * return 无
         */
    async getAccessToken(next) {
            let token = await think.cache('wechat_accesstoken');
            console.log("-----getAccessToken-----", token);
            next(null, token);
        }
        /**
         * 设置access_token
         * @token:access_token
         * @next:下一步执行的方法
         * return next执行结果
         */
    async setAccessToken(token, next) {
            await think.cache('wechat_accesstoken', token);
            console.log("----------setAccessToken---------", token);
            return next();
        }
        /**
         * 设置web_accessToken
         * @code:微信的code
         * return 微信web access_token
         */
    async getWebAccessToken(code) {
        let getWebAccessTokenAsync = think.promisify(this.wechatOauth.getAccessToken, this.wechatOauth);
        return await getWebAccessTokenAsync(code);
    }

    /**
     * 创建临时二维码
     * sceneId：场景ID
     * expire：过期时间，单位秒，最大不超过604800，即7天
     * next:回调函数
     */
    async createTmpQRCode(sceneld, expire) {
        let createTmpQRCodeAsync = think.promisify(this.wechatApi.createTmpQRCode, this.wechatApi);
        let result = await createTmpQRCodeAsync(sceneld, expire);
        return result['ticket'];
    }

    /**
     * 生成显示二维码的链接，微信扫描后，可立即进入场景
     */
    async showQRCodeURL(ticket) {
        let url = await this.wechatApi.showQRCodeURL(ticket);
        return url;
    }

}