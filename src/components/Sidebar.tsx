// src/components/Layout/Sidebar.tsx
import { Layout, Menu, Button, Tooltip } from 'antd'
import { 
  DashboardOutlined, 
  TeamOutlined, 
  UserOutlined, 
  CalendarOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg'

const { Sider } = Layout

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const location = useLocation()

  const menuItems = [
    { 
      key: '/', 
      icon: <DashboardOutlined />, 
      label: collapsed ? <Tooltip title="Dashboard" placement="right"><Link to="/">Dashboard</Link></Tooltip> : <Link to="/">Dashboard</Link>
    },
    { 
      key: '/students', 
      icon: <TeamOutlined />, 
      label: collapsed ? <Tooltip title="Students" placement="right"><Link to="/students">Students</Link></Tooltip> : <Link to="/students">Students</Link>
    },
    { 
      key: '/teachers', 
      icon: <UserOutlined />, 
      label: collapsed ? <Tooltip title="Teachers" placement="right"><Link to="/teachers">Teachers</Link></Tooltip> : <Link to="/teachers">Teachers</Link>
    },
    { 
      key: '/holidays', 
      icon: <CalendarOutlined />, 
      label: collapsed ? <Tooltip title="Holidays" placement="right"><Link to="/holidays">Holidays</Link></Tooltip> : <Link to="/holidays">Holidays</Link>
    },
    { 
      key: '/events', 
      icon: <BellOutlined />, 
      label: collapsed ? <Tooltip title="Events" placement="right"><Link to="/events">Events</Link></Tooltip> : <Link to="/events">Events</Link>
    },
  ]

  return (
    <Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed}
      className="shadow-lg bg-white"
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 10,
      }}
    >
      <div className="flex flex-col h-full">
        <motion.div 
          className="flex items-center justify-center h-16 border-b flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {!collapsed && <img src={logo} alt="Logo" className="h-8 w-auto" />}
          {collapsed && <img src={logo} alt="Logo" className="h-6 w-auto" />}
        </motion.div>

        <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className="border-none"
          />
        </div>
        
        <div className="p-4 border-t flex justify-center flex-shrink-0 bg-gray-50">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 w-full flex items-center justify-center"
            style={{ fontSize: '16px', height: '40px' }}
          />
        </div>
      </div>
    </Sider>
  )
}