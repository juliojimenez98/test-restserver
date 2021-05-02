const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //Middlewares Los middlewares tienen que ir antes de las rutas
    this.middlewares();

    //Rutas
    this.routes();
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
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", process.env.PORT);
    });
  }
}

module.exports = Server;
