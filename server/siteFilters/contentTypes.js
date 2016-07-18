var getHeaderFunc = (type)=> {
  return (req, res, next)=> {
    res.header('Content-Type', type)
    next()
  }
}

exports.html = getHeaderFunc('text/html')
exports.json = getHeaderFunc('application/jsontext/json')
