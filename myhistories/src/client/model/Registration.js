/*
 * My stories API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.14
 *
 * Do not edit the class manually.
 *
 */

import {ApiClient} from '../ApiClient';
import {Profile} from './Profile';

/**
 * The Registration model module.
 * @module model/Registration
 * @version v1
 */
export class Registration {
  /**
   * Constructs a new <code>Registration</code>.
   * @alias module:model/Registration
   * @class
   * @param email {String} 
   * @param username {String} 
   * @param password {String} 
   */
  constructor(email, username, password) {
    this.email = email;
    this.username = username;
    this.password = password;
  }

  /**
   * Constructs a <code>Registration</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Registration} obj Optional instance to populate.
   * @return {module:model/Registration} The populated <code>Registration</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Registration();
      if (data.hasOwnProperty('email'))
        obj.email = ApiClient.convertToType(data['email'], 'String');
      if (data.hasOwnProperty('username'))
        obj.username = ApiClient.convertToType(data['username'], 'String');
      if (data.hasOwnProperty('password'))
        obj.password = ApiClient.convertToType(data['password'], 'String');
      if (data.hasOwnProperty('token'))
        obj.token = ApiClient.convertToType(data['token'], 'String');
      if (data.hasOwnProperty('profile'))
        obj.profile = Profile.constructFromObject(data['profile']);
    }
    return obj;
  }
}

/**
 * @member {String} email
 */
Registration.prototype.email = undefined;

/**
 * @member {String} username
 */
Registration.prototype.username = undefined;

/**
 * @member {String} password
 */
Registration.prototype.password = undefined;

/**
 * @member {String} token
 */
Registration.prototype.token = undefined;

/**
 * @member {module:model/Profile} profile
 */
Registration.prototype.profile = undefined;


