import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carta, CartasData, Intensidad } from '../models/carta.model';

export type PantallaActiva = 'inicio' | 'juego' | 'resumen';

@Injectable({ providedIn: 'root' })
export class Juego {
  private http = inject(HttpClient);

  readonly intensidad = signal<Intensidad>('suave');
  readonly pantallaActiva = signal<PantallaActiva>('inicio');
  readonly cartaVerdad = signal<Carta | null>(null);
  readonly cartaReto = signal<Carta | null>(null);
  readonly cartaSeleccionada = signal<Carta | null>(null);
  readonly cartasUsadas = signal<Carta[]>([]);
  readonly cargando = signal<boolean>(false);
  readonly temporizadorActivo = signal<boolean>(true);

  private todasLasCartas = signal<Carta[]>([]);
  private cartasVistas = signal<Set<string>>(new Set());

  readonly cartasFiltradas = computed(() => {
    const nivel = this.intensidad();
    const vistasIds = this.cartasVistas();
    const nivelesPermitidos: Intensidad[] =
      nivel === 'suave' ? ['suave'] :
      nivel === 'picante' ? ['suave', 'picante'] :
      ['suave', 'picante', 'extremo'];
    return this.todasLasCartas().filter(
      c => nivelesPermitidos.includes(c.intensidad) && !vistasIds.has(c.id)
    );
  });

  private readonly verdadesFiltradas = computed(() =>
    this.cartasFiltradas().filter(c => c.categoria === 'verdad')
  );

  private readonly retosFiltrados = computed(() =>
    this.cartasFiltradas().filter(c => c.categoria === 'reto')
  );

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

  seleccionarCarta(carta: Carta) {
    this.cartaSeleccionada.set(carta);
    this.cartasUsadas.update(prev => [...prev, carta]);
  }

  sacarPar() {
    const verdades = this.verdadesFiltradas();
    const retos = this.retosFiltrados();

    if (verdades.length === 0 && retos.length === 0) {
      this.pantallaActiva.set('resumen');
      return;
    }

    const verdad = verdades.length > 0
      ? verdades[Math.floor(Math.random() * verdades.length)]
      : null;
    const reto = retos.length > 0
      ? retos[Math.floor(Math.random() * retos.length)]
      : null;

    const nuevasVistas = new Set(this.cartasVistas());
    if (verdad) nuevasVistas.add(verdad.id);
    if (reto) nuevasVistas.add(reto.id);
    this.cartasVistas.set(nuevasVistas);

    this.cartaVerdad.set(verdad);
    this.cartaReto.set(reto);
    this.cartaSeleccionada.set(null);
  }

  comenzar() {
    this.cartasUsadas.set([]);
    this.cartasVistas.set(new Set());
    this.cartaVerdad.set(null);
    this.cartaReto.set(null);
    this.cartaSeleccionada.set(null);
    this.pantallaActiva.set('juego');
    this.sacarPar();
  }

  reiniciar() {
    this.cartasUsadas.set([]);
    this.cartasVistas.set(new Set());
    this.cartaVerdad.set(null);
    this.cartaReto.set(null);
    this.cartaSeleccionada.set(null);
    this.pantallaActiva.set('inicio');
  }

  toggleTemporizador() {
    this.temporizadorActivo.update(v => !v);
  }
}
