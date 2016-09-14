/**
 * Created by olha on 15.09.16.
 */
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Meteor } from 'meteor/meteor';

// Import to load these templates
import '../../ui/layouts/body';
import '../../ui/pages/posts.js';
import '../../ui/pages/profile.js';
import '../../ui/pages/notFound.js';

FlowRouter.route('/posts/public', {
	name: 'Posts.public',
	action() {
		if (Meteor.userId()) {
			Meteor.subscribe('posts.public');
		}
		BlazeLayout.render('appBody', { main: 'posts' });
	},
});

FlowRouter.route('/posts/private', {
	name: 'Posts.private',
	action() {
		if (Meteor.userId()) {
			Meteor.subscribe('posts.private');
		}
		BlazeLayout.render('appBody', { main: 'posts' });
	},
});

FlowRouter.route('/', {
	name: 'App.home',
	action() {
		Meteor.subscribe('posts.allPublic');
		BlazeLayout.render('appBody', { main: 'posts' });
	},
});

FlowRouter.route('/posts/public/best', {
	name: 'Posts.best',
	action() {
		Meteor.subscribe('posts.best');
		BlazeLayout.render('appBody', { main: 'posts' });
	},
});

FlowRouter.route('/profile', {
	name: 'App.profile',
	action() {
		if (Meteor.userId()) {
			BlazeLayout.render('appBody', { main: 'profile' });
		}
	},
});

// the notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
	name: 'notFound',
	action() {
		BlazeLayout.render('appBody', { main: 'notFound' });
	},
};
