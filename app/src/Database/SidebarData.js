import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Class Master",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add Subjects",
        path: "/class-master/add-subjects",
      },
      {
        title: "Add Optional Subjects",
        path: "/class-master/add-optional-subject",
      },
      {
        title: "Add class and sections",
        path: "/class-master/add-class-and-section",
      },
    ],
  },
  {
    title: "Teacher Master",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add Teacher",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Products",
    path: "/products",
  },
  {
    title: "Team",
    path: "/team",
  },
  {
    title: "Messages",
    path: "/messages",

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Message 1",
        path: "/messages/message1",
      },
      {
        title: "Message 2",
        path: "/messages/message2",
      },
    ],
  },
  {
    title: "Support",
    path: "/support",
  },
];
