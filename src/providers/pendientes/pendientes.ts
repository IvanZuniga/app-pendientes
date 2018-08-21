import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_URL } from '../../config/url.servicios';
import { ToastController } from 'ionic-angular';
import { PendienteData } from '../../models/pendiente-data.model';


@Injectable()
export class PendientesProvider {

  lista_pendientes:any = [];
  

  constructor(public http: HttpClient, public toastCtrl: ToastController) {}

  cargarPendientes(){
    let url = APP_URL + "/api/pendientes";

    return new Promise( resolve => {
      this.http.get( url ).subscribe( data => {
        this.lista_pendientes = data;
        resolve();
      }, err => {
        this.toastCtrl.create({
          message: 'Error: no se han podido obtener los datos.'
        }).present();
        console.log(err);
      });

    });
    
  }

  agregar( titulo:string ){
    let url = APP_URL + "/api/pendientes";


    return new Promise( resolve => {
      this.http.post( url , {titulo} ).subscribe( (data) => {
        this.cargarPendientes();
        resolve();
      }, err => {
        this.toastCtrl.create({
          message: 'Error: no se ha podido agregar el pendiente.'
        }).present();
        console.log(err);
      });

    });

  }

  editar( pendiente:PendienteData ){
    let url = APP_URL + "/api/pendientes/"+pendiente.id;

    return new Promise( resolve => {
      this.http.put( url , pendiente ).subscribe( () => {
        this.cargarPendientes();
        resolve();
      }, err => {
        this.toastCtrl.create({
          message: 'Error: no se ha podido editar el pendiente.'
        }).present();
        console.log(err);
      });

    });
  }

  borrar( id:number ){
    let url = APP_URL + "/api/pendientes/"+id;

    return new Promise( resolve => {
      this.http.delete( url ).subscribe( () => {
        this.cargarPendientes();
        resolve();
      }, err => {
        this.toastCtrl.create({
          message: 'Error: no se ha podido borrar el pendiente.'
        }).present();
        console.log(err);
      });

    });
  }


}
