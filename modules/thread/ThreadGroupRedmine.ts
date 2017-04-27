import { Client } from '../jmeter/Client';
import { HTTPCookieManager } from '../jmeter/HTTPCookieManager';
import { HTTPRequest } from '../jmeter/HTTPRequest';
import { HTTPMethods } from '../jmeter/HTTPMethods';
import { RegularExpressionExtractor } from '../jmeter/RegularExpressionExtractor';
import { User } from '../User';

export class ThreadGroupRedmine {

  protected user: User;
  protected client: Client;

  private isAuto: Boolean = false;

  //Process
  private httpCookieManager: HTTPCookieManager;

  //Pages Redmine.org
  private homePage: HTTPRequest; //HomePage
  private loginPage: HTTPRequest; //LoginPage
  private loginAction: HTTPRequest; //Login User
  private tasksPage: HTTPRequest; //TasksPage
  private task25595Page: HTTPRequest; //Task 25595 Page (!) May be up to date.
  private logoutAction: HTTPRequest; //Logout User

  /**
   * Create a ThreadGroup
   * @param  {User}   user User to access Client
   * @param  {Client} user Client
   */
  constructor(user: User, client: Client) {

    //Set
    this.user = user;
    this.client = client;

    //Init HTTPCookieManager
    this.httpCookieManager = new HTTPCookieManager();
  }

  /**
   * Start Plan Test (simulated JMeter)
   */
  public autoStartSquence(): void {
    this.isAuto = true;
    this.HomePage();
  }

  /**
   * HomePage
   */
  public HomePage(): void {

    //Set Method
    this.client.setMethod(HTTPMethods.GET);
    //Set Path
    this.client.setPath('/');

    this.homePage = new HTTPRequest('HomePage', this.client);
    this.homePage.run((res) => {

      //If no null
      if (res) {
        this.httpCookieManager.manager(res);
        if (this.isAuto) this.LoginPage();
      }
    })

  }

  /**
   * LoginPage
   */
  public LoginPage(): void {

    //Set cookieData
    this.client.setCookie(this.httpCookieManager.cookieData);
    this.client.setPath('/login');

    //RegularExpressionExtractor (register value extracted in OAUTH refName)
    let regularExpressionExtractor: RegularExpressionExtractor = new RegularExpressionExtractor();
    regularExpressionExtractor.setup('OAUTH', /<meta content="(.+?)" name="csrf-token" \/>/g);

    this.loginPage = new HTTPRequest('LoginPage', this.client, regularExpressionExtractor);
    this.loginPage.run((res) => {
      if (res) {
        if (this.isAuto) this.LoginAction();
      }
    });

  }

  /**
   * LoginAction
   */
  public LoginAction(): void {

    //Set Post
    this.client.setMethod(HTTPMethods.POST);

    this.loginAction = new HTTPRequest('LoginAction', this.client);
    this.loginAction.parameters = {
      authenticity_token: RegularExpressionExtractor.getValue('OAUTH'),
      username: this.user.username,
      password: this.user.password
    };
    this.loginAction.run((res) => {

      if (res) {
        //Update cookieData
        this.httpCookieManager.manager(res);

        if (this.isAuto) this.TasksPage();
      }

    });
  }


  /**
   * TasksPage
   */
  public TasksPage(): void {

    //Set cookieData
    this.client.setCookie(this.httpCookieManager.cookieData);
    this.client.setMethod(HTTPMethods.GET);
    this.client.setPath('/projects/redmine/issues');

    this.tasksPage = new HTTPRequest('TasksPage', this.client);
    this.tasksPage.run((res) => {
      if (res) {
        //Update cookieData
        this.httpCookieManager.manager(res);
        if (this.isAuto) this.Task25595Page();
      }
    });
  }


  /**
   * Task25595Page
   */
  public Task25595Page(): void {

    this.client.setCookie(this.httpCookieManager.cookieData);
    this.client.setPath('/issues/25595');
    this.task25595Page = new HTTPRequest('Task25595Page', this.client);
    this.task25595Page.run((res) => {
      if (res) {
        //Update cookieData
        this.httpCookieManager.manager(res);
        if (this.isAuto) this.LogoutAction();
      }
    });
  }


  /**
   * LogoutAction
   */
  public LogoutAction(): void {

    this.client.setCookie(this.httpCookieManager.cookieData);
    this.client.setPath('/logout');
    this.logoutAction = new HTTPRequest('LogoutAction', this.client);
    this.logoutAction.run();
  }

}
