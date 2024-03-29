const express = require("express");
const bodyparser = require("body-parser");

const leaderRouter = express.Router();

leaderRouter.use(bodyparser.json());

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{
    res.end("Will send all leaders to you");
})
.post((req,res,next) => {
    res.end("Will add the leader "+req.body.name+" with details "+req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req,res,next) => {
    res.end("Deleting all leaders");
});

leaderRouter.route('/:leaderId')
    .all(function (req, res, next) {
        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        next();
    })

    .get(function (req, res, next) {
        res.end('Will send details of the leader: ' + req.params.leaderId + ' to you!');
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /leader/'+ req.params.leaderId);
      })

    .put(function (req, res, next) {
        res.write('Updating the promotion: ' + req.params.leaderId + '\n');
        res.end('Will update the promotion: ' + req.body.name +
            ' with details: ' + req.body.description);
    })

    .delete(function (req, res, next) {
        res.end('Deleting promotion: ' + req.params.leaderId);
    });


module.exports = leaderRouter;