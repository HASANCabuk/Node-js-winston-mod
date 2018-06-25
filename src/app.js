const express=require('express')
const app=express()
const winston=require('winston');
const logger=winston.createLogger({
    level:'info',
    format:winston.format.json(),
    transports :[
        new winston.transports.File({
            filename:'error.log',level:'error' }),
        new winston.transports.File({
            filename:'conbined.log'})
    ]
});
if(process.env.NODE_ENV!=='production'){
    logger.add(new winston.transports.Console({
        format:winston.format.simple()
    }));
}
app.get('/',function(req,res){
    res.status(200).send('Geldinn mi!!')
})
app.get('/login',function(req,res){
    res.send('Logindesin nnn!!')
})
app.listen('8000');
//module.exports=logger
app.all("*",(req,res,next)=>{
    logger.info("Incoming request",{method:req.method});
    logger.debug("Inconing request verbose",{
        headers:req.headers,
        query:req.query,
        body:req.body
    });
    return next();
});
   
 //logger.info('Hello again distributed logs');
  

 
