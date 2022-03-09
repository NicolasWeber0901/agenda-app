
var express = require('express');
var router = express.Router();
const db = require("../servicos/db")
const { ObjectId } = require("mongodb")

db.connectToDB((err) => {

    if(err) console.log(err)

    const checarBody = ((req, res, next) => {
        if ("_id" in req.body){
            req.body._id = ObjectId(req.body._id)
        }
        next()
    })

    //get usado para listar (métodos http)
    router.get("/list", async (req, res) => {
        const results = await db.findDocuments()
        res.send(results)
    });

    //post usado para adicionar (métodos http)
    router.post("/add", async (req, res) => {
        const results = await db.insertDocuments(req.body)
        res.send(results)
    });

    //patch usado para atualizar (métodos http)
    router.patch("/update", checarBody, async (req, res) => {
        const results = await db.updateDocument(req.body)
        res.send(results)
    });

    //delete usado para apagar (métodos http)
    router.delete("/delete", checarBody, async (req, res) => {
        const results = await db.removeDocument(req.body)
        res.send(results)
    });
})



module.exports = router;