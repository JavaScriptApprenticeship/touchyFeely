import React from 'react';

import Sentiment from 'sentiment';
import Emoji from '../emoji-component';
import {tweets} from '../twitter/twitter2';

const SentimentResult = () => {
const sentiment = new Sentiment();
const Result = sentiment.analyze(tweets);
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
        <Emoji symbol={emojiScore(Result.score)}/>
    </div>
)

}
export default SentimentResult;