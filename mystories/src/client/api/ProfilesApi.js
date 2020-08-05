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

import {ApiClient} from "../ApiClient";
import {Profile} from '../model/Profile';

/**
* Profiles service.
* @module api/ProfilesApi
* @version v1
*/
export class ProfilesApi {

    /**
    * Constructs a new ProfilesApi. 
    * @alias module:api/ProfilesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * General description. It need a username.
     * @param {String} userUsername 
     * @param {Object} opts Optional parameters
     * @param {String} opts.bio 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Profile} and HTTP response
     */
    profilesChangeImageWithHttpInfo(userUsername, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'userUsername' is set
      if (userUsername === undefined || userUsername === null) {
        throw new Error("Missing the required parameter 'userUsername' when calling profilesChangeImage");
      }


      let pathParams = {
        'user__username': userUsername
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'bio': opts['bio']
      };

      let authNames = ['api_key'];
      let contentTypes = ['multipart/form-data', 'application/x-www-form-urlencoded'];
      let accepts = ['application/json'];
      let returnType = Profile;

      return this.apiClient.callApi(
        '/profiles/{user__username}/change_image', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * General description. It need a username.
     * @param {String} userUsername 
     * @param {Object} opts Optional parameters
     * @param {String} opts.bio 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Profile}
     */
    profilesChangeImage(userUsername, opts) {
      return this.profilesChangeImageWithHttpInfo(userUsername, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * General description. It need a username.
     * @param {String} userUsername 
     * @param {module:model/Profile} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Profile} and HTTP response
     */
    profilesFollowProfileWithHttpInfo(userUsername, data) {
      let postBody = data;

      // verify the required parameter 'userUsername' is set
      if (userUsername === undefined || userUsername === null) {
        throw new Error("Missing the required parameter 'userUsername' when calling profilesFollowProfile");
      }

      // verify the required parameter 'data' is set
      if (data === undefined || data === null) {
        throw new Error("Missing the required parameter 'data' when calling profilesFollowProfile");
      }


      let pathParams = {
        'user__username': userUsername
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
      let returnType = Profile;

      return this.apiClient.callApi(
        '/profiles/{user__username}/follow_profile', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * General description. It need a username.
     * @param {String} userUsername 
     * @param {module:model/Profile} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Profile}
     */
    profilesFollowProfile(userUsername, data) {
      return this.profilesFollowProfileWithHttpInfo(userUsername, data)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Partial update for a profile
     * @param {String} userUsername 
     * @param {module:model/Profile} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Profile} and HTTP response
     */
    profilesPartialUpdateWithHttpInfo(userUsername, data) {
      let postBody = data;

      // verify the required parameter 'userUsername' is set
      if (userUsername === undefined || userUsername === null) {
        throw new Error("Missing the required parameter 'userUsername' when calling profilesPartialUpdate");
      }

      // verify the required parameter 'data' is set
      if (data === undefined || data === null) {
        throw new Error("Missing the required parameter 'data' when calling profilesPartialUpdate");
      }


      let pathParams = {
        'user__username': userUsername
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
      let returnType = Profile;

      return this.apiClient.callApi(
        '/profiles/{user__username}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Partial update for a profile
     * @param {String} userUsername 
     * @param {module:model/Profile} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Profile}
     */
    profilesPartialUpdate(userUsername, data) {
      return this.profilesPartialUpdateWithHttpInfo(userUsername, data)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Retrieve a profile
     * @param {String} userUsername 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Profile} and HTTP response
     */
    profilesReadWithHttpInfo(userUsername) {
      let postBody = null;

      // verify the required parameter 'userUsername' is set
      if (userUsername === undefined || userUsername === null) {
        throw new Error("Missing the required parameter 'userUsername' when calling profilesRead");
      }


      let pathParams = {
        'user__username': userUsername
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
      let returnType = Profile;

      return this.apiClient.callApi(
        '/profiles/{user__username}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Retrieve a profile
     * @param {String} userUsername 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Profile}
     */
    profilesRead(userUsername) {
      return this.profilesReadWithHttpInfo(userUsername)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * General description. It need a username.
     * @param {String} userUsername 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */
    profilesUnfollowProfileWithHttpInfo(userUsername) {
      let postBody = null;

      // verify the required parameter 'userUsername' is set
      if (userUsername === undefined || userUsername === null) {
        throw new Error("Missing the required parameter 'userUsername' when calling profilesUnfollowProfile");
      }


      let pathParams = {
        'user__username': userUsername
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
        '/profiles/{user__username}/unfollow_profile', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * General description. It need a username.
     * @param {String} userUsername 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */
    profilesUnfollowProfile(userUsername) {
      return this.profilesUnfollowProfileWithHttpInfo(userUsername)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Update a profile
     * @param {String} userUsername 
     * @param {module:model/Profile} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Profile} and HTTP response
     */
    profilesUpdateWithHttpInfo(userUsername, data) {
      let postBody = data;

      // verify the required parameter 'userUsername' is set
      if (userUsername === undefined || userUsername === null) {
        throw new Error("Missing the required parameter 'userUsername' when calling profilesUpdate");
      }

      // verify the required parameter 'data' is set
      if (data === undefined || data === null) {
        throw new Error("Missing the required parameter 'data' when calling profilesUpdate");
      }


      let pathParams = {
        'user__username': userUsername
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
      let returnType = Profile;

      return this.apiClient.callApi(
        '/profiles/{user__username}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Update a profile
     * @param {String} userUsername 
     * @param {module:model/Profile} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Profile}
     */
    profilesUpdate(userUsername, data) {
      return this.profilesUpdateWithHttpInfo(userUsername, data)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}