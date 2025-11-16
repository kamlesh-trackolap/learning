import React from "react";
import { Form, Input } from "antd";
import type { InputProps } from "antd";
import { useField } from "react-final-form";
import { isFunction } from "../../utils/main-utils";

const inputMap: Record<string, React.ComponentType<any>> = {
  password: Input.Password,
  otp: Input.OTP,
  search: Input.Search,
  textarea: Input.TextArea,
  textArea: Input.TextArea,
  mobile: Input, // Add mobile type
  email: Input,  // Add email type
};

interface InputFieldProps extends InputProps {
  type?: string;
  name: string;
  defaultValue?: any;
  optional?: boolean;
  title?: string;
  minLength?: number;
  maxLength?: number;
  validater?: (value: any) => string | undefined;
  id?: string;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const { 
    name, 
    defaultValue, 
    type, 
    optional, 
    title, 
    minLength, 
    maxLength, 
    validater,
    id,
    ...rest 
  } = props;

  const validate = (value: any): string | undefined => {
    if (isFunction(validater)) {
      return validater(value);
    }

    const fieldTitle = title || name;

    // Handle empty values for required fields
    if (!optional) {
      if (value === undefined || value === null || value === '') {
        return `${fieldTitle} is required`;
      }
      
      if (typeof value === 'string' && !value.trim()) {
        return `${fieldTitle} is required`;
      }
    }

    // Handle length validations (only if value exists)
    if (value && typeof value === 'string') {
      const trimmedValue = value.trim();
      
      if (minLength && trimmedValue.length < minLength) {
        return `${fieldTitle} should be at least ${minLength} characters`;
      }
      
      if (maxLength && trimmedValue.length > maxLength) {
        return `${fieldTitle} should not exceed ${maxLength} characters`;
      }
    }

    // Email validation
    if (type === 'email' && value && typeof value === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        return 'Please enter a valid email address';
      }
    }

    // Mobile validation (basic)
    if (type === 'mobile' && value && typeof value === 'string') {
      const mobileRegex = /^[0-9]{10}$/;
      const cleanValue = value.replace(/\D/g, '');
      if (!mobileRegex.test(cleanValue)) {
        return 'Please enter a valid 10-digit mobile number';
      }
    }

    return undefined;
  };

  const { input, meta } = useField(name, { 
    validate, 
    defaultValue,
    // Add parse and format for better value handling
    parse: (value) => value,
    format: (value) => value ?? '',
  });

  const validateStatus = meta.touched && meta.error ? 'error' : meta.touched && !meta.error ? 'success' : '';
  const help = meta.touched && meta.error ? meta.error : '';

  const key = type?.toLowerCase() || 'text';
  const Component = inputMap[key] || Input;

  const componentProps = {
    ...input,
    ...rest,
    placeholder: rest.placeholder || title
  };

  return (
    <Form.Item 
      validateStatus={validateStatus} 
      help={help}
      hasFeedback={validateStatus === 'success'}
    >
      <Component {...componentProps} />
    </Form.Item>
  );
};

export default InputField;