/**
 * Created by helga on 27.09.16.
 */

import { Meteor } from 'meteor/meteor';
import { Posts } from '../../api/posts/posts';

Meteor.startup(() => {
    if (Posts.find().count() === 0  && Meteor.users.find().count() === 0) {

        const user = {
            username: 'PostMe',
            email: 'post@me.com',
            password: 'postme',
            profile: {
                firstName: 'Post',
                lastName: 'Me',
            }
        };
        const userId = Accounts.createUser(user);

        const data = [
            {
                'text':'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ',
                'public':true,
                'comments':[
                ],
                'votes':[
                ],
                'voteSize': 0
            },
            {
                'text':' ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minim',
                'public':true,
                'comments':[
                ],
                'votes':[
                ],
                'voteSize':0
            },
            {
                'text':' avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are ',
                'public':false,
                'comments':[
                ],
                'votes':[
                ],
                'voteSize':0
            },
            {
                'text':'et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate no',
                'public':false,
                'comments':[
                ],
                'votes':[
                ],
                'voteSize':0
            },
            {
                'text':'dignissimos ducimus qui blanditiis praesentium voluptatum',
                'public':false,
                'comments':[
                ],
                'votes':[
                ],
                'voteSize':0
            }];

        data.forEach((item) => {
            Posts.insert({
                'text': item.text,
                'createdAt': new Date() + Math.random()*10,
                'owner': userId,
                'username': user.username,
                'public': item.public,
                'comments': item.comments,
                'votes': item.votes,
                'voteSize': item.voteSize
            });
        })

    }
})
