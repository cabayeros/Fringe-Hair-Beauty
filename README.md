# Fringe Hair and Beauty — Angular

Aplicación Angular 22 sin PHP. Requiere Node.js 24.x.

Este proyecto es autónomo: Angular compila desde `src/` y copia los recursos desde `public/`. No lee archivos de la carpeta Live Server. Al clonarlo, instala sus dependencias con `npm ci`.

## Descargar y ejecutar

```bash
npm ci
npm start
```

Abre la URL local que muestre Angular CLI.

## Preparar build para GitHub Pages

```bash
npm run build:github
```

Publica el contenido de `dist/fringe/browser`. El build usa rutas relativas para funcionar en el subdirectorio de GitHub Pages.

## Contenido

Se conservaron las imágenes, logos, tipografías e icono incluidos en la copia disponible y se recuperaron de la página activa los textos e imágenes de Acerca de, Beneficios, Políticas, Establecimientos y Contáctanos. Mi Cuenta incluye una vista de demostración con resumen, movimientos, perfil, establecimientos y premios; sus datos son de ejemplo y los cambios no se guardan. El inicio de sesión real y el envío del formulario de contacto necesitan servicios externos; las rutas PHP originales no se incluyeron.
