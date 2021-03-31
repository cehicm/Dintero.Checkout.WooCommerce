# Dintero Checkout

**Contributors**: moogruppen, dintero<br>
**Tags**: woocommerce, Payment, Checkout, Vipps, Visa, Mastercard, Invoice, Instalment, Installment, Swish, Gateway, payment, dintero, Betalingsløsning, Checkout, Betaling, Vipps, Visa, Mastercard, Faktura, Delbetaling, Swish, Betalingsgateway, vipps, Betaling, nettbutikk <br>
**Donate link**: https://dintero.com <br>
**Requires at least**: 4.0<br>
**Tested up to**: 5.6<br>
**Requires PHP**: 5.6<br>
**WC requires at least**: 3.4.0<br>
**WC tested up to**: 4.0.0<br>
**Stable tag**: trunk<br>
**License**: GPLv3 or later<br>
**License** URI: http://www.gnu.org/licenses/gpl-3.0.html <br>
**Author**: Moogruppen AS<br>
**Author** URI: https://moogruppen.no/ <br>

Dintero Checkout provides a frictionless checkout experience.

## Description

Dintero Checkout provides a frictionless checkout experience, offering card payments, invoice, installments and mobile payment solutions.

With this plugin, you can embed or redirect our checkout in your WooCommerce install, handle captures and refunds and customize to your liking.

**Getting started**

1. Go to [onboarding.dintero.com](https://onboarding.dintero.com/) to sign up for a Dintero account.
2. Get your payment method application approved by Dintero.
3. Create your [API keys](https://docs.dintero.com/docs/checkout-client.html)
4. Install the plugin on your website.

## Installation

When you install Dintero Checkout, you need to head to the settings page to start configuring dintero to your specifications.

1. Install the plugin from [wordpress.org](https://wordpress.org/plugins/dintero-checkout-express/)
2. Activate the plugin
3. Go to Dashboard > WooCommerce > Settings > Payments
4. Click on Dintero to get to the Dintero Settings Window
4. Enter your Dintero API credentials
5. Configure Dintero checkout with your credentials and select the mode you would like to use.
6. Start Selling!


## Changelog



2021.03.31

* Bugfix: Pay for order created in wp-admin

2021.03.29

 * Redirect to cart on failed payment

2021.03.24

* Bugfix: Fix country code issue

2021.03.22

* Bugfix: Fix problem with logged in accounts

2021.03.10

* Setting to allow orders without shipping
* Error messages when API calls fail

2021.03.02

* Setting to limit customer types

2021.02.15

* Fix VAT rounding error

2021.02.12

* Move order review before checkout on mobile

2021.02.10

* Rounding error fix
* Css fix for the redirected payment order review
* Session lock removed from on session load
* Css fix for Cart Mini
* Branding image on checkout issue

2021.01.15

* Firstname,lastname required issue fix
* jQuery Fix for document on load
* Button Image type added

2020.12.14

* Shipping address required field issue
* Update order meta-data in callback

2020.12.07

* Shipping method and Instance Id Seperation for Callback Order creation
* Update in Api request for Few API calls
* Included Checkout SDK wihtin the Plugin
* Sanitized few fields for security enhancement

2020.11.27

* User agent added , WooCommerce version, Plugin Version

2020.11.25

* Shipping name fix Improvement

2020.11.25

* Instance id for shipping method, for callback order creation
* Shipping name fix

2020.11.23

* warning removed from thankyou page
* removed reward options from backend setting
* add control to add/remove branding image in/from footer

2020.11.03

* 'before_checkout_form_express' warning message fix
* probable redirect issue resolve
* 'dintero_cart_session' warning resolved
* expire time loop fixed

2020.10.30
* checkout session validation and some Style fix

2020.10.19
* Wrong discount with Coupon code issue in Callback order creation solved

2020.10.06

* Session Update only with Shipping Options
* Improvement in Session lock

2020-09-21

* added support for on_hold status
* added support for dynamic shipping pricing
* pause, update and resume sessions
* callback delayed to 3 minutes to prevent duplicate orders

2020-06-05

* Bugfixes

2020-06-02

* supports now embedded/iframe
* New feature: Express where the Checkout will handle the name, address and shipping

2020-04-04

* updated order shipping address to display information for business customer
* updated the order payment method, show actual payment method (via Dintero)

2020-04-02

* updated UI for embed and express mode, display payment as tab
* updated checkout logo & adjusted setting page to use the one under payment

2020-03-31

* use payment options (list) for not express mode

2020-03-26

* removed order review from embed + express mode

2020-03-19

* fixed express checkout total issue from no shipping country was set and system use different rate than default shipping country
* removed billing/shipping address from pay form

2020-03-17

* fixed checkout page display glitches for some specific themes
* added template for checkout and pay form
* bug fixed and adjustments

2020-03-10

* test on each payment conditions
* fixed on cancel order and display blank page
* fixed submit and return blank screen when not check "I have read and agree..." on page My Account > Order > Pay
* fixed when click cancel from Dintero page, it shows thank you page

2020-02-28

* updated for phpcs compatibilities and minor adjustments

2020-02-27

* commented out calling previous version of plugin

2020-02-26

* adjusted display on embed and not-express settings

2020-02-25

* fixed bugs

2020-02-20

* updated and fixed bugs

2020-02-18

* initial updates on woocommerce dintero plugin feature

2020-06-04

* New Checkout view with improved flow
  a. Collector issue
  B. Vat % issue
  C. Better layout of checkout

2020.06.05

* Cart Item price issue resolved and Express checkout from cart removed billing address fields

2020.06.05 - 2

* Payment cancelled issue resolved, Now it redirects to cart page

2020.06.08

* Refund issue resolved

2020.06.25

* parameter mismatch warning solved

2020.07.14

* Delayed callback for backup order creation

2020.08.14

* Rounding Off of price issue resolved

2020.09.21

* Pause, Update, Resume Session implemented
* Supports Dynamic Shipping
* Discount codes in Callback Issue resolved
* On_Hold status for collector payment
* Failed status for Collector Payment
* Callback delay to 3 minutes to prevent duplicate orders

2020.09.22

* Destroy Session
* create new checkout session if current session is COMPLETED, DECLINED, CANCELLED
* Business Checkout fix with Update session

2020.10.06

* Session Update only with Shipping Options
* Improvement in Session lock
  
