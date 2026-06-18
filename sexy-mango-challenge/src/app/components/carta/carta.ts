import { Component, input, signal, inject, effect } from '@angular/core';
import { Carta as CartaModel } from '../../models/carta.model';
import { Audio } from '../../services/audio';

@Component({
  selector: 'app-carta',
  imports: [],
  templateUrl: './carta.html',
  styleUrl: './carta.css',
})
export class Carta {
  readonly carta = input<CartaModel | null>(null);
  protected revelada = signal(false);
  private audio = inject(Audio);
  private flipTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      const c = this.carta();
      if (c) {
        this.revelada.set(false);
        if (this.flipTimeout) clearTimeout(this.flipTimeout);
        this.audio.playFlip();
        this.flipTimeout = setTimeout(() => this.revelada.set(true), 650);
      }
    });
  }
}
