import React from 'react'
import './SidebarLayout.css'
import MainLayout from '../MainLayout/MainLayout.tsx'
import { Outlet } from 'react-router-dom'
import UserSidebar from '../../components/Sidebar/UserSidebar/UserSidebar.tsx'
function SidebarLayout() {
    return (
        <>
            <main className='layout-with-sidebar'>
                <UserSidebar />

                <Outlet />
            </main>
        </>
    )
}

export default SidebarLayout