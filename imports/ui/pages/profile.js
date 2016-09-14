/**
 * Created by helga on 16.09.16.
 */
"use strict";
import {Meteor} from "meteor/meteor";
import "./profile.html";

Template.profile.helpers({
    user(){
        const userInfo = Meteor.user();
        const { username, emails } = userInfo;
        const email = emails[0].address;
        const gravatar = Gravatar.imageUrl(email, {
            size: 60,
            default: 'mm'
        });

        if (!Boolean(userInfo.profile)) {
            userInfo.profile = {};
        }
        const firstName = userInfo.profile.firstName || '';
        const lastName = userInfo.profile.lastName || '';
        return {
            username,
            firstName,
            lastName,
            email,
            gravatar
        }
    }
});

Template.profile.events({
    'submit .change-profile'(event) {
        event.preventDefault();
        const target = event.target;
        const lastName = target.lastName.value.trim();
        const firstName = target.firstName.value.trim();
        Meteor.users.update(
          Meteor.userId(),
          {$set: {
              'profile.firstName': firstName,
              'profile.lastName': lastName}
          });


    }
});