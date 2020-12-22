import { AuthService } from './../../services/auth.service';
import { UsuarioModel } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario = new UsuarioModel();

  profileForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private router: Router,
    private auth: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    this.auth.autenticado.emit(false);
  }

  getErrorMessage() {
    if (this.profileForm.controls['username'].hasError('required')) {
      return 'You must enter your username';
    }

    if (this.profileForm.controls['password'].hasError('required')) {
      return 'You must enter your password';
    }
  }

  login(form: NgForm) {
    if (form.invalid) return;
    this.auth.loginToApp(this.usuario).subscribe(
      (resp) => {
        console.log(resp);
        console.log(this.auth.autenticado);
        this.router.navigateByUrl('/dashboard');
      },
      (err) => {
        this.openSnackBar(err, 'cerrar');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
