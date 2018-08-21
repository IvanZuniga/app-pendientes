import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { PendienteData } from '../../models/pendiente-data.model';
import { PendientesProvider } from '../../providers/pendientes/pendientes';


@IonicPage()
@Component({
  selector: 'page-modal-editar',
  templateUrl: 'modal-editar.html',
})
export class ModalEditarPage {

  selected_pendiente:PendienteData;

  constructor(public navParams: NavParams, 
              public viewCtrl: ViewController,
              private _pp: PendientesProvider) {
    this.selected_pendiente = new PendienteData;
    this.selected_pendiente['id'] = this.navParams.data.pendiente.id;
    this.selected_pendiente['titulo'] = this.navParams.data.pendiente.titulo;
  }

  editarPendiente(){
    this._pp.editar(this.selected_pendiente).then( ()=>{
      this.viewCtrl.dismiss();
    });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }



}
