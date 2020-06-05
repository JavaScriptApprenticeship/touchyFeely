'use strict';

import mongoose, {Schema} from 'mongoose';

const TwitterResultsSchema = mongoose.Schema({
  twitterResults: { type: String }

});

export default mongoose.model('twitterResults', TwitterResultsSchema);