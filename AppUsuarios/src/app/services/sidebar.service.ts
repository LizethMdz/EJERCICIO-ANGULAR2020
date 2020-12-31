import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu = [
    { name: 'Dashboard', route: 'dashboard', icon: 'dashboard' },
    { name: 'Exercises', route: 'exercises', icon: 'calculate' },
    { name: 'Grabar Video', route: 'video', icon: 'movie' },
    { name: 'Rotación ', route: 'imagen', icon: 'image' },
    { name: 'Dispositivo', route: 'dispositivo', icon: 'device_unknown' },
    { name: 'Logout', route: 'login', icon: 'clear' },
  ];
}
