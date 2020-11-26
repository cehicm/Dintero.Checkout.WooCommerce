jQuery( function( $ ) {
	'use strict';

	var wcdhp_settings = {

		/**
		 * Initialize variations actions
		 */
		init: function() {
			$( '.woocommerce-help-tip')
				.tipTip({
					'attribute': 'data-tip',
					'fadeIn':    50,
					'fadeOut':   50,
					'delay':     200
			});
		},
	}

	wcdhp_settings.init();
});