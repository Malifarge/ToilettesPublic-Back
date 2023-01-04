const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 5000
const toilettesRoutes = require('./Routes/toilettes')

require('./models')

app.use(express.json())
app.use(cors())

app.use('/toilettes',toilettesRoutes)

app.listen(PORT,()=>{
    console.log(`Serveur running on ${PORT}`);
})