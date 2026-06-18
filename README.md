# Sexy Mango Challenge 🥭

Aplicación web interactiva de **Verdad o Reto** con identidad de marca **Sexy Mango**. Diseñada para usarse en eventos sociales desde celular o proyectada en pantalla.

Proyecto Personal — IF7102 Multimedios | I Ciclo 2026 | UCR - Sede Guanacaste

**Framework:** Angular 21 con Signals · **Demo en vivo:** https://jcarlosjimenezc.github.io/SexyMango/

---

## Cómo se juega

1. Elige el nivel de intensidad: **Suave**, **Picante** o **Extremo**
2. Presiona **Comenzar**
3. Aparecen dos cartas boca abajo — una Verdad y un Reto
4. Toca la carta que quieras jugar para revelarla
5. Completa el reto o responde la verdad antes de que se acabe el tiempo (20 s)
6. Presiona **Cumplido**, **Paso** o **Siguiente** para continuar
7. Al acabar las cartas se muestra el resumen de la noche

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

## Requisitos

- [Node.js](https://nodejs.org/) v18 o superior
- npm v9 o superior

---

## Instalación y ejecución local

```bash
# 1. Clonar el repositorio
git clone https://github.com/JCarlosJimenezC/SexyMango.git
cd SexyMango/sexy-mango-challenge

# 2. Instalar dependencias
npm install

# 3. Levantar servidor de desarrollo
npm start
```

Abrir en el navegador: `http://localhost:4200`

---

## Build de producción

```bash
cd sexy-mango-challenge
npm run build
```

El resultado queda en `dist/sexy-mango-challenge/browser/`.

---

## Deploy a GitHub Pages

```bash
cd sexy-mango-challenge
npm run deploy
```

Esto hace el build optimizado con la base-href correcta y lo publica en la rama `gh-pages` automáticamente.

> Primera vez: asegurarse de que GitHub Pages esté habilitado en el repo (`Settings → Pages → Branch: gh-pages`).

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

## Arquitectura

### Componentes Angular (7)

| Componente | Responsabilidad |
|---|---|
| `PantallaInicio` | Pantalla de inicio y selección de intensidad |
| `PantallaJuego` | Orquesta la partida en curso |
| `PantallaResumen` | Estadísticas y opciones al finalizar |
| `CartaComponent` | Carta con flip 3D, recibe datos vía `input()` |
| `TemporizadorComponent` | Cuenta regresiva, emite `output()` al agotarse |
| `SelectorIntensidad` | Botones Suave / Picante / Extremo |
| `Encabezado` | Logo + nombre de marca |

**Servicios:** `JuegoService` (estado con Signals) · `AudioService` (Web Audio API)

---

## Stack

- [Angular 21](https://angular.dev/) con Signals
- CSS puro (sin frameworks UI)
- Web Audio API para efectos de sonido

---

## Capturas de pantalla

> Agregar capturas antes de la entrega final.

---

Ver [REFERENCIAS.md](./sexy-mango-challenge/REFERENCIAS.md) para fuentes, tutoriales y licencias de recursos multimedia.
