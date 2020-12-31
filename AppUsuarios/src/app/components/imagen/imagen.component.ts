import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css'],
})
export class ImagenComponent implements OnInit {
  public orientation: any;
  public state: string;
  constructor() {}

  ngOnInit() {
    this.updateOrientatioState();
  }

  @HostListener('window:resize') updateOrientatioState() {
    if (window.innerHeight > window.innerWidth) {
      this.state = 'portrait';
    } else {
      this.state = 'landscape';
    }
  }
}
