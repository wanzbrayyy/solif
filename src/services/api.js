import { HttpClient } from 'aurelia-fetch-client';

export class ApiService {
  constructor() {
    this.client = new HttpClient();
    this.client.configure(config => {
      config
        .withBaseUrl('https://solid-palm.vercel.app/api/') 
        .withDefaults({
          headers: {
            'Accept': 'application/json'
          }
        });
    });
  }

  async getHomeData() {
    try {
      const response = await this.client.fetch('home');
      return await response.json();
    } catch (e) {
      console.error("Gagal ambil data home:", e);
      return { success: false, data: { trending: [], anime: [], recommended: [] } }; // Return data kosong biar gak blank
    }
  }

  async searchMovies(query) {
    try {
      const response = await this.client.fetch(`search?q=${query}`);
      return await response.json();
    } catch (e) {
      return { success: false, data: [] };
    }
  }

  async getVideoDetail(id) {
    try {
      const response = await this.client.fetch(`video/${id}`);
      return await response.json();
    } catch (e) {
      return { success: false };
    }
  }
}