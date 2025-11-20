import { BellOutlined } from '@ant-design/icons'
import { Badge, Popover, List, Button } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const NotificationBell = () => {
  const [count, setCount] = useState(3)

  const notifications = [
    {
      id: 1,
      title: 'New Student Registration',
      description: 'Sarah Johnson registered for Grade 10',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: 2,
      title: 'Fee Payment Reminder',
      description: '5 students have pending fees',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      title: 'Upcoming Event',
      description: 'Annual Sports Day is scheduled tomorrow',
      time: '3 hours ago',
      read: true,
    },
  ]

  const notificationContent = (
    <div className="w-80 max-h-96 overflow-auto">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-lg">Notifications</h3>
        <Button type="link" size="small">Mark all read</Button>
      </div>
      <List
        dataSource={notifications}
        renderItem={item => (
          <List.Item className={`${!item.read ? 'bg-blue-50' : ''} hover:bg-gray-50 cursor-pointer`}>
            <List.Item.Meta
              title={<div className="font-medium">{item.title}</div>}
              description={
                <div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.time}</div>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <div className="p-2 border-t text-center">
        <Button type="link">View all notifications</Button>
      </div>
    </div>
  )

  return (
    <Popover content={notificationContent} placement="bottomRight" trigger="click">
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Badge count={count} size="small" offset={[-5, 5]}>
          <BellOutlined className="text-xl text-gray-600" />
        </Badge>
      </motion.div>
    </Popover>
  )
}

export default NotificationBell