# 🚀 Proyecto: Aplicación Web con Login y Roles

Esta aplicación es un proyecto web desarrollado en Angular 18, utilizando las librerías PrimeNG y PrimeFlex para la interfaz de usuario. El proyecto incluye un sistema de autenticación básico, con dos roles definidos: "admin" y "user". Dependiendo del rol, los usuarios tienen acceso a diferentes funcionalidades. Este README te guiará a través de la estructura del proyecto y cómo instalar, ejecutar y probar la aplicación.

## 🛠️ Tecnologías Utilizadas

- **Angular 18**: Framework principal para el desarrollo de la aplicación.
- **PrimeNG**: Biblioteca de componentes de interfaz de usuario para Angular.
- **PrimeFlex**: Biblioteca de utilidades CSS para ayudar en el diseño y maquetado responsivo.
- **TypeScript**: Lenguaje de programación utilizado para mejorar la calidad del código.

## 📂 Estructura del Proyecto

El proyecto está organizado con una estructura clara para facilitar el mantenimiento y la escalabilidad. A continuación, se describe brevemente la estructura principal:

```
/raiz-del-proyecto
  |-- /src
      |-- /app
          |-- /admin
              |-- /post-form           # Componente para crear y editar publicaciones
                  |-- post-form.component.html
                  |-- post-form.component.scss
                  |-- post-form.component.spec.ts
                  |-- post-form.component.ts
          |-- /auth
              |-- /login               # Componente de login
                  |-- login.component.html
                  |-- login.component.scss
                  |-- login.component.spec.ts
                  |-- login.component.ts
          |-- /domain                  # Clases de dominio y enums
              |-- post.class.ts
              |-- role.enum.ts
              |-- user.class.ts
          |-- /guards                  # Guards de autenticación y rol
              |-- admin.guard.ts
              |-- auth.guard.ts
          |-- /services
              |-- /auth                # Servicios de autenticación
                  |-- auth.service.spec.ts
                  |-- auth.service.ts
              |-- /post                # Servicios relacionados con publicaciones
                  |-- post.service.spec.ts
                  |-- post.service.ts
              |-- notification.service.spec.ts  # Pruebas para el servicio de notificaciones
              |-- notification.service.ts       # Servicio para notificaciones
          |-- /shared                  # Componentes y recursos compartidos
          |-- app.component.html
          |-- app.component.scss
          |-- app.component.spec.ts
          |-- app.component.ts
          |-- app.config.ts
          |-- app.routes.ts
      |-- /assets                     # Recursos estáticos (imágenes, hojas de estilo)
      |-- /environments               # Configuración de entornos (desarrollo, producción)
```

## ⚙️ Instalación

Sigue estos pasos para instalar y ejecutar la aplicación en tu entorno local:

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/Lcarera/eldar-challenge
   cd eldar-challenge
   ```

2. **Instalar dependencias**
   Asegúrate de tener Node.js y npm instalados. Luego, ejecuta:

   ```bash
   npm install
   ```

3. **Configurar entornos**
   Revisa el archivo `src/environments/environment.ts` para asegurarte de que los entornos estén configurados correctamente.

## ▶️ Ejecución de la Aplicación

Para ejecutar la aplicación en modo de desarrollo:

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`.

## 🔑 Pruebas de la Aplicación

Existen dos usuarios predefinidos para probar las funcionalidades de la aplicación:

1. **Admin**:

   - 📧 Email: `admin@eldar.com`
   - 🔑 Contraseña: `admin123`
   - 🛠️ Rol: ADMIN (Permite crear, editar y visualizar datos).

2. **User**:

   - 📧 Email: `user@eldar.com`
   - 🔑 Contraseña: `usuario123`
   - 👀 Rol: USER (Solo puede visualizar los datos).

### 🔒 Pruebas de Autenticación

- Los usuarios deben iniciar sesión en la página de login (`/login`).
- Dependiendo del rol, el usuario será redirigido a su página correspondiente (admin o user).
- Las rutas están protegidas mediante guards que verifican los permisos del usuario logueado.

### 🔄 Pruebas de Roles

- **Admin** puede acceder a las funcionalidades de creación y edición de datos.
- **User** solo tiene acceso a la página de visualización de datos.

## 🧪 Pruebas Unitarias

Para ejecutar las pruebas unitarias utiliza el siguiente comando:

```bash
ng test
```

Se utilizará Jasmine y Karma para realizar las pruebas de los componentes y servicios.

## ✨ Funcionalidades Adicionales

- **🔔 Notificaciones**: Se han agregado notificaciones para operaciones exitosas y fallidas, utilizando PrimeNG Toast.
- **📊 Paginación y Filtrado**: Para la experiencia del usuario, el componente de visualización de datos incluye paginación y opciones de filtrado.
- **🔐 Autenticación Simulada**: La autenticación se simula con tokens JWT falsos para proporcionar una experiencia realista.

## 🌐 API Utilizada

Para la obtención de datos, la aplicación hace uso de la API de ejemplo proporcionada por [JSONPlaceholder](https://jsonplaceholder.typicode.com/guide/).

