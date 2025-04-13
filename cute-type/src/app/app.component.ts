import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { StatsComponent } from './components/stats/stats.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    GameComponent,
    LanguageSelectorComponent,
    StatsComponent
  ],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1 class="kawaii-title">🎀 Cute Type 🎀</h1>
      </header>
      
      <main>
        <app-language-selector></app-language-selector>
        
        <app-game></app-game>
        
      </main>

      <footer class="app-footer">
        <p>Made with 💖 by Cute Type Team</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding: 2rem;
    }

    .app-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .kawaii-title {
      color: var(--sanrio-pink);
      font-size: 3rem;
      margin: 0;
      text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.3);
      animation: bounce 2s infinite;
    }

    main {
      flex: 1;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }

    .app-footer {
      text-align: center;
      padding: 1rem;
      color: var(--sanrio-pink);
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .app-container {
        padding: 1rem;
      }

      .kawaii-title {
        font-size: 2rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'cute-type';
}
