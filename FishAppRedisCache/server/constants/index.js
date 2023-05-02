export const messageFish = Object.freeze({
  not: "Fish is not found",
  notFoundKey: "Fish key is not found",
  deleteKey: "Delete key",
});

export const statusCode = Object.freeze({
  server: 500,
  notFound: 404,
  badRequest: 400,
  forbidden: 403,
  conflict: 409,
  unauthorized: 401,
  unprocessableEntity: 422,
  notAllowed: 405,
  ok: 200,
  created: 201,
  accepted: 202,
});

// Cache time
export const DEFAULT_EXPIRATION = 3000;
