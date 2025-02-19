document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    
    const spinner = document.createElement("div");
    spinner.innerHTML = `
        <div class="flex justify-center items-center mt-4">
            <img src="../img/favicon.png" class="w-16 h-16 animate-spin" alt="Spinner">
        </div>
    `;
    spinner.style.display = "none";
    form.appendChild(spinner);

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        spinner.style.display = "block";

        try {
            console.log('front');
            const response = await axios.get('/api/users/lista-users');
            console.log(response.data.data);

            const listadoArray = response.data.data;
            const usuario = listadoArray.some(user => user.email === email && user.password === password);
            if (!usuario) {
                if(listadoArray.some(user => user.email === email)) {
                   const lista = listadoArray.map(user => {
                       // console.log(user.rol)
                    if(user.email === email){    
                        if (user.rol === 'admin') {
                            window.location.href = '/admin/';
                        } else {
                           window.location.href = '/dashboard/';
                        }
                    }else{
                        return user
                    }
                });
                }
            } else {
                alert("Invalid email or password.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred. Please try again later.");
        } finally {
            spinner.style.display = "none";
        }

        form.reset();
    });

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
});





