import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu = [
    { name: 'Dashboard', route: 'dashboard', icon: 'dashboard' },
    { name: 'Exercises', route: 'exercises', icon: 'calculate' },
    { name: 'Logout', route: 'login', icon: 'clear' },
  ];
}
