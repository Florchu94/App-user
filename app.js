// Inicializar array de usuarios desde localStorage o valores por defecto
let usuarios = [];

const usuariosGuardados = localStorage.getItem("usuarios");
if (usuariosGuardados) {
  usuarios = JSON.parse(usuariosGuardados);
} else {
  usuarios = [
    { id: 1, nombre: "Juan", edad: 25, email: "juan@mail.com" },
    { id: 2, nombre: "Ana", edad: 30, email: "ana@mail.com" }
  ];
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Pedir nombre de usuario si no está guardado
let nombreUsuario = localStorage.getItem("nombreUsuario");
if (!nombreUsuario) {
  nombreUsuario = prompt("¿Cuál es tu nombre?");
  if (nombreUsuario) {
    localStorage.setItem("nombreUsuario", nombreUsuario);
  }
}
document.getElementById("saludo").textContent = `${nombreUsuario}`;

// Mostrar usuarios
function mostrarUsuarios() {
  const lista = document.getElementById("listaUsuarios");
  lista.innerHTML = "";

  usuarios.forEach((usuario) => {
    const card = document.createElement("div");
    card.className = "usuario-card";
    card.innerHTML = `
      <h3><i class="fas fa-user"></i> ${usuario.nombre}</h3>
      <p><i class="fas fa-calendar-alt"></i> Edad: ${usuario.edad}</p>
      <p><i class="fas fa-envelope"></i> Email: ${usuario.email}</p>
 `;
    lista.appendChild(card);
  });
}

mostrarUsuarios();

// Formulario para agregar usuarios
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const edad = parseInt(document.getElementById("edad").value);
  const email = document.getElementById("email").value.trim();

  // Validaciones nuevas
  if (!nombre || !email || isNaN(edad)) {
    alert("Por favor completá todos los campos correctamente.");
    return;
  }

  if (!email.includes("@")) {
    alert("El email debe contener '@'.");
    return;
  }

  if (edad <= 0) {
    alert("La edad debe ser mayor a 0.");
    return;
  }

  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    edad,
    email
  };

  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarUsuarios();
  formulario.reset();
});

// Botón para cambiar tema
const btnTema = document.getElementById("cambiarTema");
btnTema.addEventListener("click", () => {
  document.body.classList.toggle("tema-verde");
  const esVerde = document.body.classList.contains("tema-verde");
  localStorage.setItem("temaVerde", esVerde);
});

// Al cargar, aplicar tema guardado
if (localStorage.getItem("temaVerde") === "true") {
  document.body.classList.add("tema-verde");
}
