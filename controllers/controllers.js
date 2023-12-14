var express = require('express');

// PERSONAS
const listPersonas = (req, res, next) => {
    const db = req.app.get("db");
    const query = "SELECT * from persona";
    db.query(query, function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        res.render("personas", { personas: rows, title: "Lista" });
    })
}

const agregarPersona = function(req, res, next) {
    res.render('agregar', { title: "Agregar" });
}

const postAgregarPersona = function(req, res, next) {
    const db = req.app.get("db");
    const nombre = req.body.nombre;
    const email = req.body.email;
    const query = "INSERT into persona (nombre, email) VALUES (?, ?)";
    db.query(query, [nombre, email], function(err) {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect("/personas");
    })
}

const getEditarPersona = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM persona WHERE id=(?)", [id], function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('edit', { item: rows[0], title: "Editar" });
    });
}

const postUpdatePersona = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    var nombre = req.body.nombre;
    var email = req.body.email; // Obtén la descripción del formulario
    db.query("UPDATE persona SET nombre=?, email=? WHERE id=?", [nombre, email, id], function(err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/personas');
    });
}

const getDeletePersona = (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM persona WHERE id=?", id, function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('borrar', { item: rows[0], title: "Borrar" });
    });
}

const postDeletePersona = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("DELETE FROM persona WHERE id=?", id, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/personas');
    });
}

const buscarPersona = (req, res, next) => {
    res.render('busqueda', { title: "Buscar" });
}

const buscarPersonaResultados = (req, res, next) => {
    const db = req.app.get("db");
    const keyword = req.body.keyword;
    const query = 'SELECT * FROM persona WHERE nombre LIKE ?';
    db.query(query, [`%${keyword}%`], (err, rows) => {
        if (err) throw err;
        res.render('resultados', { personas: rows, title: "Resultados" })
    });
}
 // OFICINAS
const listOficinas = (req, res, next) => {
    const db = req.app.get("db");
    const query = "SELECT * from oficina" ;
    db.query(query, function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        res.render("oficinas", { oficinas: rows, title: "Lista" });
    })
}

const agregarOficina = function(req, res, next) {
    res.render('agregar-ofi', { title: "Agregar2" });
}
const postAgregarOficina = function(req, res, next) {
    const db = req.app.get("db");
    const denominacion = req.body.denominacion;
    const id = req.body.id;
    const query = "INSERT into oficina (denominacion,id ) VALUES (?, ?)";
    db.query(query, [denominacion,id], function(err) {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect("/oficinas");
    })
}

const getEditarOficina = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM oficina WHERE id=(?)", [id], function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('edit-ofi', { item: rows[0], title: "Editar" });
    });
}

const postUpdateOficina = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    var denominacion = req.body.denominacion;
     // Obtén la descripción del formulario
    db.query("UPDATE oficina SET denominacion=?, id=? WHERE id=?", [denominacion, id], function(err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/oficinas');
    });
}
const getDeleteOficina = (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM oficina WHERE id=?", id, function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('borrar2', { item: rows[0], title: "Borrar" });
    });
}
const postDeleteOficina = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("DELETE FROM oficina WHERE id=?", id, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/oficinas');
    });
}
const buscarOficina = (req, res, next) => {
    res.render('busqueda2', { title: "Buscar" });
}
const buscarOficinaResultados = (req, res, next) => {
    const db = req.app.get("db");
    const keyword = req.body.keyword;
    const query = 'SELECT * FROM oficina WHERE denominacion LIKE ?';
    db.query(query, [`%${keyword}%`], (err, rows) => {
        if (err) throw err;
        res.render('resultados2', { oficinas: rows, title: "Resultados" })
    });
}
module.exports = {
    listPersonas,
    agregarPersona,
    postAgregarPersona,
    getEditarPersona,
    postUpdatePersona,
    getDeletePersona,
    postDeletePersona,
    buscarPersona,
    buscarPersonaResultados,
    listOficinas,
    agregarOficina,
    postAgregarOficina,
    getEditarOficina,
    postUpdateOficina,
    getDeleteOficina,
    postDeleteOficina,
    buscarOficina,
    buscarOficinaResultados,
};