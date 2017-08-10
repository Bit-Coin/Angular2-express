import {Component} from 'angular2/core';
import {Session} from '../../../services/session';
import {ROUTER_DIRECTIVES,Router} from 'angular2/router';
import {CanActivate} from 'angular2/router';
import {TutorService} from '../../../services/tutor';
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';

@Component({
	selector: 'tutor-detail-student',
	templateUrl: '/components/tutor/detail/student.html',
	providers: [Session, TutorService],
	directives: [ROUTER_DIRECTIVES,FORM_DIRECTIVES]
})
export class DetailTutorStudent {

	student: any;
	allStudentData: any;
	StudentDetailForm: ControlGroup;
	firstname: Control;
	lastname: Control;
	username: Control;
	password: Control;
	verifiedpassword: Control;
	phone: Control;
	dob: Control;
	courseList: any;
	submitAttempt: boolean = false;

	
	constructor(private _session: Session, private _tutorService: TutorService, private builder: FormBuilder, private _router: Router) {
		this.student = JSON.parse(this._session.getItem('TutorStudent'));	
		this.allStudentData = JSON.parse(this._session.getItem('TutorAllStudent'));
		console.log(this.allStudentData);
		var id = this.student.student_id;
		console.log("student id" + id);

		this._tutorService.getCoursesByStudentId(id, this._session.getCurrentId()).subscribe((res)=>{
			this.courseList = res;
		})

		this.firstname = new Control(this.student.firstName, Validators.required);
		this.lastname = new Control(this.student.lastName, Validators.required);
		this.username = new Control(this.student.username);
		this.phone = new Control(this.student.phone);
		this.password = new Control('', Validators.compose([Validators.required, Validators.minLength(6)]))
		this.verifiedpassword = new Control('', Validators.compose([Validators.required, Validators.minLength(6)]))
		this.dob = new Control(this.student.DOB);

		this.StudentDetailForm = builder.group({
			firstname: this.firstname,
			lastname: this.lastname,
			username: this.username,
			dob: this.dob,
			phone: this.phone,
			password: this.password,
			verifiedpassword: this.verifiedpassword
		})
	}

	getUserFullName(){
		return this.titleCase(this.student.firstName) + " "+ this.titleCase(this.student.lastName);
	}

	cancel(){
		this._router.navigate(['TutorMain']);
	}


	getCompletedStatus(flag){
		return flag ? 'Yes' : 'No';
	}

	getValue(form: any){
		if(form.firstname == "" || form.lastname == "") return '';

		var firstname = form.firstname, 
			lastname = form.lastname,
			username = firstname.charAt(0).toLowerCase() + lastname.toLowerCase(),
			i = 0;

		this.allStudentData.forEach(function(student){
			if(student.username.includes(username)) i++;
		})	
		if(i != 0) username = username + i;
		
		(<Control>this.StudentDetailForm.controls['username']).updateValue(username);			
	}

	matchedPassword(form: any){
		var password = form.password,
			verifiedpassword = form.verifiedpassword;
		if(password == verifiedpassword){
			return true;
		}else{
			return false;
		}	

	}

	AddStudent(form: any) {
		this.submitAttempt = true;
		if(this.StudentDetailForm.valid){
			var data = {
				firstName: form.firstname,
				lastName: form.lastname,
				username: form.username,
				hashed_pwd: form.password,
				DOB: form.dob,
				phone: form.phone,
				isCompleted: false,
				completedAt: '',
				certificate: '',
				tutor_id:''
			};
			var flag = JSON.parse(this._session.getItem('editORadd'))
			if(flag.flag) data["_id"] = this.student._id;
			
			this._tutorService.addStudent(data, flag.flag)
				.subscribe((res) => {
					console.log("aaaa")
					console.log(res.success);
					if(res.success){
						this._router.navigate(['TutorMain']);
					}
				})
		}
	}

	private titleCase(str: string) : string {
	 	return str.split(' ').map(function(val){ 
	    	return val.charAt(0).toUpperCase() + val.substr(1).toLowerCase();
	  	}).join(' ');
	}
}