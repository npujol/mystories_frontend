/*
 * My histories API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1
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
import {History} from './History';

/**
 * The InlineResponse200 model module.
 * @module model/InlineResponse200
 * @version 1
 */
export class InlineResponse200 {
  /**
   * Constructs a new <code>InlineResponse200</code>.
   * @alias module:model/InlineResponse200
   * @class
   * @param count {Number} 
   * @param results {Array.<module:model/History>} 
   */
  constructor(count, results) {
    this.count = count;
    this.results = results;
  }

  /**
   * Constructs a <code>InlineResponse200</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/InlineResponse200} obj Optional instance to populate.
   * @return {module:model/InlineResponse200} The populated <code>InlineResponse200</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new InlineResponse200();
      if (data.hasOwnProperty('count'))
        obj.count = ApiClient.convertToType(data['count'], 'Number');
      if (data.hasOwnProperty('next'))
        obj.next = ApiClient.convertToType(data['next'], 'String');
      if (data.hasOwnProperty('previous'))
        obj.previous = ApiClient.convertToType(data['previous'], 'String');
      if (data.hasOwnProperty('results'))
        obj.results = ApiClient.convertToType(data['results'], [History]);
    }
    return obj;
  }
}

/**
 * @member {Number} count
 */
InlineResponse200.prototype.count = undefined;

/**
 * @member {String} next
 */
InlineResponse200.prototype.next = undefined;

/**
 * @member {String} previous
 */
InlineResponse200.prototype.previous = undefined;

/**
 * @member {Array.<module:model/History>} results
 */
InlineResponse200.prototype.results = undefined;


