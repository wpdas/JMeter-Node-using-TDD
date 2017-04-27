import { Client } from './Client';
import { HTTPMethods } from './HTTPMethods';
import { RegularExpressionExtractor } from "./RegularExpressionExtractor";

//Node Imports
import http = require('http');
import urlcodeJson = require('urlcode-json');

export class HTTPRequest {

  private name: String;
  private client: Client;
  private _regularExpressionExtractor: RegularExpressionExtractor;
  private showStatusOnComplete:Boolean;

  //Parameters (POST case)
  private _parameters: Object = new Object();

  /**
   * New HTTPRequest
   * @param  {String}                     name                       Name of this HTTPRequest
   * @param  {Client}                     client                     Client attributes
   * @param  {RegularExpressionExtractor} regularExpressionExtractor Use Expression Extractor? (optional)
   * @param  {Boolean}                    showStatusOnComplete       Show Status from Request on Complete ?
   */
  constructor(name: String, client: Client, regularExpressionExtractor?: RegularExpressionExtractor, showStatusOnComplete?:Boolean) {

    if(showStatusOnComplete == null) showStatusOnComplete = true;

    //Sets
    this.name = name;
    this.client = client;
    this._regularExpressionExtractor = regularExpressionExtractor;
    this.showStatusOnComplete = showStatusOnComplete;
  }

  /**
   * Set Parameters (use in POST or similar case)
   * @param  {Object} params Parameters to send
   */
  public set parameters(params: Object) {
    this._parameters = params;
  }

  /**
   * Run Request
   * @param  {Function} callback Callback Method dispatcher
   */
  public run(callback?: Function) {

    //Request
    var req = http.request(this.client.requestOptions, (res) => {

      //Valid statusCode
      if (res.statusCode == 200 || res.statusCode == 302) {

        //If exists regularExpressionExtractor
        if (this._regularExpressionExtractor) {

          //Request is complete?
          var complete: boolean = false;

          res.setEncoding('utf8');
          res.on('data', (responseData: string) => {

            //Ensure that the operation will work only one time
            if (!complete) {

              //Extrac and save value (accept null too)
              this._regularExpressionExtractor.extract(responseData);
              complete = true;

              //Callback
              if(this.showStatusOnComplete) console.info('#Success > ' + this.name, ':', this.client.getPath());
              if (callback) callback(res);
            }

          }).on('error', (e: string) => {
            throw new Error(e);
          });

        } else {

          //Callback
          if(this.showStatusOnComplete) console.info('#Success > ' + this.name, ':', this.client.getPath());
          if (callback) callback(res);
        };

      } else {

        //Callback
        console.warn('#Error > ' + this.name, ':', this.client.getPath());
        if (callback) callback(null);
      }

    });

    //Set data (parameters) to send
    if (this.client.getMethod() === HTTPMethods.POST) {

      //Use urlcode-json to converts JSON to urlcode params
      req.write(urlcodeJson.encode(this._parameters));
      req.end();

    } else if (this.client.getMethod() === HTTPMethods.GET) {

      req.end();
    }

    //Errors
    req.on('error', (e: any) => {

      //Without Internet or Web address wrong
      //if(e.code == 'EAI_AGAIN') throw new Error('Without internet conection or Web address dont exist.');
      if (e.code == 'EAI_AGAIN') {
        console.warn('#Error > ' + this.name, ':', this.client.getPath(), '(Without internet conection or Web address dont exist.)');
        if (callback) callback(null);
      };
    });

  }


  /**
   * Get the current Regular Expression Extractor
   * 
   * @type {RegularExpressionExtractor}
   * @memberOf HTTPRequest
   */
  public get regularExpressionExtractor(): RegularExpressionExtractor {
		return this._regularExpressionExtractor;
	}


	/**
   * Set a Regular Expression Extractor object.
   * 
   * 
   * @memberOf HTTPRequest
   */
  public set regularExpressionExtractor(value: RegularExpressionExtractor) {
		this._regularExpressionExtractor = value;
	}

}
