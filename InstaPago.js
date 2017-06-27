'use strict'
var axios = require('axios');
var uri = require('/URI');

/**
 * Main Class
 */
class InstaPago {

    constructor(apiKey, publicKey, http) {
        this._KeyId = apiKey
        this._PublicKeyId = publicKey
        this._http = http;
    }

    /**
     * Creates or preauthorized a payment
     * @param  {json}  paymentParameters Set of params for payment creation
     * @param  {Boolean} ispreAuthorized   Sets if it's preauthorized or not
     * @return {Promise}  
     */
    createPayment(paymentParameters, ispreAuthorized = false) {
            let paymentAttrs = {
                "KeyId": this._KeyId,
                "PublicKeyId": this._PublicKeyId,
                "Amount": paymentParameters.amount,
                "Description": paymentParameters.description,
                "CardHolder": paymentParameters.cardHolder,
                "CardHolderID": paymentParameters.cardHolderId,
                "CardNumber": paymentParameters.cardNumber,
                "CVC": paymentParameters.cvc,
                "ExpirationDate": paymentParameters.expirationDate,
                "StatusId": (ispreAuthorized) ? 1 : 2,
                "IP": paymentParameters.ip,
                "OrderNumber": paymentParameters.orderNumber,
                "Address": paymentParameters.address,
                "City": paymentParameters.city,
                "ZipCode": paymentParameters.zipCode,
                "State": paymentParameters.state

            }
            return this._http.post(uri.getCreateUri(), paymentAttrs);
        }
        /**
         * Completes a pre-authorized payment
         * @param  {json} paPaymentParameters Payment params (Id and Amount)
         * @return {Promise}
         */
    completePayment(paPaymentParameters) {
            let paymentAttrs = {
                "KeyId": this._KeyId,
                "PublicKeyId": this._PublicKeyId,
                "Id": paPaymentParameters.Id,
                "Amount": paPaymentParameters.amount
            }
            return this._http.post(uri.getCompleteUri(), paymentAttrs);
        }
        /**
         * Gets the details for a given payment
         * @param  {json} paymentParameters Payment object containing payment id
         * @return {Promise}
         */
    getPaymentDetails(paymentId) {
            let paymentAttrs = {
                "KeyId": this._KeyId,
                "PublicKeyId": this._PublicKeyId,
                "Id": paymentId
            }
            return this._http(uri.getDetailsUri());

        }
        /**
         * Cancels a given payment
         * @param  {json} paymentParameters paymentParameters Payment object containing payment id
         * @return {Promise}
         */
    cancelPayment(paymentId) {
        let paymentAttrs = {
            "KeyId": this._KeyId,
            "PublicKeyId": this._PublicKeyId,
            "Id": paymentId
        }
        return this._http.delete(uri.getCancelUri(), { "data": paymentAttrs });
    }
}
/*Using contruct proxy method for some IoC
  Note: This cannot be used as an IoC container creation aproach
  At least I haven't come up with a way for doing such thing    
*/
var instapago = new Proxy(InstaPago, {
    construct: function(target, argumentsList, newTarget) {
        var httpClient = axios.create({
            baseURL: uri.getBaseUrl(),
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            transformRequest: [function(obj) {
                var str = [];
                for (var p in obj)
                    if (obj.hasOwnProperty(p)) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                return str.join("&");
            }],

        });
        return new target(argumentsList[0], argumentsList[1], httpClient);
    }
});

module.exports = instapago;
