import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-componenteuno',
  templateUrl: './componenteuno.component.html',
  styleUrls: ['./componenteuno.component.css'],
})
export class ComponenteUnoComponent implements OnInit {
  salida = {};
  salida2 = {};
  salida3 = [];

  constructor() {
    const array = [
      { value: 1, name: 'CampoUno' },
      { value: 2, name: 'CampoDos' },
      { value: 3, name: 'CampoTres' },
      { value: 4, name: 'CampoCuatro' },
      { value: 5, name: 'CampoCinco' },
      { value: 6, name: 'CampoSeis' },
    ];

    const array2 = [
      { value: 21, name: 'a' },
      { value: 20, name: 'b' },
      { value: 19, name: 'c' },
      { value: 18, name: 'd' },
      { value: 17, name: 'e' },
      { value: 16, name: 'f' },
    ];

    const obj = {
      CampoUno: 1,
      CampoDos: 2,
      CampoTres: 3,
      CampoCuatro: 4,
      CampoCinco: 5,
      CampoSeis: 6,
    };

    this.salida = this.regresaObjeto(array);

    this.salida2 = this.regresaObjeto(array2);

    this.salida3 = this.regresaArreglo(obj);

    console.log(this.regresaObjeto(array));

    console.log(this.regresaObjeto(array2));

    console.log(this.regresaArreglo(obj));
  }

  ngOnInit(): void {}

  regresaObjeto(array) {
    let new_object = {};
    for (let i = 0; i < array.length; i++) {
      new_object[array[i].name] = array[i].value;
    }

    return new_object;
  }

  regresaArreglo(objeto) {
    let array = [];
    for (const [key, value] of Object.entries(objeto)) {
      array.push({ value: value, name: key });
    }
    return array;
  }
}
