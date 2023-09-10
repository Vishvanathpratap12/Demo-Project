const dbConnPool = require('../config/databse');

const getSingleRow = async (sqlQuery, values) => {
    try {
        const [rows] = await dbConnPool.execute(sqlQuery, values)
        if (rows.length < 1) return false
        return rows[0]
    } catch (error) {
        console.log("getSingleRow Query Error => ",error)
        return false
    }

}

const updateQuery = async (sqlQuery, values) => {
    try {
        const [rows] = await dbConnPool.execute(sqlQuery, values)
        if (rows.length < 1) return false
        return true
    } catch (error) {
        console.log("updateQuery Query Error => ",error)
        return false
    }

}

/*
const getAllList = (sql) => new Promise((resolve, reject) =>{
 
    con.query(sql,(error, result,fields) =>{
    
        try {
            resolve(result);
            
        }
        catch  ( error ){
            reject(error);

        }
       
    });
});

const CommenQuery = (query,data) => new Promise((resolve, reject) =>{
  
    con.query(query,[data],(error, result,fields) =>{
    
        try {
            resolve(result);
        }
        catch  ( error ){
            reject(error);

        }
       
    });
});


const updateUserProfileData = async (query) => {

    await con.query(query, (error, result, fields) =>{
        try{
             return result;
        }catch(error){
            return error
        }
    })
}

  

const CommenQueryUpdate = (query,data,id) => new Promise((resolve, reject) =>{
   
    con.query(query, [data, id], (error, result, fields) => {
        try {
            resolve(result);
        }
        catch  ( error ){
          console.log(error);
        }
       
    
});
    
});

const CommenQueryInsert = (query,data) => new Promise((resolve, reject) =>{
    
    con.query(query, [data], (error, result, fields) => {
        try {
           return resolve(result);
            
        }
        catch  ( error ){
           return reject(error);

        }
       
    
});
    
});

const comonDeleteById = (query,data) => new Promise((resolve, reject) =>{
    
    con.query(query, [data], (error, result, fields) => {
       
        try {
            resolve(result);
            
        }
        catch  ( error ){
            reject(error);

        }
       
    
});
    
});

module.exports = {
    CommenQuery,
    CommenQueryUpdate,
    CommenQueryInsert,
    updateUserProfileData,
    comonDeleteById,
    getAllList
}
*/

module.exports = {
    getSingleRow,
    updateQuery
}