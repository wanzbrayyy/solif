import { inject } from 'aurelia-framework';
import { ApiService } from '../../services/api';

@inject(ApiService)
export class Home {
  homeSections = [];
  isLoading = true;

  constructor(api) {
    this.api = api;
  }

  async activate() {
    this.isLoading = true;
    this.homeSections = []; 
    try {
      const result = await this.api.getHomeData();
      if (result && result.success && Array.isArray(result.data)) {
        this.homeSections = result.data;
      }
    } catch (error) {
      console.error("Fatal Error di Home:", error);
    } finally {
      this.isLoading = false;
    }
  }
}