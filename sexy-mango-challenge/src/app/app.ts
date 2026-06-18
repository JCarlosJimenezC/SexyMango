import { Component, inject, OnInit } from '@angular/core';
import { Juego } from './services/juego';
import { Audio } from './services/audio';
import { PantallaInicio } from './components/pantalla-inicio/pantalla-inicio';
import { PantallaJuego } from './components/pantalla-juego/pantalla-juego';
import { PantallaResumen } from './components/pantalla-resumen/pantalla-resumen';

@Component({
  selector: 'app-root',
  imports: [PantallaInicio, PantallaJuego, PantallaResumen],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  juego = inject(Juego);
  private audio = inject(Audio);

  ngOnInit() {
    this.audio.startBgMusic();
  }
}
