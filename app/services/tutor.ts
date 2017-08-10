import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';


const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class TutorService {
	private baseUrl: string = "/api/tutor/";

	constructor (private _http: Http) {
		// this.progress$ = Observable.create(observer => {
		// 	this.progressObserver = observer
		// }).share();
	}

	getAllCourses(data) {		
		return this._http.post(this.baseUrl + "courses",JSON.stringify(data),  HEADER).map((res) =>{ 
			return res.json();
		});
	}

	getAllStudents(data){
		return this._http.post(this.baseUrl + "students",JSON.stringify(data),  HEADER).map((res) =>{ 
			return res.json();
		});
	}

	addStudent(data, flag){
		if(!flag){
			return this._http.post(this.baseUrl + "student", JSON.stringify(data), HEADER)
			.map((res) => {		
				return res.json();
			})
		}else{
			return this._http.put(this.baseUrl + "student", JSON.stringify(data), HEADER)
			.map((res) => {		
				return res.json();
			})
		}
		
	}

	addStudentCSV(data){
		return this._http.post(this.baseUrl + 'studentcsv', JSON.stringify(data), HEADER)
			.map((res)=>{
				return res.json();
			})
	}

	setAssignStudentsWithCourse(id, ids){
		var data = {
			course_id: id,
			ids: ids
		}
		return this._http.post(this.baseUrl + "setstudentbycourse", JSON.stringify(data), HEADER).map((res) => { 
			return res.json();
		});
	}

	makeFileRequest(files){
		console.log(files);
	}

	getCoursesByStudentId(id, tutor_id){
		var data = {
			student_id: id,
			tutor_id: tutor_id
		};
		return this._http.post(this.baseUrl + "getCoursesByStudentId", JSON.stringify(data), HEADER).map((res)=>{
			return res.json();
		})
	}

	getStudentsByCourseId(id , tutor_id){
		var data = {
				course_id: id,
				tutor_id: tutor_id
			};
		return this._http.post(this.baseUrl + "getStudentsByCourseId", JSON.stringify(data), HEADER).map((res)=>{
			return res.json();
		})	
	}
}