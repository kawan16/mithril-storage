 /* global m */

(function( m ) {

    'use strict';


    /**
     * The number of days until the cookie should expire
     */
    var NB_EXPIRATION_DAYS = 10;

    /**
     * Default constructor of Cookie Store
     */
    function CookieStorage( ) {
        this.$storage = document.cookie = '';
    }


    /**
     * Stores the value for a given key
     * @param {string} key   a key
     * @param {object} value a value
     */
    CookieStorage.prototype.set = function ( key , value ) {
        var expiration = new Date();
        var stringifiedValue = JSON.stringify( value );
        expiration.setTime( expiration.getTime() + ( NB_EXPIRATION_DAYS * 24*60*60*1000 ) );
        var expires = 'expires='+expiration.toUTCString();
        document.cookie = key + '=' + stringifiedValue + '; ' + expires;
    };


    /**
     * Returns the value given a key
     * @param {string} key a key
     */
    CookieStorage.prototype.get = function ( key ) {
        var value = document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + key.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1");
        if( value ) {
            return JSON.parse( decodeURIComponent(value) );
        } else {
            return  "";
        }
    };

    /**
     * Removes the key from the store
     * @param {string} key a key
     */
    CookieStorage.prototype.remove = function ( key ) {
        var name = key + "=";
        var splitCookies =  this.$storage.split( ';' );
        for( var i=0; i < splitCookies.length; i++ ) {
            var cookie = splitCookies[ i ];
            while ( cookie.charAt( 0 ) == ' ' ) {
                cookie = cookie.substring( 1 );
            }
            if (cookie.indexOf( name ) == 0 ) {
                 var cookieIndex = this.$storage.indexOf( cookie );
                 this.$storage = this.$storage.slice( cookieIndex , cookieIndex + cookie.length );
            }
        }
        return "";
    };







    /**
     * Default constructor of in-memory Storage
     */
    function InMemoryStorage( ) {
        this.$storage = {};
    }

   /**
    * Stores the value for a given key
    * @param {string} key   a key
    * @param {object} value a value
    */
    InMemoryStorage.prototype.set = function ( key , value ) {
        this.$storage[ key ] = JSON.stringify( value );
    };


   /**
    * Returns the value given a key
    * @param {string} key a key
    */
    InMemoryStorage.prototype.get = function ( key ) {
        if( this.$storage[ key ] ) {
            return  JSON.parse( this.$storage[ key ] );
        }
        else {
            return undefined;
        }
    };

   /**
    * Removes the key from the store
    * @param {string} key a key
    */
    InMemoryStorage.prototype.remove = function ( key ) {
        delete this.$storage[ key ];
    };





    /**
     * Default constructor of Local Storage
     */
    function LocalStorage( ) {
        this.$storage = window.localStorage;
    }

   /**
    * Stores the value for a given key
    * @param {string} key   a key
    * @param {object} value a value
    */
    LocalStorage.prototype.set = function ( key , value ) {
        this.$storage.setItem( key , JSON.stringify( value ) );
    };


   /**
    * Returns the value given a key
    * @param {string} key a key
    */
    LocalStorage.prototype.get = function ( key ) {
        return  JSON.parse( this.$storage.getItem( key ) );
    };

   /**
    * Removes the key from the store
    * @param {string} key a key
    */
    LocalStorage.prototype.remove = function ( key ) {
        this.$storage.removeItem( key );
    };


    /**
     * Returns true if the current browser has a localStorage
     */
    LocalStorage.isAvailable = function( ) {
        return !!window.localStorage;
    }



    /**
     * Default constructor of Cookie Store
     */
    function SessionStorage( ) {
         this.$storage = window.sessionStorage;
    }

    /**
     * Stores the value for a given key
     * @param {string} key   a key
     * @param {object} value a value
     */
    SessionStorage.prototype.set = function ( key , value ) {
         this.$storage.setItem( key , JSON.stringify( value ) );
    };


    /**
     * Returns the value given a key
     * @param {string} key a key
     */
    SessionStorage.prototype.get = function ( key ) {
         return JSON.parse( this.$storage.getItem( key ) );
    };

    /**
     * Removes the key from the store
     * @param {string} key a key
     */
    SessionStorage.prototype.remove = function ( key ) {
        this.$storage.removeItem( key );
    };

    /**
     * Returns true if the current browser has a sessionStorage
     */
    SessionStorage.isAvailable = function( ) {
    return !!window.sessionStorage;
    }





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

}( m ));