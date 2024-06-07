'use client'
import { apiConnector } from "@/services/apiconnector";
import { useEffect, useRef, useState } from "react";
import { TiTick } from "react-icons/ti";

const Stepper = ({ currentStatus,currentSubsectionId,orderId,token}) => {
  const steps = [
    'pending_orderReq',
    'preparing',
    'in progress',
    'delivered',
  ];

  useEffect(() => {
    setCurrentStep(steps.indexOf(currentStatus) + 1);
    console.log("currentStatus",currentSubsectionId)
    console.log("currentStatus orderId :",orderId)
  }, [currentStatus]);

  // Find the index of the currentStatus in steps array
  const index = steps.indexOf(currentStatus) + 1;
  const videoRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(index);
  const [complete, setComplete] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);

  useEffect(() => {
    // Start video playback when component mounts
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);
  const handleCancel = () => {
    apiConnector("PUT", `http://localhost:4000/api/v1/order/changeOrderStatus/${orderId}/${currentSubsectionId}`, { orderStatus: "canceled" },  {Authorization: `Bearer ${token}`})
    setCurrentStep(5);
    // Handle cancellation logic here
    // For demonstration, let"s reset to the canceled step
    setCurrentStep(6);
    setComplete(false);
    setIsCanceled(true);
  };

  const handleGetHelp = () => {
    // Handle getting help logic here
    // For demonstration, let"s alert a message
    alert("Help is on the way!");
  };

  return (
    <div className="container mx-auto p-4 relative">
      {/* Background video */}
      <div className="video-background absolute inset-0 z-0">
      <video ref={videoRef} width={300} height={200} className="border border-none rounded-md w-full opacity-30" loop muted>
          <source className="border border-none" src="/track2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="flex flex-col justify-between items-center mt-32 gap-3  px-32 relative z-10">
        {!isCanceled && steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item relative flex flex-col justify-center items-center w-36 ${i !== 0 && "before-style"} ${currentStep === i + 1 && "active"} ${(i + 1 < currentStep || complete) && "complete"}`}
          >
            <div className="step w-10 h-10 flex items-center justify-center z-10 relative rounded-full font-semibold bg-pink-700 text-white">
              {i + 1 <= currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className={`text-gray-900 font-poppins font-semibold ${complete && "text-white bg-green-800"}`}>{step}</p>
          </div>
        ))}

        <div className="flex gap-2">
        {/* Get Help Button */}
        <button className="btn-get-help bg-blue-600 text-white rounded px-4 mb-3" onClick={handleGetHelp}>Help</button>
        {/* Cancel Button */}
        {currentStep !== 6 && (
          <button className="btn-cancel bg-red-600 text-white py-1 px-4 rounded mb-3" onClick={handleCancel}>Cancel</button>
        )}
        </div>
        {/* Order Canceled Message */}
        {isCanceled && <p className="text-placeholder-caribbeangreen-25"> order has been canceled</p>}
      </div>

    </div>
  );
};

export default Stepper;
