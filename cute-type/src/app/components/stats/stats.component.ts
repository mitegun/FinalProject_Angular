import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stats-container">
      <h2>Statistics</h2>
      <div class="stats">
        <div class="stat-item">
          <span>WPM</span>
          <strong>0</strong>
        </div>
        <div class="stat-item">
          <span>Accuracy</span>
          <strong>0%</strong>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stats-container {
      padding: 20px;
      text-align: center;
    }
    .stats {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;
    }
    .stat-item {
      display: flex;
      flex-direction: column;
    }
  `]
})
export class StatsComponent {} 