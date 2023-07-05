const express = require("express");
const app = express.Router();
const axios = require("axios").default
require("dotenv").config()
const { URLSearchParams } = require("url");

const encodedParams = new URLSearchParams()
const CryptoJS = require("crypto-js");
app.route("/peach-payment/checkout")
    .post(async (req, res) => {
        try {
            const randomString = (length, chars) => {
                let result = "";
                for (let i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
                return result;
            }
            let nonce = randomString(20, "abcdefghijklmnopqrstuvwxyz0123456789")
            const paymentParams = {
                "amount": "2",
                "authentication.entityId": "8ac7a4c978c689430178cfc0ca7510b8",
                "currency": "ZAR",
                "defaultPaymentMethod": "CARD",
                "merchantTransactionId": "Test12345",
                "nonce": nonce,
                "notificationUrl": "",
                "paymentType": "DB",
                "shopperResultUrl": "https://underarmour.co.za"
            }

            const axios = require("axios");
            const secret = "0703503a9d0511eba6e102d14de18c0c"
            let message = Object.keys(paymentParams).sort().map(key => `${key}${paymentParams[key]}`).join("");
            console.log(secret, "secret")
            const signature = CryptoJS.HmacSHA256(message, secret).toString(CryptoJS.enc.Hex);
            console.log(signature, "signature")
            encodedParams.set("authentication.entityId", "8ac7a4c978c689430178cfc0ca7510b8");
            encodedParams.set("signature", signature);
            encodedParams.set("merchantTransactionId", "Test12345");
            encodedParams.set("amount", "2");
            encodedParams.set("paymentType", "DB");
            encodedParams.set("currency", "ZAR");
            encodedParams.set("nonce", nonce);
            encodedParams.set("shopperResultUrl", "https://underarmour.co.za");
            encodedParams.set("defaultPaymentMethod", "CARD");
            encodedParams.set("forceDefaultMethod", "false");
            encodedParams.set("merchantInvoiceId", "INV-0001");
            encodedParams.set("cancelUrl", "https://mydemostore.com/OrderNo453432/cancelled");
            encodedParams.set("notificationUrl", "https://mydemostore.com/OrderNo453432/webhook");
            encodedParams.set("customer.merchantCustomerId", "971020");
            encodedParams.set("customer.givenName", "John");
            encodedParams.set("customer.surname", "Smith");
            encodedParams.set("customer.mobile", "27123456789");
            encodedParams.set("customer.email", "johnsmith@mail.com");
            encodedParams.set("customer.status", "EXISTING");
            encodedParams.set("customer.birthDate", "1970-02-17");
            encodedParams.set("customer.ip", "192.168.1.1");
            encodedParams.set("customer.phone", "27123456789");
            encodedParams.set("customer.idNumber", "9001010000084");
            encodedParams.set("billing.street1", "1 Example Road");
            encodedParams.set("billing.street2", "LocalityA");
            encodedParams.set("billing.city", "Cape Town");
            encodedParams.set("billing.company", "CompanyA");
            encodedParams.set("billing.country", "ZA");
            encodedParams.set("billing.state", "Western Cape");
            encodedParams.set("billing.postcode", "1234");
            encodedParams.set("shipping.street1", "1 Example Road");
            encodedParams.set("shipping.street2", "LocalityA");
            encodedParams.set("shipping.city", "Cape Town");
            encodedParams.set("shipping.company", "CompanyA");
            encodedParams.set("shipping.postcode", "1234");
            encodedParams.set("shipping.country", "ZA");
            encodedParams.set("shipping.state", "Western Cape");
            encodedParams.set("cart.tax", "15.00");
            encodedParams.set("cart.shippingAmount", "12.25");
            encodedParams.set("cart.discount", "02.25");
            encodedParams.set("createRegistration", "false");
            encodedParams.set("originator", "Webstore");
            encodedParams.set("returnTo", "STORE");

            const options = {
                method: "POST",
                url: "https://testsecure.peachpayments.com/checkout",
                headers: { accept: "text/html", Referer: "https://underarmour.co.za", "content-type": "application/x-www-form-urlencoded" },
                data: encodedParams,
            };

            axios
                .request(options)
                .then(function (response) {
                    res.send(response.data)
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
        catch (error) {
            console.log(error.message)
        }
    })

app.route("/peach-payment/checkout/initiate")
    .post(async (req, res) => {
        try {
            const randomString = (length, chars) => {
                let result = "";
                for (let i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
                return result;
            }
            let nonce = randomString(20, "abcdefghijklmnopqrstuvwxyz0123456789")
            // PEACH_PAYMENT_ENTITY_ID: 8ac7a4c978c689430178cfc0ca7510b8
            const paymentParams = {
                "amount": "2",
                "authentication.entityId": "8ac7a4c978c689430178cfc0ca7510b8",
                "billing.city": "Cape Town",
                "billing.company": "CompanyA",
                "billing.country": "ZA",
                "billing.postcode": "1234",
                "billing.state": "Western Cape",
                "billing.street1": "1 Example Road",
                "billing.street2": "LocalityA",
                "cart.tax": "15.00",
                "cart.shippingAmount": "12.25",
                "cart.discount": "02.25",
                "createRegistration": "false",
                "currency": "ZAR",
                "customer.birthDate": "1970-02-17",
                "customer.email": "johnsmith@mail.com",
                "customer.givenName": "John",
                "customer.idNumber": "9001010000084",
                "customer.ip": "192.168.1.1",
                "customer.merchantCustomerId": "971020",
                "customer.mobile": "27123456789",
                "customer.phone": "27123456789",
                "customer.status": "EXISTING",
                "customer.surname": "Smith",
                "defaultPaymentMethod": "CARD",
                "forceDefaultMethod": "true",
                "merchantInvoiceId": "INV-0001",
                "merchantTransactionId": "Test1234",
                "nonce": nonce,
                "originator": "Webstore",
                "paymentType": "DB",
                "returnTo": "STORE",
                "shipping.city": "Cape Town",
                "shipping.company": "CompanyA",
                "shipping.country": "ZA",
                "shipping.postcode": "1234",
                "shipping.state": "Western Cape",
                "shipping.street1": "1 Example Road",
                "shipping.street2": "LocalityA",
                "shopperResultUrl": "https://webhook.site/4e9b63bf-0d99-4d62-bd24-1d36ca866e1b",
            }
            // PEACH_PAYMENT_SECRET_KEY: 0703503a9d0511eba6e102d14de18c0c
            const secret = "0703503a9d0511eba6e102d14de18c0c"
            let message = Object.keys(paymentParams).sort().map(key => `${key}${paymentParams[key]}`).join("");
            console.log(message)
            const signature = CryptoJS.HmacSHA256(message, secret).toString(CryptoJS.enc.Hex);
            console.log(signature)
            const request_data = {
                "amount": "2",
                "authentication.entityId": "8ac7a4c978c689430178cfc0ca7510b8",
                "currency": "ZAR",
                "defaultPaymentMethod": "CARD",
                "merchantTransactionId": "Test1234",
                "nonce": nonce,
                "paymentType": "DB",
                "shopperResultUrl": "https://webhook.site/4e9b63bf-0d99-4d62-bd24-1d36ca866e1b",
                "signature": signature,
                "forceDefaultMethod": "true",
                "merchantInvoiceId": "INV-0001",
                "customer.merchantCustomerId": "971020",
                "customer.givenName": "John",
                "customer.surname": "Smith",
                "customer.mobile": "27123456789",
                "customer.email": "johnsmith@mail.com",
                "customer.status": "EXISTING",
                "customer.birthDate": "1970-02-17",
                "customer.ip": "192.168.1.1",
                "customer.phone": "27123456789",
                "customer.idNumber": "9001010000084",
                "billing.street1": "1 Example Road",
                "billing.street2": "LocalityA",
                "billing.city": "Cape Town",
                "billing.company": "CompanyA",
                "billing.country": "ZA",
                "billing.state": "Western Cape",
                "billing.postcode": "1234",
                "shipping.street1": "1 Example Road",
                "shipping.street2": "LocalityA",
                "shipping.city": "Cape Town",
                "shipping.company": "CompanyA",
                "shipping.postcode": "1234",
                "shipping.country": "ZA",
                "shipping.state": "Western Cape",
                "cart.tax": "15.00",
                "cart.shippingAmount": "12.25",
                "cart.discount": "02.25",
                "createRegistration": "false",
                "originator": "Webstore",
                "returnTo": "STORE"
            }

            const options = {
                method: "POST",
                url: "https://testsecure.peachpayments.com/checkout/initiate",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json"
                },
                data: request_data
            };

            axios
                .request(options)
                .then(function (response) {
                    res.send(response.data)
                })
                .catch(function (error) {
                    console.error(error.response.data);
                    res.send(error.response.data)
                });
        }
        catch (error) {
            console.log(error.message)
        }
    })
module.exports = app