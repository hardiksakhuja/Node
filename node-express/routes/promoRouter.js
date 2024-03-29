const express = require("express");
const bodyparser = require("body-parser");

const promoRouter = express.Router();

promoRouter.use(bodyparser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end("Will send all promotions to you");
})
.post((req,res,next) => {
    res.end("Will add the promotion "+req.body.name+" with details "+req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promos');
})
.delete((req,res,next) => {
    res.end("Deleting all promotions");
});

promoRouter.route('/:promoId')
    .all(function (req, res, next) {
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        next();
    })

    .get(function (req, res, next) {
        res.end('Will send details of the promotion: ' + req.params.promoId + ' to you!');
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promos/'+ req.params.promoId);
      })

    .put(function (req, res, next) {
        res.write('Updating the pormotion: ' + req.params.promoId + '\n');
        res.end('Will update the pormotion: ' + req.body.name +
            ' with details: ' + req.body.description);
    })

    .delete(function (req, res, next) {
        res.end('Deleting promotion: ' + req.params.promoId);
    });


module.exports = promoRouter;