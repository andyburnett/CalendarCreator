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

    // Get WordPress theme colors
    private function get_theme_colors() {
        $theme_colors = array(
            'primary' => get_theme_mod('primary_color', '#000000'),
            'background' => get_background_color(),
            'text' => get_theme_mod('text_color', '#000000'),
            'link' => get_theme_mod('link_color', '#0073aa'),
            'accent' => get_theme_mod('accent_color', '#0073aa')
        );

        // Get additional colors from theme.json if available
        $theme_json_file = get_template_directory() . '/theme.json';
        if (file_exists($theme_json_file)) {
            $theme_json = json_decode(file_get_contents($theme_json_file), true);
            if (isset($theme_json['settings']['color']['palette'])) {
                foreach ($theme_json['settings']['color']['palette'] as $color) {
                    $theme_colors[$color['slug']] = $color['color'];
                }
            }
        }

        return $theme_colors;
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
        register_setting('learning_schedule_calendar', 'lsc_use_theme_colors', array(
            'type' => 'boolean',
            'default' => true
        ));
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

        // Enqueue main script with theme colors
        wp_enqueue_script(
            'learning-schedule-calendar',
            plugin_dir_url(__FILE__) . 'assets/wordpress-bundle.js',
            array('react', 'react-dom', 'framer-motion'),
            '1.0.0',
            true
        );

        // Pass theme colors to JavaScript
        $use_theme_colors = get_option('lsc_use_theme_colors', true);
        wp_localize_script(
            'learning-schedule-calendar',
            'calendarAppConfig',
            array(
                'useThemeColors' => $use_theme_colors,
                'themeColors' => $use_theme_colors ? $this->get_theme_colors() : null,
                'themeSettings' => array(
                    'radius' => '0.5',
                    'variant' => 'professional'
                )
            )
        );
    }

    public function render_calendar_app() {
        return '<div id="calendar-app-container" class="calendar-app-wp-container"></div>';
    }

    public function render_admin_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        $custom_styles = get_option('lsc_custom_styles', '');
        $use_theme_colors = get_option('lsc_use_theme_colors', true);
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
                            <label for="lsc_use_theme_colors">Theme Integration</label>
                        </th>
                        <td>
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="lsc_use_theme_colors" 
                                    id="lsc_use_theme_colors"
                                    value="1"
                                    <?php checked($use_theme_colors); ?>
                                />
                                Automatically match WordPress theme colors
                            </label>
                            <p class="description">
                                When enabled, the calendar will use your WordPress theme's colors.
                            </p>
                        </td>
                    </tr>
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
                                These styles will be applied regardless of theme integration settings.
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