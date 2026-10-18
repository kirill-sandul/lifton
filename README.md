# Lifton
### A training platform for trainer-client interaction including gym programmes, progress and analytics.

---

**Lifton** es una aplicación web Full-Stack diseñada para digitalizar, planificar y realizar el seguimiento analítico de los entrenamientos entre entrenadores de deporte y sus clientes. La plataforma permite una interacción mutua y un control detallado y planificado del progreso deportivo en tiempo real.

🚀 **Despliegue en producción:** https://lifton-gamma.vercel.app/
&nbsp;&nbsp;&nbsp;

## 🛠️ Stack Tecnológico

- **Frontend:** Angular 21, TypeScript, Sass, Estilo de diseño propio.
- **Backend:** NestJS.
- **Base de Datos:** PostgreSQL.
- **Despliegue:** Vercel (Frontend), Render (Backend), Supabase (BD).

<p>
  <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/angular.png" width="25" height="25" alt="Angular" valign="middle"> <b>Angular</b> 
  &nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png" width="25" height="25" alt="TypeScript" valign="middle"> <b>TypeScript</b>
  &nbsp;&nbsp;&nbsp;
  <img width="25" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/nest_js.png" alt="Nest.js" title="Nest.js" valign="middle" /> <b>Nest.js</b> 
  &nbsp;&nbsp;&nbsp;
  <img width="25" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/node_js.png" alt="Node.js" title="Node.js" valign="middle" /> <b>Node.js</b> 
  &nbsp;&nbsp;&nbsp;
  <img width="25" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/postgresql.png" alt="PostgreSQL" title="PostgreSQL" valign="middle" /> <b>PostgreSQL</b> 
  &nbsp;&nbsp;&nbsp;
  <img width="25" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/vercel.png" alt="Vercel" title="Vercel" valign="middle" /> <b>Vercel</b> 
  &nbsp;&nbsp;&nbsp;
  <img width="25" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/supabase.png" alt="Supabase" title="Supabase" valign="middle" /> <b>Supabase</b> 
</p>

---

## ✨ Características Principales

### 👨‍ Perfil Entrenador
- Generador detallado de rutinas para ciclos repetitivos (de 1 a 4 semanas) con ejercicios y objetivos planificados.
- Asignación dinámica de programas a clientes sobre la marcha.
- Visualización del progreso de los clientes gráfica y analíticamente, acceso a sus registros históricos y sección de **notas secretas** de evolución.
- Analíticas globales con métricas de progreso general y rendimiento por ejercicio.

### 👤 Perfil Cliente
- Botón de inicio de sesión diaria que muestra la rutina del día actual automáticamente a partir del plan asignado.
- Entrada en tiempo real de repeticiones, peso, y opción de omitir ejercicios justificando el motivo.
- Indicadores visuales de rachas de días activos, objetivos semanales, plan de entrenamiento detallado en el calendario integrado, porcentaje de objetivos cumplidos y porcentaje de finalización del programa.

### ✉️ Interacción y Conectividad
- Localización de usuarios por nombre o *username*.
- **Sistema de Notificaciones**. Envío, aceptación o rechazo de invitaciones de vinculación entre entrenador y cliente en tiempo real.

---

## 🔒 Arquitectura y Seguridad (Backend)

El sistema ha sido diseñado con la seguridad y las buenas prácticas en entornos web:
- Flujo basado en **Tokens de Acceso y Refresco (JWT)**.
- Almacenamiento seguro de credenciales mediante **Cookies `HttpOnly`** para evitar ataques de tipo XSS.
- Control y límite diario de intentos de cambio de username.
- Endpoints de backend y requests de frontend protegidos.

---

## 🗺️ Roadmap

El proyecto se encuentra en desarrollo activo bajo mejora continua (MVP):
- [ ] Conclusión de vistas secundarias específicas de la interfaz.
- [ ] Optimización del diseño adaptativo para dispositivos móviles.
- [ ] Implementación de animaciones fluidas en las transiciones de usuario y *Dark Theme*.
- [ ] Migración completa del backend/API a **.NET (C#)** aprovechando el ecosistema del ciclo formativo, incluyendo contenedorización con **Docker** y pruebas unitarias.

---

## 🚀 Instalación y Configuración Local

*(Nota para recruiters: Si deseas clonar el repositorio localmente, puedes seguir estos pasos básicos)*

1. Clonar el repositorio:
   ```bash
   git clone https://github.com
   ```
2. Instalar dependencias en el frontend y backend:
   ```bash
   npm install
   ```
3. Configurar las variables de entorno (`.env`) (Base de datos PostgreSQL, Secret Keys para JWT).
4. Levantar el proyecto en modo desarrollo:
   ```bash
   cd frontend/
   npm run start
   
   cd backend/
   npm run start:dev
   ```
