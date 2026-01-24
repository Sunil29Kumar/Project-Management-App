export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: result.error.flatten().fieldErrors 
    });
  }

  // Validated aur Sanitize kiya hua data req.body mein override 
  req.body = result.data;
  next();
};