import { suite, test, slow, timeout } from "mocha-typescript";
import { User } from '../modules/User';

//Node Imports
import assert = require('assert');
import http = require('http');


@suite class UserTest {

  private user:User;
  private globalPass:string;

  before(){
    this.globalPass = Math.round(Math.random() * 999999).toString();
    this.user = new User('Wpdas', this.globalPass);
  }

  //@test 'Set Valid User Attributes'
  @test
  createUser(){

    assert.equal('Wpdas', this.user.username);
    assert.strictEqual(this.globalPass, this.user.password); //Tem que ser do mesmo tipo (string)
  }
}
