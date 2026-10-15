import { User } from "../entities/User.js";

export class RegisterUser {

    constructor(userRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    async execute(userData) { 

        if (!["estudiante", "profesor"].includes(userData.tipoUsuario)) {
        throw new Error("Selecciona un tipo de usuario.");
        }

        const existingUser =
            await this.userRepository.findByEmail(
                userData.email
            );

        if (existingUser) {
            throw new Error(
                "Ya existe un usuario con este correo."
            );
        }

        const passwordData =
            await this.passwordHasher.hash(
                userData.password
            );

        const user = new User({
            name: userData.name,
            email: userData.email,
            passwordHash: passwordData,
            tipoUsuario: userData.tipoUsuario
        });

        return await this.userRepository.save(user);
    }
}