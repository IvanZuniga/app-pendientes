import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalEditarPage } from './modal-editar';

@NgModule({
  declarations: [
    ModalEditarPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalEditarPage),
  ],
})
export class ModalEditarPageModule {}
