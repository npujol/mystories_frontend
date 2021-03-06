/*
 * My stories API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.16
 *
 * Do not edit the class manually.
 *
 */

import {ApiClient} from '../ApiClient';

/**
 * The Tag model module.
 * @module model/Tag
 * @version v1
 */
export class Tag {
  /**
   * Constructs a new <code>Tag</code>.
   * @alias module:model/Tag
   * @class
   * @param tag {String} 
   */
  constructor(tag) {
    this.tag = tag;
  }

  /**
   * Constructs a <code>Tag</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Tag} obj Optional instance to populate.
   * @return {module:model/Tag} The populated <code>Tag</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Tag();
      if (data.hasOwnProperty('tag'))
        obj.tag = ApiClient.convertToType(data['tag'], 'String');
      if (data.hasOwnProperty('pk'))
        obj.pk = ApiClient.convertToType(data['pk'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {String} tag
 */
Tag.prototype.tag = undefined;

/**
 * @member {Number} pk
 */
Tag.prototype.pk = undefined;


