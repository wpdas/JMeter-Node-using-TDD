export class HTTPCookieManager {

  private _cookieData:Array<String> = new Array<String>();

  public manager(httpResponse:any) {

    //If valid, Set first param cookie data
    if(httpResponse.headers['set-cookie'] != undefined) {

      this._cookieData = new Array<String>();
      this._cookieData.push(httpResponse.headers['set-cookie'][0].split(';')[0]);  
    }
  }

  /**
   * Get Cookie Data
   * @return {String} Cookie Data
   */
  public get cookieData():String {
    return this._cookieData[0];
  }
}
