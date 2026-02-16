const API_URL = "http://localhost:3000/api";

/* LOGIN */
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                window.location.href = "dashboard.html";
            } else {
                alert(data.message);
            }

        } catch (error) {
            alert("Error conectando con el servidor");
        }
    });
}

/* REGISTER */
if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const rol = document.getElementById("rol").value;

        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, email, password, rol })
            });

            const data = await res.json();

            if (res.ok) {
                alert("Usuario registrado correctamente");
                window.location.href = "login.html";
            } else {
                alert(data.message);
            }

        } catch (error) {
            alert("Error conectando con el servidor");
        }
    });
}

/* DASHBOARD */
if (window.location.pathname.includes("dashboard.html")) {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    if (payload.rol === "admin") {
        const adminSection = document.getElementById("adminSection");
        if (adminSection) {
            adminSection.style.display = "block";
        }
    }

    cargarProductos();

    async function cargarProductos() {
        const res = await fetch(`${API_URL}/productos`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const productos = await res.json();

        const container = document.getElementById("productosContainer");
        container.innerHTML = "";

        productos.forEach(p => {
            const card = document.createElement("div");
            card.classList.add("producto-card");

            card.innerHTML = `
                <img src="${p.imagen}" alt="${p.nombre}" class="producto-img">
                <h3>${p.nombre}</h3>
                <p>${p.descripcion}</p>
                <p><strong>$${p.precio}</strong></p>
                ${payload.rol === "admin" 
                    ? `<button onclick="eliminarProducto(${p.id})">Eliminar</button>` 
                    : ""}
            `;

            container.appendChild(card);
        });
    }

    const form = document.getElementById("productoForm");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value;
            const descripcion = document.getElementById("descripcion").value;
            const precio = document.getElementById("precio").value;

            await fetch(`${API_URL}/productos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ nombre, descripcion, precio })
            });

            form.reset();
            cargarProductos();
        });
    }

    window.eliminarProducto = async (id) => {
        await fetch(`${API_URL}/productos/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        cargarProductos();
    };
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
