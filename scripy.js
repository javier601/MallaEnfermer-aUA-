document.addEventListener("DOMContentLoaded", () => {
    const ramos = document.querySelectorAll(".ramo");

    // Inicialmente bloquea los que tienen prerequisitos
    ramos.forEach(ramo => {
        if (ramo.dataset.prerequisitos !== "") {
            ramo.classList.add("bloqueado");
        }
    });

    ramos.forEach(ramo => {
        ramo.addEventListener("click", () => {
            if (!ramo.classList.contains("aprobado")) {
                ramo.classList.add("aprobado");
                desbloquearRamos(ramo.dataset.ramo);
            } else {
                ramo.classList.remove("aprobado");
                bloquearDependientes(ramo.dataset.ramo);
            }
        });
    });

    function desbloquearRamos(ramoId) {
        ramos.forEach(ramo => {
            const prerequisitos = ramo.dataset.prerequisitos.split(",");
            if (prerequisitos.includes(ramoId)) {
                const todosAprobados = prerequisitos.every(pr => 
                    document.querySelector(`.ramo[data-ramo='${pr}']`).classList.contains("aprobado")
                );
                if (todosAprobados) {
                    ramo.classList.remove("bloqueado");
                }
            }
        });
    }

    function bloquearDependientes(ramoId) {
        ramos.forEach(ramo => {
            const prerequisitos = ramo.dataset.prerequisitos.split(",");
            if (prerequisitos.includes(ramoId)) {
                ramo.classList.add("bloqueado");
                ramo.classList.remove("aprobado");
                bloquearDependientes(ramo.dataset.ramo);
            }
        });
    }
});
