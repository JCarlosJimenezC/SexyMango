import { Component, inject, OnInit } from '@angular/core';
import { Juego } from '../../services/juego';
import { Audio } from '../../services/audio';
import { Encabezado } from '../encabezado/encabezado';

@Component({
  selector: 'app-pantalla-resumen',
  imports: [Encabezado],
  templateUrl: './pantalla-resumen.html',
  styleUrl: './pantalla-resumen.css',
})
export class PantallaResumen implements OnInit {
  juego = inject(Juego);
  private audio = inject(Audio);

  ngOnInit() {
    this.audio.playSalud();
  }
}
