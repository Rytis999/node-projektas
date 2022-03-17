const express = require('express');
const res = require('express/lib/response');
const Joi =require('joi')

const app = express();

app.use(express.json())

const schema =Joi.string().main(1).max(10);
 

const courses = [
    {id: 1, name: 'JS'},
    {id: 2, name: 'PHP'},
    {id: 3, name: 'Node.js'}
]

app.get('/', (req,res ) => {
    res.send(courses)
})

app.get('/: id', (req,res ) => {
let temp 
courses.map((e) => {
    if(e.id == req.params.id){
        temp = e
    }
})
if(temp != null){
    res.send(temp)

}else {
    res.status(404).send('Could find courses')
}

})





app.put('/: id', (req,res ) => {
   // res.send('Update' +req.body.name)
   courses.map((e) => {
       if(e.id == req.params.id){
           e.name = req.body.name
           res.send(e)
       }
   })
   if(temp == false){
       res.status(404).send('Could find courses')
   }
})


app.delete('/: id', (req,res ) => {
     let temp = false
    courses.map((e, index) =>{
        if(e.id == req.params.id){
            courses.splice(index,-1)
             res.send(courses)
        }
    })
    if(temp == false) {
        res.status(404).send('Couldnt find courses')
    }
})



app.post('/: id', (req,res ) => {
  if(schema.valdate(req.body.name).error == undefined){
      let id = courses [courses.length -1].id +1
      courses.push({
          id,
          name: req.body.name
      })
      res.send(courses)
  } else {
      res.status(501).send('Nmae mus be a string')
  }
})

app.listen(3000)
console.log('Listening on port 3000')