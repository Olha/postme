/**
 * Created by olha on 14.09.16.
 */
import { Template } from 'meteor/templating';

import { Posts } from '../api/posts.js';

import './post.html';

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
});
