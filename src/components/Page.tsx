import React from 'react';
import { Typography } from 'antd';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const { Title, Text } = Typography;

const PageContainer = styled(motion.div)`
  width: 100%;
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
`;

const PageContent = styled(motion.div)`
  animation: fadeIn 0.5s ease-out;
`;

interface PageProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, subtitle, children, extra }) => {
  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader>
        <Title level={2} style={{ margin: 0 }}>
          {title}
        </Title>
        {subtitle && (
          <Text type="secondary" style={{ fontSize: '14px' }}>
            {subtitle}
          </Text>
        )}
      </PageHeader>
      <PageContent>{children}</PageContent>
    </PageContainer>
  );
};

export default Page;