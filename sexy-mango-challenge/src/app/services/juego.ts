import { Injectable, signal, computed, inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carta, CartasData, Intensidad } from '../models/carta.model';

export type PantallaActiva = 'inicio' | 'juego' | 'resumen';

@Injectable({ providedIn: 'root' })
export class Juego {
  private http = inject(HttpClient);

  readonly intensidad = signal<Intensidad>('suave');
  readonly pantallaActiva = signal<PantallaActiva>('inicio');
  readonly cartaActual = signal<Carta | null>(null);
  readonly cartasUsadas = signal<Carta[]>([]);
  readonly cargando = signal<boolean>(false);
  readonly temporizadorActivo = signal<boolean>(true);

  private todasLasCartas = signal<Carta[]>([]);

  readonly cartasFiltradas = computed(() => {
    const nivel = this.intensidad();
    const usadasIds = new Set(this.cartasUsadas().map(c => c.id));
    const nivelesPermitidos: Intensidad[] =
      nivel === 'suave' ? ['suave'] :
      nivel === 'picante' ? ['suave', 'picante'] :
      ['suave', 'picante', 'extremo'];
    return this.todasLasCartas().filter(
      c => nivelesPermitidos.includes(c.intensidad) && !usadasIds.has(c.id)
    );
  });

  readonly totalJugadas = computed(() => this.cartasUsadas().length);
  readonly verdadesJugadas = computed(() =>
    this.cartasUsadas().filter(c => c.categoria === 'verdad').length
  );
  readonly retosJugados = computed(() =>
    this.cartasUsadas().filter(c => c.categoria === 'reto').length
  );

  cargarCartas() {
    if (this.todasLasCartas().length > 0) return;
    this.cargando.set(true);
    this.http.get<CartasData>('data/cartas.json').subscribe({
      next: (data) => {
        this.todasLasCartas.set([...data.verdades, ...data.retos]);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false)
    });
  }

  cambiarIntensidad(nivel: Intensidad) {
    this.intensidad.set(nivel);
  }

  sacarCarta() {
    const disponibles = this.cartasFiltradas();
    if (disponibles.length === 0) {
      this.pantallaActiva.set('resumen');
      return;
    }
    const idx = Math.floor(Math.random() * disponibles.length);
    const carta = disponibles[idx];
    this.cartaActual.set(carta);
    this.cartasUsadas.update(prev => [...prev, carta]);
  }

  comenzar() {
    this.cartasUsadas.set([]);
    this.cartaActual.set(null);
    this.pantallaActiva.set('juego');
    this.sacarCarta();
  }

  reiniciar() {
    this.cartasUsadas.set([]);
    this.cartaActual.set(null);
    this.pantallaActiva.set('inicio');
  }

  toggleTemporizador() {
    this.temporizadorActivo.update(v => !v);
  }
}
