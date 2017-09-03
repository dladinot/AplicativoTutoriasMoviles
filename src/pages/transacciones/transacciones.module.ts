import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransaccionesPage } from './transacciones';

@NgModule({
  declarations: [
    TransaccionesPage,
  ],
  imports: [
    IonicPageModule.forChild(TransaccionesPage),
  ],
})
export class TransaccionesPageModule {}
