import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Dashboard",
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
    title: "Student Master",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add Student  Directly",
        path: "/student-master/add-student",
        cName: "sub-nav",
      },
      {
        title: "Add Student Application",
        path: "/student-master/add-student-Application",
        cName: "sub-nav",
      },
      {
        title: "Pending Requests",
        path: "/student-master/pending-request",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Transport Master",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add Stops with fees",
        path: "transport-master/add-stops-fees/",
        cName: "sub-nav",
      },
      {
        title: "Add Vehicles",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
      {
        title: "Add Driver",
        path: "/transport-master/add-driver",
        cName: "sub-nav",
      },
      {
        title: "Locate driver or bus",
        path: "/transport-master/locate-driver",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Staff Management",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add staff",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Assigning",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Fee Structures",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add Fee Slabs",
        path: "/fee-structures/add-fee-slab",
        cName: "sub-nav",
      },
      {
        title: "Add Fee Structures",
        path: "/fee-structures/add-fee-structures",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Exam Addition",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Staff Attendance",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Timetable",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Syllabus",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Add Events/Holidays",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add Events/Holidays",
        path: "/hodidays-master/add-holiday",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Statical Reports",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Send Notices",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Expense Adding",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add Expense",
        path: "/expense-adding/add-expense",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Promote Students",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add driver",
        path: "/teacher-master/add-teacher",
        cName: "sub-nav",
      },
    ],
  },
];
