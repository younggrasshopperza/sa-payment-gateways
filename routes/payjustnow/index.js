const express = require('express');
const app = express.Router();
const axios = require('axios').default

const { URLSearchParams } = require('url');

// replace these with actual values


const { validateSignature, createSignature } = require('./auth')
app.route('/payjustnow')
    .post(async (req, res) => {
        try {
            const createOrder = await createCheckout(req.body)
            res.send({ createOrder })
        }
        catch (error) {
            console.log(error.message)
        }
    })
module.exports = app

const createCheckout = async (payload) => {
    console.log(payload)
    const orderItems = {
        "requestId": "1234567",
        "payjustnow": {
            "merchantOrderReference": "12345676",
            "orderAmountCents": 200000,
            "orderItems": [
                {
                    "name": "UGG Boots Purple Size 6",
                    "sku": "UGG-BB-PUR-06",
                    "quantity": 2,
                    "priceCents": 100000,
                    "imageUrl": "https://merchantstore.com/uggboots/purp6.jpeg",
                    "pageUrl": "https://merchantstore.com/uggboots",
                    "searchTerms": [
                        "ugg",
                        "boots",
                        "purple"
                    ],
                    "category": "Fashion Apparel"
                }
            ],
            "customer": {
                "firstName": "alex",
                "lastName": "string",
                "email": "string",
                "phoneNumber": "string"
            },
            "billingAddress": {
                "addressLine1": "string",
                "addressLine2": "string",
                "city": "string",
                "province": "string",
                "postalCode": "string"
            },
            "shippingAddress": {
                "addressLine1": "string",
                "addressLine2": "string",
                "city": "string",
                "province": "string",
                "postalCode": "string"
            },
            "confirmRedirectUrl": "string",
            "cancelRedirectUrl": "string"
        },
        "checkoutTotalCents": 200000,
        "clickTraceId": "123453"
    }
    const signature = await createSignature(orderItems, process.env.PAYJUST_NOW_SANDBOX_SIGNING_KEY)
    const isSignatureValid = await validateSignature(orderItems, process.env.PAYJUST_NOW_SANDBOX_SIGNING_KEY, signature)
    if (isSignatureValid) {
        const options = {
            method: 'POST',
            url: process.env.PAYJUST_NOW_SANDBOX_LINK,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-Merchant-Account-ID': process.env.PAYJUST_NOW_MERCHANT_ID,
                'X-Signature': signature,
            },
            data: orderItems
        };

        const { data } = await axios
            .request(options)
            .then(function (response) {

                return response
            })
            .catch(function (error) {
                // console.log(error)
                return error.response.data
            });
        return data
    }
}