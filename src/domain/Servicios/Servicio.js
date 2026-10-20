export function validarUsuarioLogeado(){
    const usuarioActivo = JSON.parse(
        localStorage.getItem("usuarioActivo")
    );
    console.log("Soy usuarioActivo de la funcion", usuarioActivo);
    const esestudiante = usuarioActivo && usuarioActivo.tipoUsuario === "estudiante";
    //me retorna un true o un false
    //true cuando es verdadera la validacion
    if (esestudiante) {
        console.log("Ingrese en estudiante");
        const botonesEditar = document.querySelectorAll(".btn-editar");

        console.log("Botones encontrados:", botonesEditar.length);
        document.querySelectorAll(".btn-editar").forEach(btn => {
            btn.disabled = true;
        });

        document.querySelectorAll(".btn-eliminar").forEach(btn => {
            btn.hidden = true;
        });
}
}