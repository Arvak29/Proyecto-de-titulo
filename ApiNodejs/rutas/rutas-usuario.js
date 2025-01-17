const router = require("express").Router();
const BD = require("../config/configbd");

//Get especifico de vista
router.get("/api-usuario/getVista_Usuario/:id", async (req, res) => {

  try{
      const { id } = req.params;
      sql = "select * from vista_usuario where id_u =:id";

      let result = await BD.Open(sql, [id], false);
      Vista_Usuario = [];

      result.rows.map((vista_usuario) => {
        let vista_usuarioSchema = {
          "nombre_u": vista_usuario[1],
          "email_u": vista_usuario[2],
          "password_u": vista_usuario[3],
          "nombre_r": vista_usuario[4],
          "nombre_c": vista_usuario[5],
          "nombre_ui": vista_usuario[6],
          "nombre_e": vista_usuario[7]
        }
        Vista_Usuario.push(vista_usuarioSchema);
      })

      res.json(Vista_Usuario);
      } catch (error){
        return res.status(500).json({message: 'Hubo un error'})
    }
})

//Get de toda la vista
router.get("/api-usuario/getVista_Usuarios", async (req, res) => {

  try{
      sql = "select * from vista_usuario";

      let result = await BD.Open(sql, [], false);
      Vista_Usuarios = [];

      result.rows.map((vista_usuario) => {
        let vista_usuariosSchema = {
          "nombre_u": vista_usuario[1],
          "email_u": vista_usuario[2],
          "password_u": vista_usuario[3],
          "nombre_r": vista_usuario[4],
          "nombre_c": vista_usuario[5],
          "nombre_ui": vista_usuario[6],
          "nombre_e": vista_usuario[7]
        }

        Vista_Usuarios.push(vista_usuariosSchema);
      })
      res.json(Vista_Usuarios);
    } catch (error){
        return res.status(500).json({message: 'Hubo un error'})
    }
})

//Get especifico
router.get("/api-usuario/getUsuario/:id", async (req, res) => {

  try{
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
    } catch (error){
        return res.status(500).json({message: 'Hubo un error'})
    }
})

//Get de todo
router.get("/api-usuario/getUsuarios", async (req, res) => {

  try{
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
      } catch (error){
        return res.status(500).json({message: 'Hubo un error'})
    }
})

//Agregar
router.post("/api-usuario/addUsuario", async (req, res) => {

  try{
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
    } catch (error){
      return res.status(500).json({message: 'Hubo un error'})
  }
})

//Actualizar
router.patch("/api-usuario/UpdateUsuario/:id", async (req, res) => {

  try{
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
    } catch (error){
        return res.status(500).json({message: 'Hubo un error'})
    }
})

//Borrar
router.delete("/api-usuario/deleteUsuario/:id", async (req, res) => {
  
  try{
      const { id } = req.params;

      sql = "delete usuario where id_u=:id";

      await BD.Open(sql, [id], true);

      res.json({ msg: "Usuario eliminado" })
    } catch (error){
        return res.status(500).json({message: 'Hubo un error'})
    }
})

//Autenticacion
const jwt = require("jsonwebtoken");

router.post("/api-usuario/signin", async (req, res) => {
  const { email_u, password_u } = req.body;
  sql = "select * from VISTA_USUARIO where email_u=:email_u and password_u=:password_u";

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
    res.status(401).json("Token vacío");
  }
}

module.exports = router;
