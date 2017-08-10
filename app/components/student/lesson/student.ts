import {Component, OnInit} from 'angular2/core';
import {Session} from '../../../services/session';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {CanActivate} from 'angular2/router';
import {StudentService} from '../../../services/student';

@Component({
	selector: 'student-lesson',
	templateUrl: '/components/student/lesson/student.html',
	providers: [Session, StudentService],
	directives: [ROUTER_DIRECTIVES],
})
export class StudentLesson  {

	lessonList: any = [];
	course: any;
	student_id: string;

	constructor(private _session: Session, private _studentService: StudentService, private _router: Router) {
		this.course = JSON.parse(this._session.getItem('selectedCourse'));
		this.student_id = this._session.getItem('MainStudentId');
		var self = this;
		console.log(this.course);

		this._studentService.getLessonListById(this.course.course_id, this.student_id).subscribe((res)=>{
			this.lessonList = res;
			this._session.setItem('lessonList', JSON.stringify(res));
		})

		this._studentService.getScoreListByCourse({course_id: this.course.course_id, student_id: this.student_id}).subscribe((res)=>{
			res.forEach(function(score){
				self._session.setItem(score.lesson_id, score.score);
			})
		})
	}

	ngOnInit(){

	}	
	getCountLesson(){
		return this.lessonList.length;
	}

	getCourseTitle(){
		return this.titleCase(this.course.coursetitle);
	}

	getLessonName(lesson){
		return this.titleCase(lesson.lessonname);
	}

	gotoVideoOrQust(){
		this._router.navigate(['StudentLesson']);
	}
	getCurrentLessonStatus(lesson: any){
		if(lesson.lock == false){
			return '';
		}else if(lesson.score < 70){
			return 'In progress';
		}else if(lesson.score >= 70){
			return '<i class="ion-checkmark-round m-r-5"></i> Completed ' + lesson.completedAt;
		}

	}
	countVideo(lesson: any){

	}
	gotoLessonVideo(lesson: any, i: number){

		this._studentService.getContentsByLessonId(lesson.lesson_id).subscribe((res) => {
			this._session.setItem('SelectedContents', JSON.stringify(res));			
		});

		this._session.setItem('SelectedLessonById', JSON.stringify(lesson));
		this._session.setItem('SelectedLessonId', lesson.lesson_id);
		this._session.setItem('SelectedLessonIndex', i);
		this._session.setItem('TotalLesson', this.lessonList.length);
		this._router.navigate(['SelectedContent']);
	}

	private titleCase(str: string) : string {
	 	return str.split(' ').map(function(val){ 
	    	return val.charAt(0).toUpperCase() + val.substr(1).toLowerCase();
	  	}).join(' ');
	}
}