import { Component, input, output, signal, inject, effect } from '@angular/core';
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
  readonly seleccionable = input<boolean>(false);
  readonly seleccionada = output<CartaModel>();

  protected revelada = signal(false);
  private audio = inject(Audio);
  private flipTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      this.carta();
      if (this.flipTimeout) clearTimeout(this.flipTimeout);
      this.revelada.set(false);
    });
  }

  onClickCarta() {
    if (!this.seleccionable() || this.revelada()) return;
    const c = this.carta();
    if (!c) return;
    this.audio.playFlip();
    if (this.flipTimeout) clearTimeout(this.flipTimeout);
    this.flipTimeout = setTimeout(() => this.revelada.set(true), 650);
    this.seleccionada.emit(c);
  }
}
