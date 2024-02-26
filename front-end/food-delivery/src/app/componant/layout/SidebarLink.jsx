import Link from "next/link"
import * as Icons from "react-icons/vsc"

// import { NavLink, matchPath, useLocation } from "react-router-dom"

// import { resetCourseState } from "../../slics/courseSlice"

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]
  // const location = useLocation()

  // const matchRoute = (route) => {
  //   return matchPath({ path: route }, location.pathname)
  // }

  return (
    <Link
      href={link.path}
     
    >
      <div className="flex items-center gap-x-2 hover:bg-yellow-600 p-2">
      <span className="w-5"></span>
        {/* Icon Goes Here */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </Link>
  )
}