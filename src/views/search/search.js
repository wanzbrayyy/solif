import { inject } from 'aurelia-framework';
import { ApiService } from '../../services/api';

@inject(ApiService)
export class Search {
  movies = [];
  query = '';
  isLoading = false;

  constructor(api) {
    this.api = api;
  }

  async activate(params) {
    this.query = params.q;
    this.isLoading = true;
    try {
      const result = await this.api.searchMovies(this.query);
      if (result.success) {
        this.movies = result.data;
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}