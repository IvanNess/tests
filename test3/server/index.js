const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(bodyParser.json()) 

app.post('/', (req, res)=>{
    const data = req.body
    res.send(`your object was caught`)
})

app.listen(4000, () => {
    console.log('app started')
})