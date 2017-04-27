export class User {

  private _user:string;
  private _pass:string;

  /**
   * Cria novo usuario
   * @param  {string} user     Username from user
   * @param  {number} password User password
   */
  constructor(user: string, password: string){
    this._user = user;
    this._pass = password;
  }

  public get username():string {
    return this._user;
  }

  public get password():string {
    return this._pass;
  }
}
