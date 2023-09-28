import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/shared/service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  username: string = ''; 
  showPassword: boolean = false;
  UserAuthReq: any;
  show_hide: boolean = false
  public loading: boolean = false;
  loginForm: FormGroup;
  password: string = '';
  btnLogin: string = "Login";
  constructor(private router: Router, private authService: AuthService,
    private route:ActivatedRoute,
    private formBuilder: FormBuilder,

    private jwtHelper: JwtHelperService
  ) {
    this.UserAuthReq = { UserName: '', Password: '' }

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

      });
  }
  ngOnInit() {

    
    this.route.queryParams.subscribe(params => {
      this.username = params['userName'];
    });
    // Retrieve the JSON data from localStorage
    const storedDataString = localStorage.getItem('myData');

    if (storedDataString) {
      const storedData = JSON.parse(storedDataString);
      console.log(storedData); // Output: { key1: 'value1', key2: 'value2' }
    }

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.show_hide = !this.show_hide
  }


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
    this.authService.getBootInfo().subscribe(d => {
      this.set_Cache(d)

    })
  }

  set_Cache(boot: any) {
    localStorage['bootInfo'] = JSON.stringify(boot)
    localStorage.setItem("userName", boot['user'].name);
  

    this.authService.getuserName();
    this.authService.getUserFname();

    this.btnLogin = "success"

    this.router.navigate(['user-info'], {
      queryParams: { username: boot['user'].full_name }
    });

    this.router.navigate(['admin', boot.allowed_workspaces[0].name.toLowerCase(), 'menu'], {
      queryParams: { username: boot['user'].full_name } // Pass the username as a query parameter
    });
  }
}
