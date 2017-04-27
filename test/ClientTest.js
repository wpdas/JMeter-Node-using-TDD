"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_typescript_1 = require("mocha-typescript");
const Client_1 = require("../modules/jmeter/Client");
const HTTPMethods_1 = require("../modules/jmeter/HTTPMethods");
//Node Imports
const assert = require("assert");
let ClientTest = class ClientTest {
    /**
     * Creates an instance of ClientTest.
     *
     * @memberOf ClientTest
     */
    constructor() {
        this.client = new Client_1.Client('www.redmine.org');
    }
    //@test('Set/Get Path to Client')
    setPathClient() {
        this.client.setPath('/');
        assert.equal('/', this.client.getPath());
    }
    //@test('Set Method to Client')
    setMethodClient() {
        this.client.setMethod(HTTPMethods_1.HTTPMethods.GET);
        assert.equal(HTTPMethods_1.HTTPMethods.GET, this.client.getMethod());
    }
    //@test('Set Cookie to Client')
    setCookieClient() {
        this.client.setCookie('var=value;');
        assert.equal(HTTPMethods_1.HTTPMethods.GET, this.client.getMethod());
    }
};
__decorate([
    mocha_typescript_1.test
], ClientTest.prototype, "setPathClient", null);
__decorate([
    mocha_typescript_1.test
], ClientTest.prototype, "setMethodClient", null);
__decorate([
    mocha_typescript_1.test
], ClientTest.prototype, "setCookieClient", null);
ClientTest = __decorate([
    mocha_typescript_1.suite
], ClientTest);
