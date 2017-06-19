'use strict'

module.exports = class Payment {
    constructor(paymentParameters) {
            this.amount = paymentParameters.amount
            this.description = paymentParameters.description
            this.cardHolder = paymentParameters.cardHolder
            this.cardHolderId = paymentParameters.cardHolderId
            this.cardNumber = paymentParameters.cardNumber
            this.cvc = paymentParameters.cvc
            this.paymentParameters.expirationDate
            this.statusId = paymentParameters.statusId
            this.ip = paymentParameters.ip
            this.orderNumber = paymentParameters.orderNumber
            this.address = paymentParameters.address
            this.city = paymentParameters.city
            this.zipCode = paymentParameters.zipCode
            this.state = paymentParameters.state

            if (this.validate()) {
                var error = new Error('Invalid payment attrs');
                error.name = 'Invalid';
                return error;
            }
        }
        /**
         * [validate description]
         * @return {[type]} [description]
         */
    validate() {
        return true;
    }
}
