import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { EditarPerfilPage } from '../pages/editar-perfil/editar-perfil';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {PerfilPage} from '../pages/perfil/perfil';
import {AyudaPage} from '../pages/ayuda/ayuda';
import {TransaccionesPage} from '../pages/transacciones/transacciones';
import {RegistroPage} from '../pages/registro/registro';
import {LoginPage} from '../pages/login/login';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service';
import {AngularFireDatabaseModule}  from 'angularfire2/database';
export const firebaseConfig = {
    apiKey: "AIzaSyBlMBzpnfMKx1ebPOCrw9VkITQSzU_2RSU",
    authDomain: "tutoriasmoviles.firebaseapp.com",
    databaseURL: "https://tutoriasmoviles.firebaseio.com",
    projectId: "tutoriasmoviles",
    storageBucket: "tutoriasmoviles.appspot.com",
    messagingSenderId: "333648121852"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PerfilPage,
    AyudaPage,
    TransaccionesPage,
    RegistroPage,
    LoginPage,
    EditarPerfilPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PerfilPage,
    AyudaPage,
    TransaccionesPage,
    RegistroPage,
    LoginPage,
    EditarPerfilPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
