import React from 'react';
// import anime from 'animejs/lib/anime.es.js';
import Sentiment from 'sentiment';
import Emoji from '../emoji/emoji-component';
import {emojiScore} from '../emoji/emoji-score';
import './sentiment.styles.scss';

//new styles
const anime = window.anime;

function animateLetters(){
var ml4 = {};
ml4.opacityIn = [0,1];
ml4.scaleIn = [0.2, 1];
ml4.scaleOut = 3;
ml4.durationIn = 800;
ml4.durationOut = 600;
ml4.delay = 500;


anime.timeline({loop: true})
  .add({
    targets: '.ml4 .letters-1',
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
  }).add({
    targets: '.ml4 .letters-1',
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
  }).add({
    targets: '.ml4 .letters-2',
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
  }).add({
    targets: '.ml4 .letters-2',
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
  }).add({
    targets: '.ml4 .letters-3',
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
  }).add({
    targets: '.ml4 .letters-3',
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
  }).add({
    targets: '.ml4',
    opacity: 0,
    duration: 500,
    delay: 500
  });
}

  var sentimentstyle = {
    div:{
        'color': '#000033',
        'padding': '.875em 1.875em 1.875em',
        'background': '#8585ad',
        'border': '2px solid #ffff4d',
        'borderRadius': '3px',
        'fontStyle': 'bold',
        'fontFamily': '"Trebuchet MS", Helvetica, sans-serif',
        'position': 'relative',
        'fontWeight': '900',
        'fontSize': '4.5em'
    },
    letters:{
        'position': 'absolute',
        'margin': 'auto',
        'left': '0',
        'top': '0.3em',
        'right': '0',
        'opacity': '0' 
        }
}


class SentimentResult extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      keywords: this.props
    }
  }

  componentDidMount(){
    animateLetters()
}

  render(){
    const {keywords} = this.state.keywords;
    const sentiment = new Sentiment();
    const Result = sentiment.analyze(keywords);
    console.dir(Result);

    return(
        <div className='sentiment-container'>
            <h3>{`The current general sentiment score from our Twitter search is ${Result.score}`}</h3>
            <h3>{`The comparative score is: ${Result.comparative}`}</h3>
            <Emoji symbol={emojiScore(Result.score)}/>
            <div className='ml4' style={sentimentstyle.div}>
                <span className="letters letter-1" style={sentimentstyle.letters}>{'Score: '}</span>
                <span className="letters letter-2" style={sentimentstyle.letters}>{Result.score}</span>
            </div>
        </div>
    )
  }
}
export default SentimentResult;