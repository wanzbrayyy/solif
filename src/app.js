import { PLATFORM } from 'aurelia-pal';
// IMPORT CSS DISINI AGAR TIDAK ERROR "Failed loading required CSS"
import './assets/global.css';

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Wanzofc Film';
    
    // Matikan pushState agar lebih stabil di Vercel
    config.options.pushState = false; 
    config.options.root = '/';

    config.map([
      { 
        route: ['', 'home'], 
        name: 'home', 
        moduleId: PLATFORM.moduleName('./views/home/home'), 
        nav: true, 
        title: 'Home' 
      },
      { 
        route: 'search', 
        name: 'search', 
        moduleId: PLATFORM.moduleName('./views/search/search'), 
        title: 'Search' 
      }
    ]);
  }
}