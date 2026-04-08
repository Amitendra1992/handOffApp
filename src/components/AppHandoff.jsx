/* Handoff Data Structure:
{
  id: unique string,
  customerName: string,
  issue: string,
  priority: "Low" | "Medium" | "High" | "Urgent",
  status: "New" | "In Progress" | "Resolved",
  assignedTo: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
*/


import { Link, Outlet } from "react-router";

const AppHandoff = () => {

  return (
    <div className="w-screen min-h-screen bg-blue-100 flex flex-col justify-center items-center p-8">
        <h1 className="font-bold text-3xl text-gray-600">HandoffHub</h1>
        <p className="font-bold italic text-sm text-gray-600">Seamless Issue Tracking & Team Handoffs</p>
        <nav className="my-4">
            <div className="max-w-4xl mx-auto px-6">
                <div className="flex gap-6">
                    <Link
                        to="/"
                        className="px-4 py-3 font-medium text-gray-500 hover:text-gray-900"
                    >
                      🏠 Home
                    </Link>
                    <Link
                        to="/handofflist"
                        className="px-4 py-3 font-medium text-gray-500 hover:text-gray-900"
                    >
                      📋 Handoffs
                    </Link>
                    <Link
                        to="/create"
                        className="px-4 py-3 font-medium text-gray-500 hover:text-gray-900"
                    >
                      ➕ Create New
                    </Link>
                </div>
            </div>
          </nav>
          <Outlet />
    </div>
  )
}

export default AppHandoff;
