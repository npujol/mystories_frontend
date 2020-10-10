/*
 * My stories API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.15
 *
 * Do not edit the class manually.
 *
 */

import {ApiClient} from '../ApiClient';
import {Profile} from './Profile';

/**
 * The User model module.
 * @module model/User
 * @version v1
 */
export class User {
  /**
   * Constructs a new <code>User</code>.
   * @alias module:model/User
   * @class
   * @param email {String} 
   * @param password {String} 
   */
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  /**
   * Constructs a <code>User</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/User} obj Optional instance to populate.
   * @return {module:model/User} The populated <code>User</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new User();
      if (data.hasOwnProperty('email'))
        obj.email = ApiClient.convertToType(data['email'], 'String');
      if (data.hasOwnProperty('username'))
        obj.username = ApiClient.convertToType(data['username'], 'String');
      if (data.hasOwnProperty('password'))
        obj.password = ApiClient.convertToType(data['password'], 'String');
      if (data.hasOwnProperty('profile'))
        obj.profile = Profile.constructFromObject(data['profile']);
    }
    return obj;
  }
}

/**
 * @member {String} email
 */
User.prototype.email = undefined;

/**
 * @member {String} username
 */
User.prototype.username = undefined;

/**
 * @member {String} password
 */
User.prototype.password = undefined;

/**
 * @member {module:model/Profile} profile
 */
User.prototype.profile = undefined;


