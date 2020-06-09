import React from 'react';

import Sentiment from 'sentiment';
import Emoji from '../emoji/emoji-component';

const SentimentResult = ({keywords}) => {
   // console.log(keyword);
const sentiment = new Sentiment();
const Result = sentiment.analyze(keywords);
console.dir(Result);
const grinning = '😀';
const frowning = '🙁';
const neutral = '😐';

const emojiScore = (result) => {
  if(result < 4 && result > -4){
    return neutral;
    }
    if(result > 4 ){
      return grinning;
    }
    else return frowning;
  }

return(
    <div>
        <h3>{`The resulting score is ${Result.score}`}</h3>
        <Emoji symbol={emojiScore(Result.score)}/>
    </div>
)

}
export default SentimentResult;