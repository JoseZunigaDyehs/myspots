const ERROR_HANDLERS = {
  CastError: (res, next) => res.status(400).send({ message: "Cast" }),

  ValidationError: (res, { message }) => res.status(409).send({ message }),

  JsonWebTokenError: (res, next) =>
    res.status(401).send({ message: "Token missing" }),

  TokenExpiredError: (res, next) =>
    res.status(401).send({ message: "Token expired" }),

  defaulError: (res, next) => res.status(500).end(),
};

export const errorHandler = (error, req, res, next) => {
  console.log(error);
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaulError;
  handler(res, error);
};
