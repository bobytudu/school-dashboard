// src/App.tsx
import { Layout, theme } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Holidays from "./pages/Holidays";
import Events from "./pages/Events";
import { useSidenavCollapseStore } from "./hooks/useSidenavCollapseStore";

import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";

const { Content } = Layout;

function App() {
  const { token } = theme.useToken();
  const { collapsed, setCollapsed } = useSidenavCollapseStore();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#6366f1",
          borderRadius: 8,
        },
      }}
    >
      <BrowserRouter>
        <Layout className="min-h-screen">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          <Layout className="transition-all duration-300" style={{ marginLeft: collapsed ? 80 : 200 }}>
            <TopBar />
            <Content
              className="p-6 overflow-auto"
              style={{ background: token.colorBgContainer }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/teachers" element={<Teachers />} />
                    <Route path="/holidays" element={<Holidays />} />
                    <Route path="/events" element={<Events />} />
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
