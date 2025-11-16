"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Avatar, Dropdown } from "antd";

import { FaMoon, FaSun } from "react-icons/fa6";
import { IoIosContact } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();


  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { title: "Dashboard", link: "/" },
    { title: "Teams", link: "/teams" },
    { title: "Leads", link: "/leads" },
    { title: "Properties", link: "/properties" },
    { title: "Clients", link: "/clients" },
    { title: "Tasks", link: "/tasks" },
    { title: "Integrations", link: "/integrations" },
    { title: "Form Builder", link: "/form-builder" },
    { title: "Setting", link: "/setting" },
  ];

  // Dropdown Menu (Ant Design)
  const menuItems = [
    {
      key: "profile",
      label: (
        <Link href="/profile" className="flex items-center gap-2">
          <IoIosContact className="text-lg" />
          Profile
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <div className="flex items-center gap-2 cursor-pointer">
          <IoLogOut className="text-lg" />
          Logout
        </div>
      ),
    },
    { type: "divider" },
    {
      key: "theme",
      label: (
        <div className="flex items-center justify-between cursor-pointer select-none">
          <span>Theme</span>

          <div
            onClick={handleToggle}
            className={`w-[55px] h-[29px] flex items-center rounded-full p-1 cursor-pointer transition-colors duration-500 bg-third-white/25
            ${theme === "dark" ? "justify-end" : "justify-start"}`}
          >
            <div className="w-[25px] h-[25px] rounded-full flex items-center justify-center shadow-lg bg-main transition-all">
              {theme === "dark" ? (
                <FaMoon className="w-[11px]" />
              ) : (
                <FaSun className="w-[11px]" />
              )}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex items-center justify-between w-full py-3 px-4 shadow-xl z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <img src="/logo.png" className="h-[50px] object-contain" />
        <h3 className="text-white font-semibold text-3xl">kreatop</h3>
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">
        {navLinks.map((item) => {
          const isActive = pathname === item.link;

          return (
            <Link
              key={item.link}
              href={item.link}
              className={`relative transition-colors duration-300
                ${
                  isActive
                    ? "text-base after:w-full"
                    : "text-white hover:text-base after:w-0"
                }
                after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:bg-base after:transition-all`}
            >
              {item.title}
            </Link>
          );
        })}
      </div>

      {/* Avatar Dropdown */}
      <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
        <Avatar size="large" className="bg-base text-white cursor-pointer">
          K
        </Avatar>
      </Dropdown>
    </div>
  );
};

export default Navbar;
