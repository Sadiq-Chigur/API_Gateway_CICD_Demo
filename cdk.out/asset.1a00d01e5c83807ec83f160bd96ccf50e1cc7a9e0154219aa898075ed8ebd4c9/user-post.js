exports.handler = async (event) => {
  const body = JSON.parse(event.body || '{}');
  return {
    statusCode: 201,
    body: `User ${body.name} created!`,
  };
};