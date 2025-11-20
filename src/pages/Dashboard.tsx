// src/pages/Dashboard.tsx
import { Row, Col, Card } from 'antd'
import { 
  UserOutlined, 
  TeamOutlined, 
  CalendarOutlined, 
  BellOutlined 
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import StatsCard from '../components/StatsCard'
import RecentActivity from '../components/dashboard/RecentActivity'
import QuickActions from '../components/dashboard/QuickActions'

const stats = [
  { title: 'Total Students', value: 1250, change: 12, icon: <TeamOutlined />, color: '#6366f1' },
  { title: 'Total Teachers', value: 85, change: -2, icon: <UserOutlined />, color: '#10b981' },
  { title: 'Upcoming Events', value: 12, change: 5, icon: <BellOutlined />, color: '#f59e0b' },
  { title: 'Holidays', value: 3, change: 0, icon: <CalendarOutlined />, color: '#ec4899' },
]

const attendanceData = [
  { month: 'Jan', attendance: 92 },
  { month: 'Feb', attendance: 95 },
  { month: 'Mar', attendance: 89 },
  { month: 'Apr', attendance: 94 },
  { month: 'May', attendance: 96 },
  { month: 'Jun', attendance: 93 },
]

const gradeData = [
  { grade: 'A+', count: 150 },
  { grade: 'A', count: 280 },
  { grade: 'B+', count: 320 },
  { grade: 'B', count: 250 },
  { grade: 'C', count: 150 },
]

export default function Dashboard() {
  return (
    <div>
      <motion.h1 
        className="text-3xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Dashboard
      </motion.h1>
      
      <Row gutter={[24, 24]} className="mb-6">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <StatsCard 
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              color={stat.color}
              delay={index * 0.1}
            />
          </Col>
        ))}
      </Row>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <Card title="Monthly Attendance" className="rounded-lg shadow-sm" bordered={false}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="#6366f1" 
                    fill="#6366f1" 
                    fillOpacity={0.1}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card title="Grade Distribution" className="rounded-lg shadow-sm" bordered={false}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gradeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="grade" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    cursor={{ fill: 'transparent' }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#6366f1" 
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Col>
        
        <Col xs={24} lg={8}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <QuickActions />
            <RecentActivity />
          </motion.div>
        </Col>
      </Row>
    </div>
  )
}