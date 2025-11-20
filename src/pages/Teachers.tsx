// src/pages/Teachers.tsx
import { Button, Modal, Form, Input, Select, DatePicker, message, Card, Row, Col, Avatar, Tag, Tooltip, Empty } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, MailOutlined, PhoneOutlined, BookOutlined, UserOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useState } from 'react'
import dayjs from 'dayjs'

const { Option } = Select


interface Teacher {
  id: string
  name: string
  email: string
  subject: string
  department: string
  qualification: string
  phone: string
  dateOfJoining: string
  status: 'active' | 'inactive'
}

const mockTeachers: Teacher[] = [
  { id: '1', name: 'Mr. Robert Johnson', email: 'robert.j@school.com', subject: 'Mathematics', department: 'Science', qualification: 'M.Sc. Mathematics', phone: '+1 234 567 890', dateOfJoining: '2020-01-15', status: 'active' },
  { id: '2', name: 'Ms. Sarah Smith', email: 'sarah.s@school.com', subject: 'English Literature', department: 'Arts', qualification: 'M.A. English', phone: '+1 987 654 321', dateOfJoining: '2019-08-22', status: 'active' },
  { id: '3', name: 'Dr. Emily Davis', email: 'emily.d@school.com', subject: 'Physics', department: 'Science', qualification: 'Ph.D. Physics', phone: '+1 555 123 456', dateOfJoining: '2018-03-10', status: 'active' },
  { id: '4', name: 'Mr. Michael Wilson', email: 'michael.w@school.com', subject: 'History', department: 'Humanities', qualification: 'B.A. History', phone: '+1 444 789 012', dateOfJoining: '2021-06-01', status: 'inactive' },
]

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers)
  const [searchText, setSearchText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)
  const [form] = Form.useForm()

  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchText.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchText.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchText.toLowerCase())
  )

  const handleAdd = () => {
    setEditingTeacher(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher)
    form.setFieldsValue({
      ...teacher,
      dateOfJoining: dayjs(teacher.dateOfJoining)
    })
    setModalVisible(true)
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Delete Teacher',
      content: 'Are you sure you want to delete this teacher?',
      okText: 'Yes, Delete',
      okType: 'danger',
      onOk() {
        setTeachers(teachers.filter(t => t.id !== id))
        message.success('Teacher deleted successfully')
      },
    })
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const formattedValues = {
        ...values,
        dateOfJoining: values.dateOfJoining.format('YYYY-MM-DD')
      }

      if (editingTeacher) {
        setTeachers(teachers.map(t => t.id === editingTeacher.id ? { ...t, ...formattedValues } : t))
        message.success('Teacher updated successfully')
      } else {
        const newTeacher: Teacher = {
          id: String(teachers.length + 1),
          ...formattedValues,
          status: 'active'
        }
        setTeachers([...teachers, newTeacher])
        message.success('Teacher added successfully')
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
          <h1 className="text-3xl font-bold text-gray-800 m-0">Teachers</h1>
          <p className="text-gray-500 mt-1">Manage your teaching staff</p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          size="large"
          onClick={handleAdd}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Add Teacher
        </Button>
      </motion.div>

      <div className="mb-6">
        <Input 
          placeholder="Search teachers by name, subject, or department..." 
          prefix={<SearchOutlined className="text-gray-400" />}
          size="large"
          className="rounded-lg max-w-md"
          onChange={e => setSearchText(e.target.value)}
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {filteredTeachers.length > 0 ? (
          <Row gutter={[24, 24]}>
            {filteredTeachers.map((teacher, index) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={teacher.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    hoverable
                    className="rounded-xl overflow-hidden border-0 shadow-sm hover:shadow-md transition-all h-full"
                    actions={[
                      <Tooltip title="Edit"><EditOutlined key="edit" onClick={() => handleEdit(teacher)} className="text-indigo-600" /></Tooltip>,
                      <Tooltip title="Delete"><DeleteOutlined key="delete" onClick={() => handleDelete(teacher.id)} className="text-red-500" /></Tooltip>,
                    ]}
                  >
                    <div className="flex flex-col items-center mb-4">
                      <Avatar size={80} icon={<UserOutlined />} className="bg-indigo-100 text-indigo-600 mb-3" />
                      <h3 className="text-lg font-bold text-gray-800 m-0 text-center">{teacher.name}</h3>
                      <Tag color={teacher.status === 'active' ? 'success' : 'error'} className="mt-2 rounded-full">
                        {teacher.status.toUpperCase()}
                      </Tag>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <BookOutlined className="mr-2 text-indigo-400" />
                        <span className="font-medium">{teacher.subject}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MailOutlined className="mr-2 text-indigo-400" />
                        <span className="text-sm truncate">{teacher.email}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <PhoneOutlined className="mr-2 text-indigo-400" />
                        <span className="text-sm">{teacher.phone}</span>
                      </div>
                      <div className="pt-2 border-t border-gray-100 mt-2">
                        <div className="text-xs text-gray-400">Department</div>
                        <div className="text-sm font-medium text-gray-700">{teacher.department}</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description="No teachers found" />
        )}
      </motion.div>

      <Modal
        title={editingTeacher ? 'Edit Teacher' : 'Add Teacher'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        okText={editingTeacher ? 'Update' : 'Add'}
        width={700}
        className="rounded-xl"
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                <Input size="large" className="rounded-lg" prefix={<UserOutlined />} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input size="large" className="rounded-lg" />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
                <Input size="large" className="rounded-lg" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="department" label="Department" rules={[{ required: true }]}>
                <Select size="large">
                  <Option value="Science">Science</Option>
                  <Option value="Arts">Arts</Option>
                  <Option value="Commerce">Commerce</Option>
                  <Option value="Humanities">Humanities</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="qualification" label="Qualification" rules={[{ required: true }]}>
                <Input size="large" className="rounded-lg" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
                <Input size="large" className="rounded-lg" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="dateOfJoining" label="Date of Joining" rules={[{ required: true }]}>
                <DatePicker size="large" className="w-full rounded-lg" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="Status" initialValue="active">
                <Select size="large">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}