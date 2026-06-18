# Sexy Mango Challenge 🥭

Juego de cartas "Verdad o Reto" para eventos y reuniones. Cada turno aparecen dos cartas boca abajo — una Verdad y un Reto — el jugador elige una, la revela y tiene 20 segundos para completarla.

**Demo en vivo:** https://jcarlosjimenzc.github.io/SexyMango/

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

## Cómo se juega

1. Elige el nivel de intensidad: **Suave**, **Picante** o **Extremo**
2. Presiona **Comenzar**
3. Aparecen dos cartas boca abajo — una Verdad y un Reto
4. Toca la carta que quieras jugar para revelarla
5. Completa el reto o responde la verdad antes de que se acabe el tiempo (20 s)
6. Presiona **Cumplido**, **Paso** o **Siguiente** para continuar
7. Al acabar las cartas se muestra el resumen de la noche

---

## Stack

- [Angular 21](https://angular.dev/) con Signals
- CSS puro (sin frameworks UI)
- Audio Web API para efectos de sonido
