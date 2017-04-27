import { suite, timeout, test } from 'mocha-typescript';
import { User } from '../modules/User';
import { Client } from '../modules/jmeter/Client';
import { HTTPMethods } from '../modules/jmeter/HTTPMethods';
import { HTTPRequest } from '../modules/jmeter/HTTPRequest';
import { HTTPCookieManager } from '../modules/jmeter/HTTPCookieManager';
import { RegularExpressionExtractor } from '../modules/jmeter/RegularExpressionExtractor';


//Node Imports
import assert = require('assert');

@suite('Integrated Test HTTPRequestTest', timeout(10000)) class HTTPRequestTest {

  //Global
  public static OAUTH_FROM_RegularExpressionExtractor: String;
  public static COOKIE_LOGIN_DATA_FROM_HTTPCookieManager: String;

  private client: Client;
  private pageRequest: HTTPRequest;
  private httpCookieManager: HTTPCookieManager;

  /**
   * Creates an instance of HTTPRequestTest.
   * 
   * @memberOf HTTPRequestTest
   */
  constructor() {

    this.client = new Client('www.redmine.org');
    this.httpCookieManager = new HTTPCookieManager();
  }

  @test 'RedmineHomePage Request'
    (done: Function) {

    this.client.setPath('/');

    this.pageRequest = new HTTPRequest('RedmineHomePage', this.client, null, false);
    this.pageRequest.run((res) => {

      if (res) done();

    });
  }


  @test 'RedmineLoginPage Request / Get Cookie and use Regular Expression Extractor'
    (done: Function) {

    let regularExpressionExtractor: RegularExpressionExtractor = new RegularExpressionExtractor();
    regularExpressionExtractor.setup('OAUTH', /<meta content="(.+?)" name="csrf-token" \/>/g);

    this.client.setPath('/login');

    this.pageRequest = new HTTPRequest('RedmineLoginPage', this.client, regularExpressionExtractor, false); //or
    //this.pageRequest.regularExpressionExtractor = regularExpressionExtractor;
    this.pageRequest.run((res) => {

      if (res) {

        //Get Cookie
        this.httpCookieManager.manager(res);
        HTTPRequestTest.COOKIE_LOGIN_DATA_FROM_HTTPCookieManager = this.httpCookieManager.cookieData; //Only to Test use

        //Get and print the value extracted (Through of the RegularExpressionExtractor class)
        HTTPRequestTest.OAUTH_FROM_RegularExpressionExtractor = RegularExpressionExtractor.getValue('OAUTH'); //Only to Test use

        done();
      }

    });
  }

  @test 'RedmineLogin > LoginAction > Set Cookie And Post Method With Parameters to Login User'
    (done: Function) {

    console.log('Value Extracted: ', HTTPRequestTest.OAUTH_FROM_RegularExpressionExtractor);

    var user: User = new User('Wpdas', '123456');

    //Set client Cookie to send Request
    //this.client.setCookie('var=value;'); or

    this.client.setMethod(HTTPMethods.POST);
    this.client.setPath('/login');
    this.client.setCookie(HTTPRequestTest.COOKIE_LOGIN_DATA_FROM_HTTPCookieManager);
    this.pageRequest = new HTTPRequest('RedmineLoginUserAction', this.client, null, false);
    this.pageRequest.parameters = {
      //authenticity_token: RegularExpressionExtractor.getValue('OAUTH'), correct mode to use in production
      authenticity_token: HTTPRequestTest.OAUTH_FROM_RegularExpressionExtractor, //Mode to use in test code
      username: user.username,
      password: user.password
    };
    this.pageRequest.run((res) => {
      if (res) done();
    });
  }

  @test 'Redmine.org > LogoutAction > Set up to date Cookie'
    (done: Function) {

      this.client.setCookie(HTTPRequestTest.COOKIE_LOGIN_DATA_FROM_HTTPCookieManager);
      this.client.setPath('/logout');
      this.pageRequest = new HTTPRequest('LogoutAction', this.client, null, false);
      this.pageRequest.run((res) => {
        if(res) done();
      });
  }

}
