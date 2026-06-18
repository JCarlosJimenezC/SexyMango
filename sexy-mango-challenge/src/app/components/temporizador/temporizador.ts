import { Component, input, output, OnDestroy, signal, inject, effect } from '@angular/core';
import { Audio } from '../../services/audio';

@Component({
  selector: 'app-temporizador',
  imports: [],
  templateUrl: './temporizador.html',
  styleUrl: './temporizador.css',
})
export class Temporizador implements OnDestroy {
  readonly duracion = input<number>(20);
  readonly activo = input<boolean>(true);
  readonly resetKey = input<number>(0);
  readonly agotado = output<void>();

  protected segundosRestantes = signal(20);
  protected progreso = signal(100);

  private intervalo: ReturnType<typeof setInterval> | null = null;
  private audio = inject(Audio);

  constructor() {
    effect(() => {
      const dur = this.duracion();
      const act = this.activo();
      this.resetKey(); // track for changes
      this.detener();
      this.segundosRestantes.set(dur);
      this.progreso.set(100);
      if (act) this.iniciar();
    });
  }

  ngOnDestroy() {
    this.detener();
  }

  private iniciar() {
    const total = this.duracion();
    this.intervalo = setInterval(() => {
      const actual = this.segundosRestantes();
      if (actual <= 1) {
        this.segundosRestantes.set(0);
        this.progreso.set(0);
        this.detener();
        this.audio.playTimerEnd();
        this.agotado.emit();
      } else {
        const nuevo = actual - 1;
        this.segundosRestantes.set(nuevo);
        this.progreso.set((nuevo / total) * 100);
        if (nuevo <= 5) this.audio.playTick();
      }
    }, 1000);
  }

  private detener() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
  }
}
