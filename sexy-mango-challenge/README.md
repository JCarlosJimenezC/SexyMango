# Sexy Mango Challenge 🥭

Aplicación web interactiva de **Verdad o Reto** con identidad de marca **Sexy Mango**. Diseñada para usarse en eventos sociales desde celular o proyectada en pantalla.

Proyecto Personal — IF7102 Multimedios | I Ciclo 2026 | UCR - Sede Guanacaste

**Framework elegido: Angular 21**

---

## Funcionalidades

- 3 niveles de intensidad: Suave, Picante, Extremo (acumulativos)
- Cartas de Verdad y Reto cargadas dinámicamente desde `public/data/cartas.json`
- Animación flip 3D al revelar cada carta
- Temporizador de 20 s con visualización SVG circular (activable/desactivable)
- Efectos de sonido generados con la Web Audio API (sin archivos externos)
- 3 pantallas: Inicio → Juego → Resumen con estadísticas de la sesión
- Diseño responsivo — optimizado para móvil y escritorio
- Paleta de marca: naranja / rojo / verde lima sobre fondo negro

---

## Componentes Angular (7)

| Componente | Responsabilidad |
|---|---|
| `PantallaInicio` | Pantalla de inicio y selección de intensidad |
| `PantallaJuego` | Orquesta la partida en curso |
| `PantallaResumen` | Estadísticas y opciones al finalizar |
| `CartaComponent` | Carta con flip 3D, recibe datos vía `input()` |
| `TemporizadorComponent` | Cuenta regresiva, emite `output()` al agotarse |
| `SelectorIntensidad` | Botones Suave / Picante / Extremo |
| `Encabezado` | Logo + nombre de marca |

Servicios: `JuegoService` (estado con Signals) · `AudioService` (Web Audio API).

---

## Cómo ejecutar

```bash
npm install
ng serve
```

Abre http://localhost:4200

---

## Agregar nuevas cartas

Edita `public/data/cartas.json` — no es necesario tocar código:

```json
{
  "id": "v99",
  "categoria": "verdad",
  "intensidad": "suave",
  "texto": "¿Cuál es tu canción favorita para eventos?"
}
```

Valores de `categoria`: `"verdad"` o `"reto"`
Valores de `intensidad`: `"suave"`, `"picante"`, `"extremo"`

---

## Deploy en GitHub Pages

```bash
npm run build:gh-pages
npx angular-cli-ghpages --dir=dist/sexy-mango-challenge/browser
```

---

## Capturas de pantalla

> Agregar capturas antes de la entrega final.

---

Ver [REFERENCIAS.md](./REFERENCIAS.md) para fuentes, tutoriales y licencias de recursos multimedia.
