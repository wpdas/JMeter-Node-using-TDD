import { HTTPMethods } from './HTTPMethods';

export class Client {

  private _hostname:String;
  private _port:Number = 80;
  private _method:String = HTTPMethods.GET;
  private _path:String = '/';
  private _headers:Object = {};

  /**
   * Set Client Properties
   * @param  {String} hostname hostname
   * @param  {Number} port     port
   */
  constructor(hostname:String, port?:Number){
    this._hostname = hostname;
    if(port) this._port = port;
  }

  /**
   * Set Cookie Data
   * @param {String} cookieData [description]
   */
  public setCookie(cookieData:String):void {
    this._headers['Cookie'] = cookieData;
  }

  /**
   * Set Method
   * @param {String} method Method (Use HTTPMethods.METHOD)
   */
  public setMethod(method:String):void
  {
    this._method = method;
  }

  /**
   * Get Method
   * @return {String} Method (Use HTTPMethods.METHOD)
   */
  public getMethod():String {
    return this._method;
  }

  /**
   * Set Path
   * @param {String} path Set Path Request
   */
  public setPath(path:String):void {
    this._path = path;
  }

  /**
   * Get Path
   * @param {String} path Set Path Request
   */
  public getPath():String {
    return this._path;
  }

  /**
   * Get hostname
   * @return {String} [description]
   */
  public get requestOptions():Object {

    //Create structure
    var options = {host:this._hostname,
                   port:this._port,
                   method:this._method,
                   headers:this._headers};

    return options;
  }
}
