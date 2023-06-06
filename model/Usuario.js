const { leerArchivo, escribirArchivo } = require("../utils/operaciones.js");

class Usuario {
    constructor(id, nombre, apellido, email) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
    }
    async findAll() {
        return await leerArchivo("personas.json");
    }

    async findById(id) {
        let data = await this.findAll();
        let found = data.usuarios.find((usuario) => usuario.id == id);
        return found;
    }

    findByEmail(email) {
        console.log("Buscando usuario por email");
    }

    async save() {
        let data = await leerArchivo("personas.json");
        let usuario = {
            id: this.id,
            nombre: this.nombre,
            apellido: this.apellido,
            email: this.email,
        };
        data.usuarios.push(usuario);
        return await escribirArchivo("personas.json", data);
    }

    async update(id) {
        let identificador = id || this.id
        let todos = await this.findAll()
        let usuario = todos.usuarios.find(usuario => usuario.id == identificador);

        if(usuario){
            usuario.nombre = this.nombre
            usuario.apellido = this.apellido
            usuario.email = this.email
            await escribirArchivo("personas.json", todos);
            return true
        }else{
            return false
        }
    }

    async delete(id) {
        let identificador = id || this.id
        let todos = await this.findAll()
        todos.usuarios = todos.usuarios.filter(usuario => usuario.id != identificador);
        if(todos.usuarios){
            console.log(todos.usuarios)
            await escribirArchivo("personas.json", todos);
            console.log('exito?', id)
            return true
        }else{
            return false
        }
    }
}

module.exports = Usuario;
