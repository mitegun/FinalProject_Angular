import { Injectable } from '@angular/core';
import { Language } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class TextService {
  private texts: { [key: string]: string[] } = {
    fr: [
      "Hello Kitty adore les fraises et les pâtisseries sucrées",
      "My Melody porte toujours son capuchon rose et blanc",
      "Kuromi est la meilleure amie de My Melody malgré leur rivalité",
      "Cinnamoroll est un petit chien blanc avec des oreilles qui lui permettent de voler",
      "Pompompurin est un golden retriever qui adore les puddings",
      "Keroppi est une grenouille joyeuse qui vit près d'un étang",
      "Badtz-Maru est un petit manchot espiègle qui adore faire des blagues",
      "Pochacco est un chien blanc et bleu qui adore le sport",
      "Little Twin Stars sont Kiki et Lala, deux jumeaux venus des étoiles",
      "Chococat est un chat noir curieux qui adore le chocolat",
      "Hangyodon est un étrange poisson qui vit dans les profondeurs",
      "Tuxedo Sam est un manchot élégant qui porte toujours un nœud papillon",
      "Dear Daniel est le petit ami de Hello Kitty",
      "Pekkle est un canard jaune qui adore danser",
      "Spottie Dottie est une vache tachetée qui adore les fleurs",
      "Wish me mell est une petite abeille qui vit dans un jardin de fleurs",
      "Sugar Bunnies sont des lapins qui vivent dans un monde de bonbons",
      "Rin Rin est une petite souris qui adore la musique",
      "Mewkledreamy est une chatte magique qui voyage dans les rêves",
      "Aggretsuko est un personnage qui travaille dans un bureau et adore le death metal"
    ],
    en: [
      "Hello Kitty loves strawberries and sweet pastries",
      "My Melody always wears her pink and white hood",
      "Kuromi is My Melody's best friend despite their rivalry",
      "Cinnamoroll is a white puppy with ears that allow him to fly",
      "Pompompurin is a golden retriever who loves puddings",
      "Keroppi is a cheerful frog who lives near a pond",
      "Badtz-Maru is a mischievous little penguin who loves playing pranks",
      "Pochacco is a white and blue dog who loves sports",
      "Little Twin Stars are Kiki and Lala, twins from the stars",
      "Chococat is a curious black cat who loves chocolate",
      "Hangyodon is a strange fish who lives in the deep sea",
      "Tuxedo Sam is an elegant penguin who always wears a bow tie",
      "Dear Daniel is Hello Kitty's boyfriend",
      "Pekkle is a yellow duck who loves to dance",
      "Spottie Dottie is a spotted cow who loves flowers",
      "Wish me mell is a little bee who lives in a flower garden",
      "Sugar Bunnies are rabbits who live in a candy world",
      "Rin Rin is a little mouse who loves music",
      "Mewkledreamy is a magical cat who travels through dreams",
      "Aggretsuko is a character who works in an office and loves death metal"
    ]
  };

  getTexts(language: Language): string[] {
    return this.texts[language] || this.texts['en'];
  }
} 