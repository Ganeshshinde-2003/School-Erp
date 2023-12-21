import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Dashboard",
    custonIcons: (
      <img
        src="assets/icons/1dashbaord.png"
        className="icon-class"
        alt="sidebar-icon"
      />
    ),
    path: "/",
  },
  {
    title: "Class Master",
    custonIcons: (
      <img
        src="assets/icons/2classmaster.png"
        className="icon-class"
        alt="sidebar-icon"
      />
    ),
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
    custonIcons: (
      <img
        src="assets/icons/3teacher.png"
        className="icon-class"
        alt="sidebar-icon"
      />
    ),
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
    custonIcons: (
      <img
        src="assets/icons/4stdmaster.png"
        className="icon-class"
        alt="sidebar-icon"
      />
    ),
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
    custonIcons: (
      <img
        src="assets/icons/5transportmaster.png"
        className="icon-class"
        alt="sidebar-icon"
      />
    ),
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
        path: "transport-master/add-vehciles",
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
    custonIcons: (
      <img
        src="assets/icons/6staffmang.png"
        className="icon-class"
        alt="sidebar-icon"
      />
    ),
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add Non Teaching Staff",
        path: "/staff-management/add-non-teaching-staff",
        cName: "sub-nav",
      },
      {
        title: "Salary to Teachers",
        path: "/staff-management/salary-to-teachers",
        cName: "sub-nav",
      },
      {
        title: "Salary to Non-Teaching Staff",
        path: "/staff-management/salary-to-non-teaching-staff",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Fee Structures",
    custonIcons: (
      <img
        src="assets/icons/7fee.png"
        className="icon-class"
        alt="sidebar-icon"
      />
    ),
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
    custonIcons: (
      <img
        src="assets/icons/8examaddition.png"
        className="icon-class"
        alt="sidebar-icon"
      />
    ),
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add Exam",
        path: "/exam-addition/add-exam",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Staff Attendance",
    custonIcons: (
      <img
        src="assets/icons/9staffattendance.png"
        className="icon-class"
        alt="sidebar-icon"
      />
    ),
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Put Attendance",
        path: "/staff-attendance/put-attendance",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Timetable",
    custonIcons: (
      <img
        src="assets/icons/10timetable.png"
        className="icon-class"
        alt="sidebar-icon"
      />
    ),
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add Timetable",
        path: "/timetable/add-timetable",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Syllabus",
    custonIcons: (
      <img
        src="assets/icons/11syllabus.png"
        className="icon-class"
        alt="sidebar-icon"
      />
    ),
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Check Syllabus",
        path: "/syllabus/check-syllabus",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Add Events/Holidays",
    custonIcons: (
      <img
        src="assets/icons/12addevent.png"
        className="icon-class"
        alt="sidebar-icon"
      />
    ),
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
    custonIcons: (
      <img
        src="assets/icons/13statisticalreport.png"
        className="icon-class"
        alt="sidebar-icon"
      />
    ),
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
    custonIcons: (
      <img
        src="assets/icons/13sendnotice.png"
        className="icon-class"
        alt="sidebar-icon"
      />
    ),
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Add Notice",
        path: "/send-notice/add-notices",
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Expense Adding",
    custonIcons: (
      <img
        src="assets/icons/14expenceadding.png"
        className="icon-class"
        alt="sidebar-icon"
      />
    ),
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
    custonIcons: (
      <img
        src="assets/icons/15promotestudent.png"
        className="icon-class"
        alt="sidebar-icon"
      />
    ),
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
