import {Injectable} from 'angular2/core';

@Injectable()
export class AppConfig {
	private auth0_client_id: string = 'dnrHEOwxpNGG3CyCxB9GABXvIPIlFHXp';
	private auth0_domain: string= 'pjlamb12.auth0.com';

	getClientId() {
		return this.auth0_client_id;
	}

	getDomain() {
		return this.auth0_domain;
	}
}