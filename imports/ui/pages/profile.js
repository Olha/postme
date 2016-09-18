/**
 * Created by helga on 16.09.16.
 */

import { Meteor } from 'meteor/meteor';
//import { CryptoJS } from 'meteor/jparker:crypto-md5';
import './profile.html';

Template.profile.helpers({
    user(){
        const { username, emails } = Meteor.user();
        const email = emails[0].address;
        const gravatar = Gravatar.imageUrl(email, {
            size: 60,
            default: 'mm'
        });
        return {
            username,
            email,
            gravatar
        }
    }
});
