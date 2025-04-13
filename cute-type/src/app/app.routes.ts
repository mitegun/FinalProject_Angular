import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { StatsComponent } from './components/stats/stats.component';

export const routes: Routes = [
  { path: '', redirectTo: '/play', pathMatch: 'full' },
  { path: 'play', component: GameComponent },
  { path: 'stats', component: StatsComponent },
  { path: '**', redirectTo: '/play' }
];
