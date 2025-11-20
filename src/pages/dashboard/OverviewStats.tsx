import { Row, Col } from 'antd'
import { 
  UserGroupIcon, 
  AcademicCapIcon, 
  CalendarIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline'
import StatCard from '../../components/common/StatCard'

const OverviewStats = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,247',
      change: '+12.5%',
      icon: UserGroupIcon,
      color: '#3b82f6',
    },
    {
      title: 'Total Teachers',
      value: '89',
      change: '+3.2%',
      icon: AcademicCapIcon,
      color: '#8b5cf6',
    },
    {
      title: 'Upcoming Events',
      value: '5',
      change: '2 Today',
      icon: CalendarIcon,
      color: '#10b981',
    },
    {
      title: 'Monthly Revenue',
      value: '$45,231',
      change: '+23.1%',
      icon: CurrencyDollarIcon,
      color: '#f59e0b',
    },
  ]

  return (
    <Row gutter={[16, 16]} className="mb-6">
      {stats.map((stat, index) => (
        <Col xs={24} sm={12} lg={6} key={index}>
          <StatCard {...stat} index={index} />
        </Col>
      ))}
    </Row>
  )
}

export default OverviewStats