"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPCookieManager_1 = require("../jmeter/HTTPCookieManager");
const HTTPRequest_1 = require("../jmeter/HTTPRequest");
const HTTPMethods_1 = require("../jmeter/HTTPMethods");
const RegularExpressionExtractor_1 = require("../jmeter/RegularExpressionExtractor");
class ThreadGroupRedmine {
    /**
     * Create a ThreadGroup
     * @param  {User}   user User to access Client
     * @param  {Client} user Client
     */
    constructor(user, client) {
        this.isAuto = false;
        //Set
        this.user = user;
        this.client = client;
        //Init HTTPCookieManager
        this.httpCookieManager = new HTTPCookieManager_1.HTTPCookieManager();
    }
    /**
     * Start Plan Test (simulated JMeter)
     */
    autoStartSquence() {
        this.isAuto = true;
        this.HomePage();
    }
    /**
     * HomePage
     */
    HomePage() {
        //Set Method
        this.client.setMethod(HTTPMethods_1.HTTPMethods.GET);
        //Set Path
        this.client.setPath('/');
        this.homePage = new HTTPRequest_1.HTTPRequest('HomePage', this.client);
        this.homePage.run((res) => {
            //If no null
            if (res) {
                this.httpCookieManager.manager(res);
                if (this.isAuto)
                    this.LoginPage();
            }
        });
    }
    /**
     * LoginPage
     */
    LoginPage() {
        //Set cookieData
        this.client.setCookie(this.httpCookieManager.cookieData);
        this.client.setPath('/login');
        //RegularExpressionExtractor (register value extracted in OAUTH refName)
        let regularExpressionExtractor = new RegularExpressionExtractor_1.RegularExpressionExtractor();
        regularExpressionExtractor.setup('OAUTH', /<meta content="(.+?)" name="csrf-token" \/>/g);
        this.loginPage = new HTTPRequest_1.HTTPRequest('LoginPage', this.client, regularExpressionExtractor);
        this.loginPage.run((res) => {
            if (res) {
                if (this.isAuto)
                    this.LoginAction();
            }
        });
    }
    /**
     * LoginAction
     */
    LoginAction() {
        //Set Post
        this.client.setMethod(HTTPMethods_1.HTTPMethods.POST);
        this.loginAction = new HTTPRequest_1.HTTPRequest('LoginAction', this.client);
        this.loginAction.parameters = {
            authenticity_token: RegularExpressionExtractor_1.RegularExpressionExtractor.getValue('OAUTH'),
            username: this.user.username,
            password: this.user.password
        };
        this.loginAction.run((res) => {
            if (res) {
                //Update cookieData
                this.httpCookieManager.manager(res);
                if (this.isAuto)
                    this.TasksPage();
            }
        });
    }
    /**
     * TasksPage
     */
    TasksPage() {
        //Set cookieData
        this.client.setCookie(this.httpCookieManager.cookieData);
        this.client.setMethod(HTTPMethods_1.HTTPMethods.GET);
        this.client.setPath('/projects/redmine/issues');
        this.tasksPage = new HTTPRequest_1.HTTPRequest('TasksPage', this.client);
        this.tasksPage.run((res) => {
            if (res) {
                //Update cookieData
                this.httpCookieManager.manager(res);
                if (this.isAuto)
                    this.Task25595Page();
            }
        });
    }
    /**
     * Task25595Page
     */
    Task25595Page() {
        this.client.setCookie(this.httpCookieManager.cookieData);
        this.client.setPath('/issues/25595');
        this.task25595Page = new HTTPRequest_1.HTTPRequest('Task25595Page', this.client);
        this.task25595Page.run((res) => {
            if (res) {
                //Update cookieData
                this.httpCookieManager.manager(res);
                if (this.isAuto)
                    this.LogoutAction();
            }
        });
    }
    /**
     * LogoutAction
     */
    LogoutAction() {
        this.client.setCookie(this.httpCookieManager.cookieData);
        this.client.setPath('/logout');
        this.logoutAction = new HTTPRequest_1.HTTPRequest('LogoutAction', this.client);
        this.logoutAction.run();
    }
}
exports.ThreadGroupRedmine = ThreadGroupRedmine;
