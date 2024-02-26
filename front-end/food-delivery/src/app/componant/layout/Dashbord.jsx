'use client';
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Dashboard({ children }) {
  const { user } = useSelector((state) => state.profile);
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <div className="sticky top-0">
        <Sidebar />
      </div>
      <div className="h-[calc(100vh-3.5rem)] flex-1 ">
        <div className="absolute top-0 left-0 w-full ">
          <div className="bg-black w-full sticky top-0">
            <Header />
          </div>
        </div>
        <div className="w-full h-full mx-auto">
          <div className="block mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
