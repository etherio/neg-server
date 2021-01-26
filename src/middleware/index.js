const serverDetails = { count: 0 };

module.exports = function middleware(req, res, next) {
  req.count = serverDetails.count++;
  next();
};
