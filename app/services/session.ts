import {Injectable} from 'angular2/core';

import {AppConfig} from '../services/config';

declare var Auth0Lock: any;

@Injectable()
export class Session {
	constructor(private _config: AppConfig) {}

	lock = new Auth0Lock(this._config.getClientId(), this._config.getDomain());

	login() {
		this.lock.show((error: string, profile: Object, id_token: string) => {
			if (error) {
				console.log(error);
			}
			// We get a profile object for the user from Auth0
			localStorage.setItem('profile', JSON.stringify(profile));
			// We also get the user's JWT
			localStorage.setItem('id_token', id_token);
		});
	}

	logout() {
		// To log out, we just need to remove
		// the user's profile and token
		localStorage.removeItem('profile');
		localStorage.removeItem('id_token');
	 }

	 /*
	  * role = 0 : admin
	  * role = 1 : tutor
	  * role = 3 : student
	 */

	 setItem(item, data){
	 	localStorage.setItem(item, data);
	 }

	 getItem(item){
	 	return localStorage.getItem(item);
	 }

	 setUser(username, role, id){
	 	console.log(id);
	 	localStorage.setItem('username', username);
	 	localStorage.setItem('role', role);
	 	localStorage.setItem('id', id);
	 }

	 getCurrentId(){
	 	return localStorage.getItem('id');
	 	
	 }

	 getCurrentUser(){
	 	var username = localStorage.getItem('username'),
	 		role = localStorage.getItem('role');
	 	return {
	 		username: username,
	 		role: role,
	 	}	
	 }

	 getCurrentUsername(){
	 	return localStorage.getItem('username');
	 }

	 getCurrentRole(){
	 	return localStorage.getItem('role');
	 }
}
