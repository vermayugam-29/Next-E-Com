"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconPlus,
  IconBrandHipchat,
  IconBrandCodesandbox
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {useRecoilValue } from "recoil";
import { userDetails } from "@/recoil/atoms/userState";
import { selectedLinkState } from "@/recoil/atoms/dashboardStates";
import { Mapping } from "@/utils/profileMapping";


function SidebarDemo() {
  const user = useRecoilValue(userDetails);


  const sideBarData = [
    {
      label: "Dashboard",
      name : 'Dashboard',
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      name : 'View Profile',
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Items",
      name : 'Add Items',
      href: "#",
      icon: (
        <IconPlus className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Orders",
      name : 'View All Orders',
      href: "#",
      icon: (
        <IconBrandCodesandbox className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Chats",
      name : 'Chats',
      href: "#",
      icon: (
        <IconBrandHipchat className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      name : 'Settings',
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      name : 'Logout',
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const links = sideBarData.filter((e) => {
    if(user?.accountType !== 'Admin') {
      return e.label !== 'Items'
    } else {
      return e;
    }
  })


  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-[100%] flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[90vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: `${user?.name}`,
                href: "#",
                name : `${user?.name}`,
                icon: (
                  <Image
                    src={user?.profilePhoto as string}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        RPR Steel Works
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard : React.FC = () => {
  const selectedLink = useRecoilValue(selectedLinkState);
  const SelectedComponent = Mapping[selectedLink];

  return (
    <div className="flex flex-1 overflow-auto">
      <div className="rounded-tl-2xl border border-neutral-200 dark:border-neutral-700
       bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-auto">
        
        <SelectedComponent />

      </div>
    </div>
  );
};

export default SidebarDemo