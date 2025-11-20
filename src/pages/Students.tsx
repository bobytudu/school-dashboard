// src/pages/Students.tsx
import { 
  Table, Button, Space, Tag, Modal, Form, Input, DatePicker, Select, 
  message, Avatar, Card, Row, Col, Tooltip, Steps, Upload, Divider,
  Radio
} from 'antd'
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, UserOutlined, 
  FilterOutlined, MailOutlined, PhoneOutlined,
  IdcardOutlined, TeamOutlined, CameraOutlined, EnvironmentOutlined,
  HeartOutlined, BookOutlined, SafetyOutlined, LeftOutlined, RightOutlined
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import type { UploadFile } from 'antd/es/upload/interface'
import dayjs from 'dayjs'

const { Option } = Select
const { TextArea } = Input

interface Student {
  id: string
  name: string
  email: string
  grade: string
  class: string
  dateOfBirth: string
  parentName: string
  contact: string
  status: 'active' | 'inactive'
  // Extended fields
  rollNumber?: string
  gender?: string
  bloodGroup?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  emergencyContact?: string
  emergencyContactName?: string
  emergencyRelation?: string
  admissionDate?: string
  previousSchool?: string
  medicalConditions?: string
  allergies?: string
  photoUrl?: string
  parentEmail?: string
  parentOccupation?: string
  nationality?: string
  religion?: string
}

const mockStudents: Student[] = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john@example.com', 
    grade: 'Grade 10', 
    class: 'A', 
    dateOfBirth: '2008-05-15', 
    parentName: 'Robert Doe', 
    contact: '+1 234 567 890', 
    status: 'active',
    rollNumber: '2024001',
    gender: 'male',
    bloodGroup: 'O+'
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    grade: 'Grade 11', 
    class: 'B', 
    dateOfBirth: '2007-08-22', 
    parentName: 'Maria Smith', 
    contact: '+1 987 654 321', 
    status: 'active',
    rollNumber: '2024002',
    gender: 'female',
    bloodGroup: 'A+'
  },
  { 
    id: '3', 
    name: 'Alice Johnson', 
    email: 'alice@example.com', 
    grade: 'Grade 9', 
    class: 'C', 
    dateOfBirth: '2009-02-10', 
    parentName: 'David Johnson', 
    contact: '+1 555 123 456', 
    status: 'inactive',
    rollNumber: '2024003',
    gender: 'female',
    bloodGroup: 'B+'
  },
  { 
    id: '4', 
    name: 'Bob Brown', 
    email: 'bob@example.com', 
    grade: 'Grade 10', 
    class: 'A', 
    dateOfBirth: '2008-11-30', 
    parentName: 'Sarah Brown', 
    contact: '+1 444 789 012', 
    status: 'active',
    rollNumber: '2024004',
    gender: 'male',
    bloodGroup: 'AB+'
  },
]

export default function Students() {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [searchText, setSearchText] = useState('')
  const [filterGrade, setFilterGrade] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [form] = Form.useForm()

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchText.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchText.toLowerCase()) ||
                          (student.rollNumber && student.rollNumber.toLowerCase().includes(searchText.toLowerCase()))
    const matchesGrade = filterGrade ? student.grade === filterGrade : true
    return matchesSearch && matchesGrade
  })

  const columns: ColumnsType<Student> = [
    { 
      title: 'Student', 
      key: 'student',
      render: (_, record) => (
        <Space>
          <Avatar 
            src={record.photoUrl}
            icon={!record.photoUrl && <UserOutlined />} 
            style={{ backgroundColor: '#6366f1' }} 
          />
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-xs text-gray-500">{record.email}</div>
          </div>
        </Space>
      )
    },
    { 
      title: 'Roll No.', 
      dataIndex: 'rollNumber', 
      key: 'rollNumber',
      sorter: (a, b) => (a.rollNumber || '').localeCompare(b.rollNumber || '')
    },
    { title: 'Grade', dataIndex: 'grade', key: 'grade', sorter: (a, b) => a.grade.localeCompare(b.grade) },
    { title: 'Class', dataIndex: 'class', key: 'class' },
    { title: 'Parent', dataIndex: 'parentName', key: 'parentName' },
    { title: 'Contact', dataIndex: 'contact', key: 'contact' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status', 
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'error'} className="rounded-full px-3">
          {status.toUpperCase()}
        </Tag>
      )
    },
    { 
      title: 'Actions', 
      key: 'actions', 
      render: (_, record) => (
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
      )
    },
  ]

  const handleAdd = () => {
    setEditingStudent(null)
    form.resetFields()
    setFileList([])
    setCurrentStep(0)
    setModalVisible(true)
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
    const formValues = {
      ...student,
      dateOfBirth: student.dateOfBirth ? dayjs(student.dateOfBirth) : undefined,
      admissionDate: student.admissionDate ? dayjs(student.admissionDate) : undefined
    }
    form.setFieldsValue(formValues)
    setCurrentStep(0)
    setModalVisible(true)
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Delete Student',
      content: 'Are you sure you want to delete this student? This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      onOk() {
        setStudents(students.filter(s => s.id !== id))
        message.success('Student deleted successfully')
      },
    })
  }

  const validateCurrentStep = async () => {
    const stepFields = [
      ['name', 'email', 'gender', 'dateOfBirth', 'bloodGroup', 'nationality'],
      ['rollNumber', 'grade', 'class', 'admissionDate'],
      ['contact', 'parentName', 'parentEmail', 'address', 'city', 'state', 'zipCode'],
      ['emergencyContactName', 'emergencyContact', 'emergencyRelation', 'medicalConditions', 'allergies']
    ]

    try {
      await form.validateFields(stepFields[currentStep])
      return true
    } catch (error) {
      message.error('Please fill all required fields correctly')
      return false
    }
  }

  const handleNext = async () => {
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      const formattedValues = {
        ...values,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : undefined,
        admissionDate: values.admissionDate ? values.admissionDate.format('YYYY-MM-DD') : undefined,
        photoUrl: fileList.length > 0 ? URL.createObjectURL(fileList[0].originFileObj as Blob) : undefined
      }

      if (editingStudent) {
        setStudents(students.map(s => s.id === editingStudent.id ? { ...s, ...formattedValues } : s))
        message.success('Student updated successfully')
      } else {
        const newStudent: Student = {
          id: String(Date.now()),
          ...formattedValues,
          status: values.status || 'active'
        }
        setStudents([...students, newStudent])
        message.success('Student added successfully')
      }
      setModalVisible(false)
      form.resetFields()
      setFileList([])
      setCurrentStep(0)
    } catch (error) {
      message.error('Please fill all required fields correctly')
    }
  }

  const steps = [
    { title: 'Personal Info', icon: <UserOutlined /> },
    { title: 'Academic Info', icon: <BookOutlined /> },
    { title: 'Contact Info', icon: <PhoneOutlined /> },
    { title: 'Additional Info', icon: <SafetyOutlined /> }
  ]

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <div className="text-center mb-6">
              <Form.Item name="photo" className="mb-0">
                <Upload
                  listType="picture-circle"
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                  beforeUpload={() => false}
                  maxCount={1}
                  className="avatar-uploader"
                >
                  {fileList.length === 0 && (
                    <div>
                      <CameraOutlined style={{ fontSize: 24 }} />
                      <div style={{ marginTop: 8 }}>Upload Photo</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </div>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item 
                  name="name" 
                  label="Full Name" 
                  rules={[
                    { required: true, message: 'Please enter student name' },
                    { min: 3, message: 'Name must be at least 3 characters' }
                  ]}
                >
                  <Input 
                    size="large" 
                    className="rounded-lg" 
                    prefix={<UserOutlined />}
                    placeholder="Enter full name"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  name="email" 
                  label="Email Address" 
                  rules={[
                    { required: true, message: 'Please enter email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input 
                    size="large" 
                    className="rounded-lg"
                    prefix={<MailOutlined />}
                    placeholder="student@example.com"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item 
                  name="gender" 
                  label="Gender" 
                  rules={[{ required: true, message: 'Please select gender' }]}
                >
                  <Radio.Group size="large" className="w-full">
                    <Radio.Button value="male" className="w-1/3 text-center">Male</Radio.Button>
                    <Radio.Button value="female" className="w-1/3 text-center">Female</Radio.Button>
                    <Radio.Button value="other" className="w-1/3 text-center">Other</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  name="dateOfBirth" 
                  label="Date of Birth" 
                  rules={[
                    { required: true, message: 'Please select date of birth' },
                    {
                      validator: (_, value) => {
                        if (!value) return Promise.resolve()
                        const age = dayjs().diff(value, 'year')
                        if (age < 5 || age > 25) {
                          return Promise.reject('Age must be between 5 and 25 years')
                        }
                        return Promise.resolve()
                      }
                    }
                  ]}
                >
                  <DatePicker 
                    size="large" 
                    className="w-full rounded-lg"
                    placeholder="Select date"
                    disabledDate={(current) => current && current > dayjs().endOf('day')}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item 
                  name="bloodGroup" 
                  label="Blood Group" 
                  rules={[{ required: true, message: 'Please select blood group' }]}
                >
                  <Select size="large" placeholder="Select blood group" suffixIcon={<HeartOutlined />}>
                    <Option value="A+">A+</Option>
                    <Option value="A-">A-</Option>
                    <Option value="B+">B+</Option>
                    <Option value="B-">B-</Option>
                    <Option value="AB+">AB+</Option>
                    <Option value="AB-">AB-</Option>
                    <Option value="O+">O+</Option>
                    <Option value="O-">O-</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  name="nationality" 
                  label="Nationality" 
                  rules={[{ required: true, message: 'Please enter nationality' }]}
                >
                  <Input 
                    size="large" 
                    className="rounded-lg"
                    placeholder="e.g., Indian, American"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="religion" label="Religion">
                  <Input 
                    size="large" 
                    className="rounded-lg"
                    placeholder="Optional"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        )

      case 1:
        return (
          <div>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  name="rollNumber" 
                  label="Roll Number" 
                  rules={[
                    { required: true, message: 'Please enter roll number' },
                    { 
                      pattern: /^[A-Z0-9]+$/i, 
                      message: 'Roll number should contain only letters and numbers' 
                    }
                  ]}
                >
                  <Input 
                    size="large" 
                    className="rounded-lg"
                    prefix={<IdcardOutlined />}
                    placeholder="e.g., 2024001"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item 
                  name="admissionDate" 
                  label="Admission Date" 
                  rules={[{ required: true, message: 'Please select admission date' }]}
                >
                  <DatePicker 
                    size="large" 
                    className="w-full rounded-lg"
                    placeholder="Select date"
                    disabledDate={(current) => current && current > dayjs().endOf('day')}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  name="grade" 
                  label="Grade" 
                  rules={[{ required: true, message: 'Please select grade' }]}
                >
                  <Select size="large" placeholder="Select grade" suffixIcon={<BookOutlined />}>
                    <Option value="Grade 1">Grade 1</Option>
                    <Option value="Grade 2">Grade 2</Option>
                    <Option value="Grade 3">Grade 3</Option>
                    <Option value="Grade 4">Grade 4</Option>
                    <Option value="Grade 5">Grade 5</Option>
                    <Option value="Grade 6">Grade 6</Option>
                    <Option value="Grade 7">Grade 7</Option>
                    <Option value="Grade 8">Grade 8</Option>
                    <Option value="Grade 9">Grade 9</Option>
                    <Option value="Grade 10">Grade 10</Option>
                    <Option value="Grade 11">Grade 11</Option>
                    <Option value="Grade 12">Grade 12</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item 
                  name="class" 
                  label="Class/Section" 
                  rules={[{ required: true, message: 'Please enter class/section' }]}
                >
                  <Select size="large" placeholder="Select section">
                    <Option value="A">Section A</Option>
                    <Option value="B">Section B</Option>
                    <Option value="C">Section C</Option>
                    <Option value="D">Section D</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="previousSchool" label="Previous School">
                  <Input 
                    size="large" 
                    className="rounded-lg"
                    placeholder="Name of previous school (if any)"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item 
                  name="status" 
                  label="Status" 
                  initialValue="active"
                  rules={[{ required: true }]}
                >
                  <Radio.Group size="large">
                    <Radio.Button value="active">Active</Radio.Button>
                    <Radio.Button value="inactive">Inactive</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </div>
        )

      case 2:
        return (
          <div>
            <Divider orientation="left" className="text-gray-600">Parent/Guardian Information</Divider>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  name="parentName" 
                  label="Parent/Guardian Name" 
                  rules={[{ required: true, message: 'Please enter parent name' }]}
                >
                  <Input 
                    size="large" 
                    className="rounded-lg"
                    prefix={<TeamOutlined />}
                    placeholder="Full name"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item 
                  name="parentEmail" 
                  label="Parent Email" 
                  rules={[
                    { required: true, message: 'Please enter parent email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input 
                    size="large" 
                    className="rounded-lg"
                    prefix={<MailOutlined />}
                    placeholder="parent@example.com"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  name="contact" 
                  label="Contact Number" 
                  rules={[
                    { required: true, message: 'Please enter contact number' },
                    { 
                      pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 
                      message: 'Please enter a valid phone number' 
                    }
                  ]}
                >
                  <Input 
                    size="large" 
                    className="rounded-lg"
                    prefix={<PhoneOutlined />}
                    placeholder="+1 234 567 890"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="parentOccupation" label="Parent Occupation">
                  <Input 
                    size="large" 
                    className="rounded-lg"
                    placeholder="Occupation"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Divider orientation="left" className="text-gray-600">Address Information</Divider>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item 
                  name="address" 
                  label="Street Address" 
                  rules={[{ required: true, message: 'Please enter address' }]}
                >
                  <TextArea 
                    size="large" 
                    className="rounded-lg"
                    placeholder="House/Flat number, Street name"
                    rows={2}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item 
                  name="city" 
                  label="City" 
                  rules={[{ required: true, message: 'Please enter city' }]}
                >
                  <Input 
                    size="large" 
                    className="rounded-lg"
                    prefix={<EnvironmentOutlined />}
                    placeholder="City"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item 
                  name="state" 
                  label="State/Province" 
                  rules={[{ required: true, message: 'Please enter state' }]}
                >
                  <Input 
                    size="large" 
                    className="rounded-lg"
                    placeholder="State"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item 
                  name="zipCode" 
                  label="ZIP/Postal Code" 
                  rules={[
                    { required: true, message: 'Please enter ZIP code' },
                    { pattern: /^[0-9]{5,6}$/, message: 'Please enter a valid ZIP code' }
                  ]}
                >
                  <Input 
                    size="large" 
                    className="rounded-lg"
                    placeholder="ZIP"
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        )

      case 3:
        return (
          <div>
            <Divider orientation="left" className="text-gray-600">Emergency Contact</Divider>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item 
                  name="emergencyContactName" 
                  label="Emergency Contact Name" 
                  rules={[{ required: true, message: 'Please enter emergency contact name' }]}
                >
                  <Input 
                    size="large" 
                    className="rounded-lg"
                    prefix={<UserOutlined />}
                    placeholder="Full name"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item 
                  name="emergencyRelation" 
                  label="Relationship" 
                  rules={[{ required: true, message: 'Please enter relationship' }]}
                >
                  <Select size="large" placeholder="Select relationship">
                    <Option value="Parent">Parent</Option>
                    <Option value="Guardian">Guardian</Option>
                    <Option value="Sibling">Sibling</Option>
                    <Option value="Relative">Relative</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item 
                  name="emergencyContact" 
                  label="Emergency Contact Number" 
                  rules={[
                    { required: true, message: 'Please enter emergency contact' },
                    { 
                      pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 
                      message: 'Please enter a valid phone number' 
                    }
                  ]}
                >
                  <Input 
                    size="large" 
                    className="rounded-lg"
                    prefix={<PhoneOutlined />}
                    placeholder="+1 234 567 890"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Divider orientation="left" className="text-gray-600">Medical Information</Divider>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item 
                  name="medicalConditions" 
                  label="Medical Conditions"
                  tooltip="List any chronic conditions, disabilities, or ongoing treatments"
                >
                  <TextArea 
                    size="large" 
                    className="rounded-lg"
                    placeholder="e.g., Asthma, Diabetes, None"
                    rows={2}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item 
                  name="allergies" 
                  label="Allergies"
                  tooltip="List any known allergies (food, medication, environmental)"
                >
                  <TextArea 
                    size="large" 
                    className="rounded-lg"
                    placeholder="e.g., Peanuts, Penicillin, None"
                    rows={2}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        )

      default:
        return null
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
          <h1 className="text-3xl font-bold text-gray-800 m-0">Students</h1>
          <p className="text-gray-500 mt-1">Manage your students directory</p>
        </div>
        <Space>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            size="large"
            onClick={handleAdd}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Add Student
          </Button>
        </Space>
      </motion.div>

      <Card className="shadow-sm rounded-xl border-0 mb-6">
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col xs={24} sm={12} md={8}>
            <Input 
              placeholder="Search by name, email, or roll number..." 
              prefix={<SearchOutlined className="text-gray-400" />}
              size="large"
              className="rounded-lg"
              onChange={e => setSearchText(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              placeholder="Filter by Grade"
              allowClear
              size="large"
              className="w-full"
              onChange={setFilterGrade}
              suffixIcon={<FilterOutlined />}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => (
                <Option key={grade} value={`Grade ${grade}`}>Grade {grade}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Card>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Table 
          columns={columns} 
          dataSource={filteredStudents} 
          rowKey="id"
          className="shadow-sm rounded-xl overflow-hidden bg-white"
          pagination={{ 
            pageSize: 8,
            showTotal: (total) => `Total ${total} students`,
            className: "p-4"
          }}
          scroll={{ x: true }}
        />
      </motion.div>

      <Modal
        title={
          <div className="text-xl font-semibold">
            {editingStudent ? 'Edit Student' : 'Add New Student'}
          </div>
        }
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          setCurrentStep(0)
          setFileList([])
        }}
        width={800}
        className="rounded-xl"
        footer={null}
      >
        <div className="mt-6 mb-4">
          <Steps current={currentStep} items={steps} />
        </div>

        <Form form={form} layout="vertical" className="mt-6">
          {renderStepContent()}
        </Form>

        <div className="flex justify-between mt-6 pt-4 border-t">
          <Button 
            size="large"
            onClick={handlePrev}
            disabled={currentStep === 0}
            icon={<LeftOutlined />}
          >
            Previous
          </Button>
          
          {currentStep < 3 ? (
            <Button 
              type="primary"
              size="large"
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Next <RightOutlined />
            </Button>
          ) : (
            <Button 
              type="primary"
              size="large"
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              {editingStudent ? 'Update Student' : 'Add Student'}
            </Button>
          )}
        </div>
      </Modal>
    </div>
  )
}