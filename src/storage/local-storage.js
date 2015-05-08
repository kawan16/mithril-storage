

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
