"use client";

import Dashboard from "../componant/layout/Dashbord";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <body>
      <Dashboard children={children}/>
      
    </body>
  )
}
