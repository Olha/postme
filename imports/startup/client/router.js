/**
 * Created by olha on 15.09.16.
 */
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../../ui/layouts/body.js';
import '../../ui/pages/posts.js';
import '../../ui/pages/notFound.js';

/*FlowRouter.route('/lists/:_id', {
	name: 'Lists.show',
	action() {
		BlazeLayout.render('App_body', { main: 'Lists_show_page' });
	},
});*/

FlowRouter.route('/', {
	name: 'App.home',
	action() {
		BlazeLayout.render('body', { main: 'posts' });
	},
});

// the notFound template is used for unknown routes and missing lists
FlowRouter.notFound = {
	action() {
		BlazeLayout.render('body', { main: 'notFound' });
	},
};
