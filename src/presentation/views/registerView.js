/*
 * Register View
 *
 * Responsabilidad:
 * - Mostrar la interfaz de registro.
 * - Capturar las acciones del usuario.
 * - Informar esas acciones al Presenter.
 *
 * NO contiene lógica de registro.
 */

export function showRegisterView(container, presenter) {
    container.innerHTML = `
        <section class="auth-container">
            <div class="auth-card">

                <header class="auth-header">
                    <h1>Crear cuenta</h1>
                    <p>Regístrate para comenzar</p>
                </header>

                <form id="register-form" class="auth-form">

                    <div class="form-group">
                        <label for="register-name">
                            Nombre
                        </label>

                        <input
                            type="text"
                            id="register-name"
                            name="name"
                            placeholder="Tu nombre"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label for="register-email">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            id="register-email"
                            name="email"
                            placeholder="correo@ejemplo.com"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label for="register-password">
                            Contraseña
                        </label>

                        <input
                            type="password"
                            id="register-password"
                            name="password"
                            placeholder="Crea una contraseña"
                            required
                        >
                    </div>

                         <div class="form-group">
                        <label for="register-usuario">
                            Tipo de usuario
                        </label>

                        <select 
                            type="text"
                            id="tipoUsuario" name="tipoUsuario">
                            name="TipoUsuario"
                            >
                            <option value="">Selecciona un tipo de usuario</option>
                            <option value="estudiante">Estudiante</option>
                            <option value="profesor">Profesor</option>
                        </select>

                    </div>
  
                    <button
                        type="submit"
                        class="button button-primary"
                    >
                        Crear cuenta
                    </button>

                </form>

                <div class="auth-footer">

                    <p>¿Ya tienes una cuenta?</p>

                    <button
                        id="show-login"
                        class="button button-link"
                        type="button"
                    >
                        Iniciar sesión
                    </button>

                </div>

                <p
                    id="register-message"
                    class="form-message"
                ></p>

            </div>
<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p><strong>Nombre:</strong> <span id="confirmName"></span></p>
        <p><strong>Correo Electronico:</strong> <span id="confirmEmail"></span></p>
        <p><strong>Contraseña:</strong> <span id="confirmPassword"></span></p>
        <p><strong>Tipo de usuario:</strong> <span id="confirmType"></span></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary btnConfirmar">Confirmar</button>
      </div>
    </div>
  </div>
</div>
            
        </section>
    `;

    const registerForm =
        document.getElementById("register-form");

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

    
        const formData = new FormData(registerForm);
        const modalElemento = document.getElementById("staticBackdrop")
        const modal = new bootstrap.Modal(modalElemento)

        const userData = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            tipoUsuario: formData.get("tipoUsuario")
        };
        document.getElementById("confirmName").textContent = userData.name;
        document.getElementById("confirmEmail").textContent = userData.email;
        document.getElementById("confirmPassword").textContent = "*******";
        document.getElementById("confirmType").textContent = userData.tipoUsuario;

        registerForm.dataset.userData = JSON.stringify(userData);

        modal.show();
        //presenter.register(userData);
    });
    document.getElementById("btnConfirmar").addEventListener("click", () => {
    const userData = JSON.parse(registerForm.dataset.userData);

    presenter.register(userData);
    const modalid = document.getElementById("staticBackdrop");
    const modal = bootstrap.Modal.getOrCreateInstance(modalid);
    modal.hide();
});
    const loginButton =
        document.getElementById("show-login");

    loginButton.addEventListener("click", () => {
        presenter.showLogin();
    });
}

export function showRegisterMessage(message) {
    const messageElement =
        document.getElementById("register-message");

    if (messageElement) {
        messageElement.textContent = message;
    }
}