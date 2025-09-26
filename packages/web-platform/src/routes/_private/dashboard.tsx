import {
  Users,
  FolderOpen,
  TrendUp,
  Calendar,
  ArrowRight,
  Pulse,
  FileText,
  Gear,
} from '@phosphor-icons/react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  Col,
  Row,
  Statistic,
  Typography,
  Space,
  Button,
  Avatar,
  Badge,
} from 'antd';

import { useAuth } from '~/auth/hooks/useAuth';

const { Title, Text } = Typography;

export const Route = createFileRoute('/_private/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Users',
      value: 1234,
      icon: <Users size={24} className="text-status-blue" />,
      prefix: <TrendUp size={16} className="text-success" />,
      suffix: '%',
      precision: 1,
      valueStyle: { color: 'rgb(var(--color-success))' },
    },
    {
      title: 'Active Projects',
      value: 28,
      icon: <FolderOpen size={24} className="text-status-purple" />,
    },
    {
      title: 'Monthly Growth',
      value: 12.8,
      icon: <TrendUp size={24} className="text-success" />,
      suffix: '%',
    },
    {
      title: 'This Month',
      value: 156,
      icon: <Calendar size={24} className="text-status-orange" />,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'New user registered',
      description: 'John Doe joined the platform',
      time: '2 minutes ago',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    },
    {
      id: 2,
      title: 'Project updated',
      description: 'OCR Web Platform v2.0 released',
      time: '15 minutes ago',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=project',
    },
    {
      id: 3,
      title: 'New document processed',
      description: 'Invoice #1234 successfully processed',
      time: '1 hour ago',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=document',
    },
  ];

  const quickActions = [
    {
      title: 'Process Document',
      description: 'Upload and process new documents',
      icon: <FileText size={20} />,
      color: 'rgb(var(--color-status-blue))',
    },
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: <Users size={20} />,
      color: 'rgb(var(--color-success))',
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: <Gear size={20} />,
      color: 'rgb(var(--color-status-orange))',
    },
  ];

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <Title level={2} className="mb-2">
              Welcome back, {user?.name}! 👋
            </Title>
            <Text type="secondary" className="text-lg">
              Here&apos;s what&apos;s happening with your platform today.
            </Text>
          </div>
          <Badge dot>
            <Avatar size={64} src={user?.pictureUrl} />
          </Badge>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="mb-8">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    precision={stat.precision}
                    valueStyle={stat.valueStyle}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <div>{stat.icon}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* Quick Actions */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <div className="flex items-center gap-2">
                <Pulse size={20} />
                Quick Actions
              </div>
            }
            className="h-full"
          >
            <Space direction="vertical" size="middle" className="w-full">
              {quickActions.map((action, index) => (
                <Card
                  key={index}
                  size="small"
                  hoverable
                  className="cursor-pointer"
                  bodyStyle={{ padding: '16px' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: `${action.color}20`,
                          color: action.color,
                        }}
                      >
                        {action.icon}
                      </div>
                      <div>
                        <div className="font-medium">{action.title}</div>
                        <Text type="secondary" className="text-sm">
                          {action.description}
                        </Text>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-gray-2" />
                  </div>
                </Card>
              ))}
            </Space>
          </Card>
        </Col>

        {/* Recent Activities */}
        <Col xs={24} lg={16}>
          <Card
            title={
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendUp size={20} />
                  Recent Activities
                </div>
                <Button type="link" size="small">
                  View All <ArrowRight size={14} />
                </Button>
              </div>
            }
            className="h-full"
          >
            <Space direction="vertical" size="large" className="w-full">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-center gap-4">
                  <Avatar src={activity.avatar} size={40} />
                  <div className="flex-1">
                    <div className="font-medium text-base">
                      {activity.title}
                    </div>
                    <Text type="secondary">{activity.description}</Text>
                  </div>
                  <Text type="secondary" className="text-sm">
                    {activity.time}
                  </Text>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
