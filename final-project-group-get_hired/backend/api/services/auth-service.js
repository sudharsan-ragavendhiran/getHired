import jwt from "jsonwebtoken";

//Created auth-service to verify the JWT access token
export const verify = async (request, response, next) => {
    const authHeader = request.headers.authorization; 
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, "mySecretKey", (error, user) => {
            if(error) {
              return  response.status(403).json("Token not valid");
            }
            request.user = user;
            next();
        });
    }else {
         response.status(401).json("You are not authenticated");
    }
};
