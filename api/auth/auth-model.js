const db = require("../../data/dbConfig");


function getAllUsers(){
    return db("users");
}


function getUserById(id){

    return db("users")
            .where("id", id);
}


function getByFilter(filter){

    return db("users")
            .where(filter);
}


async function postRegistration(newUser){

    const newUserId = await db("users").insert(newUser)

    return getUserById(newUserId).first();

}

module.exports = {
    getAllUsers, getUserById, getByFilter, postRegistration
}