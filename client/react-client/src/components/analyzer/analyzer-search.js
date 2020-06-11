import React from 'react';
import Axios from 'axios';
import Sentiment from 'sentiment';
import Emoji from '../emoji/emoji-component';
import emojiScore from '../emoji/emoji-score';

class AnalyzerSearch extends React.Component{
constructor(props){
    super(props);
 this.state = {
     keywords: this.props,
     score: '',
     magnitude: ''
 }
}
 componentDidMount(){
    const sentiment = new Sentiment();
    const {keywords} = this.state.keywords;

    const Result = sentiment.analyze(keywords);
    const cleanWords = Result.tokens.join(",")

    console.log('clean words:', cleanWords)
    Axios.get(`http://localhost:3021/api/v1/analyzer/${cleanWords}`)
      .then(result => {
          const score = result.data.results.score;
          const magnitude = result.data.results.score;
          console.log("the score:",score);
        this.setState({score, magnitude});
        });
 }

 render(){
     const {score, magnitude} = this.state;
     console.log("score!!!",score);

     const emojiGScore = () => {
         if(score > 0.25) {
            if(score > 0.5 || magnitude > 1){
                return '😀';
            }
            else {
                return '🙂';
            }
         }
         if(score < -0.25) {
            if(score < -0.5 || magnitude > 1) {
                return '😢';
            }
            else {
                return '🙁';
            }
         }
         else return '😐';
     }

    return(
        <div className='twitter-div'>
            {/* <h2>Analyzer score from google:</h2> */}
            <h3>{`The general sentiment from Google Sentiment Analysis is: ${score}`}</h3>
            <h3>{`The magnitude score is: ${magnitude}`}</h3>
        <Emoji symbol={emojiGScore()}/>
        </div>
    )
}
}

export default AnalyzerSearch;