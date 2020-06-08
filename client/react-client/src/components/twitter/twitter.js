import React from 'react';
import Twitter from 'twitter';
import './twitter.styles.scss';
require('dotenv').config();

const myHeaders = new Headers();
myHeaders.append("Authorization", process.env.TWITTER_BEARER_TOKEN);

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
  mode: 'no-cors',
  credentials: 'include',
};

  const client = new Twitter({
  });

const TwitterComponent = () => {
//     client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
//     console.log("tweets: ", tweets);
//     console.log(response);
//  });

 client.get('https://api.twitter.com/1.1/search/tweets.json?q=Trump&src=typed_query', {requestOptions}, function(error, tweets, response) {
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
