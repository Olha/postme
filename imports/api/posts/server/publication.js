/**
 * Created by helga on 16.09.16.
 */
import { Meteor } from 'meteor/meteor';

import { Posts } from '../posts.js';

Meteor.publish('posts.allPublic', function allPostsPublic() {
    return Posts.find({
            public: true},
        {sort: {createdAt: -1}});
});

Meteor.publish('posts.public', function postsPublic() {
    console.log(Posts.find({
            public: false,
            owner: this.userId},
        {sort: {createdAt: -1}}).fetch())
    return Posts.find({
        public: true,
        owner: this.userId},
        {sort: {createdAt: -1}});
});

Meteor.publish('posts.private', function postsPrivate() {
    if (!this.userId) {
        return this.ready();
    }
    return Posts.find({
        public: false,
        owner: this.userId},
        {sort: {createdAt: -1}});
});

Meteor.publish('posts.best', function postsPublicBest() {
    return Posts.find({public: true},
        {sort: {voteSize: -1}});
});
