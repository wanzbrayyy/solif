import { HttpClient } from 'aurelia-fetch-client';

export class ApiService {
  constructor() {
    this.client = new HttpClient();
    this.client.configure(config => {
      config
        // INI URL BACKEND KAMU YANG BENAR
        .withBaseUrl('https://solid-palm.vercel.app/api/') 
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
      const response = await this.client.fetch('home');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("ERROR API HOME:", error);
      // Return data kosong biar gak stuck loading
      return {
        success: false,
        data: { trending: [], anime: [], recommended: [] }
      };
    }
  }

  async searchMovies(query) {
    try {
      const response = await this.client.fetch(`search?q=${query}`);
      return await response.json();
    } catch (error) {
      return { success: false, data: [] };
    }
  }

  async getVideoDetail(id) {
    try {
      const response = await this.client.fetch(`video/${id}`);
      return await response.json();
    } catch (error) {
      return { success: false, data: null };
    }
  }
}