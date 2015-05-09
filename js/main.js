
/* global m */



var localstorage        = mx.storage( 'localstorage' , mx.LOCAL_STORAGE );
    sessionstorage      = mx.storage( 'sessionsstorage' , mx.SESSION_STORAGE );
    cookiestorage       = mx.storage( 'sessionsstorage' , mx.COOKIE_STORAGE );
    inmemorystorage     = mx.storage( 'inmemorystorage' , mx.IN_MEMORY_STORAGE );

var welcome = {};
welcome.view = function( ) {
    return [
        m( '.ui.segment',
            m( '.ui.grid' ,
                m( '.sixteen wide column',  m( 'h2' , 'Contact Storage' ) ),
                m( '.sixteen wide column',  m( 'h4' , 'This application is a demo of the Mithril Storage library. ' ) ),
                m( '.sixteen wide column',  m( 'h4' , 'You can add contacts and they will be stored in the four available kinds of storage the librairy propose.'  ) )
            )
        )
    ];
};

var add = {};
add.controller = function( ) {
    this.firstname = m.prop( '' );
    this.lastname = m.prop( '' );

    this.add = function( ) {
        var newContact = {
            firstname:  this.firstname(),
            lastname:   this.lastname()
        };


        // Save the contact
        var contacts = localstorage.get( 'contacts' ) || [];
        contacts.push( newContact );
        localstorage.set( 'contacts' , contacts );

        contacts = cookiestorage.get( 'contacts' ) || [];
        contacts.push( newContact );
        cookiestorage.set( 'contacts' , contacts );

        contacts = sessionstorage.get( 'contacts' ) || [];
        contacts.push( newContact );
        sessionstorage.set( 'contacts' , contacts );

        contacts = inmemorystorage.get( 'contacts' ) || [];
        contacts.push( newContact );
        inmemorystorage.set( 'contacts' , contacts );

        // Clean the inputs
        this.firstname( '' );
        this.lastname( '' );
    }
};
add.view = function( controller ) {
    return [
        m( 'form', { class: 'ui form segment' },
            m( 'h4' , 'Add a contact' ),
            m( '.three.fields' ,
                m( '.field' ,
                    m( 'input' ,
                        {
                            class: 'text',
                            name: 'firstname',
                            placeholder: 'First Name',
                            onchange:  m.withAttr( 'value' , controller.firstname )
                        }
                    )
                ),
                m( '.field' ,
                    m( 'input' ,
                        {
                            class: 'text',
                            name: 'lastname',
                            placeholder: 'Last Name',
                            onchange:  m.withAttr( 'value' , controller.lastname )
                        }
                    )
                ),
                m( '.field' ,
                    m( '.ui.positive.button' ,
                        {
                            onclick: function( ) { controller.add(); }
                        },
                        'Add'
                    )
                )
            )
        )
    ];
};

var list = {};
list.controller = function( ) {

    this.localContacts = function( ) {
        return localstorage.get( 'contacts' ) || [];
    };

    this.sessionContacts = function( ) {
        return sessionstorage.get( 'contacts' ) || [];
    };

    this.cookieContacts = function( ) {
        return cookiestorage.get( 'contacts' ) || [];
    };

    this.inmemoryContacts = function( ) {
        return inmemorystorage.get( 'contacts' ) || [];
    };



};
list.view = function( controller ) {
    return [
        m( '.ui.segment',
            m('.ui.grid',
                m( '.eight.wide.column',
                    m( 'h4' , 'Local Storage' )
                ),
                m( '.eight.wide.column',
                    m( 'h4' , 'Session Storage' )
                ),
                m( '.eight.wide.column',
                    m( 'table' ,
                        { class: 'ui table' },
                        m( 'thead' ,
                            m( 'tr' ,
                                m( 'th' , 'First Name '),
                                m( 'th' , 'Last Name ')
                            )
                        ),
                        m( 'tbody' ,
                            controller.localContacts().map( function( contact ) {
                                return [
                                    m( 'tr' ,
                                        m( 'td' , contact.firstname ),
                                        m( 'td' , contact.lastname )
                                    )
                                ][0];
                            })
                        )
                    )
                ),
                m( '.eight.wide.column',
                    m( 'table' ,
                        { class: 'ui table' },
                        m( 'thead' ,
                            m( 'tr' ,
                                m( 'th' , 'First Name '),
                                m( 'th' , 'Last Name ')
                            )
                        ),
                        m( 'tbody' ,
                            controller.sessionContacts().map( function( contact ) {
                                return [
                                    m( 'tr' ,
                                        m( 'td' , contact.firstname ),
                                        m( 'td' , contact.lastname )
                                    )
                                ][0];
                            })
                        )
                    )
                ),
                m( '.eight.wide.column',
                    m( 'h4' , 'Cookie Storage' )
                ),
                m( '.eight.wide.column',
                    m( 'h4' , 'In Memory Storage' )
                ),
                m( '.eight.wide.column',
                    m( 'table' ,
                        { class: 'ui table' },
                        m( 'thead' ,
                            m( 'tr' ,
                                m( 'th' , 'First Name '),
                                m( 'th' , 'Last Name ')
                            )
                        ),
                        m( 'tbody' ,
                            controller.cookieContacts().map( function( contact ) {
                                return [
                                    m( 'tr' ,
                                        m( 'td' , contact.firstname ),
                                        m( 'td' , contact.lastname )
                                    )
                                ][0];
                            })
                        )
                    )
                ),
                m( '.eight.wide.column',
                    m( 'table' ,
                        { class: 'ui table' },
                        m( 'thead' ,
                            m( 'tr' ,
                                m( 'th' , 'First Name '),
                                m( 'th' , 'Last Name ')
                            )
                        ),
                        m( 'tbody' ,
                            controller.inmemoryContacts().map( function( contact ) {
                                return [
                                    m( 'tr' ,
                                        m( 'td' , contact.firstname ),
                                        m( 'td' , contact.lastname )
                                    )
                                ][0];
                            })
                        )
                    )
                )
            )
        )
    ];
};

var main = {};
main.controller = function( ) {
    this.addController = m.prop( new add.controller() );
    this.listController = m.prop( new list.controller() );
};
main.view = function( controller ) {
    return [
        m( '.ui.page.container',
            welcome.view( ),
            m('.ui.hidden.divider'),
            add.view( controller.addController() ),
            m('.ui.hidden.divider'),
            list.view( controller.listController() )
        )
    ]
};

m.module( document.body , main );