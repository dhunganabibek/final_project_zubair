const createErrorJson = (err,message)=>{
    console.log(err)
    if(err && Object.keys(err).length > 0 && err.driver){
        message = err.errmsg;
    }
    return { error: true, message }
}
const createSuccessJson = (data, message)=>{
    return { data, message }
}
const createJson = (data, message, err)=>{
    let json = { data , message }
    if(err && Object.keys(err).length > 0 && err.driver){
        json = { error: true, message: err.errmsg }
    }else if(!data && err){
        json = { error: true, message: err }
    }else if(!data){
        json = { error: true, message }
    }else if(data && data.error){
        json = { ...data, message }
    }
    return json;
}
module.exports = { createErrorJson, createSuccessJson, createJson }