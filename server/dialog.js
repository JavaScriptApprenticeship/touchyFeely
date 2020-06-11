'use strict'

const language = require('@google-cloud/language');

function analyzeSentimentOfText(text){
// Imports the Google Cloud client library


// Creates a client
const client = new language.LanguageServiceClient();

/**
 * TODO(developer): Uncomment the following line to run this code.
 */
// Prepares a document, representing the provided text
const document = {
  content: text,
  type: 'PLAIN_TEXT',
};

let sentiment, sentences;
async function callFunction() {
// Detects the sentiment of the document
const [result] = await client.analyzeSentiment({document});

sentiment = result.documentSentiment;
console.log('Document sentiment:');
console.log(`  Score: ${sentiment.score}`);
console.log(`  Magnitude: ${sentiment.magnitude}`);

sentences = result.sentences;
sentences.forEach(sentence => {
  console.log(`Sentence: ${sentence.text.content}`);
  console.log(`  Score: ${sentence.sentiment.score}`);
  console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
});
console.log('sentiment score:', sentiment.score)
return sentiment;
}
return callFunction()

};

export default analyzeSentimentOfText;