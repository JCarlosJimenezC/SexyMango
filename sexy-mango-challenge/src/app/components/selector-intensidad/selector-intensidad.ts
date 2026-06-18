import { Component, inject } from '@angular/core';
import { Juego } from '../../services/juego';
import { Intensidad } from '../../models/carta.model';

@Component({
  selector: 'app-selector-intensidad',
  imports: [],
  templateUrl: './selector-intensidad.html',
  styleUrl: './selector-intensidad.css',
})
export class SelectorIntensidad {
  juego = inject(Juego);

  readonly niveles: { id: Intensidad; emoji: string; label: string }[] = [
    { id: 'suave', emoji: '🌿', label: 'Suave' },
    { id: 'picante', emoji: '🔥', label: 'Picante' },
    { id: 'extremo', emoji: '💀', label: 'Extremo' },
  ];
}
