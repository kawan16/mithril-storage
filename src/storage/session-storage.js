

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


