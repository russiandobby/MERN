
const moment = require('moment');
const logger = require('./midlewear/logger');
const  express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const members = require('./members');
const app = express();

// Route
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'public','index.html'));
// });


// init middlewear
// app.use(logger);

// HandleBars Middlewear
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


// init body parser middlewear
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>res.render('index',{
    title:'Member App',
    members:members
}));



// Set static folders
app.use(express.static(path.join(__dirname,'public')));
// Members Api Routes
app.use('/api/members',require('./routes/api/members'));

const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));