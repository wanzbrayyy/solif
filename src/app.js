import { PLATFORM } from 'aurelia-pal';

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Wanzofc Film';
    config.options.pushState = true;
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