"use client"
import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

// import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./FoodInformation/FoodInformationForm"
import PublishCourse from "./PublishFood"


export default function RenderSteps() {
  const { step } = useSelector((state) => state.food)

  const steps = [
    {
      id: 1,
      title: "Food Information",
    },

    {
      id: 2,
      title: "Publish",
    },
  ]

  return (
    <>
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item) => (
          <>
            <div
              className="flex flex-col items-center "
              key={item.id}
            >
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? " bg-gradient-to-r from-white to-richblack-900 text-white"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </button>
              
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                  step > item.id  ? "border-yellow-50" : "border-richblack-500"
                } `}
                ></div>
              </>
            )}
          </>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <>
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
              key={item.id}
            >
              
              <p
                className={`text-sm ${
                  step >= item.id ? "text-black text-xl" : "text-richblack-700 text-xl"
                }`}
              >
                {item.title}
              </p>
            </div>
            
          </>
        ))}
      </div>
      {/* Render specific component based on current step */}
      
      {step === 1 && <CourseInformationForm />}
      {/* {step === 2 &&  <PublishCourse /> } */}
    </>
  )
}