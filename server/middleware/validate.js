export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.errors.join(", "),
    });
  }
};
