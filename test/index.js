'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);
var _thinkjs = require('thinkjs');var _thinkjs2 = _interopRequireDefault(_thinkjs);
var _index = require('../lib/index');var _index2 = _interopRequireDefault(_index);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var ROOT_PATH = _path2.default.dirname(__dirname);
_thinkjs2.default.load({ 
    ROOT_PATH: ROOT_PATH, 
    APP_PATH: ROOT_PATH + think.sep + 'app', 
    RUNTIME_PATH: ROOT_PATH + think.sep + 'runtime', 
    RESOURCE_PATH: ROOT_PATH + think.sep + 'www' });

var wechatConfig = { //微信公众号相关配置
    token: 'yuguo', //token
    appid: 'wxb44fd5af634cbcf5', //appid
    encodingAESKey: '1RWtmBFCmi7nZokAIB44lVDUPpOuRMibVMvBaRAL2ui', 
    appsecret: 'f10b823f3e0b5b4814b98c4a60731ab0', 
    menu: { //菜单配置
        "button": [{ 
            "type": "view", 
            "name": "我的战队", 
            "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb44fd5af634cbcf5&redirect_uri=http%3a%2f%2ftest.jubaopen.tv/team&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect#!/team/index" }, 
        { 
            "type": "view", 
            "name": "我要赚钱", 
            "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb44fd5af634cbcf5&redirect_uri=http%3a%2f%2ftest.jubaopen.tv&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect#!/team/index" }, 
        { 
            "name": "更多", 
            "sub_button": [{ 
                "type": "view", 
                "name": "个人中心", 
                "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb44fd5af634cbcf5&redirect_uri=http%3a%2f%2ftest.jubaopen.tv/my&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect#!/team/index" }, 
            { 
                "type": "click", 
                "name": "快速入门", 
                "key": "guide" }, 
            { 
                "type": "click", 
                "name": "联系我们", 
                "key": "contact" }] }] }, 



    jsConfig: { //前端调用微信js的相关参数配置
        debug: false, 
        jsApiList: ['chooseImage', 'uploadImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQZone', 'onMenuShareWeibo', 'onMenuShareQQ', 'hideMenuItems'] } };


describe('think-wechatservice', function () {
    it('test init', function () {var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(done) {var 
            service;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:service = new _index2.default(wechatConfig);
                            done();case 2:case 'end':return _context.stop();}}}, _callee, this);}));return function (_x) {return ref.apply(this, arguments);};}());});