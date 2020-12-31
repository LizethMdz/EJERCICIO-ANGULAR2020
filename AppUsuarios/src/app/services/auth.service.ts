import { UsuarioModel } from './../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { UsuarioResponse } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public usuario: UsuarioResponse;
  public usuarioTmp: boolean;
  public autenticado = new EventEmitter<boolean>();
  public endpoint = 'https://ies-webcontent.com.mx/xccm/user';

  constructor(private http: HttpClient, private router: Router) {}

  get roles(): 'SUCURSAL' | 'VALIDADOR' | 'DISTRIBUIDOR' {
    return this.usuario.desc_rol;
  }

  get headers() {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  guardarLocalStorage(role: string, msm: boolean) {
    localStorage.setItem('role', role);
    localStorage.setItem('msm', JSON.stringify(msm));
  }

  loginToApp(usuario: UsuarioModel) {
    return this.http
      .post<UsuarioResponse>(
        `${this.endpoint}/validarUsuario`,
        usuario,
        this.headers
      )
      .pipe(
        tap((resp: any) => {
          console.log(resp);

          if (resp.resultado !== null) {
            if (resp.resultado.desc_rol === 'DISTRIBUIDOR') {
              this.guardarLocalStorage(
                resp.resultado.desc_rol,
                resp.resultado.exito
              );

              this.validarUsuario();
              this.cambiarEstadoAutenticado();
            } else {
              throw new Error('Usuario no permitido');
            }
          } else {
            throw new Error('Revise sus credenciales');
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('msm');
  }

  validarUsuario(): Observable<boolean> {
    return of(true);
  }

  cambiarEstadoAutenticado() {
    this.autenticado.emit(true);
  }
}
