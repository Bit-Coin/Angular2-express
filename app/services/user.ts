import {Injectable} from 'angular2/core';
import {AuthHttp} from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
	private baseUrl: string = "/api/user-list";

	constructor(private _http: AuthHttp) {}

	getUsers() {
		return this._http.get(this.baseUrl).map(res => res.json());
	}
}