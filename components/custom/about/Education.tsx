import { motion } from "framer-motion";
import { VerticalLine } from "../navbar/line";

export default function Education() {
    return (
        <motion.div
            className="flex-col pb-5 container-width"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <h2 className="text-3xl font-semibold text-justify">Education</h2>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-justify">Software Engineer</h2>
                <h2 className="text-xs font-semibold text-justify">April 2024 - Present</h2>
            </div>
            <h1 className="text-sm text-gray-400 font-semibold text-justify">KrystalVision Image System PVT. LTD.</h1>
            <p className="text-muted-foreground mt-2 md:text-lg text-sm  text-justify">At Krystalvision Image Systems Pvt. Ltd., I currently serve as a Software Engineer, where I began my journey in April 2024. In the initial six months, I focused on building desktop applications using WPF and C#, gaining hands-on experience in UI design, the MVVM pattern, and data binding. I later transitioned into web development, learning ASP.NET Core MVC and contributing to web-based projects. Since then, I have led the end-to-end development of a comprehensive CRM application using ASP.NET Core MVC and MS SQL Server. This system streamlines operations across customer management, sales, accounts, and service departments, supporting over 1,500 machines, 300+ customers, and 50+ active complaints. Key contributions include modules for customer and machine lifecycle tracking, a dynamic quotation system with status history, complaint and service engineer management, interactive dashboards, inventory tracking across godowns, payment monitoring with automated reminders, and preventive maintenance scheduling. I also developed auxiliary systems like an email monitoring service for OTP validation and a background data backup utility. The CRM is successfully deployed on an IIS LAN server and actively used by 10–15 internal users, with ongoing updates driven by real-time feedback.</p>

            <VerticalLine />
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-justify">Software Engineer</h2>
                <h2 className="text-xs font-semibold text-justify">April 2024 - Present</h2>
            </div>
            <h1 className="text-sm text-gray-400 font-semibold  text-justify">KrystalVision Image System PVT. LTD.</h1>
            <p className="text-muted-foreground mt-2 md:text-lg text-sm text-justify">At Krystalvision Image Systems Pvt. Ltd., I currently serve as a Software Engineer, where I began my journey in April 2024. In the initial six months, I focused on building desktop applications using WPF and C#, gaining hands-on experience in UI design, the MVVM pattern, and data binding. I later transitioned into web development, learning ASP.NET Core MVC and contributing to web-based projects. Since then, I have led the end-to-end development of a comprehensive CRM application using ASP.NET Core MVC and MS SQL Server. This system streamlines operations across customer management, sales, accounts, and service departments, supporting over 1,500 machines, 300+ customers, and 50+ active complaints. Key contributions include modules for customer and machine lifecycle tracking, a dynamic quotation system with status history, complaint and service engineer management, interactive dashboards, inventory tracking across godowns, payment monitoring with automated reminders, and preventive maintenance scheduling. I also developed auxiliary systems like an email monitoring service for OTP validation and a background data backup utility. The CRM is successfully deployed on an IIS LAN server and actively used by 10–15 internal users, with ongoing updates driven by real-time feedback.</p>


        </motion.div>
    ); 
}