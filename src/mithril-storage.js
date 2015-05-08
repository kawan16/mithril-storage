

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
     * The set of storages
     */
     var storages = {};

    /**
     * Constants used to set specific storage type
     */
    mx.COOKIE_STORAGE      = "cookie";
    mx.LOCAL_STORAGE       = "local";
    mx.SESSION_STORAGE     = "session";
    mx.IN_MEMORY_STORAGE   = "in-memory";
    mx.DEFAULT_STORAGE     = "default";

    /**
     * Constant as default storage index
     */
    mx.DEFAULT_STORAGE_NAME = 'default';


    /**
    * Set the current or namespaced  storage of given type
    * @param {string} namespace The storage namespace
    * @param
    */
    mx.storage = function( name , type ) {
        var storage;
        if( type ) {
            switch( type ) {
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
                    console.log( ' default ');
                    storage = $defaultStorage();
                    break;
                default:
                    throw new Error( type + ' is not a valid storage type.' );
            }
            storages[ name || mx.DEFAULT_STORAGE_NAME ] = storage;
        }
        return storages[ name || mx.DEFAULT_STORAGE_NAME ];
    };

    /**
     * Set the storage to the LocalStorage if exists
     * Otherwise set to the CookieStorage
     */
    function $defaultStorage() {
        if( LocalStorage.isAvailable() ) {
            return storages[ mx.DEFAULT_STORAGE_NAME ] = new LocalStorage( );
        } else {
            return storages[ mx.DEFAULT_STORAGE_NAME ] = new CookieStorage( );
        }
    }
    $defaultStorage();
