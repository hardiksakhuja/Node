const express = require("express");
const bodyparser = require("body-parser");

const dishRouter = express.Router();

dishRouter.use(bodyparser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end("Will send all dishes to you");
})
.post((req,res,next) => {
    res.end("Will add the dish "+req.body.name+" with detils "+req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req,res,next) => {
    res.end("Deleting all dishes");
});


module.exports = dishRouter;