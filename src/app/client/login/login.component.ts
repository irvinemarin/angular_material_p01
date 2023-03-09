import {Component, HostListener, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormsClienteWSService} from "../../rest/formsClienteWS/forms-cliente-ws.service";
import {Subscription, timer} from "rxjs";
import {MatCheckboxChange} from "@angular/material/checkbox";

// import { SMTPClient } from 'emailjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  buscadorUsuarioText = '';
  formClaveValue = '';

  listaUsuariosFiltro = []
  listaUsuarios = [
    {
      c_usuario: "imarinc",
      magistrado: "Irvin Marin Cisneros"
    },
    {
      c_usuario: "eneyrah",
      magistrado: "Eneas Neyra"
    },
    {
      c_usuario: "someUser1",
      magistrado: "someUser1 ..."
    },
    {
      c_usuario: "someUser2",
      magistrado: "someUser2 ..."
    },


  ]
  UserSelected = {
    c_usuario: "",
    magistrado: "",
    estado: 0
  }
  formEmailValue = "";
  disableClave = true;

  constructor(private _snackBar: MatSnackBar,
              private __ws: FormsClienteWSService,) {
  }

  displayFn(): string {
    return this.UserSelected && this.UserSelected.magistrado ? this.UserSelected.magistrado : '';
  }

  ngOnInit() {
    // this.iniFirebase()
    // this.listarUsuariosWS()
  }


  private listarUsuariosWS() {
    this.listaUsuarios = []
    this.__ws.getListaUsuarios().subscribe({
      next: (data: []) => {
        data.forEach(item => {
          let newItem = {
            c_usuario: this.quitarEspacios(item["c_usuario"]),
            magistrado: this.quitarEspacios(item["magistrado"]),
          }
          this.listaUsuarios.push(newItem)
        })

      },
      error: (error) => {
      },
      complete: () => {
      }
    })
  }

  onClickIngresarListener() {
    let userTest = "admindemo123"
    if (this.formUsuarioValue != "" && this.formClaveValue != "") {

      this.__ws.verifyLogin(this.formUsuarioValue + "_" + this.formClaveValue).subscribe({
          next: (res) => {
            if (res == "1") {
              this.UserSelected.estado = 2
              localStorage.setItem('UserSelected', JSON.stringify(this.UserSelected));
              window.location.replace("/reportes/" + this.UserSelected.c_usuario)
            } else {
              alert(res)
            }


          }, error: (error) => {
            alert("La clave no es correcta")

          }, complete: () => {

          }
        }
      );
    } else {
      this.openSnackBar("Usuairo o Clave Error", "ok")
    }
  }

  @HostListener('document:keydown.enter', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.onClickIngresarListener()
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onChangeTextUser() {
    if (this.buscadorUsuarioText.length > 1) {
      this.listaUsuariosFiltro = []
      this.listaUsuariosFiltro =
        this.listaUsuarios.filter(x => x.magistrado.toLowerCase().includes(this.buscadorUsuarioText.toLowerCase())
        )
    }
  }

  countDown: Subscription;
  counter = 60;
  tick = 1000;
  formUsuarioValue = "";
  verBuscadorUsuario = true;

  updateCountdown() {

    this.countDown = timer(0, this.tick)
      .subscribe(() => {
        if (this.counter > 0) {
          if (this.counter == 59) this.sendMail()
          --this.counter
        }
        if (this.counter == 0) this.counter = 60;
      });
  }

  private sendMail() {
    // alert("sendMail")
    if (this.UserSelected.estado == 1) {
      // let emailPrueba=this.UserSelected.c_usuario;
      let emailPrueba = "imarinc";

      this.__ws.sendEmail(emailPrueba).subscribe({
          next: (res) => {
            alert(res)
            this.UserSelected.estado = 2
            this.countDown = null;
            this.counter = null;
          }, error: (error) => {
            console.log(error)
          }, complete: () => {

          }
        }
      );
    }

  }

  getEmail(cadena: string) {

    let cadenaFormated = cadena.toLowerCase()
    this.quitarEspacios(cadenaFormated);
    this.formEmailValue = cadenaFormated + "@pj.gob.pe"
    // this.formEmailValue = "imarinc" + "@pj.gob.pe"
    return this.formEmailValue;
  }

  quitarEspacios(texto) {
    return texto.replace(/\s{2,}/g, '').trim()
  }

  // validaCheckboxTengoCodigo() {

  // }
  validaCheckboxTengoCodigo(value: MatCheckboxChange) {
    if (value.checked) {
      this.UserSelected.estado = 2
      this.disableClave = false
    } else {
      this.UserSelected.estado = 1
      this.disableClave = true
    }
  }
}

