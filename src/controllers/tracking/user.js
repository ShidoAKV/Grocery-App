import { Customer, DeliveryPartner } from "../../models/index.js";


export const updateUser=async(req,reply)=>{

    try {
         const {userId}=req.user;
         const updatedData=req.body;
         let user=await Customer.findById(userId)||await DeliveryPartner.findById(userId);
         if(!user){
            return reply.status(404).send({message:'user not found'});
         }
         let userModel;
         if(user.role==="Customer"){
            userModel=Customer;
         }
         else if(user.role==="DeliveryPartner"){
            userModel=DeliveryPartner
         }else{
            return reply.status(400).send({message:'Invalid user role'});
         }

         const updateUser=await userModel.findOneAndUpdate(
            userId,
            {$set:updatedData},
            {new:true,runValidators:true}
         );

         if(!updateUser){
            return reply.status(404).send({message:'user not found'});
         }

         return reply.send({
            message:'User Updated successfully',
            user:updateUser
         });
        
    } catch (error) {
         return reply.status(500).send({message:'Failed to update user ',error});
    }
}