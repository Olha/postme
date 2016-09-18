/**
 * Created by olha on 14.09.16.
 */
import { Template } from 'meteor/templating';

import { Posts } from '../../api/posts/posts.js';
import { ReactiveVar } from 'meteor/reactive-var';
import './body.html';

const CONNECTION_ISSUE_TIMEOUT = 5000;

// A store which is local to this file?
const showConnectionIssue = new ReactiveVar(false);

Meteor.startup(() => {
	// Only show the connection error box if it has been 5 seconds since
	// the app started
	setTimeout(() => {
		// FIXME:
		// Launch screen handle created in lib/router.js
		// dataReadyHold.release();

		// Show the connection error box
		showConnectionIssue.set(true);
	}, CONNECTION_ISSUE_TIMEOUT);
});

Template.appBody.onCreated(function appBodyOnCreated() {

});

Template.appBody.helpers({

});

Template.appBody.events({
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
			public: false,
			comments: [],
			votes: [],
			voteSize: 0
		});

		// Clear form
		target.text.value = '';
	}
});