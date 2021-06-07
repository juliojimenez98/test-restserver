const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.path = {
      auth: "/api/auth",
      bodegas: "/api/bodegas",
      buscar: "/api/buscar",
      usuarios: "/api/usuarios",
      productos: "/api/productos",
      movimientos: "/api/movimientos",
    };

    //Conectar a bbdd
    this.conectarDB();

    //Middlewares Los middlewares tienen que ir antes de las rutas
    this.middlewares();

    //Rutas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  // Middlewares

  middlewares() {
    //CORS
    this.app.use(cors());

    //Parseo y lectura del body
    this.app.use(express.json());
  }

  //Rutas de aplicacion
  routes() {
    this.app.use(this.path.auth, require("../routes/auth"));
    this.app.use(this.path.usuarios, require("../routes/usuarios"));
    this.app.use(this.path.buscar, require("../routes/buscar"));
    this.app.use(this.path.bodegas, require("../routes/bodegas"));
    this.app.use(this.path.productos, require("../routes/productos"));
    this.app.use(this.path.movimientos, require("../routes/movimientos"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", process.env.PORT);
    });
  }
}

module.exports = Server;
