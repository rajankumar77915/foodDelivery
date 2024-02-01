const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } = process.env;
import twilio from 'twilio';
// const twilio = require('twilio');
const accountSid = "AC80cc7f472a435b1310e75486754e58f8";
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = "VA31c23e5e0dca21327bc8a552a12fa620";
import Twilio from 'twilio';
const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);




export async function mobileOtpSend(phoneNumber) {
  try{
    const  res=await client.verify.v2.services(verifySid)
    .verifications.create({ to: phoneNumber, channel: "sms" })
    // .then(verification => verification);
    console.log(("send otp:",res))

    return res;
  }
  catch(error){
    console.log("oooooooooooooooooooooooooooooooooooooooolllllllllll",error)
    throw error;
  }
}

export async function  verifyOtp (phoneNumber, otpCode) {
  const res=await client.verify.v2.services(verifySid)
    .verificationChecks.create({ to: phoneNumber, code: otpCode})
    // .then((verificationCheck)=>{ return verificationCheck });
    // console.log("response: ",res);
    return res;
}

// module.exports = { sendOtp, verifyOtp };

// module.exports = mobileOtpSend;

export default mobileOtpSend;
