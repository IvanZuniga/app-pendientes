import { Component } from '@angular/core';
import { PendientesProvider } from '../../providers/pendientes/pendientes';
import { ModalController,AlertController  } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  nuevo_pendiente:string;

  constructor(private _pp: PendientesProvider, 
              public modalCtrl: ModalController,
              private alertCtrl: AlertController) {
    _pp.cargarPendientes().then( () =>{
      console.log(_pp.lista_pendientes);
    });
  }

  doRefresh(refresher) {
    this._pp.cargarPendientes().then( () => {
      refresher.complete();
    });
  }

  verEditarModal( pendiente, slidingItem: ItemSliding ){
    slidingItem.close();
    const modal = this.modalCtrl.create("ModalEditarPage", {pendiente});
    modal.present();
  }

  agregarPendiente(){
    this._pp.agregar( this.nuevo_pendiente ).then( ()=> {
      this.nuevo_pendiente = null;
    });
  }

  borrarPendiente( pendiente:any, slidingItem: ItemSliding ){
    let alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Confirmar borrado',
      message: '¿Realmente deseas borrar "'+pendiente.titulo+'" de tus pendientes?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
          handler: () => {
            slidingItem.close();
          }
        },
        {
          text: 'Borrar',
          handler: () => {
            slidingItem.close();
            this._pp.borrar( pendiente.id );
          }
        }
      ]
    });
    alert.present();
    
  }

}
