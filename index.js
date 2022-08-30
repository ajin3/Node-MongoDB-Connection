import { MongoClient } from "mongodb";

main();

function main() {

    const uri = "mongodb://localhost:27017/";
    createDB(uri, "school");
    // createCollection(getClient(), "School", "Mash");
    //deleteCollection(getClient(), "School", "Mash")
    const teachers = [
        {
            name: "Akhil",
            year: 2022
        },
        {
            name: "Ajin",
            year: 2022
        },
        {
            name: "Sha",
            year: 2022
        },
    ];
    const deleteFilter = {
        year: 2022,
    };
    //addDocument(getClient(), "School", "Students", teachers);
    deleteDocument(getClient(), "School", "Students", deleteFilter);
}

function getClient() {
    const uri = "mongodb://localhost:27017/";
    return new MongoClient(uri);
}

function createDB(uri, dbName) {
    const dbUri = `${uri}${dbName}`;
    MongoClient.connect(dbUri, (err, db) => {
        console.log("Connected to Database");
        db.close();
    });
}

function createCollection(client, dbName, collectionName) {
    client.connect(function (err, db) {
        if (err) throw err;
        let currentDB = db.db(dbName);

        currentDB
            .listCollections({ name: collectionName })
            .next(function (err, collectionInfo) {
                if (collectionInfo) {
                    console.log(
                        `Collection with the name ${collectionName} already exists`
                    );
                    db.close();
                } else {
                    currentDB.createCollection(collectionName, function (err, res) {
                        if (err) throw err;
                        console.log(`Collection created with the name ${collectionName}`);
                        db.close();
                    });
                }
            });

    });
}

function deleteCollection(client, dbName, collectionName) {
    client.connect(function (err, db) {
        if (err) throw err;
        let currentDB = db.db(dbName);

        currentDB
            .listCollections({ name: collectionName })
            .next(function (err, collectionInfo) {
                if (collectionInfo) {
                    currentDB.collection(collectionName).drop(function (err, res) {
                        console.log(`${collectionName} collection was deleted`);
                        db.close();
                    });
                } else {
                    console.log(`${collectionName} doesnot exist in DB ${dbName}`);

                    db.close();
                }
            });
    });
}

function addDocument(client, dbName, collectionName, document) {

    try {

        client.connect(function (err, db) {
            if (err) throw err;
            let currentDB = db.db(dbName);

            currentDB
                .listCollections({ name: collectionName })
                .next(function (err, collectionInfo) {
                    if (collectionInfo) {

                        if (Array.isArray(document)) {
                            currentDB.collection(collectionName).insertMany(document, function () {
                                console.log(`Document inserted Successfully`);
                                db.close();
                            });
                        }

                        else {
                            currentDB.collection(collectionName).insertOne(document, function () {
                                console.log(`Document inserted Successfully`);
                                db.close();
                            });
                        }

                    } else {
                        console.log(`${collectionName} doesnot exist in DB ${dbName}`);

                        db.close();
                    }
                });
        });

    } catch (err) {
        console.log(`Error: ${err}`);
    }


}

function deleteDocument(client, dbName, collectionName, filter) {

    try {

        client.connect(function (err, db) {
            if (err) throw err;
            let currentDB = db.db(dbName);

            currentDB
                .listCollections({ name: collectionName })
                .next(function (err, collectionInfo) {
                    if (collectionInfo) {
                        currentDB.collection(collectionName).deleteMany(filter, function(){
                            console.log(`Document were Successfully Deleted`);
                            db.close();
                        })

                    } else {
                        console.log(`${collectionName} doesnot exist in DB ${dbName}`);

                        db.close();
                    }
                });
        });

    } catch (err) {
        console.log(`Error: ${err}`);
    }


}

