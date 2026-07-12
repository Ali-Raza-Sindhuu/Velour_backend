import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authorizeHeader = req.headers.authorization;

    if (!authorizeHeader) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    if (!authorizeHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "Invalid Authorization Format",
      });
    }

    const token = authorizeHeader.split("")[1];

    const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decode;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};
