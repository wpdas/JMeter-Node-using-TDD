//https://www.npmjs.com/package/mocha-typescript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const User_1 = require("./modules/User");
const Client_1 = require("./modules/jmeter/Client");
const ThreadGroupRedmine_1 = require("./modules/thread/ThreadGroupRedmine");
class Index {
    constructor() {
        //Create User
        this.user = new User_1.User('Wpdas', '123456');
        //Create Client
        this.client = new Client_1.Client('www.redmine.org');
        //Create a ThreadGroup
        this.thredGroup = new ThreadGroupRedmine_1.ThreadGroupRedmine(this.user, this.client);
        //Init
        this.thredGroup.autoStartSquence();
    }
}
exports.default = Index;
var app = new Index();
