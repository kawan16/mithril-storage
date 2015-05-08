
/* global describe, it, expect */


m.deps( mock.window );


/* Store method tests */
describe('mx.storage()' , function() {

    it( 'should be a function' , function() {
        expect( typeof mx.storage ).toBe( 'function' );
    });

    it( 'should set up to a cookie storage' , function( ) {
        mx.storage( mx.COOKIE_STORAGE );
        expect( mx.storage() ).toBe( mx.COOKIE_STORAGE );
    });

    it( 'should set up to a local storage' , function( ) {
        mx.storage( mx.LOCAL_STORAGE );
        expect( mx.storage() ).toBe( mx.LOCAL_STORAGE );
    });

    it( 'should set up to a session storage' , function( ) {
        mx.storage( mx.SESSION_STORAGE );
        expect( mx.storage() ).toBe( mx.SESSION_STORAGE );
    });

    it( 'should set up to a default storage' , function( ) {
        mx.storage( mx.DEFAULT_STORAGE );
        expect( mx.storage() ).toBe( mx.DEFAULT_STORAGE );
    });


});

/* Store method tests */
describe('mx.store()' , function() {

    it( 'should be a function' , function() {
        expect( typeof mx.store ).toBe( 'function' );
    });

    it( 'should accept a string as first parameter' , function( ) {
        var call = function( _key_ ) { return function() { mx.store( _key_ , {} ) } };
        expect( call( { an: 'object' } ) ).toThrowError( TypeError );
        expect( call( 156 ) ).toThrowError( TypeError );
    });

    describe( 'using default storage ( localstorage or cookie ) ' , function( ) {

        mx.storage( mx.DEFAULT_STORAGE );

        it( 'should store and get a string value given a key' , function( ) {
            var key = 'user' , value = 'Toto';
            mx.store( key , value );
            expect( mx.store( key ) ).toEqual( value );
        });

        it( 'should store and get a number value given a key' , function( ) {
            var key = 'number' , value = 42;
            mx.store( key , value );
            expect( mx.store( key ) ).toEqual( value );
        });

        it( 'should store and get an object value given a key' , function( ) {
            var key = 'document' , value = { title: 'A title ' , content: 'Some content ' };
            mx.store( key , value );
            expect( mx.store( key ) ).toEqual( value );
        });

        it( 'should remove an existing key/value given a key' , function( ) {
            var key = 'user' , value = 'Toto';
            mx.store( key , value );
            mx.store.remove( key );
            expect( mx.store( key ) ).toBe( null );
        });

    });

    describe( 'using cookie storage' , function( ) {

        mx.storage( mx.COOKIE_STORAGE );

        it( 'should store and get a string value given a key' , function( ) {
            var key = 'user' , value = 'Toto';
            mx.store( key , value );
            expect( mx.store( key ) ).toEqual( value );
        });

        it( 'should store and get a number value given a key' , function( ) {
            var key = 'number' , value = 42;
            mx.store( key , value );
            expect( mx.store( key ) ).toEqual( value );
        });

        it( 'should store and get an object value given a key' , function( ) {
            var key = 'document' , value = { title: 'A title ' , content: 'Some content ' };
            mx.store( key , value );
            expect( mx.store( key ) ).toEqual( value );
        });

        it( 'should remove an existing key/value given a key' , function( ) {
            var key = 'user' , value = 'Toto';
            mx.store( key , value );
            mx.store.remove( key );
            expect( mx.store( key ) ).toBe( null );
        });

    });

    if( !!window.localStorage) {

        describe( 'using local storage' , function( ) {

            mx.storage( mx.LOCAL_STORAGE );

            it( 'should store and get a string value given a key' , function( ) {
                var key = 'user' , value = 'Toto';
                mx.store( key , value );
                expect( mx.store( key ) ).toEqual( value );
            });

            it( 'should store and get a number value given a key' , function( ) {
                var key = 'number' , value = 42;
                mx.store( key , value );
                expect( mx.store( key ) ).toEqual( value );
            });

            it( 'should store and get an object value given a key' , function( ) {
                var key = 'document' , value = { title: 'A title ' , content: 'Some content ' };
                mx.store( key , value );
                expect( mx.store( key ) ).toEqual( value );
            });

            it( 'should remove an existing key/value given a key' , function( ) {
                var key = 'user' , value = 'Toto';
                mx.store( key , value );
                mx.store.remove( key );
                expect( mx.store( key ) ).toBe( null );
            });

        });
    }

    if( !!window.sessionStorage) {

        describe( 'using session storage' , function( ) {

            mx.storage( mx.SESSION_STORAGE );

            it( 'should store and get a string value given a key' , function( ) {
                var key = 'user' , value = 'Toto';
                mx.store( key , value );
                expect( mx.store( key ) ).toEqual( value );
            });

            it( 'should store and get a number value given a key' , function( ) {
                var key = 'number' , value = 42;
                mx.store( key , value );
                expect( mx.store( key ) ).toEqual( value );
            });

            it( 'should store and get an object value given a key' , function( ) {
                var key = 'document' , value = { title: 'A title ' , content: 'Some content ' };
                mx.store( key , value );
                expect( mx.store( key ) ).toEqual( value );
            });

            it( 'should remove an existing key/value given a key' , function( ) {
                var key = 'user' , value = 'Toto';
                mx.store( key , value );
                mx.store.remove( key );
                expect( mx.store( key ) ).toBe( null );
            });

        });

    }



});
