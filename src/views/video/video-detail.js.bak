import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ApiService } from '../../services/api';

@inject(ApiService, Router)
export class VideoDetail {
  movie = null;
  relatedMovies = [];
  isLoading = true;
  currentVideoUrl = '';

  constructor(api, router) {
    this.api = api;
    this.router = router;
  }

  async activate(params) {
    this.isLoading = true;
    try {
      // Ambil data detail termasuk query season & episode jika ada
      const result = await this.api.getVideoDetail(params.id, params.season, params.episode);
      
      if (result.success) {
        this.movie = result.data;
        this.currentVideoUrl = this.movie.videoUrl; // Set video player awal
        this.relatedMovies = result.related || []; 
      }
    } finally {
      this.isLoading = false;
      window.scrollTo(0, 0);
    }
  }

  // Fungsi untuk ganti episode
  changeEpisode(season, episode) {
    if (this.movie.activeSeason === season && this.movie.activeEpisode === episode) {
      return; // Jangan reload jika episode sama
    }
    // Navigasi ke URL baru dengan parameter season & episode
    this.router.navigateToRoute('video', { 
      id: this.movie.videoId, 
      season: season, 
      episode: episode 
    });
  }

  // Fungsi untuk ganti resolusi
  changeResolution(sourceUrl) {
    this.currentVideoUrl = sourceUrl;
  }
}