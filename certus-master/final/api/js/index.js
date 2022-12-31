
const express = require('express')
const app = express()
const port = 3000


let sumar = (a,b)=>{return a+b}

app.get('/', (req, res)=>{

    let rpta = sumar(200,500)
    res.send(`${rpta}`);cd
    
})


app.listen(port,()=>{
    console.log(`El sevidor se esta ejecutando en http://localhost:${port}`)
})