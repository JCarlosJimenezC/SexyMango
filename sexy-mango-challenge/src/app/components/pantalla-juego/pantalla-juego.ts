import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { Juego } from '../../services/juego';
import { Audio } from '../../services/audio';
import { Carta as CartaModel } from '../../models/carta.model';
import { Carta } from '../carta/carta';
import { Temporizador } from '../temporizador/temporizador';
import { Encabezado } from '../encabezado/encabezado';

@Component({
  selector: 'app-pantalla-juego',
  imports: [Carta, Temporizador, Encabezado],
  templateUrl: './pantalla-juego.html',
  styleUrl: './pantalla-juego.css',
})
export class PantallaJuego implements OnInit, OnDestroy {
  juego = inject(Juego);
  private audio = inject(Audio);

  timerKey = signal(0);

  ngOnInit() {
    this.audio.startBgMusic();
  }

  ngOnDestroy() {
    this.audio.stopBgMusic();
  }

  onSeleccionar(carta: CartaModel) {
    this.juego.seleccionarCarta(carta);
  }

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
    this.juego.sacarPar();
  }

  onTimerAgotado() {}
}
