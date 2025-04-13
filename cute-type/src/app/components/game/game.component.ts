import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../services/language.service';
import { StatsService } from '../../services/stats.service';
import { Subscription } from 'rxjs';
import { GameStats } from '../../models/game-stats.model';
import { TextService } from '../../services/text.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-container kawaii-container">
      <div class="kawaii-header">
        <div class="kawaii-cloud left-cloud">☁️</div>
        <div class="kawaii-cloud right-cloud">☁️</div>
        <div class="kawaii-ears left-ear"></div>
        <div class="kawaii-bow">🎀</div>
        <h1 class="kawaii-title">Typing Game ♡</h1>
        <div class="kawaii-ears right-ear"></div>
        <div class="kawaii-stars">
          <span class="star">⭐</span>
          <span class="star">✨</span>
          <span class="star">⭐</span>
        </div>
      </div>

      <div class="game-stats">
        <div class="stat-item">
          <div class="stat-icon">⌨️</div>
          <span class="stat-label">WPM</span>
          <span class="stat-value">{{ wpm }}</span>
        </div>
        <div class="stat-item">
          <div class="stat-icon">✨</div>
          <span class="stat-label">Précision</span>
          <span class="stat-value">{{ accuracy }}%</span>
        </div>
        <div class="stat-item">
          <div class="stat-icon">⏰</div>
          <span class="stat-label">Temps</span>
          <span class="stat-value">{{ timer }}.{{ milliseconds }}</span>
        </div>
      </div>

      <div class="typing-area" [class.game-active]="isGameActive">
        <div class="kawaii-decoration left">🌸</div>
        <div class="text-display" [class.error]="hasError">
          <span *ngFor="let char of displayText; let i = index"
                [class.current]="i === currentIndex"
                [class.correct]="typedText[i] === char"
                [class.incorrect]="typedText[i] !== undefined && typedText[i] !== char"
                [class.space]="char === ' '">{{char}}</span>
        </div>
        <div class="kawaii-decoration right">🌸</div>
        
        <input #typeInput
               class="typing-input"
               [class.hidden]="!isGameActive"
               (input)="onInput($event)"
               (keydown)="onKeyDown($event)"
               [disabled]="!isGameActive"
               autocomplete="off"
               autocorrect="off"
               autocapitalize="off"
               spellcheck="false">
      </div>

      <div class="game-controls">
        <button class="kawaii-button start-button" (click)="startGame()" *ngIf="!isGameActive">
          <span class="button-icon">🎮</span> Commencer
        </button>
        <button class="kawaii-button restart-button" (click)="restartGame()" *ngIf="isGameActive">
          <span class="button-icon">🔄</span> Recommencer
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
      background: url('https://wallpapers.com/images/hd/cute-sanrio-1kne0am39hwzcjdd.jpg') center center/cover no-repeat fixed;
      padding: max(1rem, 2vh);
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }

    .game-container {
      padding: clamp(1rem, 5vw, 2rem);
      background: rgba(255, 255, 255, 0.85);
      border-radius: clamp(20px, 4vw, 30px);
      box-shadow: 0 8px 32px rgba(255, 182, 193, 0.25);
      font-family: 'Comic Sans MS', 'Chalkboard SE', 'SST Typewriter', cursive;
      width: min(95%, 800px);
      margin: 0 auto;
      position: relative;
      border: 3px solid var(--sanrio-pink);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: clamp(1rem, 3vh, 2rem);
      backdrop-filter: blur(8px);
      z-index: 1;
    }

    .kawaii-header {
      text-align: center;
      position: relative;
      margin-bottom: 2rem;
    }

    .kawaii-title {
      color: var(--sanrio-dark-pink);
      font-size: clamp(1.8rem, 5vw, 2.5rem);
      text-align: center;
      margin: 0;
      padding: 0.5rem clamp(1rem, 3vw, 2rem);
      background-color: rgba(255, 255, 255, 0.95);
      border-radius: 25px;
      box-shadow: 0 4px 12px rgba(255, 105, 180, 0.2);
      display: inline-block;
      backdrop-filter: blur(4px);
    }

    .game-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: clamp(0.5rem, 2vw, 1rem);
      margin: -1rem auto 1rem auto;
      width: 100%;
      max-width: 600px;
      padding: 0 clamp(0.5rem, 2vw, 1rem);
    }

    .stat-item {
      text-align: center;
      background: rgba(255, 255, 255, 0.95);
      padding: clamp(0.8rem, 2vw, 1.2rem);
      border-radius: clamp(15px, 3vw, 20px);
      border: 3px solid var(--sanrio-pink);
      box-shadow: 0 6px 16px rgba(255, 182, 193, 0.2);
      transition: transform 0.3s ease;
      backdrop-filter: blur(4px);

      &:hover {
        transform: translateY(-5px);
      }

      .stat-icon {
        font-size: clamp(1.5rem, 4vw, 1.8rem);
        margin-bottom: 0.5rem;
      }

      .stat-label {
        display: block;
        color: var(--sanrio-pink);
        font-size: clamp(0.9rem, 2.5vw, 1.1rem);
        margin-bottom: 0.3rem;
        font-weight: bold;
      }

      .stat-value {
        font-size: clamp(1.5rem, 4vw, 2rem);
        font-weight: bold;
        color: var(--sanrio-dark-pink);
        text-shadow: 1px 1px 0 rgba(255, 182, 193, 0.3);
      }
    }

    .typing-area {
      background: rgba(255, 255, 255, 0.95);
      padding: clamp(1rem, 3vw, 2rem);
      border-radius: clamp(20px, 4vw, 25px);
      margin: 0 auto;
      width: 100%;
      max-width: 700px;
      border: 3px solid var(--sanrio-pink);
      box-shadow: 0 8px 24px rgba(255, 105, 180, 0.15);
      transition: all 0.3s ease;
      position: relative;
      box-sizing: border-box;
      backdrop-filter: blur(4px);

      &.game-active {
        border-color: var(--sanrio-dark-pink);
        transform: scale(1.02);
      }

      .kawaii-decoration {
        position: absolute;
        font-size: 2rem;
        top: 50%;
        transform: translateY(-50%);

        &.left {
          left: 1rem;
        }

        &.right {
          right: 1rem;
        }
      }
    }

    .text-display {
      font-size: clamp(1.2rem, 2.5vw, 1.5rem);
      line-height: 1.6;
      margin-bottom: 1rem;
      min-height: clamp(60px, 15vh, 100px);
      text-align: center;
      word-wrap: break-word;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 0;
      padding: clamp(0.8rem, 2vw, 1rem);
      border-radius: 15px;
      background: rgba(255, 255, 255, 0.95);
      width: 100%;
      box-sizing: border-box;

      span {
        display: inline-block;
        transition: all 0.2s ease;
        white-space: pre;

        &.current {
          background-color: rgba(255, 182, 193, 0.3);
          border-radius: 4px;
          padding: 0 2px;
          margin: 0 -2px;
          animation: pulse 1.5s infinite;
        }

        &.correct {
          color: #FF69B4;
        }

        &.incorrect {
          color: #FF4444;
          text-decoration: underline wavy #FF4444;
          animation: shake 0.3s ease-in-out;
        }

        &.space {
          margin: 0 2px;
        }
      }
    }

    .game-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
    }

    .kawaii-button {
      padding: clamp(12px, 2vw, 15px) clamp(25px, 5vw, 40px);
      border: none;
      border-radius: 30px;
      background: linear-gradient(45deg, var(--sanrio-pink) 0%, var(--sanrio-dark-pink) 100%);
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: clamp(1.1rem, 2.5vw, 1.3rem);
      font-weight: bold;
      font-family: inherit;
      box-shadow: 0 6px 16px rgba(255, 105, 180, 0.3);
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin: 0 auto;
      
      &:hover {
        transform: scale(1.05) translateY(-3px);
        box-shadow: 0 8px 20px rgba(255, 105, 180, 0.4);
      }

      &:active {
        transform: scale(0.98) translateY(0);
      }

      &.start-button {
        background: linear-gradient(45deg, #FF69B4 0%, #FF1493 100%);
        animation: pulse-button 2s infinite;
      }
    }

    @keyframes pulse-button {
      0% {
        box-shadow: 0 0 0 0 rgba(255, 105, 180, 0.4);
      }
      70% {
        box-shadow: 0 0 0 15px rgba(255, 105, 180, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(255, 105, 180, 0);
      }
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-3px); }
      75% { transform: translateX(3px); }
    }

    @media (max-width: 480px) {
      :host {
        padding: 0.5rem;
      }

      .game-container {
        padding: 1rem;
        gap: 1rem;
      }

      .kawaii-title {
        font-size: 1.3rem;
        padding: 0.3rem 1rem;
      }

      .typing-area {
        padding: 0.8rem;
        margin: 0;

        .kawaii-decoration {
          font-size: 1.5rem;
        }
      }

      .text-display {
        font-size: 1rem;
        min-height: 50px;
        padding: 0.5rem;
      }

      .kawaii-button {
        padding: 8px 16px;
        font-size: 1rem;

        .button-icon {
          font-size: 1.1rem;
        }
      }

      .stat-item {
        padding: 0.6rem;

        .stat-icon {
          font-size: 1.2rem;
        }

        .stat-label {
          font-size: 0.8rem;
        }

        .stat-value {
          font-size: 1.2rem;
        }
      }
    }

    .typing-input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
  `]
})
export class GameComponent implements OnInit, OnDestroy {
  @ViewChild('typeInput') typeInput!: ElementRef;

  displayText: string[] = [];
  typedText: string[] = [];
  currentIndex = 0;
  startTime = 0;
  timer = 0;
  wpm = 0;
  accuracy = 100;
  isGameActive = false;
  hasError = false;
  private timerInterval: any;
  private languageSubscription: Subscription;
  private currentLanguage: Language = 'fr';
  private texts: string[] = [];
  private isFirstKeyPress: boolean = true;
  private totalKeystrokes: number = 0;
  private errorCount: number = 0;
  milliseconds = 0;

  constructor(
    private languageService: LanguageService,
    private statsService: StatsService,
    private textService: TextService
  ) {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
      this.texts = this.textService.getTexts(lang);
      if (!this.isGameActive) {
        this.resetGame();
      }
    });
  }

  ngOnInit() {
    this.loadText();
  }

  ngOnDestroy() {
    this.stopTimer();
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  startGame() {
    this.resetGame();
    this.isGameActive = true;
    setTimeout(() => this.typeInput.nativeElement.focus(), 0);
  }

  restartGame() {
    this.resetGame();
    this.startGame();
  }

  private resetGame() {
    this.typedText = [];
    this.currentIndex = 0;
    this.timer = 0;
    this.wpm = 0;
    this.accuracy = 100;
    this.isGameActive = false;
    this.hasError = false;
    this.isFirstKeyPress = true;
    this.totalKeystrokes = 0;
    this.errorCount = 0;
    this.stopTimer();
    this.loadText();
  }

  private startTimer() {
    if (this.isFirstKeyPress) {
      this.isFirstKeyPress = false;
      this.startTime = Date.now();
      this.timerInterval = setInterval(() => {
        const now = Date.now();
        const diff = now - this.startTime;
        this.timer = Math.floor(diff / 1000);
        this.milliseconds = Math.floor((diff % 1000) / 10);
        this.calculateWPM();
      }, 10); // Update every 10ms for smoother milliseconds display
    }
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private calculateWPM() {
    if (this.timer === 0) return;
    
    // Joindre le texte tapé jusqu'à l'index actuel
    const typedString = this.typedText.join('');
    const targetString = this.displayText.slice(0, this.currentIndex).join('');
    
    // Compter les caractères corrects
    let correctChars = 0;
    for (let i = 0; i < typedString.length; i++) {
      if (typedString[i] === targetString[i]) {
        correctChars++;
      }
    }
    
    // Calculer les minutes écoulées (convertir les secondes en minutes)
    const minutes = this.timer / 60;
    
    // Calculer les mots en utilisant la moyenne de 4.8 caractères par mot en français
    // et en ne comptant que les caractères correctement tapés
    const words = correctChars / 4.8;
    
    // Calculer les mots par minute
    this.wpm = Math.round(words / minutes);
  }

  private calculateAccuracy() {
    if (this.totalKeystrokes === 0) {
      this.accuracy = 100;
      return;
    }

    this.accuracy = Math.round(((this.totalKeystrokes - this.errorCount) / this.totalKeystrokes) * 100);
  }

  onInput(event: Event) {
    if (!this.isGameActive) return;
    
    const input = (event.target as HTMLInputElement).value;
    const lastChar = input[input.length - 1];
    
    this.totalKeystrokes++;
    
    if (lastChar === this.displayText[this.currentIndex]) {
      this.startTimer();
      this.typedText.push(lastChar);
      this.currentIndex++;
      this.hasError = false;

      if (this.typedText.length > 0) {
        this.calculateAccuracy();
        this.calculateWPM();
      }

      if (this.currentIndex === this.displayText.length) {
        this.finishGame();
      }
    } else {
      this.hasError = true;
      this.errorCount++;
      this.calculateAccuracy();
    }

    (event.target as HTMLInputElement).value = '';
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Backspace' && this.currentIndex > 0) {
      event.preventDefault();
      this.currentIndex--;
      this.typedText.pop();
      this.totalKeystrokes++;
      this.calculateAccuracy();
      this.calculateWPM();
      this.hasError = false;
    }
  }

  private finishGame() {
    this.stopTimer();
    this.isGameActive = false;
    
    const stats: GameStats = {
      wpm: this.wpm,
      accuracy: this.accuracy,
      time: this.timer,
      language: this.languageService.getCurrentLanguage(),
      text: this.displayText.join(''),
      timestamp: Date.now()
    };

    this.statsService.saveGameStats(stats);
  }

  private loadText() {
    const texts = this.textService.getTexts(this.currentLanguage);
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    this.displayText = randomText.split('');
  }
} 