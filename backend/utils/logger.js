const logger = (req,res,next) => {
    const message = `API call: ${req.method} on ${req.originalUrl} at ${new Date()}`
    console.log(message);
    next();
  };

export default logger