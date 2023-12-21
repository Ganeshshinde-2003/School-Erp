// Sidebar.js
import React from "react";
import styled from "styled-components";
import { SidebarData } from "../Database/SidebarData";
import { IconContext } from "react-icons/lib";
import SubMenu from "./SubMenu";

const SidebarNav = styled.nav`
  background-image: linear-gradient(#333333, #333333);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: sticky;
  top: 2.7rem;
  z-index: 10;
  overflow: auto;
  width: 25rem;
  border: none; /* Remove the border */
  padding: 0; /* Remove padding */
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <SidebarNav className="main-sidenavbar">
        <SidebarWrap>
          <div>
            <img src="assets/images/logo.png" className="w-full" alt="sidebar-icon" />
          </div>
          {SidebarData.map((item, index) => (
            <div key={index} className="icon-parent" >
              {item.custonIcons}
              <SubMenu item={item} />
            </div>
          ))}
        </SidebarWrap>
      </SidebarNav>
    </IconContext.Provider>
  );
};

export default Sidebar;
