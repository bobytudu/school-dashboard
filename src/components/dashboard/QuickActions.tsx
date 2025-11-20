
import { Card, Button, Row, Col, Typography } from 'antd';
import { UserAddOutlined, CalendarOutlined, DollarOutlined, MailOutlined } from '@ant-design/icons';

const { Title } = Typography;

const actions = [
  { label: 'Add Student', icon: <UserAddOutlined />, color: '#1890ff' },
  { label: 'Create Event', icon: <CalendarOutlined />, color: '#722ed1' },
  { label: 'Collect Fees', icon: <DollarOutlined />, color: '#52c41a' },
  { label: 'Send Email', icon: <MailOutlined />, color: '#faad14' },
];

const QuickActions = () => {
  return (
    <Card 
      title={<Title level={4} style={{ margin: 0 }}>Quick Actions</Title>} 
      className="shadow-sm rounded-lg mb-6"
      bordered={false}
    >
      <Row gutter={[16, 16]}>
        {actions.map((action, index) => (
          <Col span={12} key={index}>
            <Button 
              block 
              size="large"
              icon={action.icon}
              className="flex flex-col items-center justify-center h-24"
              style={{ 
                borderColor: action.color, 
                color: action.color,
              }}
            >
              <span className="mt-2">{action.label}</span>
            </Button>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default QuickActions;
