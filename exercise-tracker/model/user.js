const ShortId = require('mongoose-shortid-nodeps');
const mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });       // Needed since Mongo 3.6.2, The $pushAll operator is no longer supported in earlier versions
const Schema = mongoose.Schema;

// the model to work with
const UserSchema = new Schema({
  userId: {
    type: ShortId,
    unique: true,
    len: 4,
    base: 62,
  },
  name: String,
  exercises: [{
    type: Schema.Types.ObjectId,
    ref: 'exercise'
  }]
});

UserSchema.virtual('total').get(function() {
  return this.exercises.length;
});

// Create the model class
const UserModel = mongoose.model('user', UserSchema);

// Export the model
module.exports = UserModel;
