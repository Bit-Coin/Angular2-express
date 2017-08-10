import {Component} from 'angular2/core';
import {Session} from '../../../services/session';
import {CanActivate} from 'angular2/router';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {StudentService} from '../../../services/student';


@Component({
	selector: 'student-course-result',
	templateUrl: '/components/student/result/course.html',
	providers: [Session,StudentService],
	directives: [ROUTER_DIRECTIVES]
})


export class CourseResult {
	username: string = "";
	coursetitle: string;
	score: number = 0;

	constructor(private _session: Session, private _studentService: StudentService, private router:Router) {
		this.username = _session.getCurrentUsername();

		this.coursetitle = this._session.getItem('CourseName');

		var lessonList = JSON.parse(this._session.getItem('lessonList')), self = this, count = 0;

		lessonList.forEach(function(lesson){
			var score = self._session.getItem(lesson.lesson_id);
			
			self.score += parseInt(score);
		});


		console.log(this.score);

		var student_id = this._session.getCurrentId, coures_id = this._session.getItem('CourseId');
		this._studentService.setCourseScoreWithStudent({student_id: student_id, course_id:coures_id }).subscribe((res)=>{
			console.log(res)
		})
		this.score = Math.floor( this.score / (lessonList.length));
	}

	showResult(){

	}

	gotoFinish(){
		this.router.navigate(['StudentCourse']);
	}

	doLogout(){
		this.router.navigate(['Login'])
	}
}