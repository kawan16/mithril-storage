




    'use strict';

    window.mx = window.mx ||  {};

    /*
     * Validators for router function
     */
    var validators = {
        /**
         * Check whether the given parameter is a string
         * @param {String} string
         * @returns {String} value
         * @throws {TypeError} for non strings
         */
        string : function(string){
            if(typeof string !== 'string'){
                throw new TypeError('a string is expected, but ' + string + ' [' + (typeof string) + '] given');
            }
            return string;
        },

        /**
         * Check whether the given parameter is a plain object (array and functions aren't accepted)
         * @param {Object} object
         * @returns {Object} object
         * @throws {TypeError} for non object
         */
        plainObject : function(object){
            if(typeof object !== 'object' ){
                throw new TypeError('an object is expected, but ' + object + '  [' + (typeof object) + '] given');
            }
            return object;
        }
    };

    /**
     * The storage
     */
     var storage;

    /**
     * Get / Set the value from the store given a key
     * @param {string} key      a storage key
     * @param {object} value    a value to store
     */
    mx.store = function( key , value ) {
        validators.string( key );
        if( value ) {
            return storage.get( key );
        } else {
            storage.set( key , value );
        }
    };

    /* Default storage */

    /**
     * Set the storage to the LocalStorage if exists
     * Otherwise set to the CookieStorage
     */
    function $defaultStorage() {
        console.log( LocalStorage.isAvailable() );
        if( LocalStorage.isAvailable() ) {
            storage = new LocalStorage( );
        } else {
            storage = new CookieStorage( );
        }
    }

    $defaultStorage();
