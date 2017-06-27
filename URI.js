'use strict'
let config = require('/Config');
let baseUrl = config.baseUrl;
let endpoints = config.endpoints;
class URI {
    getUri(action, attrs = {}) {
        this._uri = '';
        switch (action) {
            case "create":
                this._uri = endpoints['payment'];
                break;
            case "complete":
                this._uri = endpoints['completePayment']
                break;
            case "get":
                let paymentAttrs = {
                    "KeyId": attrs.KeyId,
                    "PublicKeyId": attrs.PublicKeyId,
                    "Id": attrs.Id
                }
                this._uri = endpoints['payment'] + '?KeyId=' + paymentAttrs.KeyId + '&PublicKeyId=' + paymentAttrs.PublicKeyId + '&Id=' + paymentAttrs.Id;
                break;
            case "cancel":
                this._uri = endpoints['payment'];
                break;
            default:
                this._uri = endpoints['payment'];
                break;
        }
        return this._uri;
    }

    getBaseUrl() {
        return baseUrl;
    }

    getCreateUri() {
        return this.getUri("create");
    }
    getCompleteUri() {
        return this.getUri("complete");
    }
    getDetailsUri(attrs) {
        return this.getUri("get", attrs);
    }
    getCancelUri() {
        return this.getUri("cancel");
    }
}

module.exports = URI;
