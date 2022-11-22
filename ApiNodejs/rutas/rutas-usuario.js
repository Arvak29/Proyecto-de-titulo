const router = require("express").Router();
const BD = require("../config/configbd");

//Get especifico de vista
router.get("/api-usuario/getVista_Usuario/:id", async (req, res) => {
  const { id } = req.params;
  sql = "select * from vista_usuario where id_u =:id";

  let result = await BD.Open(sql, [id], false);
  Vista_Usuario = [];

  result.rows.map((vista_usuario) => {
    let vista_usuarioSchema = {
      "u.nombre_u": vista_usuario[1],
      "u.email_u": vista_usuario[2],
      "u.password_u": vista_usuario[3],
      "r.nombre_r": vista_usuario[4],
      "c.nombre_c": vista_usuario[5],
      "ui.nombre_ui": vista_usuario[6],
      "e.nombre_e": vista_usuario[7]
    }

    Vista_Usuario.push(vista_usuarioSchema);
  })

  res.json(Vista_Usuario);
})

//Get de toda la vista
router.get("/api-usuario/getVistas_Usuarios", async (req, res) => {
  sql = "select * from vista_usuario";

  let result = await BD.Open(sql, [], false);
  Vistas_Usuarios = [];

  result.rows.map((vista_usuario) => {
    let vistas_usuariosSchema = {
      "u.nombre_u": vista_usuario[1],
      "u.email_u": vista_usuario[2],
      "u.password_u": vista_usuario[3],
      "r.nombre_r": vista_usuario[4],
      "c.nombre_c": vista_usuario[5],
      "ui.nombre_ui": vista_usuario[6],
      "e.nombre_e": vista_usuario[7]
    }

    Vistas_Usuarios.push(vistas_usuariosSchema);
  })

  res.json(Vistas_Usuarios);
})

//Get especifico
router.get("/api-usuario/getUsuario/:id", async (req, res) => {
  const { id } = req.params;
  sql = "select * from usuario where id_u =:id";

  let result = await BD.Open(sql, [id], false);
  Usuario = [];

  result.rows.map((usuario) => {
    let usuarioSchema = {
      "id_u": usuario[0],
      "nombre_u": usuario[1],
      "email_u": usuario[2],
      "password_u": usuario[3],
      "id_c": usuario[4],
      "id_e": usuario[5]
    }

    Usuario.push(usuarioSchema);
  })

  res.json(Usuario);
})

//Get de todo
router.get("/api-usuario/getUsuarios", async (req, res) => {
  sql = "select * from usuario";

  let result = await BD.Open(sql, [], false);
  Usuarios = [];

  result.rows.map((usuario) => {
    let usuariosSchema = {
      "id_u": usuario[0],
      "nombre_u": usuario[1],
      "email_u": usuario[2],
      "password_u": usuario[3],
      "id_c": usuario[4],
      "id_e": usuario[5]
    };

    Usuarios.push(usuariosSchema);
  })

  res.json(Usuarios);
})

//Agregar
router.post("/api-usuario/addUsuario", async (req, res) => {
  const { id_u, nombre_u, email_u, password_u, id_c, id_e } = req.body;

  sql = "insert into usuario(id_u, nombre_u, email_u, password_u, id_c, id_e) values (:id_u, :nombre_u, :email_u, :password_u, :id_c, :id_e)";

  await BD.Open(sql, [id_u, nombre_u, email_u, password_u, id_c, id_e], true);

  res.status(200).json({
    "id_u": id_u,
    "nombre_u": nombre_u,
    "email_u": email_u,
    "password_u": password_u,
    "id_c": id_c,
    "id_e": id_e
  })
})

//Actualizar
router.patch("/UpdateUsuario/:id", async (req, res) => {
  const { id } = req.params;
  const { id_u, nombre_u, email_u, password_u, id_c, id_e } = req.body;

  sql = "update usuario set nombre_u=:nombre_u, email_u=:email_u, password_u=:password_u, id_c=:id_c, id_e=:id_e where id_u=:id";

  await BD.Open(sql, [nombre_u, email_u, password_u, id_c, id_e, id], true);
  
  res.status(200).json({
    id_u: id_u,
    nombre_u: nombre_u,
    email_u: email_u,
    password_u: password_u,
    id_c: id_c,
    id_e: id_e
  })
})

//Borrar
router.delete("/deleteUsuario/:id", async (req, res) => {
  const { id } = req.params;

  sql = "delete usuario where id_u=:id";

  await BD.Open(sql, [id], true);

  res.json({ msg: "Usuario Eliminado" })
})

//Autenticacion
const jwt = require("jsonwebtoken");

router.post("/api-usuario/signin", async (req, res) => {
  const { email_u, password_u } = req.body;
  sql = "select email_u, id_c from usuario where email_u=:email_u and password_u=:password_u";

  let result = await BD.Open(sql, [email_u, password_u], false);
  try {
    if (result.rows.length > 0) {
      let data = JSON.stringify(result.rows[0]);
      const token = jwt.sign(data, "stil");
      res.json({ token });
    } else {
      res.json("Usuario y clave incorrrectos");
    }
  } catch (error) {
    res.json(result.rows);
  }
});

router.post("/test", verifyToken, (req, res) => {
  res.json("Informacion secreta");
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) return res.status(401).json("No autorizado");

  const token = req.headers.authorization.substr(7);
  if (token !== "") {
    const content = jwt.verify(token, "stil");
    req.data = content;
    next();
  } else {
    res.status(401).json("token vacio");
  }
}

module.exports = router;
