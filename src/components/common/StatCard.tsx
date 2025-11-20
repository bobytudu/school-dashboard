import { motion } from 'framer-motion'
import { Card } from 'antd'

const StatCard = ({ title, value, change, icon: Icon, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
            <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
              {change}
            </p>
          </div>
          <div 
            className="p-3 rounded-full"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default StatCard