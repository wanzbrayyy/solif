import { HttpClient } from 'aurelia-fetch-client';

export class ApiService {
  constructor() {
    this.client = new HttpClient();
    this.client.configure(config => {
      config
        // GANTI INI DENGAN URL BACKEND VERCEL KAMU YANG SUDAH DEPLOY
        // Pastikan diakhiri dengan /api/
        .withBaseUrl('https://solid-palm.vercel.ap/api/') 
        .withDefaults({
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
    });
  }

  async getHomeData() {
    try {
      // Fetch data dari endpoint /home
      const response = await this.client.fetch('home');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("ERROR API HOME:", error);
      // Return data palsu/kosong agar web TIDAK STUCK loading
      return {
        success: false,
        data: {
          trending: [],
          anime: [],
          recommended: []
        }
      };
    }
  }

  async searchMovies(query) {
    try {
      const response = await this.client.fetch(`search?q=${query}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("ERROR API SEARCH:", error);
      return { success: false, data: [] };
    }
  }

  async getVideoDetail(id) {
    try {
      const response = await this.client.fetch(`video/${id}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("ERROR API VIDEO:", error);
      return { success: false, data: null };
    }
  }
}