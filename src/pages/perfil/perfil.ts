import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the PerfilPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  testCheckboxOpen: boolean;
  testCheckboxResult;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('¿En que asignaturas puede ofrecer asesoría?');

    alert.addInput({
      type: 'checkbox',
      label: 'Matemática',
      value: 'value1',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Linguística',
      value: 'value2'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Informática',
      value: 'value3'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Ingles',
      value: 'value4'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Física',
      value: 'value5'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Geometría',
      value: 'value6'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Geografía',
      value: 'value7'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Historia',
      value: 'value8'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Química',
      value: 'value9'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Biología',
      value: 'value10'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Economía',
      value: 'value11'
    });

    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Confirmar',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present();
  }

}
