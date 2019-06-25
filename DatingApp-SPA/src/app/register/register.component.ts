import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() valuesFromHome: any; // @input koristis za podatke koje primas od parent komponente.
  // U htmlu ove komponente moras u selektoru iste da
  // definises ovaj valuesFormHome input uz pomoc [] i dodelis mu vrednost od parent komponente(preko metode i fielda ove komponente)
  @Output() cancelRegister = new EventEmitter(); // output podaci, koriste se da posaljes nesto ka parent komponnti(supr od input)
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model) // moramo da uradimo .subscribe da bismo mogli da koristmo response u nasoj komponenti
      .subscribe(() => {
        this.alertify.success('Registration successful');
      }, (error) => {
        this.alertify.error(error);
      });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
