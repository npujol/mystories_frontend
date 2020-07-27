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
import {Comment} from './Comment';

/**
 * The InlineResponse2002 model module.
 * @module model/InlineResponse2002
 * @version v1
 */
export class InlineResponse2002 {
  /**
   * Constructs a new <code>InlineResponse2002</code>.
   * @alias module:model/InlineResponse2002
   * @class
   * @param count {Number} 
   * @param results {Array.<module:model/Comment>} 
   */
  constructor(count, results) {
    this.count = count;
    this.results = results;
  }

  /**
   * Constructs a <code>InlineResponse2002</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/InlineResponse2002} obj Optional instance to populate.
   * @return {module:model/InlineResponse2002} The populated <code>InlineResponse2002</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new InlineResponse2002();
      if (data.hasOwnProperty('count'))
        obj.count = ApiClient.convertToType(data['count'], 'Number');
      if (data.hasOwnProperty('next'))
        obj.next = ApiClient.convertToType(data['next'], 'String');
      if (data.hasOwnProperty('previous'))
        obj.previous = ApiClient.convertToType(data['previous'], 'String');
      if (data.hasOwnProperty('results'))
        obj.results = ApiClient.convertToType(data['results'], [Comment]);
    }
    return obj;
  }
}

/**
 * @member {Number} count
 */
InlineResponse2002.prototype.count = undefined;

/**
 * @member {String} next
 */
InlineResponse2002.prototype.next = undefined;

/**
 * @member {String} previous
 */
InlineResponse2002.prototype.previous = undefined;

/**
 * @member {Array.<module:model/Comment>} results
 */
InlineResponse2002.prototype.results = undefined;


