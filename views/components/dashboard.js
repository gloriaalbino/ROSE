const dashboard = document.querySelector('#dashboard')

const crearDashUsuario = ()=>{
    dashboard.innerHTML =`
    <div class="flex h-screen">
            <!-- Sidebar -->
            <aside class="w-64 bg-pink-300 text-white p-5 flex flex-col">
                <h2 class="text-2xl font-bold mb-6 text-center">Dashboard</h2>
                <nav class="flex-1">
                    <ul>
                        <li class="mb-4"><a href="#" class="block p-3 rounded-lg hover:bg-pink-400">🏠 Inicio</a></li>
                        <li class="mb-4"><a href="#" class="block p-3 rounded-lg hover:bg-pink-400">📊 Reportes</a></li>
                        <li class="mb-4"><a href="#" class="block p-3 rounded-lg hover:bg-pink-400">⚙️ Configuración</a></li>
                    </ul>
                </nav>
                <button class="bg-purple-400 p-3 rounded-lg text-white hover:bg-purple-500">Cerrar Sesión</button>
            </aside>
            
            <!-- Main Content -->
            <main class="flex-1 p-6">
                <header class="mb-6">
                    <h1 class="text-3xl font-bold text-purple-600">Bienvenido, Usuario</h1>
                </header>
                
                <!-- Tarjetas de Información -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-pink-200 p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-semibold text-pink-600">Total de Ventas</h3>
                        <p class="text-3xl mt-2">$5,230</p>
                    </div>
                    <div class="bg-purple-200 p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-semibold text-purple-600">Usuarios Activos</h3>
                        <p class="text-3xl mt-2">1,235</p>
                    </div>
                    <div class="bg-pink-300 p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-semibold text-white">Nuevas Suscripciones</h3>
                        <p class="text-3xl mt-2">320</p>
                    </div>
                </div>
            </main>
        </div>
    `
}

//con esto discrimino si estoy en una pagina u otra
//agrego la ruta para los componentes
if(window.location.pathname === '/usuario/'){
    //crear la barra de navegacion para la pagina principal 
        crearDashUsuario();
    }else if(window.location.pathname === '/admin/'){
    //Crear la pagina de navegacion de inicio de sesion
        crearDashAdmin()
    }else if(window.location.pathname === '/empresa/'){
    //Crear la pagina de navegacion de registro 
        crearDashEmpresa()
    }