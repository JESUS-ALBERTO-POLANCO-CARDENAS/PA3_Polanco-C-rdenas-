// Espera a que el DOM esté completamente cargado para ejecutar el script.
// MANEJO DE EVENTOS: Evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', () => {

    // --- ESTRUCTURAS DE DATOS: Clases, Encapsulamiento, Métodos, Prototipos ---
    // Se utiliza una clase para estructurar mejor los datos de cada producto.
    // El 'constructor' encapsula las propiedades.
    // El método 'formatearPrecio' es un ejemplo de método de instancia.
    class Producto {
        constructor(id, nombre, precio, imagen) {
            this.id = id;       // JAVASCRIPT BÁSICO: Tipo Number
            this.nombre = nombre; // JAVASCRIPT BÁSICO: Tipo String
            this.precio = precio;
            this.imagen = imagen;
        }

        // Método para obtener el precio formateado (simulando un método útil)
        formatearPrecio() {
            return `S/.${this.precio.toFixed(2)}`;
        }
    }

    // --- ESTRUCTURAS DE DATOS: Arrays y Objetos ---
    // Se crea un array de objetos 'Producto' para representar el catálogo.
    const productos = [
        new Producto(1, 'Adobo Arequipeño', 18.00, 'https://www.apega.pe/wp-content/uploads/2025/05/receta-de-adobo-arequipeno-800x445.jpg.webp'),
        new Producto(2, 'Soltero de queso', 10.00, 'https://blog.incarail.com/wp-content/uploads/2024/10/Blog-85_7.jpg'),
        new Producto(3, 'Rocoto Relleno', 17.50, 'https://blog.incarail.com/wp-content/uploads/2024/10/Blog-85_2.jpg'),
        new Producto(4, 'Chupe de Camarones', 20.00, 'https://blog.incarail.com/wp-content/uploads/2024/10/Blog-85_3.jpg'),
        new Producto(5, 'Locro de Pecho', 12.50, 'https://visitamiperu.com/wp-content/uploads/2025/02/locro-de-pecho-arequipeno-768x512.webp'),
        new Producto(6, 'Escribano', 10.00, 'https://visitamiperu.com/wp-content/uploads/2025/02/escribano-300x200.webp'),
        new Producto(7, 'Ocopa Arequipeña', 10.50, 'https://blog.incarail.com/wp-content/uploads/2024/10/Blog-85_4.jpg'),
        new Producto(8, 'Pastel de papa', 13.00, 'https://blog.incarail.com/wp-content/uploads/2024/10/Blog-85_8.jpg'),
        new Producto(9, 'Cuy chactado', 35.00, 'https://blog.incarail.com/wp-content/uploads/2024/10/Blog-85_6.jpg'),
        new Producto(10, 'Sango de trigo', 8.00, 'https://blog.incarail.com/wp-content/uploads/2024/10/Blog-85_16.jpg'),
        new Producto(11, 'Escabeche Arequipeño', 12.00, 'https://blog.incarail.com/wp-content/uploads/2024/10/Blog-85_9.jpg'),
        new Producto(12, 'Chaque Arequipeño', 12.00, 'https://blog.incarail.com/wp-content/uploads/2024/10/Blog-85_11.jpg'),
        new Producto(13, 'Pebre', 12.00, 'https://www.anderratravel.com/blog/imagenes/4.jpg'),
        new Producto(14, 'Sarza de sencca', 12.00, 'https://diarioviral.pe/uploads/e82581f9fab0_trjhngmjnvb.png'),
    ];

    // --- ESTRUCTURAS DE DATOS: Map ---
    // Usamos un Map para el carrito. Es más eficiente para buscar, añadir y
    // eliminar productos por su 'id' que un array.
    // La clave es el id del producto, el valor es el objeto del producto.
    let carrito = new Map();

    // --- MANIPULACIÓN DEL DOM ---
    // Se obtienen referencias a los elementos del DOM que se van a manipular.
    const productosContainer = document.getElementById('productos-container');
    const carritoItemsContainer = document.getElementById('carrito-items');
    const carritoTotalPrecio = document.getElementById('carrito-total-precio');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const notificacion = document.getElementById('notificacion');
    const btnSubir = document.getElementById('btn-subir');

    // --- FUNCIONES EN JAVASCRIPT: Definición y Uso ---
    /**
     * Renderiza los productos en el DOM.
     * Itera sobre el array de productos y crea el HTML para cada uno.
     */
    function renderizarProductos() {
        productos.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'producto-card';
            card.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="producto-precio">${producto.formatearPrecio()}</p> 
                <button class="btn" data-id="${producto.id}">Añadir al Carrito</button>
            `;
            productosContainer.appendChild(card);
        });
    }

    /**
     * Renderiza los items del carrito en el DOM.
     * Limpia el carrito actual y lo vuelve a dibujar basado en el Map 'carrito'.
     */
    const renderizarCarrito = () => { // FUNCIONES: Función de Flecha
        carritoItemsContainer.innerHTML = ''; // Limpiar vista previa

        // JAVASCRIPT BÁSICO: Estructura de Control (if/else)
        if (carrito.size === 0) {
            carritoItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            carrito.forEach(producto => { // El Map también tiene forEach
                const item = document.createElement('li');
                item.className = 'carrito-item';
                item.innerHTML = `
                    <span>${producto.nombre}</span>
                    <strong>${producto.formatearPrecio()}</strong>
                    <button class="remover-item" data-id="${producto.id}">X</button>
                `;
                carritoItemsContainer.appendChild(item);
            });
        }
        
        actualizarTotal();
    };
    
    /**
     * Actualiza el precio total del carrito.
     * Utiliza reduce para sumar los precios de todos los items.
     */
    const actualizarTotal = () => {
        // JAVASCRIPT BÁSICO: Operadores
        const total = Array.from(carrito.values()).reduce((sum, producto) => sum + producto.precio, 0);
        carritoTotalPrecio.textContent = `S/.${total.toFixed(2)}`;
    };

    /**
     * Muestra una notificación temporal.
     * @param {string} mensaje - El mensaje a mostrar.
     * @param {boolean} esError - Si es un mensaje de error (opcional).
     */
    function mostrarNotificacion(mensaje, esError = false) { // FUNCIONES: Argumentos (con valor por defecto)
        notificacion.textContent = mensaje;
        notificacion.style.backgroundColor = esError ? '#d9534f' : '#4CAF50';
        notificacion.classList.add('show');
        
        // MANEJO DE EVENTOS: Temporizadores (setTimeout)
        setTimeout(() => {
            notificacion.classList.remove('show');
        }, 2000); // Se oculta después de 2 segundos
    }


    // --- MANEJO DE EVENTOS: Click y Delegación de Eventos ---
    /**
     * Maneja los clics dentro del contenedor de productos.
     * Se usa delegación de eventos para no añadir un listener a cada botón.
     */
    productosContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn')) {
            // JAVASCRIPT BÁSICO: Uso de valores (id)
            const idProducto = parseInt(event.target.getAttribute('data-id'));
            const productoSeleccionado = productos.find(p => p.id === idProducto);

            // Añadir al carrito (usando el Map)
            if (productoSeleccionado && !carrito.has(idProducto)) {
                carrito.set(idProducto, productoSeleccionado);
                renderizarCarrito();
                mostrarNotificacion(`${productoSeleccionado.nombre} añadido al carrito.`);
            } else {
                 mostrarNotificacion('Este producto ya está en el carrito.', true);
            }
        }
    });
    
    /**
     * Maneja los clics para remover items del carrito.
     */
    carritoItemsContainer.addEventListener('click', (event) => {
        if(event.target.classList.contains('remover-item')) {
            const idProducto = parseInt(event.target.getAttribute('data-id'));
            if (carrito.has(idProducto)) {
                const nombreProducto = carrito.get(idProducto).nombre;
                carrito.delete(idProducto);
                renderizarCarrito();
                mostrarNotificacion(`${nombreProducto} eliminado del carrito.`, true);
            }
        }
    });

    /**
     * Vacía completamente el carrito.
     */
    vaciarCarritoBtn.addEventListener('click', () => {
        if (carrito.size > 0) {
            carrito.clear();
            renderizarCarrito();
            mostrarNotificacion('El carrito ha sido vaciado.', true);
        }
    });

    // --- MANEJO DE EVENTOS: Scroll ---
    window.addEventListener('scroll', () => {
        // JAVASCRIPT BÁSICO: Estructura de Control (if) y Operadores
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            btnSubir.style.display = "block";
        } else {
            btnSubir.style.display = "none";
        }
    });

    btnSubir.addEventListener('click', () => {
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
    });
    
    // --- MANEJO DE EVENTOS: Teclado ---
    // Ejemplo: presionar 'Escape' podría cerrar un modal del carrito (si lo hubiera)
    // o simplemente mostrar una alerta en este caso.
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            console.log("Se presionó la tecla 'Escape'.");
            // Aquí podrías, por ejemplo, ocultar el carrito si fuera un modal.
        }
    });

    // --- POLIMORFISMO (Ejemplo conceptual) ---
    // Aunque no se implementa directamente en el DOM para no complejizar,
    // así se podría demostrar el polimorfismo.
    class ItemMenu {
        constructor(nombre) { this.nombre = nombre; }
        preparar() { console.log(`${this.nombre} se está preparando.`); }
    }

    class Bebida extends ItemMenu {
        preparar() { // Sobrescribe el método de la clase padre
            console.log(`${this.nombre} se está sirviendo en un vaso.`);
        }
    }

    class PlatoFuerte extends ItemMenu {
        preparar() { // Sobrescribe de forma diferente
            console.log(`${this.nombre} se está cocinando en la parrilla.`);
        }
    }
    
    // Un array con diferentes tipos de objetos que responden al mismo método `preparar`
    const orden = [new Bebida("Limonada"), new PlatoFuerte("Bistec")];
    // Al llamar al mismo método, cada objeto se comporta de manera diferente
    // orden.forEach(item => item.preparar());


    // --- INICIALIZACIÓN ---
    // Llama a las funciones iniciales para poner en marcha la aplicación.
    renderizarProductos();
    renderizarCarrito();
});