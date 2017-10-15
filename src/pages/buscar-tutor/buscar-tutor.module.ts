import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarTutorPage } from './buscar-tutor';

@NgModule({
  declarations: [
    BuscarTutorPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscarTutorPage),
  ],
})
export class BuscarTutorPageModule {}
