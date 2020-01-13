const express = require('express');

const app = express();

// Middlewares func that executes when a route is hit
app.use('/posts', ()=>{
    console.log('Middlewear Running.....');});

// No we can make routes
// 
app.get('/',(req,res) =>{
    res.send('we are on home');
});
app.get('/posts',(req,res) =>{
    res.send('we are on Posts');
});







// Start listening to server
const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
