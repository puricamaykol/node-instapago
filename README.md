 

Node Instapago
--------------

Simple promise based [Instapago](http://instapago.com/) (payment service http://instapago.com/ ) Client for NodeJs.

How to install
--------------

```batch
    npm install node-instapago
```
API
-------
 - `constructor(String: apiKey, String:publicKey)`
 - `createPayment(Payment: paymentParameters, Bool: ispreAuthorized) : Promise`
 - `completePayment(Payment: paPaymentParameters) : Promise`
 - `getPaymentDetails(String: paymentId) : Promise`
 - `cancelPayment(String: paymentId) : Promise`

```javascript
PayMent =  {
             amount,
             description,
             cardHolder,
             cardHolderId,
             cardNumber,
             cvc,
             expirationDate,
             ip,
             orderNumber,
             address,
             city,
             zipCode,
             state
            }
```
 
How to use it
--------------


```javascript
  var instapago = require("instapago");  
  var _instaPago = new instapago("[YOUR_API_KEY]", "[YOUR_PUBLIC_KEY]");
  
var paymentPAHandler = function(params) {
    //_instaPago.completePayment(params).then(res=>console.log("res.data")).catch(err=>console.log(err, "completePayment error"));
    _instaPago.getPaymentDetails(params).then(res => console.log("res.data")).catch(err => console.log(err, "completePayment error"));
    _instaPago.cancelPayment(params).then(res => console.log(res, "resputa cancelPayment")).catch(err => console.log(err, "completePayment error"));
}
eventEmitter.on('paymentPA', paymentPAHandler);



var payment = {
    "amount": 100,
    "description": "Test payment",
    "cardHolder": "John Doe",
    "cardHolderId": "105682414",
    "cardNumber": "4111111111111111",
    "cvc": 621,
    "expirationDate": "07/2020",
    "statusId": 2,
    "ip": "[YOUR_SERVER_IP]",
    "orderNumber": 1256,
    "address": "Test Address",
    "city": "caracas",
    "zipCode": 1010,
    "state": "DC"
}

_instaPago.createPayment(payment, true)
    .then(response => eventEmitter.emit('paymentPA', { "Id": response.data.id, "amount": response.data.amount }))
    .catch(err => console.log(err, "error"));
```

The road ahead
--------------

 - Caching payments
 - Complete las pre authorized cached payments
 - Delete last cached payment




