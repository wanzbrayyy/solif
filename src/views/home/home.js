import { inject } from 'aurelia-framework';
import { ApiService } from '../../services/api';

@inject(ApiService)
export class Home {
  trending = [];
  anime = [];
  recommended = [];
  isLoading = true; 
  constructor(api) {
    this.api = api;
  }

  async activate() {
    this.isLoading = true;
    try {
      const result = await this.api.getHomeData();
      
      if (result && result.success && result.data) {
        this.trending = result.data.trending || [];
        this.anime = result.data.anime || [];
        this.recommended = result.data.recommended || [];
        console.log("Data loaded:", result.data);
      } else {
        console.warn("Data kosong atau format salah", result);
      }
    } catch (error) {
      console.error("Fatal Error di Home:", error);
    } finally {
      this.isLoading = false;
    }
  }
}