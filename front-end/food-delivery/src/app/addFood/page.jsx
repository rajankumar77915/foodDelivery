"use client"
import RenderSteps from "../componant/AddFood/RenderSteps"

export default function AddCourse() {
  return (
    <div className="bg-gradient-to-r from-fuchsia-300 to-fuchsia-5">
      <div className="flex w-11/12 mx-auto items-start gap-x-6  p-3">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Add Food
          </h1>
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>
        {/* Food Upload Tips */}
        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-gradient-to-r from-richblack-700 to-richblack-800 p-6 xl:block">
          <p className="mb-8 text-lg text-richblack-5">⚡ Food Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
            <li>Set the Food Price</li>
            <li>Standard size for the food thumbnail is 350x250.</li>
            <li>Food Builder is where you create & organize a food.</li>
            <li>Make Announcements to notify any important</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
