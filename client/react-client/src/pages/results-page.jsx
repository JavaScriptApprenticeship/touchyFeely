import React from 'react';
import SentimentResult from '../components/sentiment/sentiment';
import TwitterComponent2 from '../components/twitter/twitter2';
import Axios from 'axios';



const ResultsPage = () => {
    let users = Axios.get(`http://localhost:3021/api/v1/user`)
      .then(result => console.log('results page get user obj',result));
      console.log(users);

  return(
    <div>
        <h2>this is the results</h2>
        {/* <h2>{users.data[2].keywords}</h2> */}
        <SentimentResult/>
        <TwitterComponent2 />
    </div>
  )
}
export default ResultsPage;