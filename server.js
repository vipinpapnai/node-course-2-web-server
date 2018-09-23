const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}  ${req.method}  ${req.url}`;
  console.log(now);
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
})
//register middleware

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// })


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

app.get('/',(req,res)=>{
  // res.send('Hello Express!');
  res.render('home.hbs',{
    pageTitle: 'HomePage',
    welcomeMessage: 'Welcome to node',
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle : 'About Page'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Something went wrong..Try again after sometime'
  });
});

app.get('/projects',(req,res)=>{
  res.render('projects.hbs')
});

app.listen(port,()=>{
  console.log('Server is up on port '+port);
});
