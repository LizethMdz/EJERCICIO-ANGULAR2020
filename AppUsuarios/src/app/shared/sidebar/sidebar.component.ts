import { AuthService } from './../../services/auth.service';
import { SidebarService } from './../../services/sidebar.service';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  Component,
  OnDestroy,
  ChangeDetectorRef,
  OnInit,
  OnChanges,
  SimpleChanges,
  AfterViewChecked,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  estaAuth: boolean;
  fillerNav = [];

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public sidebarService: SidebarService,
    public usuarioService: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.usuarioService.autenticado.subscribe((texto) => {
      console.log('estado', texto);
      this.estaAuth = texto;
      this.fillerNav = this.validarMenu();
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  validarMenu() {
    if (localStorage.getItem('msm') === 'true') {
      return (this.fillerNav = this.sidebarService.menu);
    } else {
      return (this.fillerNav = []);
    }
  }
}
