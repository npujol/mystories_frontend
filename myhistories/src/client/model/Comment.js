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
import {History} from './History';
import {Profile} from './Profile';

/**
 * The Comment model module.
 * @module model/Comment
 * @version v1
 */
export class Comment {
  /**
   * Constructs a new <code>Comment</code>.
   * @alias module:model/Comment
   * @class
   * @param body {String} 
   */
  constructor(body) {
    this.body = body;
  }

  /**
   * Constructs a <code>Comment</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Comment} obj Optional instance to populate.
   * @return {module:model/Comment} The populated <code>Comment</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Comment();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('author'))
        obj.author = Profile.constructFromObject(data['author']);
      if (data.hasOwnProperty('history'))
        obj.history = History.constructFromObject(data['history']);
      if (data.hasOwnProperty('body'))
        obj.body = ApiClient.convertToType(data['body'], 'String');
      if (data.hasOwnProperty('createdAt'))
        obj.createdAt = ApiClient.convertToType(data['createdAt'], 'String');
      if (data.hasOwnProperty('updatedAt'))
        obj.updatedAt = ApiClient.convertToType(data['updatedAt'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
Comment.prototype.id = undefined;

/**
 * @member {module:model/Profile} author
 */
Comment.prototype.author = undefined;

/**
 * @member {module:model/History} history
 */
Comment.prototype.history = undefined;

/**
 * @member {String} body
 */
Comment.prototype.body = undefined;

/**
 * @member {String} createdAt
 */
Comment.prototype.createdAt = undefined;

/**
 * @member {String} updatedAt
 */
Comment.prototype.updatedAt = undefined;


