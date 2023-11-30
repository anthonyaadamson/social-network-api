# Social Media API 

This is an API built using express that would be useful for a social media application

# Models

## Users

Users will contain a username, email, thoughts and friends

## Thoughts

Thoughts will contain the thought text, a created at timestamp, the username of the user that created the thought, and reactions to the thought.

#  Reaction Schema

The reaction will contain a reaction ID, reaction body, a username and a created at timestamp.


# Routes

The routes used in this API will all be behind the "localhost:3001/api/" route to differentiate the api from the rest of the application.

## Users

 - Create a User
 - Get all Users
 - Get single User by ID
 - Update User by ID
 - Delete a User by ID and all associated subdocuments.

## Thoughts

 - Create a thought
 - Get all thoughts
 - Get a single thought by ID
 - Update thought
 - Delete thought 

# Demonstration