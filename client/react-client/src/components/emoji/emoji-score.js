const grinning = '😀';
const smile = '🙂';
const frowning = '🙁';
const sad = '😢';
const neutral = '😐';

  export const emojiScore = (result) => {
    if(result < 4 && result > -4){
      return neutral;
      }
      if(result > 4 ){
        return grinning;
      }
      else return frowning;
    }

    export const emojiGScore = (score,magnitude) => {
      if(score > 0.25) {
         if(score > 0.5 || magnitude > 1){
             return grinning;
         }
         else {
             return smile;
         }
      }
      if(score < -0.25) {
         if(score < -0.5 || magnitude > 1) {
             return sad;
         }
         else {
             return frowning;
         }
      }
      else return neutral;
  }