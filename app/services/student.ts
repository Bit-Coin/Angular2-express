import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';
import {Http, Headers} from 'angular2/http';

const HEADER = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class StudentService {
	private baseUrl: string = "/api/student/";

	constructor(private _http: Http) {}

	getCourseListById(id){
		var data = {
			student_id: id,
		}
		return this._http.post(this.baseUrl + "getcourselist", JSON.stringify(data), HEADER).map((res)=>res.json());
	}

	getStudentInfo(id){
		var data = {
			student_id: id,
		}
		return this._http.post(this.baseUrl + "getstudentinfo", JSON.stringify(data), HEADER).map((res)=>res.json());
	}

	getLessonListById(id, student_id){
		var data = {
			course_id: id,
			student_id: student_id,
		}
		return this._http.post(this.baseUrl + "getlessonlist", JSON.stringify(data), HEADER).map((res)=>res.json());
	}

	getContentsByLessonId(lesson_id){
		var data = {
			lesson_id: lesson_id
		};

		return this._http.post(this.baseUrl + 'getcontentslist', JSON.stringify(data), HEADER).map((res)=>res.json());
	}

	setScoreForLesson(data){
		return this._http.post(this.baseUrl + 'setscoreforlesson', JSON.stringify(data), HEADER).map((res)=>res.json());
	}

	setCourseScoreWithStudent(data){
		return this._http.post(this.baseUrl + 'setcoursescorewithstudent', JSON.stringify(data), HEADER).map((res)=>res.json());	
	}
	getScoreListByCourse(data){
		return this._http.post(this.baseUrl + 'getscorelist', JSON.stringify(data), HEADER).map((res)=>res.json());
	}
}