
/* global describe, it, expect */


m.deps( mock.window );


/* Storage configuration method tests */
describe('mx.storage()' , function() {

    it( 'should be a function' , function() {
        expect( typeof mx.storage ).toBe( 'function' );
    });

    it( 'should set up to a cookie storage' , function( ) {
        mx.storage( mx.DEFAULT_STORAGE_NAME , mx.COOKIE_STORAGE );
        expect( mx.storage().constructor.name ).toBe( 'CookieStorage' );
    });

    it( 'should set up to a local storage' , function( ) {
        mx.storage( mx.DEFAULT_STORAGE_NAME  , mx.LOCAL_STORAGE );
        expect( mx.storage().constructor.name ).toBe( 'LocalStorage' );
    });

    it( 'should set up to a session storage' , function( ) {
        mx.storage( mx.DEFAULT_STORAGE_NAME  , mx.SESSION_STORAGE );
        expect( mx.storage().constructor.name ).toBe( 'SessionStorage' );
    });

    it( 'should set up to an in-memory storage' , function( ) {
        mx.storage( mx.DEFAULT_STORAGE_NAME  , mx.IN_MEMORY_STORAGE );
        expect( mx.storage().constructor.name ).toBe( 'InMemoryStorage' );
    });

    it( 'should set up to a default storage' , function( ) {
        mx.storage( mx.DEFAULT_STORAGE_NAME , mx.DEFAULT_STORAGE );
        var constructorName = mx.storage().constructor.name;
        expect(  constructorName === 'CookieStorage' || constructorName === 'LocalStorage'  ).toBeTruthy();
    });

    describe( 'with name' , function( ) {

        it( 'should set up several labeled storages' , function( ) {
            var storageName1 = 'myStorage1',
                storageName2 = 'myStorage2',
                storageName3 = 'myStorage3';

            mx.storage( storageName1 , mx.IN_MEMORY_STORAGE );
            mx.storage( storageName2 , mx.COOKIE_STORAGE );
            mx.storage( storageName3 , mx.SESSION_STORAGE );

            expect( mx.storage( storageName1 )).toBeDefined();
            expect( mx.storage( storageName1 ).constructor.name).toBe( 'InMemoryStorage' );
            expect( mx.storage( storageName2 )).toBeDefined();
            expect( mx.storage( storageName2 ).constructor.name).toBe( 'CookieStorage' );
            expect( mx.storage( storageName3 )).toBeDefined();
            expect( mx.storage( storageName3 ).constructor.name).toBe( 'SessionStorage' );
        });

    });

});

/* Storage method tests */
describe('mx.storage().get() / mx.storage().set() / mx.storage().remove()' , function() {

    function testStorageMethods( storageType ) {

        mx.storage( mx.DEFAULT_STORAGE_NAME , storageType );

        it( 'should store and get a string value given a key' , function( ) {
            var key = 'user' , value = 'Toto';
            mx.storage().set( key , value );
            expect( mx.storage().get( key ) ).toEqual( value );
        });

        it( 'should store and get a number value given a key' , function( ) {
            var key = 'number' , value = 42;
            mx.storage().set( key , value );
            expect( mx.storage().get( key ) ).toEqual( value );
        });

        it( 'should store and get an object value given a key' , function( ) {
            var key = 'document' , value = { title: 'A title ' , content: 'Some content ' };
            mx.storage().set( key , value );
            expect( mx.storage().get( key ) ).toEqual( value );
        });

        it( 'should remove an existing key/value given a key' , function( ) {
            var key = 'user' , value = 'Toto';
            mx.storage().set( key , value );
            mx.storage().remove( key );
            expect( mx.storage().get( key ) ).toBe( null );
        });

    }

    describe( 'using default storage ( localstorage or cookie ) ' , function( ) {
        testStorageMethods( mx.DEFAULT_STORAGE );
    });

    describe( 'using cookie storage' , function( ) {
        testStorageMethods( mx.COOKIE_STORAGE );
    });

    describe( 'using in-memory storage' , function( ) {
        testStorageMethods( mx.IN_MEMORY_STORAGE );
    });

    if( !!window.localStorage) {
        describe( 'using local storage' , function( ) {
            testStorageMethods( mx.LOCAL_STORAGE );
        });
    }

    if( !!window.sessionStorage) {
        describe( 'using session storage' , function( ) {
            testStorageMethods( mx.SESSION_STORAGE);
        });
    }

});

