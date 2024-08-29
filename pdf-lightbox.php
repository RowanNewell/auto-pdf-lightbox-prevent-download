<?php
/**
 * Plugin Name: PDF Lightbox - Prevent Download
 * Description: Automatically opens URL's with '.pdf' in a lightbox using PDF.js, with no download option and right click disabled, preventing the user from downloading the file.
 * Version: 1.0
 * Author: NUEL Digital
 * Author URI: https://nuel.digital
 */

// Enqueue PDF.js and custom scripts/styles
function pdf_lightbox_enqueue_scripts()
{
    // PDF.js Library
    wp_enqueue_script('pdfjs-lib', 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js', array(), null, true);
    wp_enqueue_script('pdfjs-worker', 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js', array(), null, true);

    // Custom Script
    wp_enqueue_script('pdf-lightbox-script', plugin_dir_url(__FILE__) . 'js/pdf-lightbox.js', array('jquery'), null, true);

    // Custom Styles
    wp_enqueue_style('pdf-lightbox-style', plugin_dir_url(__FILE__) . 'css/pdf-lightbox.css');
}
add_action('wp_enqueue_scripts', 'pdf_lightbox_enqueue_scripts');

// Add the HTML structure for the lightbox
function pdf_lightbox_add_html()
{
    ?>
    <div id="pdf-lightbox" style="display:none;">
        <div id="pdf-container" style="position: relative; overflow-y: auto; height: 90vh; width: 90vw;">
            <button id="pdf-close-btn"
                style="position: absolute; top: 10px; right: 10px; z-index: 1001; background: #333; color: #fff; border: none; padding: 5px 10px; cursor: pointer;">Close</button>
            <div id="pdf-pages"></div>
        </div>
    </div>
    <?php
}
add_action('wp_footer', 'pdf_lightbox_add_html');