
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




