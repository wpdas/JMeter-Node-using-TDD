import { suite, test, slow, timeout } from "mocha-typescript";
import { Client } from '../modules/jmeter/Client';
import { HTTPMethods } from '../modules/jmeter/HTTPMethods';

//Node Imports
import assert = require('assert');

@suite class ClientTest {

  public client: Client;

  /**
   * Creates an instance of ClientTest.
   * 
   * @memberOf ClientTest
   */
  constructor() {

    this.client = new Client('www.redmine.org');
  }

  //@test('Set/Get Path to Client')
  @test
  setPathClient() {
    this.client.setPath('/');
    assert.equal('/', this.client.getPath());
  }

  //@test('Set Method to Client')
  @test
  setMethodClient() {
    this.client.setMethod(HTTPMethods.GET);
    assert.equal(HTTPMethods.GET, this.client.getMethod());
  }

  //@test('Set Cookie to Client')
  @test
  setCookieClient() {
    this.client.setCookie('var=value;');
    assert.equal(HTTPMethods.GET, this.client.getMethod());
  }
}
