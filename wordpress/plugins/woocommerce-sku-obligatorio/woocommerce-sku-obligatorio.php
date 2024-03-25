<?php
/*
 * Plugin Name: WooCommerce SKU Obligatorio
 * Plugin URI: https://adress.dev
 * Description: Hace que el campo SKU sea obligatorio en WooCommerce.
 * Version: 1.0.0
*/

add_action('woocommerce_admin_process_product_object', 'mandatory_product_sku');
add_action('woocommerce_admin_process_variation_object', 'mandatory_product_sku');

function mandatory_product_sku( $product ) {
    if( ! $product->get_sku() ) {
        $message = __( '¡Cuidado! El campo SKU es obligatorio.', 'woocommerce' );

        if( $product->get_status() === 'publish' ) {
            $product->set_status('draft');
            $message .= ' ' . __('El producto se ha guardado como "BORRADOR".', 'woocommerce' );
        }

        WC_Admin_Meta_Boxes::add_error( $message );
    }
}
?>