exports.handler = async (event) => {
  const id = event.pathParameters?.id || "unknown";
  return {
    statusCode: 200,
    body: `User with ID ${id} fetched.`,
  };
};