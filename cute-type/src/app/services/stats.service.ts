import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface GameStats {
  wpm: number;
  accuracy: number;
  time: number;
  language: string;
  text: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private readonly STORAGE_KEY = 'cute-type-stats';
  private statsSubject = new BehaviorSubject<GameStats[]>([]);
  stats$: Observable<GameStats[]> = this.statsSubject.asObservable();

  constructor() {
    this.loadStats();
  }

  saveGameStats(stats: GameStats): void {
    const currentStats = this.statsSubject.value;
    const newStats = [stats, ...currentStats];
    this.statsSubject.next(newStats);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newStats));
  }

  getRecentStats(limit: number = 10): GameStats[] {
    return this.statsSubject.value.slice(0, limit);
  }

  getBestWPM(): number {
    const stats = this.statsSubject.value;
    if (stats.length === 0) return 0;
    return Math.max(...stats.map(s => s.wpm));
  }

  getAverageWPM(): number {
    const stats = this.statsSubject.value;
    if (stats.length === 0) return 0;
    const sum = stats.reduce((acc, curr) => acc + curr.wpm, 0);
    return Math.round(sum / stats.length);
  }

  getAverageAccuracy(): number {
    const stats = this.statsSubject.value;
    if (stats.length === 0) return 0;
    const sum = stats.reduce((acc, curr) => acc + curr.accuracy, 0);
    return Math.round(sum / stats.length);
  }

  getStatsByLanguage(language: string): GameStats[] {
    return this.statsSubject.value.filter(s => s.language === language);
  }

  clearStats(): void {
    this.statsSubject.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private loadStats(): void {
    const savedStats = localStorage.getItem(this.STORAGE_KEY);
    if (savedStats) {
      try {
        const stats = JSON.parse(savedStats);
        this.statsSubject.next(stats);
      } catch (e) {
        console.error('Error loading stats:', e);
        this.statsSubject.next([]);
      }
    }
  }
} 