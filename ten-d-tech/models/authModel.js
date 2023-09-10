const CommenQuery = require('./dbQueries');

const getUserUsingEmailPassword = async (email_address, password) => {

    let sqlQuery = "SELECT * from users WHERE email_address = ? AND password = ?"
    let values = [email_address, password]

    const result = await CommenQuery.getSingleRow(sqlQuery, values);
   
    if (result) return result;
    return false;
}

const getUserUsingEmail = async (email_address) => {

    let sqlQuery = "SELECT * from users WHERE email_address = ? "
    let values = [email_address]

    const result = await CommenQuery.getSingleRow(sqlQuery, values);
   
    if (result) return result;
    return false;
}

const updateUserPassword = async (password, id) => {

    let sqlQuery = "UPDATE users set password = ? WHERE id = ? "
    let values = [password, id]

    const result = await CommenQuery.updateQuery(sqlQuery, values);
   
    if (result) return true;
    return false;
}


const verifyUserPassword = async (password, id) => {

    let sqlQuery = "SELECT * from users WHERE id = ? AND password = ?"
    let values = [id, password]

    const result = await CommenQuery.getSingleRow(sqlQuery, values);
   
    if (result) return true;
    return false;
}

const checkEmailAddress = async (email_address, id) => {

    let sqlQuery = "SELECT * from users WHERE id != ? AND email_address = ?"
    let values = [id, email_address]

    const result = await CommenQuery.getSingleRow(sqlQuery, values);
   
    if (result) return true;
    return false;
}

const updateUserProfile = async (userData, id) => {

    let { first_name, last_name, email_address, contact, address } = userData
    let sqlQuery = "UPDATE users set first_name = ?, last_name = ? , email_address = ?, contact =? , address = ? WHERE id = ? "
    let values = [first_name, last_name, email_address, contact, address, id]

    const result = await CommenQuery.updateQuery(sqlQuery, values);
   
    if (result) return true;
    return false;
}

module.exports = {
    getUserUsingEmailPassword,
    getUserUsingEmail,
    updateUserPassword,
    verifyUserPassword,
    checkEmailAddress,
    updateUserProfile
}