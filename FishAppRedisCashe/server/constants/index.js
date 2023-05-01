export const messageFish = Object.freeze({
  notFish: "Fish species is not found",
  notFoundSpeciesKey: "Fish species key is not found",
  deleteKeySpecies: "Delete species key",
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

// Cashe time
export const DEFAULT_EXPIRATION = 10;