
"use client";

import { Form, Input, Button, Divider, Typography } from "antd";
import Link from "next/link";
import Image from "next/image";
import {
    LockOutlined,
    MailOutlined,
} from "@ant-design/icons";
import { FcGoogle } from "react-icons/fc";
import { AiTwotoneMessage } from "react-icons/ai";

const { Title } = Typography;

export default function LoginPage() {
    const onFinish = (values: any) => {
        console.log("Login data:", values);
    };

    return (
        <div className="flex h-screen bg-background">
            <div className="flex flex-1 items-center justify-center px-8 bg-background">
                <div className="w-full max-w-sm">
                    <Title
                        level={2}
                        className="mb-8  text-fg text-center"
                    >
                        Welcome Back Home
                    </Title>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label={<span className="text-fg">Email</span>}
                            name="email"
                            rules={[
                                { required: true, message: "Email is required" },
                                { type: "email", message: "Enter a valid email" },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="Enter your email"
                                prefix={<MailOutlined className="text-fg" />}
                                className="text-fg"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-fg">Password</span>}
                            name="password"
                            rules={[{ required: true, message: "Password is required" }]}
                        >
                            <Input.Password
                                size="large"
                                placeholder="Enter your password"
                                prefix={<LockOutlined className="text-fg" />}
                                className=" text-fg"
                            />
                        </Form.Item>

                        <div className="flex justify-end mb-4 -mt-2">
                            <Link href="/forgot-password" className="text-link font-semibold">
                                Forgot Password?
                            </Link>
                        </div>

                        <Button
                            htmlType="submit"
                            size="large"
                            className="w-full bg-primary hover:bg-button-hover text-main font-medium"
                        >
                            Login
                        </Button>
                    </Form>

                    <Divider plain className="text-fg-secondary">
                        OR
                    </Divider>
                    <div className="flex gap-4 justify-center">
                        <div className="flex flex-col gap-2 justify-center items-center bg-tertiary h-[85px] w-[95px] rounded border-2 border-border cursor-pointer">
                            <FcGoogle className="text-3xl" />
                            <span className="text-fg-secondary font-semibold">Google</span>
                        </div>

                        <div className="flex flex-col gap-2 justify-center items-center bg-tertiary h-[85px] w-[95px] rounded border-2 border-border cursor-pointer">
                            <AiTwotoneMessage className="text-3xl" />
                            <span className="text-fg-secondary font-semibold">OTP</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="hidden lg:flex flex-1 bg-backgroundSecondary relative">
                <Image
                    src="/test.avif"
                    alt="CRM Lead Management"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );
}


