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

import {ApiClient} from "../ApiClient";
import {InlineResponse200} from '../model/InlineResponse200';
import {Notification} from '../model/Notification';

/**
* Notifications service.
* @module api/NotificationsApi
* @version v1
*/
export class NotificationsApi {

    /**
    * Constructs a new NotificationsApi. 
    * @alias module:api/NotificationsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * Create a notification
     * @param {module:model/Notification} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Notification} and HTTP response
     */
    notificationsCreateWithHttpInfo(data) {
      let postBody = data;

      // verify the required parameter 'data' is set
      if (data === undefined || data === null) {
        throw new Error("Missing the required parameter 'data' when calling notificationsCreate");
      }


      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['api_key'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = Notification;

      return this.apiClient.callApi(
        '/notifications', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Create a notification
     * @param {module:model/Notification} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Notification}
     */
    notificationsCreate(data) {
      return this.notificationsCreateWithHttpInfo(data)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Delete a notification
     * @param {Number} id A unique integer value identifying this notification.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */
    notificationsDeleteWithHttpInfo(id) {
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling notificationsDelete");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['api_key'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = null;

      return this.apiClient.callApi(
        '/notifications/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Delete a notification
     * @param {Number} id A unique integer value identifying this notification.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */
    notificationsDelete(id) {
      return this.notificationsDeleteWithHttpInfo(id)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * List the notifications
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Number of results to return per page.
     * @param {Number} opts.offset The initial index from which to return the results.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/InlineResponse200} and HTTP response
     */
    notificationsListWithHttpInfo(opts) {
      opts = opts || {};
      let postBody = null;


      let pathParams = {
      };
      let queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['api_key'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = InlineResponse200;

      return this.apiClient.callApi(
        '/notifications', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * List the notifications
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Number of results to return per page.
     * @param {Number} opts.offset The initial index from which to return the results.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/InlineResponse200}
     */
    notificationsList(opts) {
      return this.notificationsListWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * General ViewSet description
     * @param {Number} id A unique integer value identifying this notification.
     * @param {module:model/Notification} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Notification} and HTTP response
     */
    notificationsOpenedStatusWithHttpInfo(id, data) {
      let postBody = data;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling notificationsOpenedStatus");
      }

      // verify the required parameter 'data' is set
      if (data === undefined || data === null) {
        throw new Error("Missing the required parameter 'data' when calling notificationsOpenedStatus");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['api_key'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = Notification;

      return this.apiClient.callApi(
        '/notifications/{id}/openedStatus', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * General ViewSet description
     * @param {Number} id A unique integer value identifying this notification.
     * @param {module:model/Notification} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Notification}
     */
    notificationsOpenedStatus(id, data) {
      return this.notificationsOpenedStatusWithHttpInfo(id, data)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Patch a notification
     * @param {Number} id A unique integer value identifying this notification.
     * @param {module:model/Notification} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Notification} and HTTP response
     */
    notificationsPartialUpdateWithHttpInfo(id, data) {
      let postBody = data;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling notificationsPartialUpdate");
      }

      // verify the required parameter 'data' is set
      if (data === undefined || data === null) {
        throw new Error("Missing the required parameter 'data' when calling notificationsPartialUpdate");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['api_key'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = Notification;

      return this.apiClient.callApi(
        '/notifications/{id}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Patch a notification
     * @param {Number} id A unique integer value identifying this notification.
     * @param {module:model/Notification} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Notification}
     */
    notificationsPartialUpdate(id, data) {
      return this.notificationsPartialUpdateWithHttpInfo(id, data)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Retrieve a notification
     * @param {Number} id A unique integer value identifying this notification.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Notification} and HTTP response
     */
    notificationsReadWithHttpInfo(id) {
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling notificationsRead");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['api_key'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = Notification;

      return this.apiClient.callApi(
        '/notifications/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Retrieve a notification
     * @param {Number} id A unique integer value identifying this notification.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Notification}
     */
    notificationsRead(id) {
      return this.notificationsReadWithHttpInfo(id)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Update a notification
     * @param {Number} id A unique integer value identifying this notification.
     * @param {module:model/Notification} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Notification} and HTTP response
     */
    notificationsUpdateWithHttpInfo(id, data) {
      let postBody = data;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling notificationsUpdate");
      }

      // verify the required parameter 'data' is set
      if (data === undefined || data === null) {
        throw new Error("Missing the required parameter 'data' when calling notificationsUpdate");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['api_key'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = Notification;

      return this.apiClient.callApi(
        '/notifications/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Update a notification
     * @param {Number} id A unique integer value identifying this notification.
     * @param {module:model/Notification} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Notification}
     */
    notificationsUpdate(id, data) {
      return this.notificationsUpdateWithHttpInfo(id, data)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
