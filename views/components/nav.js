const navegation = document.querySelector('#navegacion')

const crearNavPrincipal = ()=>{
    navegation.innerHTML =`
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex items-center space-x-4">
                    <img src="/img/logo-sin-slogan.png" alt="logo" class="h-8 w-8">
                    <span class="font-semibold text-lg">Rose</span>
                </div>

                 <!-- Menú de escritorio -->
                <div class="hidden sm:flex space-x-6 items-center">
                    <button onclick="location.href='/sesion/'" class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition">
                        Login
                    </button>
                    <button onclick="location.href='/registro/' "class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition">
                        Registro
                    </button>
                </div>

                <!-- Barra de búsqueda con icono de lupa -->
                <div class="relative flex w-full sm:w-auto max-w-lg">
                    <input type="text" id="search-input" placeholder="Buscar productos..."
                        class="pl-10 pr-4 py-2 rounded-lg text-gray-700 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all">
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" 
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 015 5c0 1.11-.36 2.13-.97 2.96l4.52 4.52a1 1 0 01-1.42 1.42l-4.52-4.52A5 5 0 118 3zm0 2a3 3 0 100 6 3 3 0 000-6z" clip-rule="evenodd"/>
                    </svg>
                </div>


                <!-- Icono del menú hamburguesa (visible solo en móviles) -->
                <button id="menu-toggle" class="sm:hidden focus:outline-none" aria-expanded="false" aria-label="Abrir menú">
                    <svg class="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Menú desplegable en móviles -->
        <div id="mobile-menu" class="hidden sm:hidden flex flex-col items-center bg-purple-600 py-4 space-y-2">
            <button onclick="location.href='/sesion'" class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition w-3/4">
                Login
            </button>
            <button onclick="location.href='/registro'" class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4">
                Registro
            </button>
        </div>
`
    // Manejo del menú hamburguesa
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    menuToggle.addEventListener("click",()=> {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        console.log('hola')
        menuToggle.setAttribute("aria-expanded", !isExpanded);
        mobileMenu.classList.toggle("hidden");
    });
//aqui va el texto de HTML que esta dentro del nav que lo copiamos y lo pegamos aqui porque es mas sencillo
}

const crearNavSesion = ()=>{
    navegation.innerHTML =`
           <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex items-center space-x-4">
                    <img src="/img/logo-sin-slogan.png" alt="logo" class="h-8 w-8">
                    <span class="font-semibold text-lg">Productos Oncológicos</span>
                </div>

                 <!-- Menú de escritorio -->
                <div class="hidden sm:flex space-x-6 items-center">
                    <button onclick="location.href='/sesion/'" class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition">
                        Login
                    </button>
                    <button onclick="location.href='/registro/' "class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition">
                        Registro
                    </button>
                </div>

                <!-- Barra de búsqueda con icono de lupa -->
                <div class="relative flex w-full sm:w-auto max-w-lg">
                    <input type="text" id="search-input" placeholder="Buscar productos..."
                        class="pl-10 pr-4 py-2 rounded-lg text-gray-700 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all">
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" 
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 015 5c0 1.11-.36 2.13-.97 2.96l4.52 4.52a1 1 0 01-1.42 1.42l-4.52-4.52A5 5 0 118 3zm0 2a3 3 0 100 6 3 3 0 000-6z" clip-rule="evenodd"/>
                    </svg>
                </div>


                <!-- Icono del menú hamburguesa (visible solo en móviles) -->
                <button id="menu-toggle" class="sm:hidden focus:outline-none" aria-expanded="false" aria-label="Abrir menú">
                    <svg class="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Menú desplegable en móviles -->
        <div id="mobile-menu" class="hidden sm:hidden flex flex-col items-center bg-purple-600 py-4 space-y-2">
            <button onclick="location.href='/sesion'" class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition w-3/4">
                Login
            </button>
            <button onclick="location.href='/registro'" class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4">
                Registro
            </button>
        </div>
`
    // Manejo del menú hamburguesa
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    menuToggle.addEventListener("click",()=> {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        console.log('hola')
        menuToggle.setAttribute("aria-expanded", !isExpanded);
        mobileMenu.classList.toggle("hidden");
    });
//aqui va el texto de HTML que esta dentro del nav que lo copiamos y lo pegamos aqui porque es mas sencillo
}

const crearNavRegistro = ()=>{
    navegation.innerHTML =`
         <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex items-center space-x-4">
                    <img src="/img/logo-sin-slogan.png" alt="logo" class="h-8 w-8">
                    <span class="font-semibold text-lg">Productos Oncológicos</span>
                </div>

                 <!-- Menú de escritorio -->
                <div class="hidden sm:flex space-x-6 items-center">
                    <a href='/sesion/'" class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition">
                        Login
                    </button>
                    <a href='/registro/' "class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition">
                        Registro
                    </button>
                </div>

                <!-- Barra de búsqueda con icono de lupa -->
                <div class="relative flex w-full sm:w-auto max-w-lg">
                    <input type="text" id="search-input" placeholder="Buscar productos..."
                        class="pl-10 pr-4 py-2 rounded-lg text-gray-700 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all">
                    <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" 
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 015 5c0 1.11-.36 2.13-.97 2.96l4.52 4.52a1 1 0 01-1.42 1.42l-4.52-4.52A5 5 0 118 3zm0 2a3 3 0 100 6 3 3 0 000-6z" clip-rule="evenodd"/>
                    </svg>
                </div>


                <!-- Icono del menú hamburguesa (visible solo en móviles) -->
                <button id="menu-toggle" class="sm:hidden focus:outline-none" aria-expanded="false" aria-label="Abrir menú">
                    <svg class="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Menú desplegable en móviles -->
        <div id="mobile-menu" class="hidden sm:hidden flex flex-col items-center bg-purple-600 py-4 space-y-2">
            <button onclick="location.href='/sesion/'" class="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition w-3/4">
                Login
            </button>
            <button onclick="location.href='/registro/'" class="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition w-3/4">
                Registro
            </button>
        </div>

`
    // Manejo del menú hamburguesa
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    menuToggle.addEventListener("click",()=> {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        console.log('hola')
        menuToggle.setAttribute("aria-expanded", !isExpanded);
        mobileMenu.classList.toggle("hidden");
    });
//aqui va el texto de HTML que esta dentro del nav que lo copiamos y lo pegamos aqui porque es mas sencillo
}

//con esto discrimino si estoy en una pagina u otra
//agrego la ruta para los componentes
if(window.location.pathname === '/principal/'){
//crear la barra de navegacion para la pagina principal 
    crearNavPrincipal();
}else if(window.location.pathname === '/sesion/'){
//Crear la pagina de navegacion de inicio de sesion
    crearNavSesion()
}else if(window.location.pathname === '/registro/'){
//Crear la pagina de navegacion de registro 
    crearNavRegistro()
}else if(window.location.pathname === '/donaciones/'){
    crearNavDonaciones()
}else if(window.location.pathname === '/canje/'){
    crearNavCanje()
}