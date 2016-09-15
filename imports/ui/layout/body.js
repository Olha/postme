/**
 * Created by olha on 14.09.16.
 */
import { Template } from 'meteor/templating';

import { Posts } from '../../api/posts.js';

import '../../startup/both/accounts-config.js';
import '../components/post.js'
import './body.html';

Template.body.helpers({
	posts() {
		return Posts.find({}, {sort: {createdAt: -1}});
	},
});

Template.body.events({
	'submit .new-post'(event) {
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		const target = event.target;
		const text = target.text.value;

		// Insert a post into the collection
		Posts.insert({
			text,
			createdAt: new Date(), // current time
			owner: Meteor.userId(),
			username: Meteor.user().username,
			comments: [],
			vote: []
		});

		// Clear form
		target.text.value = '';
	},
});