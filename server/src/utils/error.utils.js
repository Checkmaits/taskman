export function processError(error, next) {
  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((err) => err.message);
    return next({
      status: 400,
      message: "Please correct the following error(s):",
      errors,
    });
  }

  next({});
}
