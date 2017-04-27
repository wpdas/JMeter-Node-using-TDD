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
//Node Imports
const assert = require("assert");
let UserTest = class UserTest {
    before() {
        this.globalPass = Math.round(Math.random() * 999999).toString();
        this.user = new User_1.User('Wpdas', this.globalPass);
    }
    //@test 'Set Valid User Attributes'
    createUser() {
        assert.equal('Wpdas', this.user.username);
        assert.strictEqual(this.globalPass, this.user.password); //Tem que ser do mesmo tipo (string)
    }
};
__decorate([
    mocha_typescript_1.test
], UserTest.prototype, "createUser", null);
UserTest = __decorate([
    mocha_typescript_1.suite
], UserTest);
