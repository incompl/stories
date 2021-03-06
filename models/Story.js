/* jshint node:true */

var mongoose = require('mongoose');

var storySchema = mongoose.Schema({
  title: String,
  owner: String,
  theme: String,
  read: String,
  write: String,
  environment: [String],
  chaptersLeft: Number
});

storySchema.methods.onCreate = function() {
  console.log(this.title + ' has begun.');
};

storySchema.statics.random = function(callback) {
  this.count(function(err, count) {
    if (err) {
      return callback(err);
    }
    var rand = Math.floor(Math.random() * count);
    this.findOne({read: 'public'}).skip(rand).exec(callback);
  }.bind(this));
};

var Story = mongoose.model('Story', storySchema);

module.exports = Story;
