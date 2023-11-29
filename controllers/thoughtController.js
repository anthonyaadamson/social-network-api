const { Thought, User, Reaction } = require('../models');

module.exports = {
  // Function to get all of the applications by invoking the find() method with no arguments.
  // Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
  async getThought(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
      console.error(err);
    }
  },
  // Gets a single application using the findOneAndUpdate method. We pass in the ID of the application and then respond with it, or an error if not found
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Creates a new application. Accepts a request body with the entire Application object.
  // Because applications are associated with Users, we then update the User who created the app and add the ID of the application to the applications array
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        })
      }

      res.json('Created the Thought 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Updates and application using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Deletes an application from the database. Looks for an app by ID.
  // Then if the app exists, we look for any users associated with the app based on he app ID and update the applications array for the User.
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      };
      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const reaction = await Reaction.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { reactions: reaction._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Reaction created, but found no user with that ID',
        })
      }

      res.json('Created the Reaction 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async removeReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndRemove({ _id: req.params.reactionId });

      if (!reaction) {
        return res.status(404).json({ message: 'No reaction with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { reactions: req.params.reactionId },
        { $pull: { reactions: req.params.reactionId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Could not find a user with this ID',
        });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
