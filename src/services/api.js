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
    const response = await this.client.fetch('home');
    return await response.json();
  }

  async searchMovies(query) {
    const response = await this.client.fetch(`search?q=${query}`);
    return await response.json();
  }

  async getVideoDetail(id) {
    const response = await this.client.fetch(`video/${id}`);
    return await response.json();
  }
}