const logger = (req, res, next) => {
  req.hello = 'Hello World';
  console.log(`${req.method} ${req.protocol} ${req} `);
  next();
};

module.exports = logger;
