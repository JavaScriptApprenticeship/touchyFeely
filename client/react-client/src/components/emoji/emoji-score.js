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

// const emojiScoreGoogle = (result) => {

// }

    export default emojiScore;