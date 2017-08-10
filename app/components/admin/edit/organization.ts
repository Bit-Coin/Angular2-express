import {Component} from 'angular2/core';
import {Session} from '../../../services/session';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {CanActivate} from 'angular2/router';
import {AdminService} from '../../../services/admin';
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/common';

@Component({
	selector: 'admin-edit-organization',
	templateUrl: '/components/admin/edit/organization.html',
	providers: [Session,AdminService],
	directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES]
})
export class EditOrganization {

	OrganizeForm: ControlGroup;
	firstname: Control;
	lastname: Control;
	organization: Control;
	department: Control;
	email: Control;
	phone: Control;
	password: Control;
	submitAttempt: boolean = false;
	org: any;

	constructor(private _session: Session, private _adminService: AdminService, private builder: FormBuilder, private _router: Router) {
		console.log('in the constructor');

		this.org = JSON.parse(this._session.getItem('org'));
		console.log(this.org);
		
		this.firstname = new Control(this.org.firstname, Validators.required);
		this.lastname = new Control(this.org.lastname, Validators.required);
		this.organization = new Control(this.org.organization, Validators.required);
		this.email = new Control(this.org.email, Validators.required);
		this.password = new Control('', Validators.compose([Validators.required, Validators.minLength(6)]))
		this.phone = new Control(this.org.phone);
		this.department = new Control(this.org.department);

		this.OrganizeForm = builder.group({
			firstname: this.firstname,
			lastname: this.lastname,
			organization: this.organization,
			email: this.email,
			phone: this.phone,
			department: this.department,
			password: this.password
		})
	}
	cancel(){
		this._router.navigate(['AdminMain']);
	}

	update(form: any) {
		this.submitAttempt = true;
		if(this.OrganizeForm.valid){
			var data = {
				_id: this.org._id,
				firstname: form.firstname,
				lastname: form.lastname,
				organization: form.organization,
				email: form.email,
				password: form.password,
				department: form.department,
				phone: form.phone,
			};

			this._adminService.updateTutor(data)
				.subscribe((res) => {
					console.log(res.success);
					if(res.success){
						this._router.navigate(['AdminMain']);
					}
				})
		}
	}
}