//https://www.npmjs.com/package/mocha-typescript

/**
 * Desenvolvimento orientado a testes.
 *
 * Aplicação simples que tem como objetivo conectar ao site de testes
 * redmine.org, fazer login, acessar uma tarefa e por fim, logout.
 *
 * Os Testes realizados aqui foram primeiro feitos através da ferramenta
 * de testes JMeter
 *
 * Para testar as classes use o comando no terminal: npm test
 *
 * Para rodar a plicação, use o comando no terminal: npm start
 */

import { User } from "./modules/User";
import { Client } from "./modules/jmeter/Client";
import { ThreadGroupRedmine } from "./modules/thread/ThreadGroupRedmine";

export default class Index {

  //User
  private user:User;

  //Client
  private client:Client;

  //ThreadGroup
  private thredGroup:ThreadGroupRedmine;

  constructor(){

    //Create User
    this.user = new User('Wpdas', '123456');

    //Create Client
    this.client = new Client('www.redmine.org');

    //Create a ThreadGroup
    this.thredGroup = new ThreadGroupRedmine(this.user, this.client);

    //Init
    this.thredGroup.autoStartSquence();
  }
}

var app:Index = new Index();
