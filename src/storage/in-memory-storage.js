

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


