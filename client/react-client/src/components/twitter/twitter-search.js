import React from 'react';
import Axios from 'axios';
import superagent from 'superagent';

import SentimentResult from '../sentiment/sentiment';
import AnalyzerResult from '../analyzer/analyzer-search';
class TwitterSearch extends React.Component{
constructor(props){
    super(props);
 this.state = {
     keyword: this.props,
     locationFilter: '',
     twit: '',
     twitLocation: ''
 }
}
 componentDidMount(){
    const {keyword} = this.state.keyword;
    console.log('this.state.keyword:', keyword)
    Axios.get(`http://localhost:3021/searchTwitter/${keyword}`)
      .then(result => {
          const twit = result.data.statuses.map(obj => obj.text).join(',')
          const twitLocation = result.data.statuses.map(obj => obj.user.location).join(',')
        this.setState({twit, twitLocation})
        });

        superagent.post('http://localhost:3021/api/v1/user')
        .send({"twitResult": this.state.twit})
        .then(res => {
           return res;
        })
 }
 render(){
     const {twit, twitLocation} = this.state;
     console.log(twit);
     console.log('location',twitLocation)
    return(
        <div className='twitter-div'>
            {twit && <SentimentResult keywords={twit}/>}
            {twit && <AnalyzerResult keywords={twit}/>}
        </div>
    )
}
}

export default TwitterSearch;