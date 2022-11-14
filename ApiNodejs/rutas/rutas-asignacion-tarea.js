const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');


//Get especifico por usuario
router.get("/getAsigTarea_us/:id", async (req, res) => {
    const { id } = req.params;
    sql = "select * from asignacion_tarea where id_u_at =:id";
  
    let result = await BD.Open(sql, [id], false);
    res.json(result.rows);
  });

//Get especifico por tarea
router.get("/getAsigTarea_t/:id", async (req, res) => {
    const { id } = req.params;
    sql = "select * from asignacion_tarea where id_t_at =:id";
  
    let result = await BD.Open(sql, [id], false);
    res.json(result.rows);
  });

//Get de todo
router.get('/getAsigTareas', async (req, res) => {
  sql = "select * from asignacion_tarea";

  let result = await BD.Open(sql, [], false);
  res.json(result.rows);
})

module.exports = router;