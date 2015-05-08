# Mithril Storage [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
=================

Mithril Storage is a library which allows to store locally your mithril applications data through cookies, local storage or
session storage.

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

By default, the library will set the storage to localStorage if it exists otherwise it will store date in the cookies. However, if you want to select a specific way to store, you can choose among the three storage ( cookie , localStorage, sessionStorage ) by using the `mx.storage` function and constants:

```js
    // Set the storage to the default storage (localStorage or Cookie )
    // This line is useless since this is the configuration by default
    mx.storage( mx.DEFAULT_STORAGE );
    // Set the storage to cookie
    mx.storage( mx.COOKIE_STORAGE );
    // Set the storage to localStorage
    mx.storage( mx.LOCAL_STORAGE );
    // Set the storage to sessionStorage
    mx.storage( mx.SESSION_STORAGE );

    
    // Returns the current storage
    mx.storage( ); // mx.SESSION_STORAGE
```

### The `mx.store` function

The `mx.store` function allows you to get and set values in the storage. In order to store a value, you just need to specify a string key. Note that the type of value you set is the same one than you get. )

```js
    mx.store( 'user' , 'kawan16' ); 
    mx.store( 'document' , { title:' A title' , content: 'Some content' } ); 
    mx.store( 'number' , 42 );
    
    // Later
    
    mx.store( 'user' ); // Returns 'kawan16'
    mx.store( 'document' ); // Returns { title:' A title' , content: 'Some content' } 
    mx.store( 'number' ); // Returns 42
```

## History


## License

Licensed under the MIT license.
