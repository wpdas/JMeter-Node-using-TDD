"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPMethods_1 = require("./HTTPMethods");
class Client {
    /**
     * Set Client Properties
     * @param  {String} hostname hostname
     * @param  {Number} port     port
     */
    constructor(hostname, port) {
        this._port = 80;
        this._method = HTTPMethods_1.HTTPMethods.GET;
        this._path = '/';
        this._headers = {};
        this._hostname = hostname;
        if (port)
            this._port = port;
    }
    /**
     * Set Cookie Data
     * @param {String} cookieData [description]
     */
    setCookie(cookieData) {
        this._headers['Cookie'] = cookieData;
    }
    /**
     * Set Method
     * @param {String} method Method (Use HTTPMethods.METHOD)
     */
    setMethod(method) {
        this._method = method;
    }
    /**
     * Get Method
     * @return {String} Method (Use HTTPMethods.METHOD)
     */
    getMethod() {
        return this._method;
    }
    /**
     * Set Path
     * @param {String} path Set Path Request
     */
    setPath(path) {
        this._path = path;
    }
    /**
     * Get Path
     * @param {String} path Set Path Request
     */
    getPath() {
        return this._path;
    }
    /**
     * Get hostname
     * @return {String} [description]
     */
    get requestOptions() {
        //Create structure
        var options = { host: this._hostname,
            port: this._port,
            method: this._method,
            headers: this._headers };
        return options;
    }
}
exports.Client = Client;
