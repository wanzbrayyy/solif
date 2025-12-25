import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class NavBar {
  keyword = '';

  constructor(router) {
    this.router = router;
  }

  doSearch() {
    if (this.keyword.trim()) {
      this.router.navigateToRoute('search', { q: this.keyword });
    }
  }
}