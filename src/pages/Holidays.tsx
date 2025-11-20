// src/pages/Holidays.tsx
import { Table, Button, Space, Tag, Modal, Form, DatePicker, Input, message, Select, Calendar, Badge, Card, Radio, Tooltip } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, CalendarOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import dayjs, { Dayjs } from 'dayjs'

interface Holiday {
  id: string
  name: string
  date: string
  type: 'National' | 'Religious' | 'School'
  description: string
}

const mockHolidays: Holiday[] = [
  { id: '1', name: 'New Year', date: '2025-01-01', type: 'National', description: 'New Year celebration' },
  { id: '2', name: 'Spring Festival', date: '2025-02-10', type: 'Religious', description: 'Chinese New Year' },
  { id: '3', name: 'Labor Day', date: '2025-05-01', type: 'National', description: 'International Workers Day' },
  { id: '4', name: 'School Foundation Day', date: '2025-06-15', type: 'School', description: 'Celebration of school founding' },
]

export default function Holidays() {
  const [holidays, setHolidays] = useState<Holiday[]>(mockHolidays)
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar')
  const [modalVisible, setModalVisible] = useState(false)
  const [editingHoliday, setEditingHoliday] = useState<Holiday | null>(null)
  const [form] = Form.useForm()

  const getListData = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD')
    return holidays.filter(h => h.date === dateStr)
  }

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value)
    return (
      <ul className="list-none p-0 m-0">
        {listData.map((item) => (
          <li key={item.id} className="mb-1">
            <Badge 
              status={item.type === 'National' ? 'success' : item.type === 'Religious' ? 'warning' : 'processing'} 
              text={<span className="text-xs">{item.name}</span>} 
            />
          </li>
        ))}
      </ul>
    )
  }

  const columns: ColumnsType<Holiday> = [
    { title: 'Name', dataIndex: 'name', key: 'name', render: (text) => <span className="font-medium">{text}</span> },
    { title: 'Date', dataIndex: 'date', key: 'date', sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix() },
    { title: 'Type', dataIndex: 'type', key: 'type', render: (type) => (
      <Tag color={type === 'National' ? 'blue' : type === 'Religious' ? 'orange' : 'cyan'}>
        {type}
      </Tag>
    )},
    { title: 'Description', dataIndex: 'description', key: 'description' },
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
    setEditingHoliday(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (holiday: Holiday) => {
    setEditingHoliday(holiday)
    form.setFieldsValue({
      ...holiday,
      date: dayjs(holiday.date)
    })
    setModalVisible(true)
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Delete Holiday',
      content: 'Are you sure you want to delete this holiday?',
      okText: 'Yes, Delete',
      okType: 'danger',
      onOk() {
        setHolidays(holidays.filter(h => h.id !== id))
        message.success('Holiday deleted successfully')
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
      
      if (editingHoliday) {
        setHolidays(holidays.map(h => h.id === editingHoliday.id ? { ...h, ...formattedValues } : h))
        message.success('Holiday updated successfully')
      } else {
        const newHoliday: Holiday = {
          id: String(holidays.length + 1),
          ...formattedValues
        }
        setHolidays([...holidays, newHoliday])
        message.success('Holiday added successfully')
      }
      setModalVisible(false)
      form.resetFields()
    } catch {
      message.error('Please fill all required fields')
    }
  }

  return (
    <div>
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 m-0">Holidays</h1>
          <p className="text-gray-500 mt-1">Manage school holidays and events</p>
        </div>
        <Space>
          <Radio.Group value={viewMode} onChange={e => setViewMode(e.target.value)} buttonStyle="solid">
            <Radio.Button value="calendar"><CalendarOutlined /> Calendar</Radio.Button>
            <Radio.Button value="list"><UnorderedListOutlined /> List</Radio.Button>
          </Radio.Group>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            size="large"
            onClick={handleAdd}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Add Holiday
          </Button>
        </Space>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {viewMode === 'calendar' ? (
          <Card className="shadow-sm rounded-xl border-0">
            <Calendar dateCellRender={dateCellRender} />
          </Card>
        ) : (
          <Table 
            columns={columns} 
            dataSource={holidays} 
            className="shadow-sm rounded-xl overflow-hidden bg-white"
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
          />
        )}
      </motion.div>

      <Modal
        title={editingHoliday ? 'Edit Holiday' : 'Add Holiday'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        okText={editingHoliday ? 'Update' : 'Add'}
        className="rounded-xl"
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item name="name" label="Holiday Name" rules={[{ required: true }]}>
            <Input size="large" className="rounded-lg" />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker size="large" className="w-full rounded-lg" />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select size="large" options={[
              { value: 'National', label: 'National' },
              { value: 'Religious', label: 'Religious' },
              { value: 'School', label: 'School' },
            ]} />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea size="large" rows={3} className="rounded-lg" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}