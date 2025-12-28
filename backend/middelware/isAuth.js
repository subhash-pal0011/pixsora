import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
       try {
              const token = req.cookies?.token;  
              // console.log(`token : ${token}`)
              if (!token) {
                     return res.status(401).json({
                            success: false,
                            message: "Token not found!"
                     });
              }

              const decoded = jwt.verify(token, process.env.SECRET_KEY);

              req.userId = decoded._id;  
              next();
       }
       catch (err) {
              return res.status(401).json({
                     success: false,
                     message: "Invalid or expired token"
              });
       }
};

