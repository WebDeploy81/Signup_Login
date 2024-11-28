
import jwt from "jsonwebtoken";

const isAuthenticated=async(req,resp,next)=>{
    try {
        const token=req.headers.token || req.cookies.token;
        // console.log(token);
        if(!token){
            return resp.status(400).json({
                message:"Invalid token!",
                status:400,
                success:false
            });
        }
        const decode=await jwt.verify(token,process.env.SERECT_KEY);
        if(!decode){
            return resp.status(400).json({
                message:"User is not Authenticated!",
                status:400,
                success:false
            });
        }
        req.id=decode.userId;
        req.role=decode.userRole;
        next();
    } catch (error) {
        return resp.status(400).json({
            message:"Somthing wrong",
            error:error,
            status:400,
            success:false
        });
    }
}
export default isAuthenticated;