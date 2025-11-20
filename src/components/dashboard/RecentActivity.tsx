
import { Card, List, Avatar, Typography } from 'antd';
import { UserOutlined, BookOutlined, DollarOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const activities = [
  {
    title: 'New Student Registration',
    description: 'John Doe registered for Class X',
    time: '2 hours ago',
    icon: <UserOutlined />,
    color: '#1890ff',
    type: 'registration'
  },
  {
    title: 'Fees Payment',
    description: 'Sarah Smith paid tuition fees',
    time: '4 hours ago',
    icon: <DollarOutlined />,
    color: '#52c41a',
    type: 'payment'
  },
  {
    title: 'Library Book Returned',
    description: 'Physics Vol 1 returned by Mike',
    time: '1 day ago',
    icon: <BookOutlined />,
    color: '#faad14',
    type: 'library'
  },
  {
    title: 'New Assignment',
    description: 'Math assignment added for Class IX',
    time: '2 days ago',
    icon: <BookOutlined />,
    color: '#722ed1',
    type: 'academic'
  }
];

const RecentActivity = () => {
  return (
    <Card 
      title={<Title level={4} style={{ margin: 0 }}>Recent Activity</Title>} 
      className="h-full shadow-sm rounded-lg"
      bordered={false}
    >
      <List
        itemLayout="horizontal"
        dataSource={activities}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar 
                  icon={item.icon} 
                  style={{ backgroundColor: item.color }} 
                />
              }
              title={<Text strong>{item.title}</Text>}
              description={
                <div className="flex flex-col">
                  <Text type="secondary" className="text-xs">{item.description}</Text>
                  <Text type="secondary" className="text-xs mt-1">{item.time}</Text>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default RecentActivity;
