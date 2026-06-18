import { Component, inject, OnInit } from '@angular/core';
import { Juego } from '../../services/juego';
import { Audio } from '../../services/audio';
import { Encabezado } from '../encabezado/encabezado';
import { SelectorIntensidad } from '../selector-intensidad/selector-intensidad';

@Component({
  selector: 'app-pantalla-inicio',
  imports: [Encabezado, SelectorIntensidad],
  templateUrl: './pantalla-inicio.html',
  styleUrl: './pantalla-inicio.css',
})
export class PantallaInicio implements OnInit {
  juego = inject(Juego);
  private audio = inject(Audio);

  ngOnInit() {
    this.juego.cargarCartas();
    this.audio.startBgMusic();
  }
}
