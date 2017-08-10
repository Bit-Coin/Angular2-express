import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';
import {Http, Headers} from 'angular2/http';

const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AuthService {
	private loginUrl: string = "/api/login";

	constructor(private _http: Http) {}

	Login(data) {
		console.log(data);
		return this._http.post(this.loginUrl, JSON.stringify(data), HEADER)
			.map((res) => {
				return	res.json();
			});
	}
}