# Mithril Storage [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
=================

Mithril Storage is a library which allows to store locally your mithril applications data through cookies, local storage, in-memory or session storage.

## Get Started

One way to use Mithril Translate: download this project, get the `dist` folder files and link to mithril and mithril-storage in the head of your app:

```html
<head>
    <meta charset="utf-8">
    <script src="mithril.js"></script>
    <script src="mithril-storage.js"></script>
</head>
```


## How to use it

### The `mx.storage` function

By default, the library will set the storage to localStorage if it exists otherwise it will store date in the cookies. However, if you want to select a specific way to store, you can choose among the three storage ( cookie , localStorage, sessionStorage, in-memory ) by using the `mx.storage` function and constants:

```js
    // Set the storage to the default storage (localStorage or Cookie )
    // This line is useless since this is the configuration by default
    mx.storage( mx.DEFAULT_STORAGE );
    // Set the storage to cookie
    mx.storage( mx.COOKIE_STORAGE );
    // Set the storage to localStorage
    mx.storage( mx.LOCAL_STORAGE );
    // Set the storage to sessionStorage
    mx.storage( mx.IN_MEMORY_STORAGE );
    // Set the storage to sessionStorage
    mx.storage( mx.SESSION_STORAGE );

    
    // Returns the current storage
    mx.storage( ); // mx.SESSION_STORAGE
```

### The `mx.storage.get`,  `mx.storage.set`  function

The `mx.storage.get` and `mx.storage.set` functions allow you to get and set values in the storage. In order to store a value, you just need to specify a string key. Note that the type of value you set is the same one than you get. )

```js
    mx.storage.set( 'user' , 'kawan16' ); 
    mx.storage.set( 'document' , { title:' A title' , content: 'Some content' } ); 
    mx.storage.set( 'number' , 42 );
    
    // Later
    
    mx.storage.get( 'user' ); // Returns 'kawan16'
    mx.storage.get( 'document' ); // Returns { title:' A title' , content: 'Some content' } 
    mx.storage.get( 'number' ); // Returns 42
```

### The `mx.storage.remove`  function

Once you store a key/value, you can remove it: 

```js
    mx.storage.set( 'user' , 'kawan16' ); 
    
    // Later
    
    mx.storage.remove( 'user' ); // Delete 'user' / 'kawan16'
    mx.storage.get( 'user' ); // returns null
```


## History


## License

Licensed under the MIT license.
