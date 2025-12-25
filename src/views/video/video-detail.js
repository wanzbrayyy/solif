import { inject } from 'aurelia-framework';
import { ApiService } from '../../services/api';

@inject(ApiService)
export class VideoDetail {
  movie = null;
  relatedMovies = [];
  isLoading = true;

  constructor(api) {
    this.api = api;
  }

  async activate(params) {
    this.isLoading = true;
    try {
      // Ambil data detail berdasarkan ID dari URL
      const result = await this.api.getVideoDetail(params.id);
      
      if (result.success) {
        this.movie = result.data;
        // Jika backend mengirim data 'related' (rekomendasi), kita simpan
        this.relatedMovies = result.related || []; 
      }
    } catch (error) {
      console.error('Gagal memuat video:', error);
    } finally {
      this.isLoading = false;
      // Scroll ke paling atas saat pindah halaman
      window.scrollTo(0, 0);
    }
  }
}