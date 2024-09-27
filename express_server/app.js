const express = require('express')
const app = express()

app.get('/', function(req, res){
    res.send('Hello word')
})


app.get('/', function(req, res){
    res.send('Lo que sea')
})
app.listen(3000)
