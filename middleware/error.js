const ErrorResponse = require("../utils/errorResponse");

const errorHandler= (err,req,res,next) =>{
   
    let error = {...err};
    error.message=err.message;

    if(err.name === "CastError"){
        const message = `Resource Not Found ${err.value}`;
        err= new ErrorResponse(message,404);
    }


    //mongoose duplicate values
    if(err.code === 11000){
        const message = `Duplicate Fields Entered ${err.value}`;
        err= new ErrorResponse(message,400);
    }

    //mongoose duplicate error
    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map(val => '  ' + val.message);
        err= new ErrorResponse(message,400);
    }

    res.status(error.statusCode || 500).json({
        success:false,
        error: error.message || "server error"
    })

}

module.exports=errorHandler;