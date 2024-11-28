import { User } from "../modals/user.models.js"

export const getAllusers=async(req,resp)=>{
    try {
        const user=await User.find().select("-password");
        return resp.status(200).json({
            user,
            status:200,
            success:true
        });
    } catch (error) {
        console.error(error);
        return resp.status(400).json({
            message:"Can not get data",
            status:400,
            success:false
        });
    }
}