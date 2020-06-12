'use strict';
import Axios from 'axios';
import express from 'express';
import modelFinder from './models/model.js';

const router = express.Router();
router.param('model', modelFinder);

let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(data) );
  res.end();
};

router.get('/searchTwitter/:query', (req, res)=> {
  console.log('query:', req.params.query);
  const config = {
    headers: { Authorization: `Bearer TWITTER_BEARER_TOKEN` }
};
Axios.get( 
  `https://api.twitter.com/1.1/search/tweets.json?q=${req.params.query}&src=typed_query`,
  config
).then(result => {
      console.log("hello2??")
      res.json(result.data)
})
  .catch(error => res.send(error));
})

router.get('/', (req,res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.write(`Hello, welcome to my Memory Game`);
  res.end();
});

router.get('/api/v1/:model', (req,res,next) => {
  req.model.find({})
    .then( data => sendJSON(res,data) )
    .catch( next );
});

router.get('/api/v1/:model/:id', (req,res,next) => {
  req.model.findById(req.params.id)
    .then( data => sendJSON(res,data) )
    .catch( next );
});

router.post('/api/v1/:model', (req,res,next) => {
  let record = new req.model(req.body);
  record.save()
    .then( data => sendJSON(res,data) )
    .catch( next );
});

router.put('/api/v1/:model/:id', (req,res, next) => {
  req.model.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then( data => sendJSON(res,data) )
    .catch(next);
});

router.delete('/api/v1/:model/:id', (req,res,next) => {
  req.model.findByIdAndDelete(req.params.id)//or .findByIdAndRemove
    .then(data => sendJSON(res, data))
    .catch(next);
});

export default router;
