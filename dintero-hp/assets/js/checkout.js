jQuery( function( $ ) {

	// wc_checkout_params is required to continue, ensure the object exists
	if ( typeof wc_checkout_params === 'undefined' ) {
		return false;
	}

	var dhp_get_url = function( endpoint ) {
		var url = wc_checkout_params.wc_ajax_url.toString();
		url = url.replace('wc-ajax', 'dhp-ajax');
		return url.replace('%%endpoint%%', endpoint);
	};

	if(typeof(is_blocked) == "undefined"){
		/**
		 * Check if a node is blocked for processing.
		 *
		 * @param {JQuery Object} $node
		 * @return {bool} True if the DOM Element is UI Blocked, false if not.
		 */
		var is_blocked = function( $node ) {
			return $node.is( '.processing' ) || $node.parents( '.processing' ).length;
		};
	}

	if(typeof(block) == "undefined"){
		/**
		 * Block a node visually for processing.
		 *
		 * @param {JQuery Object} $node
		 */
		var block = function( $node ) {
			if ( ! is_blocked( $node ) ) {
				$node.addClass( 'processing' ).block( {
					message: null,
					overlayCSS: {
						background: '#fff',
						opacity: 0.6
					}
				} );
			}
		};
	}

	if(typeof(unblock) == "undefined"){
		/**
		 * Unblock a node after processing is complete.
		 *
		 * @param {JQuery Object} $node
		 */
		var unblock = function( $node ) {
			$node.removeClass( 'processing' ).unblock();
		};
	}

	/**
	 * Object to handle cart UI.
	 */
	var dhpCheckout = {
		/**
		 * Initialize cart UI events.
		 */
		init: function() {
			this.embedClicked = this.embedClicked.bind( this );
			this.expressClicked = this.expressClicked.bind( this );

			$( document ).on('click', '.dhp_ebch a', this.embedClicked);
			$( document ).on('click', '.dhp_exch a', this.expressClicked);

			$( document ).ready(function() {
				if($('#dhp-exp-ele').length>0){
					var exp = $('#dhp-exp-ele').val();
					if(exp == 1){
						//express enable
						//$('#customer_details').css("display", "none");
						$('.woocommerce-billing-fields').parent().addClass('dhp-hide');
						$('.woocommerce-shipping-fields').parent().addClass('dhp-hide');
						$('#order_review').addClass("dhp-exp");
						$('.woocommerce-checkout').addClass("dhp-exp");

						if( $('#customer_details .col-1').length>0 && $('#customer_details .col-1').css("display") == "none" ){
							if( $('#customer_details .col-2').length>0 && $('#customer_details .col-2').css("display") != "none" ){
								if( $('#customer_details .col-2').css("float") == "right" ){
									$('#customer_details .col-2').css("float", "none");
								}
							}
						}

						if( $('#customer_details .col-2').length>0 && $('#customer_details .col-2').css("display") == "none" ){
							if( $('#customer_details .col-1').length>0 && $('#customer_details .col-1').css("display") != "none" ){
								if( $('#customer_details .col-1').css("float") == "right" ){
									$('#customer_details .col-1').css("float", "none");
								}
							}
						}
					}
				}			    
			});			
		},

		embedClicked: function() {
			dhpCheckout.submit();
		},

		expressClicked: function() {
			dhpCheckout.submit(true);
		},

		$order_review: $( '#order_review' ),
		$checkout_form: $( 'form.checkout' ),

		get_payment_method: function() {
			return dhpCheckout.$checkout_form.find( 'input[name="payment_method"]:checked' ).val();
		},
		blockOnSubmit: function( $form ) {
			var form_data = $form.data();

			if ( 1 !== form_data['blockUI.isBlocked'] ) {
				$form.block({
					message: null,
					overlayCSS: {
						background: '#fff',
						opacity: 0.6
					}
				});
			}
		},
		submit: function(express) {
			express = typeof(express) == "undefined" || express !== true ? false: true;

			var $form = $('form[name=checkout]');

			var valid = true;
			if(valid){
				if ( $form.is( '.processing' ) ) {
					return false;
				}

				$form.addClass( 'processing' );
				dhpCheckout.blockOnSubmit( $form );

				// ajaxSetup is global, but we use it to ensure JSON is valid once returned.
				$.ajaxSetup( {
					dataFilter: function( raw_response, dataType ) {
						// We only want to work with JSON
						if ( 'json' !== dataType ) {
							return raw_response;
						}

						if ( dhpCheckout.is_valid_json( raw_response ) ) {
							return raw_response;
						} else {
							// Attempt to fix the malformed JSON
							var maybe_valid_json = raw_response.match( /{"result.*}/ );

							if ( null === maybe_valid_json ) {
								console.log( 'Unable to fix malformed JSON' );
							} else if ( dhpCheckout.is_valid_json( maybe_valid_json[0] ) ) {
								console.log( 'Fixed malformed JSON. Original:' );
								console.log( raw_response );
								raw_response = maybe_valid_json[0];
							} else {
								console.log( 'Unable to fix malformed JSON' );
							}
						}

						return raw_response;
					}
				} );

				var url = express ? dhp_get_url('express_checkout') : dhp_get_url('embed_checkout');

				if(false && express){
					window.location.href = url + "&" + $form.serialize();
				}else{
					$.ajax({
						type:		'POST',
						url:		url,
						data:		$form.serialize(),
						dataType:   'json',
						success:	function( result ) {
							dhpCheckout.$checkout_form.removeClass( 'processing' ).unblock();
							try {
								if ( 'success' === result.result ) {
									if ( -1 === result.redirect.indexOf( 'https://' ) || -1 === result.redirect.indexOf( 'http://' ) ) {
										window.location = result.redirect;
									} else {
										window.location = decodeURI( result.redirect );
									}
								} else if ( 'failure' === result.result ) {
									dhpCheckout.submit_error( result.messages );
									//throw 'Result failure';
								} else {
									dhpCheckout.submit_error( result.messages );
									//throw 'Invalid response';
								}
							} catch( err ) {
								// Reload page
								if ( true === result.reload ) {
									window.location.reload();
									return;
								}

								// Trigger update in case we need a fresh nonce
								if ( true === result.refresh ) {
									$( document.body ).trigger( 'update_checkout' );
								}

								// Add new errors
								if ( result.messages ) {
									dhpCheckout.submit_error( '<div class="woocommerce-error">' + result.messages + '</div>' );
								} else {
									dhpCheckout.submit_error( '<div class="woocommerce-error">' + wc_checkout_params.i18n_checkout_error + '</div>' );
								}
							}
						},
						error:	function( jqXHR, textStatus, errorThrown ) {
							dhpCheckout.submit_error( '<div class="woocommerce-error">' + errorThrown + '</div>' );
						}
					});
				}
			}

			return false;
		},
		submit_error: function( error_message ) {
			$( '.woocommerce-NoticeGroup-checkout, .woocommerce-error, .woocommerce-message' ).remove();
			dhpCheckout.$checkout_form.prepend( '<div class="woocommerce-NoticeGroup woocommerce-NoticeGroup-checkout">' + error_message + '</div>' );
			dhpCheckout.$checkout_form.removeClass( 'processing' ).unblock();
			dhpCheckout.$checkout_form.find( '.input-text, select, input:checkbox' ).trigger( 'validate' ).blur();
			dhpCheckout.scroll_to_notices();
			$( document.body ).trigger( 'checkout_error' );
		},
		scroll_to_notices: function() {
			var scrollElement           = $( '.woocommerce-NoticeGroup-updateOrderReview, .woocommerce-NoticeGroup-checkout' );

			if ( ! scrollElement.length ) {
				scrollElement = $( '.form.checkout' );
			}
			$.scroll_to_notices( scrollElement );
		},
		is_valid_json: function( raw_json ) {
			try {
				var json = $.parseJSON( raw_json );

				return ( json && 'object' === typeof json );
			} catch ( e ) {
				return false;
			}
		},
	};

	dhpCheckout.init();
} );
