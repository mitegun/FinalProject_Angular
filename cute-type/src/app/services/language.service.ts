import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Language = 'fr' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<Language>('fr');
  currentLanguage$: Observable<Language> = this.currentLanguageSubject.asObservable();

  private frenchTexts: string[] = [
    "Le petit chat rose joue avec son ruban dans le jardin fleuri.",
    "Les étoiles brillent doucement dans le ciel nocturne.",
    "Une douce mélodie s'élève dans l'air parfumé du printemps."
  ];

  private englishTexts: string[] = [
    "The cute pink kitten plays with its ribbon in the flower garden.",
    "Stars twinkle softly in the night sky above the meadow.",
    "A sweet melody rises in the spring's fragrant air."
  ];

  constructor() {
    // Récupérer la langue sauvegardée si elle existe
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      this.currentLanguageSubject.next(savedLanguage);
    }
  }

  setLanguage(lang: Language): void {
    this.currentLanguageSubject.next(lang);
    localStorage.setItem('preferred-language', lang);
  }

  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  getTexts(lang: Language): string[] {
    return lang === 'fr' ? this.frenchTexts : this.englishTexts;
  }
} 