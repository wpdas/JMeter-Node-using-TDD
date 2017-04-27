"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HTTPCookieManager {
    constructor() {
        this._cookieData = new Array();
    }
    manager(httpResponse) {
        //If valid, Set first param cookie data
        if (httpResponse.headers['set-cookie'] != undefined) {
            this._cookieData = new Array();
            this._cookieData.push(httpResponse.headers['set-cookie'][0].split(';')[0]);
        }
    }
    /**
     * Get Cookie Data
     * @return {String} Cookie Data
     */
    get cookieData() {
        return this._cookieData[0];
    }
}
exports.HTTPCookieManager = HTTPCookieManager;
