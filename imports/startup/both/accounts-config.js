/**
 * Created by olha on 15.09.16.
 */
import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL',
});
