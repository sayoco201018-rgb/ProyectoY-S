export function consultaNota() {
    const usuarioGuardado = localStorage.getItem("usuarioActivo");
    const resultado = document.getElementById("resultado");
    const boton = document.getElementById("btn-consultar");

    if (!resultado || !boton) {
        console.error("No se encontró el botón o el elemento resultado.");
        return;
    }

    if (!usuarioGuardado) {
        resultado.textContent = "No hay un usuario activo.";
        return;
    }

    const usuarioActivo = JSON.parse(usuarioGuardado);

    boton.addEventListener("click", async () => {
        console.log("Usuario activo:", usuarioActivo);

        const ideEstudiante = usuarioActivo.Identificación;

        console.log("Identificación del estudiante:", ideEstudiante);

        if (!ideEstudiante) {
            resultado.textContent =
                "No se pudo obtener la identificación del estudiante.";
            return;
        }

        resultado.textContent = "Consultando nota...";

        try {
            const respuesta = await fetch(
                `https://microservicio-notas-manzanares.onrender.com/api/estudiantes/${encodeURIComponent(ideEstudiante)}`
            );

            console.log("Estado HTTP:", respuesta.status);

            const data = await respuesta.json();

            console.log("Datos recibidos del servidor:", data);

            if (!respuesta.ok) {
                throw new Error(
                    data.mensaje || "No se encontró el estudiante."
                );
            }

            resultado.innerHTML = `
                <div class="alert alert-${data.alert || "info"}" role="alert">
                    <strong>Nombre:</strong> ${data.nombre ?? "No disponible"}
                    <br>
                    <strong>Nota final:</strong> ${data.notaFinal ?? "No disponible"}
                </div>
            `;
        } catch (error) {
            console.error("Error al consultar la nota:", error);

            resultado.textContent =
                error.message || "Error al consultar la nota.";
        }
    });
}