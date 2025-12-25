import environment from './environment';
import { PLATFORM } from 'aurelia-pal';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration();
    // BARIS INI KITA HAPUS BIAR TIDAK CRASH:
    // .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  aurelia.start()
    .then(() => aurelia.setRoot(PLATFORM.moduleName('app')))
    .catch(e => {
      // Munculkan pesan error di layar HP jika gagal
      alert("Error Starting App: " + e.message); 
    });
}