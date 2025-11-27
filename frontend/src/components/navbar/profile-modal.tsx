import { Modal, Tabs, Avatar, Switch, Divider, Space, Card, Form, Input, Button, Upload, List, Tag } from "antd";
import { useTheme } from "next-themes";
import { 
  UserOutlined, 
  SettingOutlined, 
  BellOutlined, 
  SecurityScanOutlined, 
  SunOutlined, 
  MoonOutlined,
  EditOutlined,
  CameraOutlined,
  CheckCircleOutlined,
  LockOutlined
} from "@ant-design/icons";

const { TabPane } = Tabs;

interface ProfileModalProps {
  isOpenProfileModal: boolean;
  onCancel: () => void;
}

const ProfileModal = ({ onCancel, isOpenProfileModal }: ProfileModalProps) => {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    console.log('inside ')
    setTheme(theme === "dark" ? "light" : "dark");
  };
    console.log({theme})


  // Sample data for activity
  const activityData = [
    { action: 'Logged in', time: '2 hours ago', device: 'Chrome on Windows' },
    { action: 'Updated profile', time: '1 day ago', device: 'Safari on iPhone' },
    { action: 'Changed password', time: '1 week ago', device: 'Chrome on Windows' },
  ];

  const tabItems = [
    {
      key: '1',
      label: (
        <span className="flex items-center gap-2">
          <UserOutlined />
          Profile
        </span>
      ),
      children: (
        <div className="flex gap-6 h-[500px] overflow-auto">
          {/* Left Side - Avatar & Basic Info */}
          <div className="flex-1">
            <Card title="Profile Information" size="small" className="mb-4">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative">
                  <Avatar 
                    size={100} 
                    icon={<UserOutlined />} 
                    className="border-2 border-blue-500"
                  />
                  <Upload showUploadList={false} className="absolute bottom-0 right-0">
                    <Button 
                      shape="circle" 
                      icon={<CameraOutlined />} 
                      size="small"
                      className="bg-blue-500 text-white border-blue-500"
                    />
                  </Upload>
                </div>
                <h3 className="text-lg font-semibold mt-3 mb-1">John Doe</h3>
                <p className="text-gray-500 mb-2">john.doe@company.com</p>
                <Tag color="blue" icon={<CheckCircleOutlined />}>Verified</Tag>
              </div>

              <Space direction="vertical" className="w-full" size="middle">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">First Name</label>
                    <Input defaultValue="John" prefix={<UserOutlined />} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Last Name</label>
                    <Input defaultValue="Doe" prefix={<UserOutlined />} />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <Input defaultValue="john.doe@company.com" type="email" />
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <Input defaultValue="+1 (555) 123-4567" />
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Department</label>
                  <Input defaultValue="Sales & Marketing" />
                </div>
                
                <Button type="primary" icon={<EditOutlined />} className="w-full">
                  Update Profile
                </Button>
              </Space>
            </Card>
          </div>

          {/* Right Side - Additional Info */}
          <div className="flex-1">
            <Card title="Additional Information" size="small" className="mb-4">
              <Space direction="vertical" className="w-full" size="middle">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Team</span>
                  <Tag color="purple">Sales Team</Tag>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Role</span>
                  <Tag color="green">Team Lead</Tag>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Join Date</span>
                  <span className="text-gray-600">Jan 15, 2023</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Last Active</span>
                  <span className="text-gray-600">2 hours ago</span>
                </div>
              </Space>
            </Card>

            <Card title="Recent Activity" size="small">
              <List
                size="small"
                dataSource={activityData}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.action}
                      description={
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">{item.time}</span>
                          <span className="text-gray-400">{item.device}</span>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <span className="flex items-center gap-2">
          <SettingOutlined />
          Preferences
        </span>
      ),
      children: (
        <div className="flex gap-6">
          <div className="flex-1">
            <Card title="Appearance" size="small" className="mb-4">
              <Space direction="vertical" className="w-full" size="middle">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Dark Mode</div>
                    <div className="text-sm text-gray-500">Switch between light and dark themes</div>
                  </div>
                  <Switch
                    checked={theme === "dark"}
                    onChange={handleToggle}
                    checkedChildren={<MoonOutlined />}
                    unCheckedChildren={<SunOutlined />}
                  />
                </div>

                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Compact Mode</div>
                    <div className="text-sm text-gray-500">Use compact spacing</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">RTL Layout</div>
                    <div className="text-sm text-gray-500">Right-to-left layout</div>
                  </div>
                  <Switch />
                </div>
              </Space>
            </Card>
          </div>

          <div className="flex-1">
            <Card title="Language & Region" size="small" className="mb-4">
              <Space direction="vertical" className="w-full" size="middle">
                <div>
                  <label className="text-sm font-medium">Language</label>
                  <Input defaultValue="English (US)" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Time Zone</label>
                  <Input defaultValue="(UTC-05:00) Eastern Time" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Date Format</label>
                  <Input defaultValue="MM/DD/YYYY" className="mt-1" />
                </div>
              </Space>
            </Card>

            <Card title="Notifications" size="small">
              <Space direction="vertical" className="w-full" size="middle">
                <div className="flex justify-between items-center">
                  <span>Email Notifications</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-between items-center">
                  <span>Push Notifications</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-between items-center">
                  <span>SMS Alerts</span>
                  <Switch />
                </div>
              </Space>
            </Card>
          </div>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <span className="flex items-center gap-2">
          <SecurityScanOutlined />
          Security
        </span>
      ),
      children: (
        <div className="flex gap-6">
          <div className="flex-1">
            <Card title="Password" size="small" className="mb-4">
              <Space direction="vertical" className="w-full" size="middle">
                <Input.Password 
                  placeholder="Current Password" 
                  prefix={<LockOutlined />}
                />
                <Input.Password 
                  placeholder="New Password" 
                  prefix={<LockOutlined />}
                />
                <Input.Password 
                  placeholder="Confirm New Password" 
                  prefix={<LockOutlined />}
                />
                <Button type="primary" className="w-full">
                  Update Password
                </Button>
              </Space>
            </Card>

            <Card title="Two-Factor Authentication" size="small">
              <div className="text-center p-4">
                <SecurityScanOutlined className="text-3xl text-blue-500 mb-3" />
                <div className="font-medium mb-2">Protect your account</div>
                <div className="text-sm text-gray-500 mb-4">
                  Add an extra layer of security to your account
                </div>
                <Button type="default">Enable 2FA</Button>
              </div>
            </Card>
          </div>

          <div className="flex-1">
            <Card title="Active Sessions" size="small" className="mb-4">
              <List
                size="small"
                dataSource={[
                  { device: 'Chrome on Windows', location: 'New York, USA', current: true },
                  { device: 'Safari on iPhone', location: 'Boston, USA', current: false },
                ]}
                renderItem={(item) => (
                  <List.Item
                    actions={[item.current ? <Tag color="green">Current</Tag> : <Button size="small">Revoke</Button>]}
                  >
                    <List.Item.Meta
                      title={item.device}
                      description={item.location}
                    />
                  </List.Item>
                )}
              />
            </Card>

            <Card title="Security Tips" size="small">
              <Space direction="vertical" className="w-full" size="small">
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircleOutlined className="text-green-500 mt-1" />
                  <span>Use a strong, unique password</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircleOutlined className="text-green-500 mt-1" />
                  <span>Enable two-factor authentication</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircleOutlined className="text-green-500 mt-1" />
                  <span>Review active sessions regularly</span>
                </div>
              </Space>
            </Card>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <Avatar icon={<UserOutlined />} className="bg-blue-500" />
          <div>
            <div className="font-semibold text-lg">Profile Settings</div>
            <div className="text-sm text-gray-500">Manage your account preferences</div>
          </div>
        </div>
      }
      open={isOpenProfileModal}
      onCancel={onCancel}
      width={900}
      footer={null}
      style={{ top: 20 }}
      className="max-h-[95%] overflow-auto"
    >
      <Tabs 
        defaultActiveKey="1" 
        type="card"
        size="large"
        className="profile-tabs"
      >
        {tabItems.map(item => (
          <TabPane tab={item.label} key={item.key}>
            {item.children}
          </TabPane>
        ))}
      </Tabs>
    </Modal>
  );
};

export default ProfileModal;