// const Logger = require('./logger');
// const logger = new Logger();
// logger.on('message',(data)=>console.log('Called Listener:',data));
// logger.log("hello World!");
// const Person = require('./person');
// const person1 = new Person('John Doe',30);
// person1.greeting();

const http = require('http');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 5000;

const server = http.createServer((req,res)=>{
//     if(req.url === '/'){
//         fs.readFile(path.join(__dirname,'public','index.html'),(err,content)=>{
//             if(err) throw err;
//         res.writeHead(200,{'Content-Type':'text/html'});
//         res.end(content);
//         });

  
//     }
//     if(req.url === '/api/users'){
//         const users = [
//            {name:'BOB',age:30} ,{name:'ROR',age:300}
//         ];
//         res.writeHead(200,{'Content-Type':'application/json'});
//         res.end(JSON.stringify(users));
  
//     }
// console.log(req.url);





// Build file path dynamic
let filePath = path.join(__dirname,'public', req.url === '/' ? 'index.html' : req.url);
// console.log(filePath);
// res.end();
// extension of the file
let extName = path.extname(filePath);
// Initial Content Type
let contentType = 'text/html';
// check extension and set ext type
switch(extName){
   case '.js':
       contentType = 'text/javascript';
       break; 
   case '.css':
       contentType = 'text/css';
       break; 
   case '.json':
       contentType = 'application/json';
       break; 
   case '.png':
       contentType = 'image/png';
       break; 
   case '.jpg':
       contentType = 'image/jpg';
       break; 
}
// Read File
fs.readFile(filePath,(err,content) =>{
    if(err){
        if(err.code == 'ENOENT'){
            //page not found
            fs.readFile(path.join(__dirname,'public','404.html'),(err,content)=>{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(content,'utf8');
            });
        }else{
            // Some server error
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
        }
    }else{
        // Success
        res.writeHead(200,{'Content-Type':contentType});
        res.end(content,'utf8');
    }
});
});
server.listen(PORT,()=>console.log(`server running on port:${PORT}`));