# 🎯 Proyecto Buscaminas

Juego web clásico de Buscaminas desarrollado con **HTML**, **CSS** y **JavaScript** (ES5).  
Ideal para practicar lógica, manejo de eventos y DOM, almacenamiento local y diseño responsive.

---

## 🎮 Características

- **Niveles de dificultad:** Fácil, Medio y Difícil  
- **Temporizador:** Mide el tiempo que tardás en completar cada partida  
- **Expansión recursiva:** Revela automáticamente celdas vacías adyacentes  
- **Banderas:** Marcar minas sospechosas manteniendo presionada la celda (3 segundos)  
- **Ranking:** Guarda y muestra el historial de puntajes con LocalStorage  
- **Diseño responsive:** Se adapta a diferentes tamaños de pantalla  
- **Modo oscuro:** Alternar entre modo claro y oscuro  
- **Formulario de contacto:** Incluye validación básica  

---

## 🕹️ Cómo jugar

1. Abre el archivo `index.html` en tu navegador web favorito (Chrome, Firefox, Edge...)  
2. Ingresa tu nombre (mínimo 3 caracteres)  
3. Selecciona un nivel de dificultad  
4. Presiona el botón **Inicio de Juego**  
5. Haz clic en las celdas para revelarlas  
6. Mantén presionada una celda por 3 segundos para colocar o quitar una bandera  
7. Revelá todas las celdas sin minas para ganar  

---

## 📢 Créditos

Proyecto realizado por los alumnos: **Juan Manuel Gimeno** y **Mariano Tarditi**.
Para la materia: Desarrollo y Arquitecturas Web (4to año)

---

## 📂 Estructura del proyecto

```plaintext
/
├── index.html          # Página principal del juego
├── contact.html        # Formulario de contacto
├── css/
│   ├── reset.css       # Reseteo de estilos base
│   └── style.css       # Estilos personalizados
├── js/
│   ├── game.js         # Lógica principal del Buscaminas
│   ├── ui.js           # Manipulación del DOM e interfaz
│   ├── storage.js      # Manejo de LocalStorage y ranking
│   ├── tema.js         # Control del modo oscuro
│   └── events.js       # Eventos y listeners
├── sounds/
│   ├── FortniteLoss.mp3  # Sonido cuando se pierde la partida
│   └── FortniteWin.mp3   # Sonido cuando se gana la partida
└── icon.png            # Ícono del sitio

