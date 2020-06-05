import React from 'react';

import Sentiment from 'sentiment';

const SentimentResult = () => {
const sentiment = new Sentiment();
const Result = sentiment.analyze('Cats are stupid and stupid and stupid. I hate cats. I think cats are nice i love to hate hate ');
console.dir(Result);

return(
    <div>
        {Result.score}
    </div>
)

}
export default SentimentResult;