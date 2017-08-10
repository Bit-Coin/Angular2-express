import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';
import {Http, Headers} from 'angular2/http';

const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AdminService {
	private baseUrl: string = "/api/admin/";

	constructor(private _http: Http) {}

	getAllCourses(){		
		return this._http.get(this.baseUrl + "courses", HEADER).map((res) =>{ 
			return res.json();
		});
	}

	getEditCourses(id: string){		
		return this._http.post(this.baseUrl + "courses/edit", JSON.stringify({"id": id}),HEADER).map((res) =>{ 
			return res.json();
		});
	}

	getAllContents(){		
		return this._http.get(this.baseUrl + "courses/contents", HEADER).map((res) =>{ 
			return res.json();
		});
	}

	getAllOrgs(){
		return this._http.get(this.baseUrl + "tutors").map((res) =>{ 
				return res.json();
			});	

		// var data = [{organization: "School1", firstname: "firstname", lastname: "lastname", phone: "01234", email: "email.com", student: "20", lastlogon: "13/5/2016"},
		// 		{organization: "School1", firstname: "firstname", lastname: "lastname", phone: "01234", email: "email.com", student: "20", lastlogon: "13/5/2016"}];
		// return data;
		
	}

	addTutor(data){
		return this._http.post(this.baseUrl + "tutor", JSON.stringify(data), HEADER)
			.map((res) => {		
				return res.json();
			})
	}

	updateTutor(data){
		return this._http.put(this.baseUrl + "tutor", JSON.stringify(data), HEADER)
			.map((res) => {		
				return res.json();
			})	
	}

	addCourse(data, flag){
		if(!flag){

			console.log("add")
			return this._http.post(this.baseUrl + "course", JSON.stringify(data), HEADER)
				.map((res) => {
				return res.json();
			})
		}else{

			console.log("edit")
			return this._http.put(this.baseUrl + "course", JSON.stringify(data), HEADER)
				.map((res) => {
				return res.json();
			})
		}
	}
	removeOrgById(list){


		return this._http.post(this.baseUrl + 'removetutor', JSON.stringify({list: list}), HEADER)
			.map((res) => {
				return res.json();
			})
	}

}