<?php
/**
 * Plugin Name:       Advertising Sidebar Options
 * Description:       Advertising Sidebar Options for posts block editor.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Pauline Grech
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       advertising-options
 *
 * @package           create-block
 */


//Sidebar functionality
function sidebar_plugin_register() {
    wp_register_script(
        'plugin-sidebar-js',
        plugins_url( 'plugin-sidebar.js', __FILE__ ),
        array(
            'wp-plugins',
            'wp-edit-post',
            'wp-element',
            'wp-components',
            'wp-compose'
        )
    );
    wp_register_style(
        'plugin-sidebar-css',
        plugins_url( 'plugin-sidebar.css', __FILE__ )
    );

	//REGISTER THE META FIELDS
    //Text Field
	register_post_meta( 'post', 'sidebar_plugin_meta_block_field', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	) );
    //Toggle
    register_post_meta( 'post', 'sidebar_toggle_field', array(
        'type'      => 'boolean', // because it is a toggle
        'single'    => true,
        'show_in_rest'  => true,
        'default'   => 1, 
    ) );
    //Radio
    register_post_meta( 'post', 'sidebar_radio_field', array(
        'type'      => 'string', 
        'single'    => true,
        'show_in_rest'  => true,
        'default'   => 'no', 
    ) );
}
add_action( 'init', 'sidebar_plugin_register' );
 
function sidebar_plugin_script_enqueue() {
    wp_enqueue_script( 'plugin-sidebar-js' );
}
add_action( 'enqueue_block_editor_assets', 'sidebar_plugin_script_enqueue' );
 
function sidebar_plugin_style_enqueue() {
    wp_enqueue_style( 'plugin-sidebar-css' );
}
add_action( 'enqueue_block_assets', 'sidebar_plugin_style_enqueue' );

