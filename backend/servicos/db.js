const { MongoClient, ClientSession } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useUnifiedTopology: true });

// Database Name
const dbName = 'to-do-list-db';

var _db;

function connectToDB(callback) {

    client.connect(function (err) {
        console.log("Connected successfully to server");

        _db = client.db(dbName);

        callback(err)
    });
}

const findDocuments = async function () {
    const collection = _db.collection('to-do');

    try {

        const results = await collection.find({}).toArray();
        return results;

    } catch (error) {
        throw new Error(error)
    }
};


const insertDocuments = async (document) => {

    const collection = _db.collection('to-do');

    try {
        const results = await collection.insertOne(document);
        return results
    } catch (error) {
        throw new Error(error)
    }
}

const updateDocument = async (document) => {
    
    const collection = _db.collection('to-do');

    try {
        const results = await collection.updateOne({ _id: document._id}, {$set: document});
        return results
    } catch (error) {
        throw new Error(error)
    }

}


const removeDocument = async (document) => {
    
    const collection = _db.collection('to-do');

    try {
        const results = await collection.deleteOne({ _id: document._id});
        return results
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    connectToDB,
    findDocuments,
    insertDocuments,
    updateDocument,
    removeDocument
}

/*
connectToDB(async () => {
    const results = await findDocuments();
    console.log(results)
})
*/