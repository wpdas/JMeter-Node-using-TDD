"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPMethods_1 = require("./HTTPMethods");
//Node Imports
const http = require("http");
const urlcodeJson = require("urlcode-json");
class HTTPRequest {
    /**
     * New HTTPRequest
     * @param  {String}                     name                       Name of this HTTPRequest
     * @param  {Client}                     client                     Client attributes
     * @param  {RegularExpressionExtractor} regularExpressionExtractor Use Expression Extractor? (optional)
     * @param  {Boolean}                    showStatusOnComplete       Show Status from Request on Complete ?
     */
    constructor(name, client, regularExpressionExtractor, showStatusOnComplete) {
        //Parameters (POST case)
        this._parameters = new Object();
        if (showStatusOnComplete == null)
            showStatusOnComplete = true;
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
    set parameters(params) {
        this._parameters = params;
    }
    /**
     * Run Request
     * @param  {Function} callback Callback Method dispatcher
     */
    run(callback) {
        //Request
        var req = http.request(this.client.requestOptions, (res) => {
            //Valid statusCode
            if (res.statusCode == 200 || res.statusCode == 302) {
                //If exists regularExpressionExtractor
                if (this._regularExpressionExtractor) {
                    //Request is complete?
                    var complete = false;
                    res.setEncoding('utf8');
                    res.on('data', (responseData) => {
                        //Ensure that the operation will work only one time
                        if (!complete) {
                            //Extrac and save value (accept null too)
                            this._regularExpressionExtractor.extract(responseData);
                            complete = true;
                            //Callback
                            if (this.showStatusOnComplete)
                                console.info('#Success > ' + this.name, ':', this.client.getPath());
                            if (callback)
                                callback(res);
                        }
                    }).on('error', (e) => {
                        throw new Error(e);
                    });
                }
                else {
                    //Callback
                    if (this.showStatusOnComplete)
                        console.info('#Success > ' + this.name, ':', this.client.getPath());
                    if (callback)
                        callback(res);
                }
                ;
            }
            else {
                //Callback
                console.warn('#Error > ' + this.name, ':', this.client.getPath());
                if (callback)
                    callback(null);
            }
        });
        //Set data (parameters) to send
        if (this.client.getMethod() === HTTPMethods_1.HTTPMethods.POST) {
            //Use urlcode-json to converts JSON to urlcode params
            req.write(urlcodeJson.encode(this._parameters));
            req.end();
        }
        else if (this.client.getMethod() === HTTPMethods_1.HTTPMethods.GET) {
            req.end();
        }
        //Errors
        req.on('error', (e) => {
            //Without Internet or Web address wrong
            //if(e.code == 'EAI_AGAIN') throw new Error('Without internet conection or Web address dont exist.');
            if (e.code == 'EAI_AGAIN') {
                console.warn('#Error > ' + this.name, ':', this.client.getPath(), '(Without internet conection or Web address dont exist.)');
                if (callback)
                    callback(null);
            }
            ;
        });
    }
    /**
     * Get the current Regular Expression Extractor
     *
     * @type {RegularExpressionExtractor}
     * @memberOf HTTPRequest
     */
    get regularExpressionExtractor() {
        return this._regularExpressionExtractor;
    }
    /**
   * Set a Regular Expression Extractor object.
   *
   *
   * @memberOf HTTPRequest
   */
    set regularExpressionExtractor(value) {
        this._regularExpressionExtractor = value;
    }
}
exports.HTTPRequest = HTTPRequest;
