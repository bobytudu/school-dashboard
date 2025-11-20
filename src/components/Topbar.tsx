// src/components/Layout/TopBar.tsx
import { Layout, Input, Badge, Avatar, Dropdown, Space, notification } from 'antd'
import { 
  SearchOutlined, 
  BellOutlined, 
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'

const { Header } = Layout

export default function TopBar() {
  const handleLogout = () => {
    notification.success({
      message: 'Logged out successfully',
      description: 'You have been logged out of the system',
    })
  }

  const menuItems = [
    { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
    { type: 'divider' as const },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', danger: true, onClick: handleLogout },
  ]

  return (
    <Header 
      className="bg-white shadow-sm sticky top-0 z-10" 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '0 12px',
        height: '64px'
      }}
    >
      <div className="flex items-center flex-1 mr-2 sm:mr-4" style={{ maxWidth: '500px' }}>
        <Input 
          size="large"
          placeholder="Search..." 
          prefix={<SearchOutlined className="text-gray-400" />}
          className="rounded-full"
          style={{ width: '100%' }}
        />
      </div>
      <Space size="small" className="flex-shrink-0" style={{ marginLeft: 'auto' }}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Badge count={5} size="small">
            <BellOutlined className="text-lg sm:text-xl cursor-pointer hover:text-indigo-600 transition-colors" />
          </Badge>
        </motion.div>
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Avatar 
              size={40}
              icon={<UserOutlined />}
              className="cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all"
            />
          </motion.div>
        </Dropdown>
      </Space>
    </Header>
  )
}