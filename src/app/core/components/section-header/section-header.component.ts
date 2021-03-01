import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html'
})
export class SectionHeaderComponent implements OnInit {

  name = '';

  buttons = [
    {
      label: 'Crear Producto'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  action(): void {
    //
  }

}
