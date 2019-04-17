import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { TokenPayload } from '../../../interfaces/TokenPayload.interface';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public registerForm: FormGroup;
  public submitted = false;
  public credentials;

  constructor(private fB: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.fB.group({
      'firstname': ['', Validators.required ],
      'lastname': ['', Validators.required ],
      'email': ['', Validators.required, Validators.email],
      'password': ['', Validators.required ],
    });

    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  register() {
    const credentials: TokenPayload = {
      firstname: this.registerForm.value.firstname.toString(),
      lastname: this.registerForm.value.lastname.toString(),
      email: this.registerForm.value.email.toString(),
      password: this.registerForm.value.password.toString()
    };

    this.submitted = true;

    if (this.registerForm.valid) {
      this.auth.register(credentials).subscribe(() => {
        this.router.navigateByUrl('/dashboard');
      }, (err) => {
        console.error(err);
      });
    }
  }

  get f() { return this.registerForm.controls; }
}
