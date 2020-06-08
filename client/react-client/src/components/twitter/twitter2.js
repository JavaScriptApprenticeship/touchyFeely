import React from 'react';
import data from './data.json';
import Axios from 'axios';
export const tweets = data.statuses.map(obj => obj.text).join(',')

const TwitterComponent2 = (keyword) => {

    Axios.get(`http://localhost:3021/searchTwitter/${keyword}`)
      .then(result => console.log('result from front asking server',result))
  
    return(
        <div className='twitter-div'>
        tweets2
        </div>
    )
}

export default TwitterComponent2;