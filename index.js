const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 5000

require('./models')

app.use(express.json())
app.use(cors())

app.listen(PORT,()=>{
    console.log(`Serveur running on ${PORT}`);
})