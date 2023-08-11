import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthRequest } from 'src/app/interface/user-auth-request';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  password: string = '';
  UserAuthReq:any;
  btnLogin: string = "Login";

    loading = false;
    submitted = false;
    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService:AuthService,
        
    ) {  this.UserAuthReq = { UserName: '', Password: '' }

    this.loginForm = this.formBuilder.group(
      {
        userName: [
          '',
          [
            Validators.required
            // Validators.minLength(6),
            // Validators.maxLength(10)
          ]
        ],
        password: [null, Validators.compose([
          Validators.required
          // 2. check whether the entered password has a number

        ])
        ],

      });}

    ngOnInit() {
      const storedDataString = localStorage.getItem('myData');

      if (storedDataString) {
        const storedData = JSON.parse(storedDataString);
        console.log(storedData); // Output: { key1: 'value1', key2: 'value2' }
      }
    }


    // convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
    onSubmit() {
      this.btnLogin = "verifying..."
      if (this.loginForm.invalid) {
        this.btnLogin = "Please validate form"
        return;
      }
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe(data => {
        if (data.isAuthSuccessful) {
          this.getBootInfo()
        }
        else {
          localStorage.clear();
          this.btnLogin = data.processingStatus.message
          // this.toastr.info(data.processingStatus.message); // Use the ToastrService to show the message
        }
        this.loading = false;
      },
        () => {
          this.loading = false;
        })
  
  
    }
    getBootInfo() {
      debugger
      this.authService.getBootInfo().subscribe({
        next: (res) => {
          this.set_Cache(res);
        }
      })
    }
  
    set_Cache(boot: any) {
      localStorage['bootInfo'] = JSON.stringify(boot)
      localStorage.setItem("userName", boot['user'].name);
    
  
      this.authService.getuserName();
      this.authService.getUserFname();
  
      this.btnLogin = "success"
  
  
      this.router.navigate(['admin', boot.allowed_workspaces[0].name.toLowerCase(), 'menu'], {
        queryParams: { username: boot['user'].name } // Pass the username as a query parameter
      });
    }
}
