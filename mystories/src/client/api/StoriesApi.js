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
import {Comment} from '../model/Comment';
import {InlineResponse2001} from '../model/InlineResponse2001';
import {InlineResponse2002} from '../model/InlineResponse2002';
import {Speech} from '../model/Speech';
import {Story} from '../model/Story';
import {StoryImage} from '../model/StoryImage';
import {StoryPrivate} from '../model/StoryPrivate';

/**
* Stories service.
* @module api/StoriesApi
* @version v1
*/
export class StoriesApi {

    /**
    * Constructs a new StoriesApi. 
    * @alias module:api/StoriesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * General ViewSet description
     * @param {String} slug 
     * @param {String} bodyMarkdown 
     * @param {File} image 
     * @param {Array.<String>} tags 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/StoryImage} and HTTP response
     */
    storiesChangeImageWithHttpInfo(slug, bodyMarkdown, image, tags) {
      let postBody = null;

      // verify the required parameter 'slug' is set
      if (slug === undefined || slug === null) {
        throw new Error("Missing the required parameter 'slug' when calling storiesChangeImage");
      }

      // verify the required parameter 'bodyMarkdown' is set
      if (bodyMarkdown === undefined || bodyMarkdown === null) {
        throw new Error("Missing the required parameter 'bodyMarkdown' when calling storiesChangeImage");
      }

      // verify the required parameter 'image' is set
      if (image === undefined || image === null) {
        throw new Error("Missing the required parameter 'image' when calling storiesChangeImage");
      }

      // verify the required parameter 'tags' is set
      if (tags === undefined || tags === null) {
        throw new Error("Missing the required parameter 'tags' when calling storiesChangeImage");
      }


      let pathParams = {
        'slug': slug
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'body_markdown': bodyMarkdown,
        'image': image,
        'tags': this.apiClient.buildCollectionParam(tags, 'multi')
      };

      let authNames = ['api_key'];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = StoryImage;

      return this.apiClient.callApi(
        '/stories/{slug}/change_image', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * General ViewSet description
     * @param {String} slug 
     * @param {String} bodyMarkdown 
     * @param {File} image 
     * @param {Array.<String>} tags 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/StoryImage}
     */
    storiesChangeImage(slug, bodyMarkdown, image, tags) {
      return this.storiesChangeImageWithHttpInfo(slug, bodyMarkdown, image, tags)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Create a comment
     * @param {String} storySlug 
     * @param {module:model/Comment} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Comment} and HTTP response
     */
    storiesCommentsCreateWithHttpInfo(storySlug, data) {
      let postBody = data;

      // verify the required parameter 'storySlug' is set
      if (storySlug === undefined || storySlug === null) {
        throw new Error("Missing the required parameter 'storySlug' when calling storiesCommentsCreate");
      }

      // verify the required parameter 'data' is set
      if (data === undefined || data === null) {
        throw new Error("Missing the required parameter 'data' when calling storiesCommentsCreate");
      }


      let pathParams = {
        'story_slug': storySlug
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
      let returnType = Comment;

      return this.apiClient.callApi(
        '/stories/{story_slug}/comments', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Create a comment
     * @param {String} storySlug 
     * @param {module:model/Comment} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Comment}
     */
    storiesCommentsCreate(storySlug, data) {
      return this.storiesCommentsCreateWithHttpInfo(storySlug, data)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Delete a comment
     * @param {Number} id A unique integer value identifying this comment.
     * @param {String} storySlug 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */
    storiesCommentsDeleteWithHttpInfo(id, storySlug) {
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling storiesCommentsDelete");
      }

      // verify the required parameter 'storySlug' is set
      if (storySlug === undefined || storySlug === null) {
        throw new Error("Missing the required parameter 'storySlug' when calling storiesCommentsDelete");
      }


      let pathParams = {
        'id': id,
        'story_slug': storySlug
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
        '/stories/{story_slug}/comments/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Delete a comment
     * @param {Number} id A unique integer value identifying this comment.
     * @param {String} storySlug 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */
    storiesCommentsDelete(id, storySlug) {
      return this.storiesCommentsDeleteWithHttpInfo(id, storySlug)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * List of comments
     * @param {String} storySlug 
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Number of results to return per page.
     * @param {Number} opts.offset The initial index from which to return the results.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/InlineResponse2002} and HTTP response
     */
    storiesCommentsListWithHttpInfo(storySlug, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'storySlug' is set
      if (storySlug === undefined || storySlug === null) {
        throw new Error("Missing the required parameter 'storySlug' when calling storiesCommentsList");
      }


      let pathParams = {
        'story_slug': storySlug
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
      let returnType = InlineResponse2002;

      return this.apiClient.callApi(
        '/stories/{story_slug}/comments', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * List of comments
     * @param {String} storySlug 
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Number of results to return per page.
     * @param {Number} opts.offset The initial index from which to return the results.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/InlineResponse2002}
     */
    storiesCommentsList(storySlug, opts) {
      return this.storiesCommentsListWithHttpInfo(storySlug, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Retrieve a comment
     * @param {Number} id A unique integer value identifying this comment.
     * @param {String} storySlug 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Comment} and HTTP response
     */
    storiesCommentsReadWithHttpInfo(id, storySlug) {
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling storiesCommentsRead");
      }

      // verify the required parameter 'storySlug' is set
      if (storySlug === undefined || storySlug === null) {
        throw new Error("Missing the required parameter 'storySlug' when calling storiesCommentsRead");
      }


      let pathParams = {
        'id': id,
        'story_slug': storySlug
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
      let returnType = Comment;

      return this.apiClient.callApi(
        '/stories/{story_slug}/comments/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Retrieve a comment
     * @param {Number} id A unique integer value identifying this comment.
     * @param {String} storySlug 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Comment}
     */
    storiesCommentsRead(id, storySlug) {
      return this.storiesCommentsReadWithHttpInfo(id, storySlug)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Create a story
     * @param {module:model/Story} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Story} and HTTP response
     */
    storiesCreateWithHttpInfo(data) {
      let postBody = data;

      // verify the required parameter 'data' is set
      if (data === undefined || data === null) {
        throw new Error("Missing the required parameter 'data' when calling storiesCreate");
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
      let returnType = Story;

      return this.apiClient.callApi(
        '/stories', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Create a story
     * @param {module:model/Story} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Story}
     */
    storiesCreate(data) {
      return this.storiesCreateWithHttpInfo(data)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Delete a story
     * @param {String} slug 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */
    storiesDeleteWithHttpInfo(slug) {
      let postBody = null;

      // verify the required parameter 'slug' is set
      if (slug === undefined || slug === null) {
        throw new Error("Missing the required parameter 'slug' when calling storiesDelete");
      }


      let pathParams = {
        'slug': slug
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
        '/stories/{slug}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Delete a story
     * @param {String} slug 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */
    storiesDelete(slug) {
      return this.storiesDeleteWithHttpInfo(slug)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * General ViewSet description
     * @param {String} slug 
     * @param {module:model/Story} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Story} and HTTP response
     */
    storiesFavoriteWithHttpInfo(slug, data) {
      let postBody = data;

      // verify the required parameter 'slug' is set
      if (slug === undefined || slug === null) {
        throw new Error("Missing the required parameter 'slug' when calling storiesFavorite");
      }

      // verify the required parameter 'data' is set
      if (data === undefined || data === null) {
        throw new Error("Missing the required parameter 'data' when calling storiesFavorite");
      }


      let pathParams = {
        'slug': slug
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
      let returnType = Story;

      return this.apiClient.callApi(
        '/stories/{slug}/favorite', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * General ViewSet description
     * @param {String} slug 
     * @param {module:model/Story} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Story}
     */
    storiesFavorite(slug, data) {
      return this.storiesFavoriteWithHttpInfo(slug, data)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * General ViewSet description
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Number of results to return per page.
     * @param {Number} opts.offset The initial index from which to return the results.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/InlineResponse2001} and HTTP response
     */
    storiesFeedListWithHttpInfo(opts) {
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
      let returnType = InlineResponse2001;

      return this.apiClient.callApi(
        '/stories/feed/', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * General ViewSet description
     * @param {Object} opts Optional parameters
     * @param {Number} opts.limit Number of results to return per page.
     * @param {Number} opts.offset The initial index from which to return the results.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/InlineResponse2001}
     */
    storiesFeedList(opts) {
      return this.storiesFeedListWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * General ViewSet description
     * @param {String} slug 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Speech} and HTTP response
     */
    storiesGetAudioWithHttpInfo(slug) {
      let postBody = null;

      // verify the required parameter 'slug' is set
      if (slug === undefined || slug === null) {
        throw new Error("Missing the required parameter 'slug' when calling storiesGetAudio");
      }


      let pathParams = {
        'slug': slug
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
      let returnType = Speech;

      return this.apiClient.callApi(
        '/stories/{slug}/get_audio', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * General ViewSet description
     * @param {String} slug 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Speech}
     */
    storiesGetAudio(slug) {
      return this.storiesGetAudioWithHttpInfo(slug)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * General ViewSet description
     * @param {String} slug 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/StoryPrivate} and HTTP response
     */
    storiesGetBodyMarkdownWithHttpInfo(slug) {
      let postBody = null;

      // verify the required parameter 'slug' is set
      if (slug === undefined || slug === null) {
        throw new Error("Missing the required parameter 'slug' when calling storiesGetBodyMarkdown");
      }


      let pathParams = {
        'slug': slug
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
      let returnType = StoryPrivate;

      return this.apiClient.callApi(
        '/stories/{slug}/get_body_markdown', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * General ViewSet description
     * @param {String} slug 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/StoryPrivate}
     */
    storiesGetBodyMarkdown(slug) {
      return this.storiesGetBodyMarkdownWithHttpInfo(slug)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * List the stories
     * @param {Object} opts Optional parameters
     * @param {String} opts.tagsTag 
     * @param {String} opts.ownerUserUsername 
     * @param {String} opts.favoritedByUserUsername 
     * @param {Number} opts.limit Number of results to return per page.
     * @param {Number} opts.offset The initial index from which to return the results.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/InlineResponse2001} and HTTP response
     */
    storiesListWithHttpInfo(opts) {
      opts = opts || {};
      let postBody = null;


      let pathParams = {
      };
      let queryParams = {
        'tags__tag': opts['tagsTag'],
        'owner__user__username': opts['ownerUserUsername'],
        'favorited_by__user__username': opts['favoritedByUserUsername'],
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
      let returnType = InlineResponse2001;

      return this.apiClient.callApi(
        '/stories', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * List the stories
     * @param {Object} opts Optional parameters
     * @param {String} opts.tagsTag 
     * @param {String} opts.ownerUserUsername 
     * @param {String} opts.favoritedByUserUsername 
     * @param {Number} opts.limit Number of results to return per page.
     * @param {Number} opts.offset The initial index from which to return the results.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/InlineResponse2001}
     */
    storiesList(opts) {
      return this.storiesListWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * General ViewSet description
     * @param {String} slug 
     * @param {module:model/Speech} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Speech} and HTTP response
     */
    storiesMakeAudioWithHttpInfo(slug, data) {
      let postBody = data;

      // verify the required parameter 'slug' is set
      if (slug === undefined || slug === null) {
        throw new Error("Missing the required parameter 'slug' when calling storiesMakeAudio");
      }

      // verify the required parameter 'data' is set
      if (data === undefined || data === null) {
        throw new Error("Missing the required parameter 'data' when calling storiesMakeAudio");
      }


      let pathParams = {
        'slug': slug
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
      let returnType = Speech;

      return this.apiClient.callApi(
        '/stories/{slug}/make_audio', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * General ViewSet description
     * @param {String} slug 
     * @param {module:model/Speech} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Speech}
     */
    storiesMakeAudio(slug, data) {
      return this.storiesMakeAudioWithHttpInfo(slug, data)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Patch a story
     * @param {String} slug 
     * @param {module:model/Story} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Story} and HTTP response
     */
    storiesPartialUpdateWithHttpInfo(slug, data) {
      let postBody = data;

      // verify the required parameter 'slug' is set
      if (slug === undefined || slug === null) {
        throw new Error("Missing the required parameter 'slug' when calling storiesPartialUpdate");
      }

      // verify the required parameter 'data' is set
      if (data === undefined || data === null) {
        throw new Error("Missing the required parameter 'data' when calling storiesPartialUpdate");
      }


      let pathParams = {
        'slug': slug
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
      let returnType = Story;

      return this.apiClient.callApi(
        '/stories/{slug}', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Patch a story
     * @param {String} slug 
     * @param {module:model/Story} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Story}
     */
    storiesPartialUpdate(slug, data) {
      return this.storiesPartialUpdateWithHttpInfo(slug, data)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Retrieve a story
     * @param {String} slug 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Story} and HTTP response
     */
    storiesReadWithHttpInfo(slug) {
      let postBody = null;

      // verify the required parameter 'slug' is set
      if (slug === undefined || slug === null) {
        throw new Error("Missing the required parameter 'slug' when calling storiesRead");
      }


      let pathParams = {
        'slug': slug
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
      let returnType = Story;

      return this.apiClient.callApi(
        '/stories/{slug}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Retrieve a story
     * @param {String} slug 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Story}
     */
    storiesRead(slug) {
      return this.storiesReadWithHttpInfo(slug)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * General ViewSet description
     * @param {String} slug 
     * @param {module:model/Story} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Story} and HTTP response
     */
    storiesUnfavoriteWithHttpInfo(slug, data) {
      let postBody = data;

      // verify the required parameter 'slug' is set
      if (slug === undefined || slug === null) {
        throw new Error("Missing the required parameter 'slug' when calling storiesUnfavorite");
      }

      // verify the required parameter 'data' is set
      if (data === undefined || data === null) {
        throw new Error("Missing the required parameter 'data' when calling storiesUnfavorite");
      }


      let pathParams = {
        'slug': slug
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
      let returnType = Story;

      return this.apiClient.callApi(
        '/stories/{slug}/unfavorite', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * General ViewSet description
     * @param {String} slug 
     * @param {module:model/Story} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Story}
     */
    storiesUnfavorite(slug, data) {
      return this.storiesUnfavoriteWithHttpInfo(slug, data)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Update a story
     * @param {String} slug 
     * @param {module:model/Story} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Story} and HTTP response
     */
    storiesUpdateWithHttpInfo(slug, data) {
      let postBody = data;

      // verify the required parameter 'slug' is set
      if (slug === undefined || slug === null) {
        throw new Error("Missing the required parameter 'slug' when calling storiesUpdate");
      }

      // verify the required parameter 'data' is set
      if (data === undefined || data === null) {
        throw new Error("Missing the required parameter 'data' when calling storiesUpdate");
      }


      let pathParams = {
        'slug': slug
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
      let returnType = Story;

      return this.apiClient.callApi(
        '/stories/{slug}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Update a story
     * @param {String} slug 
     * @param {module:model/Story} data 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Story}
     */
    storiesUpdate(slug, data) {
      return this.storiesUpdateWithHttpInfo(slug, data)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
