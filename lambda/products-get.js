exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify([{ id: 1, name: "Laptop" }, { id: 2, name: "Phone" }])
  };
};