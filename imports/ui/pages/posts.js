/**
 * Created by olha on 15.09.16.
 */

import { Posts } from '../../api/posts/posts.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { FlowHelpers } from '../../../lib/client/route-helpers';
import '../components/post.js'
import './posts.html';

const LIMIT_COUNT = 4;

Template.posts.onCreated(function() {
    this.posts = new ReactiveVar();
    const postList = Posts.find({}, {limit: LIMIT_COUNT});
    this.posts.set(postList);
    this.currentPostCount = new ReactiveVar();
});


Template.posts.helpers({
    posts() {
        return Template.instance().posts.get();
    },
    'isVisiblePostList'(){
        let currentCount = Template.instance().currentPostCount.get() || LIMIT_COUNT;
        return Posts.find().count() > currentCount;
    }
});

Template.posts.events({
    'click .load-more'(event, template){
        let limitPost = template.posts.get().fetch().length + LIMIT_COUNT;
        const postList = Posts.find({}, {limit: limitPost});
        template.posts.set(postList);
        template.currentPostCount.set(limitPost);
    },
});