import { Table, Button, Space, Tag, Modal, Form, Input, DatePicker, message, Card, Row, Col, Tooltip, Select } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, ClockCircleOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

const { Option } = Select

interface Event {
  id: string
  name: string
  date: string
  time: string
  location: string
  description: string
  status: 'upcoming' | 'ongoing' | 'completed'
}

const mockEvents: Event[] = [
  { id: '1', name: 'Annual Day', date: '2025-03-15', time: '10:00 AM', location: 'Main Auditorium', description: 'Annual day celebration with cultural programs', status: 'upcoming' },
  { id: '2', name: 'Science Fair', date: '2025-02-20', time: '09:00 AM', location: 'Science Lab', description: 'Inter-school science fair and exhibition', status: 'upcoming' },
  { id: '3', name: 'Sports Meet', date: '2025-01-10', time: '08:00 AM', location: 'School Ground', description: 'Annual sports meet for all grades', status: 'completed' },
]

export default function Events() {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [form] = Form.useForm()

  const columns: ColumnsType<Event> = [
    { title: 'Name', dataIndex: 'name', key: 'name', render: (text) => <span className="font-medium">{text}</span> },
    { title: 'Date', dataIndex: 'date', key: 'date', sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix() },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => (
      <Tag color={status === 'upcoming' ? 'blue' : status === 'ongoing' ? 'orange' : 'green'} className="rounded-full">
        {status.toUpperCase()}
      </Tag>
    )},
    { title: 'Actions', key: 'actions', render: (_, record) => (
      <Space>
        <Tooltip title="Edit">
          <Button 
            type="text" 
            icon={<EditOutlined className="text-blue-500" />} 
            onClick={() => handleEdit(record)}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
          />
        </Tooltip>
      </Space>
    )},
  ]

  const handleAdd = () => {
    setEditingEvent(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    form.setFieldsValue({
      ...event,
      date: dayjs(event.date)
    })
    setModalVisible(true)
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Delete Event',
      content: 'Are you sure you want to delete this event?',
      okText: 'Yes, Delete',
      okType: 'danger',
      onOk() {
        setEvents(events.filter(e => e.id !== id))
        message.success('Event deleted successfully')
      },
    })
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const formattedValues = {
        ...values,
        date: values.date.format('YYYY-MM-DD')
      }
      
      if (editingEvent) {
        setEvents(events.map(e => e.id === editingEvent.id ? { ...e, ...formattedValues } : e))
        message.success('Event updated successfully')
      } else {
        const newEvent: Event = {
          id: String(events.length + 1),
          ...formattedValues,
          status: 'upcoming'
        }
        setEvents([...events, newEvent])
        message.success('Event added successfully')
      }
      setModalVisible(false)
      form.resetFields()
    } catch {
      message.error('Please fill all required fields')
    }
  }

  // Sort events: Upcoming first, then by date
  const sortedEvents = [...events].sort((a, b) => {
    if (a.status === 'upcoming' && b.status !== 'upcoming') return -1
    if (a.status !== 'upcoming' && b.status === 'upcoming') return 1
    return dayjs(a.date).unix() - dayjs(b.date).unix()
  })

  return (
    <div>
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 m-0">Events</h1>
          <p className="text-gray-500 mt-1">Schedule and manage school events</p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          size="large"
          onClick={handleAdd}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Add Event
        </Button>
      </motion.div>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card title="All Events" className="shadow-sm rounded-xl border-0">
              <Table 
                columns={columns} 
                dataSource={events} 
                pagination={{ pageSize: 8 }}
                scroll={{ x: true }}
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} lg={8}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {sortedEvents.filter(e => e.status === 'upcoming').slice(0, 3).map((event) => (
                <Card key={event.id} className="shadow-sm rounded-xl border-0 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-lg text-gray-800">{event.name}</div>
                      <div className="flex items-center text-gray-500 mt-1 text-sm">
                        <CalendarOutlined className="mr-2" />
                        {dayjs(event.date).format('MMMM D, YYYY')}
                      </div>
                      <div className="flex items-center text-gray-500 mt-1 text-sm">
                        <ClockCircleOutlined className="mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-gray-500 mt-1 text-sm">
                        <EnvironmentOutlined className="mr-2" />
                        {event.location}
                      </div>
                    </div>
                    <div className="flex flex-col items-center bg-indigo-50 p-2 rounded-lg min-w-[60px]">
                      <span className="text-indigo-600 font-bold text-xl">{dayjs(event.date).format('D')}</span>
                      <span className="text-indigo-400 text-xs uppercase">{dayjs(event.date).format('MMM')}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-gray-600 text-sm m-0">{event.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </Col>
      </Row>

      <Modal
        title={editingEvent ? 'Edit Event' : 'Add Event'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        okText={editingEvent ? 'Update' : 'Add'}
        className="rounded-xl"
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item name="name" label="Event Name" rules={[{ required: true }]}>
            <Input size="large" className="rounded-lg" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                <DatePicker size="large" className="w-full rounded-lg" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="time" label="Time" rules={[{ required: true }]}>
                <Input size="large" className="rounded-lg" placeholder="e.g. 10:00 AM" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="location" label="Location" rules={[{ required: true }]}>
            <Input size="large" className="rounded-lg" prefix={<EnvironmentOutlined />} />
          </Form.Item>
          <Form.Item name="status" label="Status" initialValue="upcoming">
            <Select size="large">
              <Option value="upcoming">Upcoming</Option>
              <Option value="ongoing">Ongoing</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea size="large" rows={3} className="rounded-lg" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}