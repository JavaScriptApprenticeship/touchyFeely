import React from 'react';
import Axios from 'axios';

import SentimentResult from '../sentiment/sentiment';

class TwitterSearch extends React.Component{
constructor(props){
    super(props);
 this.state = {
     keyword: this.props,
     twit: ''
 }
}
 componentDidMount(){
    const {keyword} = this.state.keyword;
    console.log('this.state.keyword:', keyword)
    Axios.get(`http://localhost:3021/searchTwitter/${keyword}`)
      .then(result => {
          const twit = result.data.statuses.map(obj => obj.text).join(',')
        this.setState({twit})
        });
 }
 render(){
     const {twit} = this.state;
     console.log(twit);
    return(
        <div className='twitter-div'>
            {twit && <SentimentResult keywords={twit}/>}
        </div>
    )
}
}

export default TwitterSearch;