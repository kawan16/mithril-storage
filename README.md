# Mithril Storage [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
=================
[![Code Climate](https://codeclimate.com/github/kawan16/mithril-storage/badges/gpa.svg)](https://codeclimate.com/github/kawan16/mithril-storage)

Mithril Storage is a library which allows to store locally your mithril applications data through cookies, local storage, in-memory or session storage.

## Get Started

One way to use Mithril Storage: download this project, get the `dist` folder files and link to mithril and mithril-storage in the head of your app:

```html
<head>
    <meta charset="utf-8">
    <script src="mithril.js"></script>
    <script src="mithril-storage.js"></script>
</head>
```

## Demo

Take a look at this basic [demo](http://kawan16.github.io/mithril-storage) and see Mithril Storage in action.


## How to use it

### The `mx.storage` function

By default, the library will set up a default storage of localStorage type if it exists otherwise it will store data in the cookies. If you want to select a specific way to store, you can choose among the four kinds of available storage types ( cookie , localStorage, sessionStorage, in-memory ) by using the `mx.storage` function and storage type constants:

```js

    // Write nothing and it will set a default storage of default type ( localStorage or cookie storage )
    
    // -- OR -- 
    
    // Set explicitely the default storage to the default storage ( localStorage or cookie storage )
    // This line is useless but works since this is the configuration by default
    mx.storage( mx.DEFAULT_STORAGE_NAME , mx.DEFAULT_STORAGE ); // Returns the storage
    
    // -- OR -- 
    
    // Set the default storage to cookie
    mx.storage( mx.DEFAULT_STORAGE_NAME , mx.COOKIE_STORAGE ); // Returns the storage
    
     // -- OR -- 
     
    // Set the default storage to localStorage
    mx.storage( mx.DEFAULT_STORAGE_NAME , mx.LOCAL_STORAGE ); // Returns the storage
    
     // -- OR -- 
     
    // Set the default storage to sessionStorage
    mx.storage( mx.DEFAULT_STORAGE_NAME , mx.IN_MEMORY_STORAGE ); // Returns the storage
 
     // -- OR -- 
        
    // Set the default storage to sessionStorage
    mx.storage( mx.DEFAULT_STORAGE_NAME , mx.SESSION_STORAGE ); // Returns the storage

    
    // Returns the default storage
    mx.storage( ); // Returns the storage labeled with mx.DEFAULT_STORAGE_NAME
```

#### Namespaced storage

The library allows you to define several other storages than the default one. They just need a name ( such as the constant default string mx.DEFAULT_STORAGE_NAME ), that's it !

```js
    // One storage for some user model
    var userModel = mx.storage( 'userModel' , mx.IN_MEMORY_STORAGE );
    
    // One storage for some session stats
    var statsStore = mx.storage( 'stats' , mx.SESSION_STORAGE );
    
    // One storage for persistent data 
    var persistentStorage = mx.storage( 'persistent' , mx.LOCAL_STORAGE );
    
    
    // Accessors 
    
    mx.storage( 'userModel' ); // Returns userModel
    mx.storage( 'stats' ); // Returns statsStore
    mx.storage( 'persistent' ); // Returns persistentStorage
    
```

### The `mx.storage.get`,  `mx.storage.set`  function

The `mx.storage.get` and `mx.storage.set` functions allow you to get and set values in the default/named storage. In order to store a value, you just need to specify a string key. Note that the type of value you set is the same one than you get. )

```js
    var cache   = mx.storage( 'cache' , mx.IN_MEMORY_STORAGE ),
        localDb = mx.storage( 'db' , mx.LOCAL_STORAGE );
    
    cache.set( 'user' , 'kawan16' ); 
    localDb.set( 'document' , { title:' A title' , content: 'Some content' } ); 
    cache.set( 'number' , 42 );
    
    // Later
    
    cache.get( 'user' ); // Returns 'kawan16'
    localDb.get( 'document' ); // Returns { title:' A title' , content: 'Some content' } 
    cache.get( 'number' ); // Returns 42
```

### The `mx.storage.remove`  function

Once you store a key/value, you can remove it: 

```js
    var cache   = mx.storage( 'cache' , mx.IN_MEMORY_STORAGE );
    
    cache.set( 'user' , 'kawan16' ); 
    
    // Later
    
   cache.remove( 'user' ); // Delete 'user' / 'kawan16'
   cache.get( 'user' ); // returns null
```

## History

* 0.1.0 - Initial release

## License

Licensed under the MIT license.
