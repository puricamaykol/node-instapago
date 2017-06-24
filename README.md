 

Node Instapago
--------------

Simple Instapago Client for NodeJs (On the works, still barebones... )

How to use it:


```javascript
  var _instaPago = new instapago("[YOUR_API_KEY]", "[YOUR_PUBLIC_KEY]");
  
var paymentPAHandler = function(params) {
    //_instaPago.completePayment(params).then(res=>console.log("res.data", "resputa completePayment")).catch(err=>console.log(err, "completePayment error"));
    _instaPago.getPaymentDetails(params).then(res => console.log("res.data", "resputa getPaymentDetails")).catch(err => console.log(err, "completePayment error"));
    _instaPago.cancelPayment(params).then(res => console.log(res, "resputa cancelPayment")).catch(err => console.log(err, "completePayment error"));
}
eventEmitter.on('paymentPA', paymentPAHandler);



var payment = {
    "amount": 100,
    "description": "Test payment",
    "cardHolder": "Maykol A Purica M",
    "cardHolderId": "18111696",
    "cardNumber": "4111111111111111",
    "cvc": 621,
    "expirationDate": "07/2020",
    "statusId": 2,
    "ip": "192.168.1.255",
    "orderNumber": 1256,
    "address": "Direccion de prueba",
    "city": "caracas",
    "zipCode": 1010,
    "state": "Dtto Capital"
}

_instaPago.createPayment(payment, true)
    .then(response => eventEmitter.emit('paymentPA', { "Id": response.data.id, "amount": response.data.amount }))
    .catch(err => console.log(err, "error"));
```

Methods
-------

 - createPayment( )
 - completePayment( )
 - getPaymentDetails( )
 - cancelPayment( )

The road ahead
--------------

 - Caching payments
 - Complete las pre authorized cached payments
 - Delete last cached payment


