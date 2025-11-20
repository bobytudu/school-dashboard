import React from 'react';
import { Card, Space, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const { Text } = Typography;

const StyledCard = styled(motion(Card))`
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;

  .ant-card-body {
    padding: 24px;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const IconContainer = styled.div<{ color: string }>`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  transition: all 0.3s ease;
`;

const ValueText = styled(Text)`
  font-size: 32px;
  font-weight: 700;
  color: #1a2b4c;
  display: block;
  margin: 8px 0;
`;

const ChangeText = styled(Text)<{ positive: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => (props.positive ? '#52c41a' : '#ff4d4f')};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TitleText = styled(Text)`
  font-size: 14px;
  color: #8c8c8c;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  color,
  delay = 0,
}) => {
  const isPositive = change >= 0;

  return (
    <StyledCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Space align="start" style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space direction="vertical" size="small">
            <TitleText>{title}</TitleText>
            <ValueText>{value}</ValueText>
            <ChangeText positive={isPositive}>
              {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              {Math.abs(change)}% from last month
            </ChangeText>
          </Space>
          <IconContainer color={color}>{icon}</IconContainer>
        </Space>
      </Space>
    </StyledCard>
  );
};

export default StatsCard;