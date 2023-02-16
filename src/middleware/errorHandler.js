const errorHandler = (err,req,res,next) => {
    let msg = err.message +" " + req.method + ' ' + req.url || 'Error in ' + req.method + ' ' + req.url;
    const status = err.status || 500;
    res.status(status).send({
        success: false,
        status: status,
        message: msg,
        env: process.env.NODE_ENV
        
    });
    next();
    // renvoyer un reponse avec le status approprié.
    // reponse object avec les propriété suivantes.

    // success: false
    // status: (err)
    // message:
    // env:
}

module.exports = errorHandler;