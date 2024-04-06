import jwt from "jsonwebtoken";
export const adminAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(403).json({
      error: "Unauthorized Request",
    });
  }

  const authToken = token.split(" ")[1];

  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    //console.log(decodedToken);
    req.id = decodedToken.id;
    req.email = decodedToken.email;
    next();
  } catch (error) {
    //console.log(error);
    return res.status(403).json({
      error: "Unauthorized Request",
    });
  }
};
