const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const reactionSchema = require('./Reaction');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: [{
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    }],
    createdAt: [{
      type: Date,
      default: Date.now,
    }],
    username: [{
      type: String,
      required: true,
    }],
    reactions: [{
      type: Schema.Types.ObjectId,
      ref: 'Reaction'
    }]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
