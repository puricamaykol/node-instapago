'use strict'
var request = require('request');
var Payment = require('./Payment');

/**
 * Main Class
 */
class InstaPago {

    constructor(apiKey, publicKey, http) {
        this._KeyId = apiKey
        this._PublicKeyId = publicKey
        this._http = http;
    }


    createPayment(paymentParameters) {
    	paymentAttrs = {}
        paymentAttrs.amount = paymentParameters.amount
        paymentAttrs.description = paymentParameters.description
        paymentAttrs.cardHolder = paymentParameters.cardHolder
        paymentAttrs.cardHolderId = paymentParameters.cardHolderId
        paymentAttrs.cardNumber = paymentParameters.cardNumber
        paymentAttrs.cvc = paymentParameters.cvc
        paymnetAttrs.paymentParameters.expirationDate
        paymentAttrs.statusId = paymentParameters.statusId
        paymentAttrs.ip = paymentParameters.ip
        paymentAttrs.orderNumber = paymentParameters.orderNumber
        paymentAttrs.address = paymentParameters.address
        paymentAttrs.city = paymentParameters.city
        paymentAttrs.zipCode = paymentParameters.zipCode
        paymentAttrs.state = paymentParameters.state
        try{
        paymentObject = new Payment(paymentAttrs);
    	}catch(err){
    		return err;
    	}


    }

    preAuthorizePayment() {

    }

    completePayment() {

    }

    getPaymentDetails() {

    }

    cancelPayment() {

    }
}
/*Using contruct proxy method for some IoC
  Note: This cannot be used as an IoC container creation aproach
  At least I haven't come up with a way for doing such thing	
*/
var instapago = new Proxy(InstaPago, {
    construct: function(target, argumentsList, newTarget) {
        return new target(argumentsList[0], argumentsList[1], request);
    }
});

module.exports = instapago;
