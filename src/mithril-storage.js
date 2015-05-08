



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
      * The storage name
      */
      var storageName;

    /**
     * Constants used to set specific storage
     */
    mx.COOKIE_STORAGE      = "cookie";
    mx.LOCAL_STORAGE       = "local";
    mx.SESSION_STORAGE     = "session";
    mx.IN_MEMORY_STORAGE   = "in-memory";
    mx.DEFAULT_STORAGE     = "default";


    /**
    * Set the current storage
    * @param {string}
    */
    mx.storage = function( name ) {
        if( name ) {
            switch( name ) {
                case mx.COOKIE_STORAGE:
                    storage = new CookieStorage();
                    break;
                case mx.LOCAL_STORAGE:
                    storage = new LocalStorage();
                    break;
                case mx.SESSION_STORAGE:
                    storage = new SessionStorage();
                    break;
                case mx.IN_MEMORY_STORAGE:
                    storage = new InMemoryStorage();
                    break;
                case mx.DEFAULT_STORAGE:
                    $defaultStorage();
                    break;
                default:
                    throw new Error( name + ' is not a valid storage name.' );
            }
            storageName = name;
        } else {
            return storageName;
        }
    };

    /**
     * Get  the value from the store given a key
     * @param {string} key      a storage key
     */
    mx.storage.get = function( key ) {
        validators.string( key );
        return storage.get( key );
    };

    /**
     * Set a value from the store given a key
     * @param {string} key      a storage key
     * @param {object} value    the value to set
     */
    mx.storage.set = function( key , value ) {
        validators.string( key );
        return storage.set( key , value );
    };

    /**
     * Removes the key value from the store
     * @param {string} key      a storage key
     */
    mx.storage.remove = function( key ) {
        validators.string( key );
        storage.remove( key );
    };

    /**
     * Set the storage to the LocalStorage if exists
     * Otherwise set to the CookieStorage
     */
    function $defaultStorage() {
        if( LocalStorage.isAvailable() ) {
            storageName = mx.LOCAL_STORAGE;
            storage = new LocalStorage( );
        } else {
            storageName = mx.COOKIE_STORAGE;
            storage = new CookieStorage( );
        }
    }

    $defaultStorage();
