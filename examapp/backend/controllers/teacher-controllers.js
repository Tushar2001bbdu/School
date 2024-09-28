let teacherService=require("../services/teachers")
exports.seeProfile=async(req,res)=>{
try{
let rollno = req.query.rollno;
const response=await teacherService.seeDetails(rollno);
if(!response){
    res.status(401).send({ status: 401,message:"you are not authorized" });
}
else{
    res.status(200).send({ status: 401,message:response });
}
}
catch(error){
    res.status(500).send({ status: 500,message:"internal server error" });
}
}
exports.getStudentProfile=async(req,res)=>{
    try{
        let rollno = req.query.rollno;
        if (!rollno) {
          res
            .status(500)
            .send({ status: false, message: "no roll number has been entered" });
        }
        else{
    const response=await teacherService.getStudentProfile(rollno);
    if(!response){
        res
        .status(404)
        .send({ status: false, message: "invalid rollno has been entered" });
    }
    else{
        res.status(200).send({ status: true, profile: profile });

    }}
   
    }
    catch(error){
        res.status(500).send({ status: 500,message:"internal server error" });
    }
    }
exports.updateStudentResult=async(req,res)=>{
    const {marks,rollno}=req.body;
    try{
        if(!marks || !rollno){
            res.status(401).json({
            
                "status": "false",
                "message": "you have not entered rollno or marks",
              });
        }
        else{
            await teacherService.updateStudentResult(marks,rollno);
            res.status(200).json({
                "status": "true",
                "message": "the result of student has been updated successfully",
              }); 
        }
       
    }
    catch(error){
        res.status(500).send({
            "status": "false",
            "message": "some error has occurred",
          });
    }
  


}
exports. getStudentsList=async(req,res)=>{
    try {
   
        let section = req.query.section;
    
        if (!section) {
          res
            .status(500)
            .json({ status: false, message: "no section has been entered" });
        }
        else{

        let response=await teacherService.getStudentList(section)
       
        if (!response) {
          res
            .status(401)
            .json({ status: false, message: "invalid rollno has been entered" });
        }
        else{
            res.status(200).json({ status: true, studentList: response });
        }
       
    }
      } catch (error) {
        console.log(error)
        res.status(500).json({ status: false, message: "internal server error" });
      }
}