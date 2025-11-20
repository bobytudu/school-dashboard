import { Layout } from 'antd'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { useSidenavCollapseStore } from '../hooks/useSidenavCollapseStore'
import type { ReactNode } from 'react'

const { Content } = Layout

interface AppLayoutProps {
  children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { collapsed, setCollapsed } = useSidenavCollapseStore()

  return (
    <Layout className="min-h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout className="transition-all duration-300" style={{ marginLeft: collapsed ? 80 : 250 }}>
        <Topbar />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Content className="m-6 p-6 bg-white rounded-xl shadow-sm">
            {children}
          </Content>
        </motion.div>
      </Layout>
    </Layout>
  )
}

export default AppLayout