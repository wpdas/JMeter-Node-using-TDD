"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_typescript_1 = require("mocha-typescript");
const User_1 = require("../modules/User");
const Client_1 = require("../modules/jmeter/Client");
const HTTPMethods_1 = require("../modules/jmeter/HTTPMethods");
const HTTPRequest_1 = require("../modules/jmeter/HTTPRequest");
const HTTPCookieManager_1 = require("../modules/jmeter/HTTPCookieManager");
const RegularExpressionExtractor_1 = require("../modules/jmeter/RegularExpressionExtractor");
let HTTPRequestTest = HTTPRequestTest_1 = class HTTPRequestTest {
    /**
     * Creates an instance of HTTPRequestTest.
     *
     * @memberOf HTTPRequestTest
     */
    constructor() {
        this.client = new Client_1.Client('www.redmine.org');
        this.httpCookieManager = new HTTPCookieManager_1.HTTPCookieManager();
    }
    'RedmineHomePage Request'(done) {
        this.client.setPath('/');
        this.pageRequest = new HTTPRequest_1.HTTPRequest('RedmineHomePage', this.client, null, false);
        this.pageRequest.run((res) => {
            if (res)
                done();
        });
    }
    'RedmineLoginPage Request / Get Cookie and use Regular Expression Extractor'(done) {
        let regularExpressionExtractor = new RegularExpressionExtractor_1.RegularExpressionExtractor();
        regularExpressionExtractor.setup('OAUTH', /<meta content="(.+?)" name="csrf-token" \/>/g);
        this.client.setPath('/login');
        this.pageRequest = new HTTPRequest_1.HTTPRequest('RedmineLoginPage', this.client, regularExpressionExtractor, false); //or
        //this.pageRequest.regularExpressionExtractor = regularExpressionExtractor;
        this.pageRequest.run((res) => {
            if (res) {
                //Get Cookie
                this.httpCookieManager.manager(res);
                HTTPRequestTest_1.COOKIE_LOGIN_DATA_FROM_HTTPCookieManager = this.httpCookieManager.cookieData; //Only to Test use
                //Get and print the value extracted (Through of the RegularExpressionExtractor class)
                HTTPRequestTest_1.OAUTH_FROM_RegularExpressionExtractor = RegularExpressionExtractor_1.RegularExpressionExtractor.getValue('OAUTH'); //Only to Test use
                done();
            }
        });
    }
    'RedmineLogin > LoginAction > Set Cookie And Post Method With Parameters to Login User'(done) {
        console.log('Value Extracted: ', HTTPRequestTest_1.OAUTH_FROM_RegularExpressionExtractor);
        var user = new User_1.User('Wpdas', '123456');
        //Set client Cookie to send Request
        //this.client.setCookie('var=value;'); or
        this.client.setMethod(HTTPMethods_1.HTTPMethods.POST);
        this.client.setPath('/login');
        this.client.setCookie(HTTPRequestTest_1.COOKIE_LOGIN_DATA_FROM_HTTPCookieManager);
        this.pageRequest = new HTTPRequest_1.HTTPRequest('RedmineLoginUserAction', this.client, null, false);
        this.pageRequest.parameters = {
            //authenticity_token: RegularExpressionExtractor.getValue('OAUTH'), correct mode to use in production
            authenticity_token: HTTPRequestTest_1.OAUTH_FROM_RegularExpressionExtractor,
            username: user.username,
            password: user.password
        };
        this.pageRequest.run((res) => {
            if (res)
                done();
        });
    }
    'Redmine.org > LogoutAction > Set up to date Cookie'(done) {
        this.client.setCookie(HTTPRequestTest_1.COOKIE_LOGIN_DATA_FROM_HTTPCookieManager);
        this.client.setPath('/logout');
        this.pageRequest = new HTTPRequest_1.HTTPRequest('LogoutAction', this.client, null, false);
        this.pageRequest.run((res) => {
            if (res)
                done();
        });
    }
};
__decorate([
    mocha_typescript_1.test
], HTTPRequestTest.prototype, "RedmineHomePage Request", null);
__decorate([
    mocha_typescript_1.test
], HTTPRequestTest.prototype, "RedmineLoginPage Request / Get Cookie and use Regular Expression Extractor", null);
__decorate([
    mocha_typescript_1.test
], HTTPRequestTest.prototype, "RedmineLogin > LoginAction > Set Cookie And Post Method With Parameters to Login User", null);
__decorate([
    mocha_typescript_1.test
], HTTPRequestTest.prototype, "Redmine.org > LogoutAction > Set up to date Cookie", null);
HTTPRequestTest = HTTPRequestTest_1 = __decorate([
    mocha_typescript_1.suite('Integrated Test HTTPRequestTest', mocha_typescript_1.timeout(10000))
], HTTPRequestTest);
var HTTPRequestTest_1;
