const router = require("express").Router();
const BD = require('../config/configbd');

//Get especifico de vista
router.get('/api-tarea/getVista_Tarea/:id', async (req, res) => {

    try{
        const { id } = req.params;
        sql = "select * from vista_tarea where id_t =:id";

        let result = await BD.Open(sql, [id], false);
        Vista_Tarea = [];

        result.rows.map(vista_tarea => {
            let vista_tareaSchema = {
                "nombre_t": vista_tarea[1],
                "descripcion_t": vista_tarea[2],
                "fecha_inicio_t": vista_tarea[3],
                "fecha_entrega_t": vista_tarea[4],
                "porcentaje_avance_t": vista_tarea[5],
                "estado_t": vista_tarea[6],
                "nombre_u": vista_tarea[7],
                "nombre_ts": vista_tarea[8]
            }

            Vista_Tarea.push(vista_tareaSchema);
        })
        
        res.json(Vista_Tarea);
    } catch (error){
        return res.status(500).json({message: 'Hubo un error'})
    }
})

//Get de todo la vista
router.get('/api-tarea/getVista_Tareas', async (req, res) => {

    try{
        sql = "select * from vista_tarea";

        let result = await BD.Open(sql, [], false);
        Vista_Tareas = [];

        result.rows.map(vista_tarea => {
            let vistas_tareasSchema = {
                "id_t": vista_tarea[0],
                "nombre_t": vista_tarea[1],
                "descripcion_t": vista_tarea[2],
                "fecha_inicio_t": vista_tarea[3],
                "fecha_entrega_t": vista_tarea[4],
                "porcentaje_avance_t": vista_tarea[5],
                "estado_t": vista_tarea[6],
                "nombre_u": vista_tarea[7],
                "nombre_ts": vista_tarea[8]
            }

            Vista_Tareas.push(vistas_tareasSchema);
        })
        
        res.json(Vista_Tareas);
        } catch (error){
        return res.status(500).json({message: 'Hubo un error'})
    }
})

//Get especifico
router.get('/api-tarea/getTarea/:id', async (req, res) => {
    
    try{
        const { id } = req.params;
        sql = "select * from tarea where id_t =:id";

        let result = await BD.Open(sql, [id], false);
        Tarea = [];
        result.rows.map(tarea => {
            let tareaSchema = {
                "id_t": tarea[0],
                "nombre_t": tarea[1],
                "descripcion_t": tarea[2],
                "fecha_inicio_t": tarea[3],
                "fecha_entrega_t": tarea[4],
                "porcentaje_avance_t": tarea[6],
                "estado_t": tarea[7]
            }

            Tarea.push(tareaSchema);
        })
        
        res.json(Tarea);
    } catch (error){
        return res.status(500).json({message: 'Hubo un error'})
    }
})

//Get de todo
router.get('/api-tarea/getTareas', async (req, res) => {
    
    try{
        sql = "select * from tarea where estado_t = 'En curso' OR estado_t IS NULL";

        let result = await BD.Open(sql, [], false);
        Tareas = [];

        result.rows.map(tarea => {
            let tareasSchema = {
                "id_t": tarea[0],
                "nombre_t": tarea[1],
                "descripcion_t": tarea[2],
                "fecha_inicio_t": tarea[3],
                "fecha_entrega_t": tarea[4],
                "fecha_entrega_efectiva_t": tarea[5],
                "porcentaje_avance_t": tarea[6],
                "estado_t": tarea[7]
            }

            Tareas.push(tareasSchema);
        })

        res.json(Tareas);
    } catch (error){
        return res.status(500).json({message: 'Hubo un error'})
    }
})


//Get de historial de tarea
router.get('/api-tarea/getHistorialTareas', async (req, res) => {
    
    try{
        sql = "select * from tarea where estado_t = 'Terminada'";

        let result = await BD.Open(sql, [], false);
        Tareas = [];

        result.rows.map(tarea => {
            let tareasSchema = {
                "id_t": tarea[0],
                "nombre_t": tarea[1],
                "descripcion_t": tarea[2],
                "fecha_inicio_t": tarea[3],
                "fecha_entrega_t": tarea[4],
                "porcentaje_avance_t": tarea[6],
                "estado_t": tarea[7]
            }

            Tareas.push(tareasSchema);
        })

        res.json(Tareas);
    } catch (error){
        return res.status(500).json({message: 'Hubo un error'})
    }
})

//agregar
router.post('/api-tarea/addTarea/', async (req, res) => {
    
    try{
        const { id_t, nombre_t, descripcion_t, fecha_inicio_t, fecha_entrega_t, porcentaje_avance_t, estado_t} = req.body;

        sql = "insert into tarea(id_t, nombre_t, descripcion_t, fecha_inicio_t, fecha_entrega_t, porcentaje_avance_t, estado_t) values (:id_t, :nombre_t, :descripcion_t, :fecha_inicio_t, :fecha_entrega_t, :porcentaje_avance_t, :estado_t)";

        await BD.Open(sql, [id_t, nombre_t, descripcion_t, fecha_inicio_t, fecha_entrega_t, porcentaje_avance_t, estado_t], true);

        res.status(200).json({
            "id_t": id_t,
            "nombre_t": nombre_t,
            "descripcion_t": descripcion_t,
            "fecha_inicio_t": fecha_inicio_t,
            "fecha_entrega_t": fecha_entrega_t,
            "porcentaje_avance_t": porcentaje_avance_t,
            "estado_t": estado_t
        })
    } catch (error){
        return res.status(500).json({message: 'Hubo un error'})
    }
})

//Actualizar
router.patch("/api-tarea/UpdateTarea/:id", async (req, res) => {

    try{
        const { id } = req.params;
        const { id_t, nombre_t, descripcion_t, fecha_inicio_t, fecha_entrega_t, porcentaje_avance_t, estado_t} = req.body;

        sql = "update tarea set nombre_t=:nombre_t, descripcion_t=:descripcion_t, fecha_inicio_t=:fecha_inicio_t, fecha_entrega_t=:fecha_entrega_t, porcentaje_avance_t=:porcentaje_avance_t, estado_t=:estado_t where id_t=:id";

        await BD.Open(sql, [nombre_t, descripcion_t, fecha_inicio_t, fecha_entrega_t, porcentaje_avance_t, estado_t, id], true);

        res.status(200).json({
            id_t: id_t,
            nombre_t: nombre_t,
            descripcion_t: descripcion_t,
            fecha_inicio_t: fecha_inicio_t,
            fecha_entrega_t: fecha_entrega_t,
            porcentaje_avance_t: porcentaje_avance_t,
            estado_t: estado_t
        })
    } catch (error){
        return res.status(500).json({message: 'Hubo un error'})
    }
})

//Terminar tarea
router.post("/api-tarea/TerminarTarea/:id", async (req, res) => {
    
    try{
        const { id } = req.params;

        sql = "EXEC TERMINAR_TAREA(:id)";

        await BD.Open(sql, [id], true);
    } catch (error){
        return res.status(500).json({message: 'Hubo un error'})
    }
})

//Borrar
router.delete("/api-tarea/deleteTarea/:id", async (req, res) => {
    
    try{
        const { id } = req.params;

        sql = "delete tarea where id_t=:id";

        await BD.Open(sql, [id], true);

        res.json({ msg: "Tarea Eliminada" })
    } catch (error){
        return res.status(500).json({message: 'Hubo un error'})
    }
})

//Prueba de conexión
router.get('/', async (req, res) => {
    sql = "select * from tarea where id_t = 1";

    let result = await BD.Open(sql, [], false);
    
    console.log(result);
    //res.json(result);
    res.status(200).json({msg:"todo ok"});
});

module.exports = router;