var getHeaderFunc = (type)=> {
  return (req, res, next)=> {
    "use strict";
    res.header('Content-Type', type);
    next();
  };
};

exports.html = getHeaderFunc('text/html');
exports.json = getHeaderFunc('application/json;text/json');
