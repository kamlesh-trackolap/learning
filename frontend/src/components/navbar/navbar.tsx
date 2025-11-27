"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Avatar, Button } from "antd";

import Image from "next/image";
import {useState } from "react";
import ProfileModal from "./profile-modal";

const Navbar = () => {
  const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);
  const pathname = usePathname();
  console.log({isOpenProfileModal})

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

  
  const handleClose = () => {
    setIsOpenProfileModal(false);
  };
  const handleOpen = ()=>{
    setIsOpenProfileModal(true)
  }
  return (
    <div className="flex items-center justify-between w-full py-3 px-4 shadow-xl z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image alt="logo" src="/logo.png" width={50} height={50} className="h-[50px] object-contain" />
        <h3 className="text-fg font-semibold text-3xl">kreatop</h3>
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
                ${isActive
                  ? "text-base after:w-full"
                  : "text-fg hover:text-base after:w-0"
                }
                after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:bg-base after:transition-all`}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
      <Button className="bg-base text-white cursor-pointer h-[45] w-[45px] rounded-full" onClick={handleOpen}>
        k2
      </Button>

       <ProfileModal isOpenProfileModal={isOpenProfileModal} onCancel={handleClose}/>
     
    </div>
  );
};

export default Navbar;
