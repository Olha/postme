/**
 * Created by olha on 15.09.16.
 */

import { Posts } from '../../api/posts/posts.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import '../components/post.js'
import './posts.html';

Template.posts.helpers({
    posts() {
        return Posts.find({});
    },
});