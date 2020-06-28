/*
 * Snippets API
 * Test description
 *
 * OpenAPI spec version: v1
 * Contact: contact@snippets.local
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.13
 *
 * Do not edit the class manually.
 *
 */

import {ApiClient} from '../ApiClient';

/**
 * The Profile model module.
 * @module model/Profile
 * @version v1
 */
export class Profile {
  /**
   * Constructs a new <code>Profile</code>.
   * @alias module:model/Profile
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>Profile</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Profile} obj Optional instance to populate.
   * @return {module:model/Profile} The populated <code>Profile</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Profile();
      if (data.hasOwnProperty('username'))
        obj.username = ApiClient.convertToType(data['username'], 'String');
      if (data.hasOwnProperty('bio'))
        obj.bio = ApiClient.convertToType(data['bio'], 'String');
      if (data.hasOwnProperty('image'))
        obj.image = ApiClient.convertToType(data['image'], 'String');
      if (data.hasOwnProperty('following'))
        obj.following = ApiClient.convertToType(data['following'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} username
 */
Profile.prototype.username = undefined;

/**
 * @member {String} bio
 */
Profile.prototype.bio = undefined;

/**
 * @member {String} image
 */
Profile.prototype.image = undefined;

/**
 * @member {String} following
 */
Profile.prototype.following = undefined;


