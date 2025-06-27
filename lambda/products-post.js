exports.handler = async (event) => {
  const body = JSON.parse(event.body || '{}');
  return {
    statusCode: 201,
    body: `Product ${body.name} created!`
  };
};