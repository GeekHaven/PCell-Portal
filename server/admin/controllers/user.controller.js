import User from '../models/User';
import { response_200,response_500 } from '../../utils/responseCodes';
export async function getPaginatedUsers(req,res){
    const {programs,admissionYears,rollNumbers}=req.query;
      const options={
        pagination:req.query.page!==-1,
        page:req.query.page,
        limit:req.query.limit,        
      }
      let query={
        rollNumber:{ $regex: new RegExp(rollNumbers), $options: "i" },
        admissionYear:{$regex: new RegExp(admissionYears), $options: "i"},
        program:{$regex: new RegExp(programs), $options: "i"},
      }
        try{
            const users=await User.paginate(query,options);
            return response_200(res,'OK',users);
        }catch(err){
            return response_500(res,err);
        }
}