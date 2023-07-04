const express = require('express');
const app = express.Router();
const axios = require('axios').default

const { URLSearchParams } = require('url');

app.route('/payjustnow')
    .post(async (req, res) => {
        try {
          res.send({a:'f'})
        }
        catch (error) {
            console.log(error.message)
        }
    })
module.exports = app