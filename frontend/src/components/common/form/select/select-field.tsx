import { Form, Select } from 'antd';
import React from 'react'

const SelectField = () => {
  return (
    <Form.Item>
           <Select
                mode={mode}
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                defaultValue={['a10', 'c12']}
                onChange={handleChange}
                options={options}
            />
    </Form.Item>
  )
}

export default SelectField;
