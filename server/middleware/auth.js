import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {

    const token = req.cookies.token;

    if(!token){
      return res.json({success: false, message: "No Token"})
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    
    req.userId = decode.id

    next();
    
  } catch (error) {
    return res.json({success: false, message: error.message})
  }
}