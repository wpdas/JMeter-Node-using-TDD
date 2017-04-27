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

  /*@test ('Get Vocalke Page')
  assert_async(done: Function){

    http.get('http://www.vocalke.com:3001/', (res) => {
      if(res.statusCode == 200) {
        done()
      } else {
        done('Error on Load Page!');
      }

      //assert.equal(res.statusCode, 200, 'Error on Load Page!')
      //
    }).on('error', (e) => {

      //Passa algo por parametro, quer dizer que houve erro
      done(e);
    });
  }

  @test("Async Test")
  assert_pass_async(done: Function) {

    //Se nao passar nada em done(), finaliza com sucesso sem erro
    setTimeout(() => done(), 1000);
  }

  @test('toInt Fail')
  asserts_fail() {

    //var input = 'one'; //Error
    var input:number = 2.5;
    var inputNumber = Convert.toInt(input) || undefined;

    assert.notEqual(inputNumber, undefined, 'Ohhh no Error!');
  }*/
}
