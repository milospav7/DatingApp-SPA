import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any; // @input koristis za podatke koje primas od parent komponente.
  // U htmlu ove komponente moras u selektoru iste da
  // definises ovaj valuesFormHome input uz pomoc [] i dodelis mu vrednost od parent komponente(preko metode i fielda ove komponente)
  @Output() cancelRegister = new EventEmitter(); // output podaci, koriste se da posaljes nesto ka parent komponnti(supr od input)
  model: any = {};

  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('canceled');
  }
}
