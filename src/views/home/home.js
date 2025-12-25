import { inject } from 'aurelia-framework';
import { ApiService } from '../../services/api';

@inject(ApiService)
export class Home {
  trending = [];
  anime = [];
  recommended = [];

  constructor(api) {
    this.api = api;
  }

  async activate() {
    try {
      const result = await this.api.getHomeData();
      if (result.success) {
        this.trending = result.data.trending;
        this.anime = result.data.anime;
        this.recommended = result.data.recommended;
      }
    } catch (error) {
      console.error('Failed to load home data', error);
    }
  }
}