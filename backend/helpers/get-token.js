const getToken = (req) => {
  const authHeader = req.headers.authorization;
  const header = authHeader.split(" ")
  let token

  if (header.length > 0) token = header[1];
  return token;
}

module.exports = getToken;
