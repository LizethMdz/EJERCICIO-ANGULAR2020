import { isDesktop, isBrowser } from './../../helper/getInfoDevice';
import { isMobile } from './../../helper/getInfoDevice';
import { Component, OnInit } from '@angular/core';

const d = document,
  n = navigator,
  userAgent = n.userAgent;

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.component.html',
  styleUrls: ['./dispositivo.component.css'],
})
export class DispositivoComponent implements OnInit {
  constructor() {}
  device: any = {};
  ngOnInit() {
    this.device = this.getInformacionOS();
  }

  getInformacionOS() {
    return {
      userAgent,
      platform: isMobile.any() ? isMobile.any() : isDesktop.any(),
      browser: isBrowser.any(),
    };
  }
}
