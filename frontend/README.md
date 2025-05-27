# 🎧 Frontend - Gestor de Playlists 🎵

Interfaz web para crear, visualizar y eliminar listas de reproducción musicales. Esta aplicación está desarrollada con **React** y **Material UI**, conectándose a una API REST construida con Spring Boot.

---

## 🌐 Vista general de la aplicación

A continuación se muestran capturas del funcionamiento del sistema.

### 🏠 Página principal - Listado de Playlists


> ![image](https://github.com/user-attachments/assets/ee68f8d8-eb03-4145-a2df-375473c50a03)


- Muestra todas las listas creadas.
- Cada item puede ser seleccionado para ver sus detalles.
- Botón para **crear nueva lista**.

---

### ➕ Crear nueva Playlist

> ![image](https://github.com/user-attachments/assets/5536d3a0-33a8-4065-be32-cb869d6432f7)

- Al hacer clic en "Crear nueva lista", se abre un formulario modal.
- Se ingresan `nombre` y `descripción`.
- Al guardar, se actualiza la lista automáticamente.

---

### 📄 Detalles de una Playlist

> ![image](https://github.com/user-attachments/assets/6eb979f0-7f55-4557-a106-f6357d577d75)


- Se muestra una tarjeta con el nombre y descripción de la lista.
- Abajo, se despliega un listado de canciones asociadas.
- Cada canción muestra:
  - ID
  - Título
  - Artista
  - Álbum
  - Año
  - Género

---

### 🗑️ Eliminar una Playlist

> ![image](https://github.com/user-attachments/assets/92f6ef61-34ec-4710-aaae-473e2c6b8e74)


- Desde los detalles de la playlist, puedes eliminarla.
- Una vez eliminada, se actualiza automáticamente el listado general.

---

## ⚙️ Tecnologías utilizadas

- React 18+
- Material UI (MUI)
- Axios (para consumir la API)
- JavaScript moderno (ES6+)

---

## 📦 Instalación y ejecución

Asegúrate de tener Node.js instalado.

```bash
cd frontend
npm install
npm start

