const express = require('express')
const cors = require('cors');
const connecttomongo = require('./db.js')
const dotenv = require('dotenv')

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())


const PORT = process.env.PORT || 8080

app.use("/employee",require('./controllers/employeeRoutes.js'))

connecttomongo()

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})


