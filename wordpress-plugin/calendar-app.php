<?php
/**
 * Plugin Name: Learning Schedule Calendar
 * Plugin URI: https://example.com/calendar-app
 * Description: A client-side calendar application for generating customizable iCalendar (.ics) files
 * Version: 1.0.0
 * Author: Your Name
 * License: MIT
 */

if (!defined('ABSPATH')) {
    exit;
}

class LearningScheduleCalendar {
    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('admin_init', array($this, 'register_settings'));
        add_shortcode('calendar_app', array($this, 'render_calendar_app'));
    }

    public function add_admin_menu() {
        add_menu_page(
            'Learning Schedule Calendar',
            'Calendar App',
            'manage_options',
            'learning-schedule-calendar',
            array($this, 'render_admin_page'),
            'dashicons-calendar-alt'
        );
    }

    public function register_settings() {
        register_setting('learning_schedule_calendar', 'lsc_custom_styles');
    }

    public function enqueue_scripts() {
        // Core dependencies
        wp_enqueue_script('react', 'https://unpkg.com/react@18/umd/react.production.min.js', array(), '18.0.0');
        wp_enqueue_script('react-dom', 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', array('react'), '18.0.0');
        wp_enqueue_script('framer-motion', 'https://unpkg.com/framer-motion@11.13.1/dist/framer-motion.min.js', array('react'), '11.13.1');

        // Plugin assets
        wp_enqueue_style(
            'learning-schedule-calendar',
            plugin_dir_url(__FILE__) . 'assets/wordpress-bundle.css',
            array(),
            '1.0.0'
        );
        wp_enqueue_script(
            'learning-schedule-calendar',
            plugin_dir_url(__FILE__) . 'assets/wordpress-bundle.js',
            array('react', 'react-dom', 'framer-motion'),
            '1.0.0',
            true
        );
    }

    public function render_calendar_app() {
        return '<div id="calendar-app-container"></div>';
    }

    public function render_admin_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        $custom_styles = get_option('lsc_custom_styles', '');
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            
            <div class="notice notice-success is-dismissible" style="display: none;" id="lsc-settings-saved">
                <p>Settings saved successfully!</p>
            </div>

            <div class="card">
                <h2>Quick Start Guide</h2>
                <p>To add the calendar to any page or post, simply use this shortcode:</p>
                <code>[calendar_app]</code>
            </div>

            <form method="post" action="options.php">
                <?php
                settings_fields('learning_schedule_calendar');
                do_settings_sections('learning_schedule_calendar');
                ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="lsc_custom_styles">Custom CSS Styles</label>
                        </th>
                        <td>
                            <textarea 
                                name="lsc_custom_styles" 
                                id="lsc_custom_styles" 
                                rows="10" 
                                class="large-text code"
                            ><?php echo esc_textarea($custom_styles); ?></textarea>
                            <p class="description">
                                Add custom CSS styles to customize the appearance of your calendar.
                            </p>
                        </td>
                    </tr>
                </table>
                <?php submit_button('Save Settings'); ?>
            </form>
        </div>
        <?php
    }
}

// Initialize the plugin
new LearningScheduleCalendar();
