import jwt from 'jsonwebtoken';

const tokenCheck = (req, res, next) => {
    try {
        if(!req.headers.authorization){
            res.status(422).json({message: "No token"})
        }
        if (req.headers.authorization.startsWith("Bearer")){
            let token = req.headers.authorization
            token = token.split(" ")[1]

            const decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if(err) {
                    res.status(401);
                    throw new Error("User is not authorized")
                }
                // console.log(decoded.email)
                req.user = decoded.email
            });
            next()
        } else {
            res.status(422).json({message: "Invalid token entry"})
        }
        
    } catch(err) {
        res.status(500).json({message:"unable to verify token"})
    }
}

export default tokenCheck