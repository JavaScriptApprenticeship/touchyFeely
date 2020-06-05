'use strict';

import mongoose, {Schema} from 'mongoose';

const UserSchema = mongoose.Schema({
  name: { type: String },
  keywords: { type: String },

});

export default mongoose.model('user', UserSchema);