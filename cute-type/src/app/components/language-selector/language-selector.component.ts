import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../services/language.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-selector">
      <button 
        class="kawaii-button"
        [class.active]="currentLanguage === 'fr'"
        (click)="setLanguage('fr')">
        🇫🇷 Français
      </button>
      <button 
        class="kawaii-button"
        [class.active]="currentLanguage === 'en'"
        (click)="setLanguage('en')">
        🇬🇧 English
      </button>
    </div>
  `,
  styles: [`
    .language-selector {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin: 20px 0;
    }
    .kawaii-button {
      padding: 10px 20px;
      border: none;
      border-radius: 20px;
      background-color: var(--sanrio-pink);
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
      }
      
      &.active {
        background-color: var(--sanrio-blue);
      }
    }
  `]
})
export class LanguageSelectorComponent {
  currentLanguage: Language = 'fr';

  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage$.subscribe(
      lang => this.currentLanguage = lang
    );
  }

  setLanguage(lang: Language): void {
    this.languageService.setLanguage(lang);
  }
} 