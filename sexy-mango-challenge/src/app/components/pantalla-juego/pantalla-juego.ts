import { Component, inject, signal } from '@angular/core';
import { Juego } from '../../services/juego';
import { Audio } from '../../services/audio';
import { Carta } from '../carta/carta';
import { Temporizador } from '../temporizador/temporizador';
import { Encabezado } from '../encabezado/encabezado';

@Component({
  selector: 'app-pantalla-juego',
  imports: [Carta, Temporizador, Encabezado],
  templateUrl: './pantalla-juego.html',
  styleUrl: './pantalla-juego.css',
})
export class PantallaJuego {
  juego = inject(Juego);
  private audio = inject(Audio);

  timerKey = signal(0);

  onCumplido() {
    this.audio.playCumplido();
    this.onSiguiente();
  }

  onPaso() {
    this.audio.playPaso();
    this.onSiguiente();
  }

  onSiguiente() {
    this.timerKey.update(k => k + 1);
    this.juego.sacarCarta();
  }

  onTimerAgotado() {
    // Sound already plays inside Temporizador; show visual feedback here if needed
  }
}
