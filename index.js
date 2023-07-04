const express = require('express')
const bodyParser = require("body-parser")

const cors = require('cors')
const app = express()
const peachPaymentRouter = require('./routes/peach-payment')
const payJustNowRouter = require('./routes/payjustnow')
app.use(bodyParser.json())
app.use(cors())
const port = process.env.PORT || 8080

app.use('/',peachPaymentRouter)
app.use('/',payJustNowRouter)

app.listen(port, () => {
  console.log(`Running on PORT  ${port}`)
})