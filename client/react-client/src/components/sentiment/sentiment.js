import React from 'react';

import Sentiment from 'sentiment';
import Emoji from '../emoji/emoji-component';
import {emojiScore} from '../emoji/emoji-score';
import './sentiment.styles.scss';


const SentimentResult = ({keywords}) => {
  const sentiment = new Sentiment();
  const Result = sentiment.analyze(keywords);
  console.dir(Result);

  return(
      <div className='sentiment-container'>
          <h3>{`The current general sentiment score from our Twitter search is ${Result.score}`}</h3>
          <h3>{`The comparative score is: ${Result.comparative}`}</h3>
          <Emoji symbol={emojiScore(Result.score)}/>
      </div>
  )
}
export default SentimentResult;