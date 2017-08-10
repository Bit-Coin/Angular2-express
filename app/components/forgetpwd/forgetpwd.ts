import {Component} from 'angular2/core';
import {Session} from '../../services/session';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {CanActivate} from 'angular2/router';

@Component({
	selector: 'forget-pwd',
	templateUrl: '/components/forgetpwd/forgetpwd.html',
	providers: [Session],
	directives: [ROUTER_DIRECTIVES]
})
export class Forgetpwd {
	constructor(private _session: Session) {
		console.log('in the constructor');
	}

	doLogin(form: any) {
		// this._session.login(form.username, form.password);
	}
}