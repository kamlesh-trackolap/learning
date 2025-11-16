import { Avatar } from "primereact/avatar"
import { OverlayPanel } from "primereact/overlaypanel"
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa6";
import { IoIosContact } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const profileModalRef = useRef<any>(null);
    const location = useLocation();
    const handleToggle = () => {
        if (theme === 'dark') return setTheme('light');
        setTheme('dark')
    }
    const navLinks = [
        {
            title: "Dashboard",
            link: "/"
        },
        {
            title: "Teams",
            link: "/teams"
        },
        {
            title: "Leads",
            link: "/leads"
        },
        {
            title: "Properties",
            link: "/properties"
        },
        {
            title: "Clients",
            link: "/clients"
        },
        {
            title: "Tasks",
            link: "/tasks"
        }, {
            title: "Integrations",
            link: "/integrations"
        },
        {
            title: "Form Builder",
            link: "/form-builder"
        },
        {
            title: "setting",
            link: "/setting"
        }
    ]
    return (
        <div className="flex items-center justify-between w-full py-3 px-4 shadow-xl z-50">
            <Link to='/' className="flex items-center gap-2">
                <img src="/logo.png" className="h-[50px] object-contain " />
                <h3 className="text-white  font-semibold text-3xl">kreatop</h3>
            </Link>

            <div className="flex gap-6 items-center justify-center">
                {navLinks?.map((l, i) => {
                    const isActive = location.pathname === l.link;
                    return (
                        <Link
                            to={l.link}
                            key={i}
                            className={`relative transition-colors duration-300
          ${isActive ? "text-base after:w-full" : "text-white hover:text-base after:w-0"}
          after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:bg-base after:transition-all`}
                        >
                            {l.title}
                        </Link>
                    );
                })}
            </div>
            <div className="cursor-pointers" onClick={(e) => profileModalRef.current?.toggle(e)}>
                <Avatar label="K" size="large" shape="circle" className="bg-base text-[#fff] cursor-pointer" />
            </div>

            <OverlayPanel ref={profileModalRef} className="bg-secondary flex flex-col gap-3 w-[390px]  rounded shadow-2xl">
                <div className="flex justify-between">
                    <Avatar label="K" size="large" shape="circle" className="bg-base text-[#fff] cursor-pointer" />
                    <div className="flex flex-col">
                        <h3 className="text-second-white">Kamlesh Kumar</h3>
                        <span className="text-third-white">kamlesh.kumar@gmail.com</span>
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                        <div
                            onClick={handleToggle}
                            className={`w-[55px] h-[29px] flex items-center rounded-full p-1 cursor-pointer transition-colors duration-500 bg-third-white/25
                         ${theme === "dark" ? " justify-end" : " justify-start"}`}
                        >
                            <div className="w-[25px] h-[25px]  rounded-full flex items-center justify-center shadow-lg transition-transform duration-500 bg-main">
                                {theme === "dark" ? (
                                    <FaMoon className="w-[11px] text-base" />
                                ) : (
                                    <FaSun className="w-[11px] text-base" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-[10px]">
                    <Link to='/profile' className="flex items-center cursor-pointer gap-1">
                        <IoIosContact className="text-base w-[30px] h-[30px]" />
                        <span className="text-third-white">Profile</span>
                    </Link>
                    <div className="flex items-center cursor-pointer gap-1">
                        <IoLogOut className="text-base w-[30px] h-[30px]" />
                        <span className="text-third-white">Logout</span>
                    </div>
                </div>


            </OverlayPanel>
        </div>
    )
}

export default Navbar

