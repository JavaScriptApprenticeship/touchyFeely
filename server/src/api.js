'use strict';
import Axios from 'axios';
import express from 'express';
import modelFinder from './models/model.js';
import analyzeSentimentOfText from '../dialog';
// import DataModel from './models/dataModel';

const router = express.Router();
router.param('model', modelFinder);

let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(data) );
  res.end();
};

router.get('/searchTwitter/:query', (req, res) => {
  console.log('query:', req.params.query);
  const config = {
    headers: { Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAIq8EwEAAAAA1i3kkwKJ8V3zXpr5fmK%2Fr8FNEBg%3Dh09Ia3oP4QvHY7jaSjt7xEgMyfyOSVFa9tkZGvpVqk31LFcjI8` }
};
Axios.get( 
  `https://api.twitter.com/1.1/search/tweets.json?q=${req.params.query}&q=geocode=47.6062,122.0060,10mi&result_type=popular&count=50`,
  config
).then(result => {
      res.json(result.data)
})
  .catch(error => res.send(error));
})

// Route for google cloud sentiment analyzer
router.get('/api/v1/analyzer/:keywords', async (req, res) => {
  const {keywords} = req.params;
  // call the dialog function
  const results = await analyzeSentimentOfText(keywords);
  console.log("api results",results)
  res.json({results})
})


router.get('/', (req,res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.write(`Hello`);
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
// router.post('/api/v1/:model', (req,res,next) => {
// res.send('dawn');
// });

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