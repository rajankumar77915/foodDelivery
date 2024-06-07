import doubt from "../models/doubt.js";
import mailSender from "../utils/mailSender.js";

export const makeDoubt= async (req, res) => {
    const { firstname, lastname,message,phoneNo,email } = req.body;
    if(!phoneNo){
        return res.status(400).json({
            success: false,
            message: "Please enter phone number",
        });
    }

    try {
        const newDoubt = await doubt.create({
           name:firstname+" "+lastname,
           email:email,
           mobileNo:phoneNo,
           message:message
        });

        try{
        const MessageResponds = await mailSender(email, "team biteblitz", "we have successfully received your doubt we will get back to you soon");
        }catch(error){
            console.log("error occures at sendVerificationEmail:", error.message);
            
        }
        return res.status(200).json({
            success: true,
            message: "Successfully doubt created",
        });
    } catch (error) {
        console.log("Error creating doubt:", error.message);
        return res.status(500).json({
            success: false,
            message: "Error creating doubt",
        });
    }
}
  