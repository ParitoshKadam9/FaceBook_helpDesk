const express = require('express')
const app = express()
const port = 5000
// const cors = require('cors');

// const hookroutes = require('./routes/webhooks')
const accessToken = "EAALySOJUMrQBOZBq5y57LN4l81ZB75yBmKU7FFPrZC4sRtrHNfiQtsZBDiWYff2W8F13EZAU3gfRzhEdddWkCz6TNVh08OUIeYSR0tMcIZA5nC7nwzmZAZCs2bqct0zlbFrB7s7x5JqXYQ9zC69gMy0DwsmmwhqsodZBMUYHhWZBGlq3ZCvGJuSBZCTgjTxmPaxA1ZAYq"
const veryfyToken = "Nigger"

app.use("/api/hook", require("./routes/webhooks"));

app.listen(5000)