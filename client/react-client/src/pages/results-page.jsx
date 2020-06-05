import React from 'react';
import SentimentResult from '../components/sentiment/sentiment';
import TwitterComponent from '../components/twitter/twitter';

const ResultsPage = () => (
    <div>
        <h2>this is the results</h2>
        <SentimentResult/>
        <TwitterComponent/>
    </div>
)
export default ResultsPage;