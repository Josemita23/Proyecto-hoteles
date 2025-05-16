# 🏨 Proyecto Hoteles

Este proyecto es una aplicación web para la gestión de hoteles, que incluye un backend con Node.js y un frontend en React.

---

## 🚀 Instrucciones para ejecutar el proyecto

### 📋 Requisitos

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/) (debe estar instalado y agregado al **PATH** del sistema)

---

### 📦 Clonar el repositorio

```bash
git clone https://github.com/Josemita23/Proyecto-hoteles.git
```

Abre Visual Studio Code y selecciona la carpeta del proyecto.

---

### 🔧 Configurar y ejecutar el backend

1. Abre una terminal (Command Prompt o la terminal integrada en VS Code)
2. Ejecuta los siguientes comandos:

```bash
cd backend
npm install
npm run dev
```

Esto iniciará el servidor backend en modo desarrollo.

---

### 🌐 Configurar y ejecutar el frontend

1. Abre otra terminal (puedes usar una nueva pestaña en VS Code)
2. Ejecuta los siguientes comandos:

```bash
cd frontend
npm install
npm start
```

Esto levantará la aplicación frontend en modo desarrollo (normalmente en `http://localhost:3000`).

---

### 🗃️ Poblar la base de datos

1. Abre una tercera terminal
2. Ejecuta el script de población:

```bash
npx ts-node backend/src/scripts/seed.ts
```

3. Cuando se te pregunte, escribe:

```bash
y
```

Y presiona Enter para confirmar.

---

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- TypeScript
- React
- SQLite

---

## 👤 Autor

**José M.**  
[GitHub](https://github.com/Josemita23)

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Puedes ver más detalles en el archivo `LICENSE`.
