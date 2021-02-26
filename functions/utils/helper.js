function generateResponse(statusCode, body) {
  return {
    statusCode,
    body,
  };
}

module.exports = generateResponse;
