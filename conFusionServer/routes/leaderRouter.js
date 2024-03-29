const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

const Leaders = require('../models/leaders.js');

const leaderRouter = express.Router();

leaderRouter.use(bodyparser.json());

leaderRouter.route('/')
.get((req,res,next)=>{
    Leaders.find({})
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader)
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    Leaders.create(req.body)
    .then((leader) => {
        console.log('Leader Created',leader);
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(leader);
    },(err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 404;
    res.end('PUT operation not supported on /promos');
})
.delete((req,res,next) => {
    Leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(resp)
    },(err) => next(err))
    .then((err) => next(err));
});

leaderRouter.route('/:leaderId')
    .get(function (req, res, next) {
        Leaders.findById(req.params.leaderId)
        .then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','appication/json');
            res.json(leader)
        },(err)=>next(err))
        .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promos/'+ req.params.promoId);
      })

    .put(function (req, res, next) {
        Leaders.findByIdAndUpdate(req.params.leaderId,{
            $set : req.body
        },{new : true})
        .then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-type','application/json');
            res.json(leader);
        },(err) => next(err))
        .catch((err)=>next(err));
    })

    .delete(function (req, res, next) {
        Leaders.findByIdAndRemove(req.params.leaderId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-type','application/json');
            res.json(resp)
        },(err) => next(err))
        .catch((err) => next(err));
    });

module.exports = leaderRouter;