import React from 'react';
import Twitter from 'twitter';
import './twitter.styles.scss';
require('dotenv').config();

// const client = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });

const client = new Twitter({
    consumer_key: 'I0HORW2j8XV5bVf8SDz5ZJgYR',
    consumer_secret: '8wBlRhm1TBnXGcSSHThCBofmyc1dJcdtMXNXNMpIS0XcY4aTFS',
    access_token_key: '1190083553184215040-SknuZKjnOjdFG5Luvzh4OxvkMrEmtE',
    access_token_secret: 'X2wO2oGZObsz9equnnikhlE0nBJaORbqf1O2GQzFEROac'
  });

const TwitterComponent = () => {
//     client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
//     console.log("tweets: ", tweets);
//     console.log(response);
//  });

 client.get('favorites/list', function(error, tweets, response) {
  if(error) throw error;
  console.log(tweets);  // The favorites.
  console.log(response);  // Raw response object.
});

 return(
   <div className='twitter-div'>
     tweets
   </div>
 )
}
 
export default TwitterComponent;