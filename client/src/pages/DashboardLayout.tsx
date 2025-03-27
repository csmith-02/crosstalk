import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
    return (
        <>
            <h1>DashboardLayout Page</h1>
            <Outlet />
        </>
    )
}

export default DashboardLayout