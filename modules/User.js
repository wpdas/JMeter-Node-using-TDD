"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    /**
     * Cria novo usuario
     * @param  {string} user     Username from user
     * @param  {number} password User password
     */
    constructor(user, password) {
        this._user = user;
        this._pass = password;
    }
    get username() {
        return this._user;
    }
    get password() {
        return this._pass;
    }
}
exports.User = User;
