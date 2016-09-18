/**
 * Created by olha on 14.09.16.
 */
import { Template } from 'meteor/templating';
import { Posts } from '../../api/posts/posts.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';

import './comment'
import './post.html';


Template.post.onCreated(function appBodyOnCreated() {
	this.state = new ReactiveDict();
	this.state.setDefault({
		commentsOpen: false
	});
});

Template.post.helpers({
	commentsOpen() {
		const instance = Template.instance();
		return instance.state.get('commentsOpen');
	},
	isUser(){
		return Meteor.userId()
	},
	comments: function() {
		var post = Posts.findOne(this._id);
		return _.sortBy(post.comments, function(comment) {
			return -comment.createdAt;
		});
	},
	isUserVoted(){
		let index = _.indexOf(this.votes, Meteor.userId());
		return index !== -1
	},
	isPublicOfOthers(){
		return (this.owner == Meteor.userId()) || ((this.owner != Meteor.userId()) && this.public)
	},
	isCRUDpost(){}
});

Template.post.events({
	'click .toggle-checked'() {
		// Set the checked property to the opposite of its current value
		Posts.update(this._id, {
			$set: { checked: ! this.checked },
		});
	},
	'click .delete'() {
		Posts.remove(this._id);
	},
	'click .locking'() {
		Posts.update(this._id, {
			$set: { public: ! this.public },
		});
	},
	'click .edit'() {
		var newText = prompt('You can change post', this.text);
		Posts.update(this._id, {
			$set: { text: newText},
		});
	},
	'click .discuss'(event, instance) {
		let st = instance.state.get('commentsOpen');
		instance.state.set('commentsOpen', !st);
		event.preventDefault();
	},
	'click .vote'() {
		Posts.update(this._id, {
			$push: { votes: Meteor.userId()},
			$inc: { voteSize: 1 }
		});
	},
	'click .unvote'() {
		Posts.update(this._id, {
			$pop: { votes: _.indexOf(this.votes, Meteor.userId())},
			$inc: { voteSize: - 1 }
		});
	},
	'submit .new-comment'() {
		event.preventDefault();
		// Get value from form element
		const target = event.target;
		const text = target.commentText.value;
		const comment = {
			text,
			username: Meteor.user().username,
			createdAt: new Date()
		};
		Posts.update(this._id, {
			$push: { comments: comment },
		});
		target.commentText.value = '';
	},
});
