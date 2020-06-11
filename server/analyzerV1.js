// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';


// sample-metadata:
//  title: Analyze v1
async function analyzeSentimentOfText(text) {
  // [START language_sentiment_text]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Creates a client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following line to run this code.
   */
  // text = `Some protesters, news crews, and medics in Minneapolis found themselves stranded after recent protests: The tires o… https://t.co/maeyUMWxju,Buffalo protester shoved by Police could be an ANTIFA provocateur. 75 year old Martin Gugino was pushed away after… https://t.co/aFgYc1MCfD,“So if you defund police who you gone call when you’re in danger?”

  // There are a lot of resources that explains what… https://t.co/2Yign0U83R,This year has seen the lowest crime numbers in our Country’s recorded history, and now the Radical Left Democrats w… https://t.co/N3R2Bjv4v6,LAW &amp; ORDER, NOT DEFUND AND ABOLISH THE POLICE. The Radical Left Democrats have gone Crazy!,Martin Gugino, the 75-year-old Buffalo man shoved by two 30-something police officers, is a member of PUSH Buffalo,… https://t.co/5aWJKor3uI,Only in America can a 75 year old man get shoved by the police, hit his head on the pavement with blood pouring out… https://t.co/ObEjLj3aLw,“iF we aBoLiSh thE poLiCe how wiLl wE sOlvE mUrDers?” White women with podcasts, Steven.,We finally have details on Decatur (Ala.) police punching and detaining a black store owner—breaking his jaw—after… https://t.co/xTnkbO3SXW,“Defund” means that Black &amp; Brown communities are asking for the same budget priorities that White communities have… https://t.co/djbQdzCUWR,It’s disgusting how Dems &amp; Media are attacking our brave police officers.
  
  // 99.9% of police do their jobs honorably… https://t.co/vENZv1TSvq,Twitter offered no explanation for locking my account. I had started posting the names of all police officers who h… https://t.co/JBM9IyHaaU,Teachers shouldn’t be forced to buy their own supplies while our police departments purchase combat vehicles.,This is a police force begging to be defunded. https://t.co/cQY2rlWbcn,We all want to stop police brutality, but cutting funding to police departments like so many Dems want to do doesn’… https://t.co/TtBPQ1HEjL
  // twitter-search.js:29 location ,Washington, DC,Los Angeles, CA,Washington, DC,Washington, DC,DC,eugene@coolquit.com,London & Los Angeles,Birmingham, AL,Bronx + Queens, NYC,,,San Antonio, TX,Everywhere,
  // twitter-search.js:28 Some protesters, news crews, and medics in Minneapolis found themselves stranded after recent protests: The tires o… https://t.co/maeyUMWxju,Buffalo protester shoved by Police could be an ANTIFA provocateur. 75 year old Martin Gugino was pushed away after… https://t.co/aFgYc1MCfD,“So if you defund police who you gone call when you’re in danger?”
  
  // There are a lot of resources that explains what… https://t.co/2Yign0U83R,This year has seen the lowest crime numbers in our Country’s recorded history, and now the Radical Left Democrats w… https://t.co/N3R2Bjv4v6,LAW &amp; ORDER, NOT DEFUND AND ABOLISH THE POLICE. The Radical Left Democrats have gone Crazy!,Martin Gugino, the 75-year-old Buffalo man shoved by two 30-something police officers, is a member of PUSH Buffalo,… https://t.co/5aWJKor3uI,Only in America can a 75 year old man get shoved by the police, hit his head on the pavement with blood pouring out… https://t.co/ObEjLj3aLw,“iF we aBoLiSh thE poLiCe how wiLl wE sOlvE mUrDers?” White women with podcasts, Steven.,We finally have details on Decatur (Ala.) police punching and detaining a black store owner—breaking his jaw—after… https://t.co/xTnkbO3SXW,“Defund” means that Black &amp; Brown communities are asking for the same budget priorities that White communities have… https://t.co/djbQdzCUWR,It’s disgusting how Dems &amp; Media are attacking our brave police officers.
  
  // 99.9% of police do their jobs honorably… https://t.co/vENZv1TSvq,Twitter offered no explanation for locking my account. I had started posting the names of all police officers who h… https://t.co/JBM9IyHaaU,Teachers shouldn’t be forced to buy their own supplies while our police departments purchase combat vehicles.,This is a police force begging to be defunded. https://t.co/cQY2rlWbcn,We all want to stop police brutality, but cutting funding to police departments like so many Dems want to do doesn’… https://t.co/TtBPQ1HEjL
  // twitter-search.js:29 location ,Washington, DC,Los Angeles, CA,Washington, DC,Washington, DC,DC,eugene@coolquit.com,London & Los Angeles,Birmingham, AL,Bronx + Queens, NYC,,,San Antonio, TX,Everywhere,`;

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the document
  const [result] = await client.analyzeSentiment({document});

  const sentiment = result.documentSentiment;
  console.log('Document sentiment:');
  console.log(`  Score: ${sentiment.score}`);
  console.log(`  Magnitude: ${sentiment.magnitude}`);

  const sentences = result.sentences;
  sentences.forEach(sentence => {
    console.log(`Sentence: ${sentence.text.content}`);
    console.log(`  Score: ${sentence.sentiment.score}`);
    console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
  });

  // [END language_sentiment_text]
}

async function analyzeSentimentInFile(bucketName, fileName) {
  // [START language_sentiment_gcs]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Creates a client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following lines to run this code
   */
   bucketName = 'riot-sentiment-bctmik.appspot.com';
   fileName = 'my-sentiment-file.txt';

  // Prepares a document, representing a text file in Cloud Storage
  const document = {
    gcsContentUri: `gs://${bucketName}/${fileName}`,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the document
  const [result] = await client.analyzeSentiment({document});

  const sentiment = result.documentSentiment;
  console.log('Document sentiment:');
  console.log(`  Score: ${sentiment.score}`);
  console.log(`  Magnitude: ${sentiment.magnitude}`);

  const sentences = result.sentences;
  sentences.forEach(sentence => {
    console.log(`Sentence: ${sentence.text.content}`);
    console.log(`  Score: ${sentence.sentiment.score}`);
    console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
  });
  // [END language_sentiment_gcs]
}

async function analyzeEntitiesOfText(text) {
  // [START language_entities_text]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Creates a client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following line to run this code.
   */
//   const text = `Some protesters, news crews, and medics in Minneapolis found 

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects entities in the document
  const [result] = await client.analyzeEntities({document});

  const entities = result.entities;

  console.log('Entities:');
  entities.forEach(entity => {
    console.log(entity.name);
    console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
    if (entity.metadata && entity.metadata.wikipedia_url) {
      console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
    }
  });
  // [END language_entities_text]
}

async function analyzeEntitiesInFile(bucketName, fileName) {
  // [START language_entities_gcs]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Creates a client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following lines to run this code
   */
   bucketName = 'riot-sentiment-bctmik.appspot.com';
  fileName = 'my-sentiment-file.txt';

  // Prepares a document, representing a text file in Cloud Storage
  const document = {
    gcsContentUri: `gs://${bucketName}/${fileName}`,
    type: 'PLAIN_TEXT',
  };

  // Detects entities in the document
  const [result] = await client.analyzeEntities({document});
  const entities = result.entities;

  console.log('Entities:');
  entities.forEach(entity => {
    console.log(entity.name);
    console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
    if (entity.metadata && entity.metadata.wikipedia_url) {
      console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
    }
  });

  // [END language_entities_gcs]
}

async function analyzeSyntaxOfText(text) {
  // [START language_syntax_text]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Creates a client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following line to run this code.
   */
//   const text = `Some protesters, news crews, and medics in Minneapolis found 

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Need to specify an encodingType to receive word offsets
  const encodingType = 'UTF8';

  // Detects the sentiment of the document
  const [syntax] = await client.analyzeSyntax({document, encodingType});

  console.log('Tokens:');
  syntax.tokens.forEach(part => {
    console.log(`${part.partOfSpeech.tag}: ${part.text.content}`);
    console.log('Morphology:', part.partOfSpeech);
  });
  // [END language_syntax_text]
}

async function analyzeSyntaxInFile(bucketName, fileName) {
  // [START language_syntax_gcs]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Creates a client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following lines to run this code
   */
   bucketName = 'riot-sentiment-bctmik.appspot.com';
   fileName = 'my-sentiment-file.txt';

  // Prepares a document, representing a text file in Cloud Storage
  const document = {
    gcsContentUri: `gs://${bucketName}/${fileName}`,
    type: 'PLAIN_TEXT',
  };

  // Need to specify an encodingType to receive word offsets
  const encodingType = 'UTF8';

  // Detects the sentiment of the document
  const [syntax] = await client.analyzeSyntax({document, encodingType});

  console.log('Parts of speech:');
  syntax.tokens.forEach(part => {
    console.log(`${part.partOfSpeech.tag}: ${part.text.content}`);
    console.log('Morphology:', part.partOfSpeech);
  });
  // [END language_syntax_gcs]
}

async function analyzeEntitySentimentOfText(text) {
  // [START language_entity_sentiment_text]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Creates a client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following line to run this code.
   */
//   const text = `Some protesters, news crews, and medics in Minneapolis found 

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects sentiment of entities in the document
  const [result] = await client.analyzeEntitySentiment({document});
  const entities = result.entities;

  console.log('Entities and sentiments:');
  entities.forEach(entity => {
    console.log(`  Name: ${entity.name}`);
    console.log(`  Type: ${entity.type}`);
    console.log(`  Score: ${entity.sentiment.score}`);
    console.log(`  Magnitude: ${entity.sentiment.magnitude}`);
  });
  // [END language_entity_sentiment_text]
}

async function analyzeEntitySentimentInFile(bucketName, fileName) {
  // [START language_entity_sentiment_gcs]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Creates a client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following lines to run this code
   */
   bucketName = 'riot-sentiment-bctmik.appspot.com';
   fileName = 'my-sentiment-file.txt';

  // Prepares a document, representing a text file in Cloud Storage
  const document = {
    gcsContentUri: `gs://${bucketName}/${fileName}`,
    type: 'PLAIN_TEXT',
  };

  // Detects sentiment of entities in the document
  const [result] = await client.analyzeEntitySentiment({document});
  const entities = result.entities;

  console.log('Entities and sentiments:');
  entities.forEach(entity => {
    console.log(`  Name: ${entity.name}`);
    console.log(`  Type: ${entity.type}`);
    console.log(`  Score: ${entity.sentiment.score}`);
    console.log(`  Magnitude: ${entity.sentiment.magnitude}`);
  });
  // [END language_entity_sentiment_gcs]
}

async function classifyTextOfText(text) {
  // [START language_classify_text]
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Creates a client
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following line to run this code.
   */
//   const text = `Some protesters, news crews, and medics in Minneapolis found 

  // Prepares a document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Classifies text in the document
  const [classification] = await client.classifyText({document});
  console.log('Categories:');
  classification.categories.forEach(category => {
    console.log(`Name: ${category.name}, Confidence: ${category.confidence}`);
  });
  // [END language_classify_text]
}

async function classifyTextInFile(bucketName, fileName) {
  // [START language_classify_gcs]
  // Imports the Google Cloud client library.
  const language = require('@google-cloud/language');

  // Creates a client.
  const client = new language.LanguageServiceClient();

  /**
   * TODO(developer): Uncomment the following lines to run this code
   */
   bucketName = 'riot-sentiment-bctmik.appspot.com';
   fileName = 'my-sentiment-file.txt';

  // Prepares a document, representing a text file in Cloud Storage
  const document = {
    gcsContentUri: `gs://${bucketName}/${fileName}`,
    type: 'PLAIN_TEXT',
  };

  // Classifies text in the document
  const [classification] = await client.classifyText({document});

  console.log('Categories:');
  classification.categories.forEach(category => {
    console.log(`Name: ${category.name}, Confidence: ${category.confidence}`);
  });
  // [END language_classify_gcs]
}

require('yargs')
  .demand(1)
  .command(
    'sentiment-text <text>',
    'Detects sentiment of a string.',
    {},
    opts => analyzeSentimentOfText(opts.text)
  )
  .command(
    'sentiment-file <bucketName> <fileName>',
    'Detects sentiment in a file in Google Cloud Storage.',
    {},
    opts => analyzeSentimentInFile(opts.bucketName, opts.fileName)
  )
  .command('entities-text <text>', 'Detects entities in a string.', {}, opts =>
    analyzeEntitiesOfText(opts.text)
  )
  .command(
    'entities-file <bucketName> <fileName>',
    'Detects entities in a file in Google Cloud Storage.',
    {},
    opts => analyzeEntitiesInFile(opts.bucketName, opts.fileName)
  )
  .command('syntax-text <text>', 'Detects syntax of a string.', {}, opts =>
    analyzeSyntaxOfText(opts.text)
  )
  .command(
    'syntax-file <bucketName> <fileName>',
    'Detects syntax in a file in Google Cloud Storage.',
    {},
    opts => analyzeSyntaxInFile(opts.bucketName, opts.fileName)
  )
  .command(
    'entity-sentiment-text <text>',
    'Detects sentiment of the entities in a string.',
    {},
    opts => analyzeEntitySentimentOfText(opts.text)
  )
  .command(
    'entity-sentiment-file <bucketName> <fileName>',
    'Detects sentiment of the entities in a file in Google Cloud Storage.',
    {},
    opts => analyzeEntitySentimentInFile(opts.bucketName, opts.fileName)
  )
  .command('classify-text <text>', 'Classifies text of a string.', {}, opts =>
    classifyTextOfText(opts.text)
  )
  .command(
    'classify-file <bucketName> <fileName>',
    'Classifies text in a file in Google Cloud Storage.',
    {},
    opts => classifyTextInFile(opts.bucketName, opts.fileName)
  )
  .example(
    'node $0 sentiment-text "President Obama is speaking at the White House."'
  )
  .example(
    'node $0 sentiment-file my-bucket file.txt',
    'Detects sentiment in gs://my-bucket/file.txt'
  )
  .example(
    'node $0 entities-text "President Obama is speaking at the White House."'
  )
  .example(
    'node $0 entities-file my-bucket file.txt',
    'Detects entities in gs://my-bucket/file.txt'
  )
  .example(
    'node $0 syntax-text "President Obama is speaking at the White House."'
  )
  .example(
    'node $0 syntax-file my-bucket file.txt',
    'Detects syntax in gs://my-bucket/file.txt'
  )
  .example(
    'node $0 entity-sentiment-text "President Obama is speaking at the White House."'
  )
  .example(
    'node $0 entity-sentiment-file my-bucket file.txt',
    'Detects sentiment of entities in gs://my-bucket/file.txt'
  )
  .example(
    'node $0 classify-text "Android is a mobile operating system developed by Google, based on the Linux kernel and designed primarily for touchscreen mobile devices such as smartphones and tablets."'
  )
  .example(
    'node $0 classify-file my-bucket android_text.txt',
    'Detects syntax in gs://my-bucket/android_text.txt'
  )
  .wrap(120)
  .recommendCommands()
  .epilogue(
    'For more information, see https://cloud.google.com/natural-language/docs'
  )
  .help()
  .strict().argv;