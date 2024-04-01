"use client";

import Dashboard from "../componant/layout/Dashbord";
import { useState, useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <body>
      {isClient && <Dashboard>{children}</Dashboard>}
    </body>
  )
}
