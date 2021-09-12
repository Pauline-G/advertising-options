( function ( wp ) {
    var registerPlugin = wp.plugins.registerPlugin;
    var PluginSidebar = wp.editPost.PluginSidebar;
    var el = wp.element.createElement;
    var Text = wp.components.TextControl;
    var Toggleinput = wp.components.ToggleControl;
    var RadioControl = wp.components.RadioControl;
    var InspectorControls = wp.block-editor;
    var withSelect = wp.data.withSelect;
    var withDispatch = wp.data.withDispatch;
    var compose = wp.compose.compose;
    
    //Text Field
    var MetaBlockField = compose(
        withDispatch( function ( dispatch, props ) {
            return {
                setMetaFieldValue: function ( value ) {
                    dispatch( 'core/editor' ).editPost( {
                        meta: { [ props.fieldName ]: value },
                    } );
                },
            };
        } ),
        withSelect( function ( select, props ) {
            return {
                metaFieldValue: select( 'core/editor' ).getEditedPostAttribute('meta' )[ props.fieldName ],
            };
        } )
    )( function ( props ) {
        return el( Text, {
            label: 'Advertiser Name',
            value: props.metaFieldValue,
            onChange: function ( content ) {
                props.setMetaFieldValue( content );
            },
        } );
    } );

    //ToggleControl
    var MetaBlockToggle = compose(
        withDispatch( function( dispatch, props ) {
            return {
                setMetaFieldValue: function( value ) {
                    dispatch( 'core/editor' ).editPost(
                        { meta: { [ props.fieldName ]: value } }
                    );
                }
            }
        } ),
        withSelect( function( select, props ) {
            return {
                metaFieldValue: select( 'core/editor' ).getEditedPostAttribute('meta' )[ props.fieldName ],
            }
        } )
    )( function( props ) {
        return el( Toggleinput, {
            label: 'On/Off Toggle',
            checked: props.metaFieldValue,
            onChange: function( content ) {
                props.setMetaFieldValue( content );
            },
        } );
    } );

    //RadioControl
    var MetaBlockRadio = compose(
        withDispatch( function( dispatch, props ) {
            return {
                setMetaFieldValue: function( value ) {
                    dispatch( 'core/editor' ).editPost(
                        { meta: { [ props.fieldName ]: value } }
                    );
                }
            }
        } ),
        withSelect( function( select, props ) {
            return {
                metaFieldValue: select( 'core/editor' ).getEditedPostAttribute('meta' )[ props.fieldName ],
            }
        } )
    )( function( props ) {
        return el( RadioControl, {
            label: 'Commercial Content Type',
            //selected: {metaFieldValue},
            options : [
                { label: 'None', value: 'no' },
                { label: 'Sponsored Content', value: 'sc' },
                { label: 'Partnered Content', value: 'pc' },
                { label: 'Brought To You Buy', value: 'btyb' },
            ],
            onChange: function( content ) {
                props.setMetaFieldValue( content );
            },
        } );
    } );

 
    registerPlugin( 'my-plugin-sidebar', {
        render: function () {
            return el(
                PluginSidebar,
                {
                    name: 'my-plugin-sidebar',
                    icon: 'universal-access-alt',
                    title: 'Advertising Settings',
                },
                //Advertisements - Toggle
                el( 'div',
                    { className: 'dev-sidebar-toggle' },
                    el( MetaBlockToggle,
                        { fieldName: 'sidebar_toggle_field' }
                    ),
                ),
                //Commercial Content Type - Radio
                el( 'div',
                    { className: 'dev-sidebar-radio' },
                    el( MetaBlockRadio,
                        { fieldName: 'sidebar_radio_field' }
                    ),
                ),
                //Advertiser Name - textField
                el(
                    'div',
                    { className: 'plugin-sidebar-content' },
                    el( MetaBlockField, {
                        fieldName: 'sidebar_plugin_meta_block_field',
                    } )
                )
            );
        },
    } );
} )( window.wp );

