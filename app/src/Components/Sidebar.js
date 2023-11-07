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
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <SidebarNav>
        <SidebarWrap>
          <div>
            <img src="assets/images/logo.png" className="w-full" alt="Logo" />
          </div>
          {SidebarData.map((item, index) => (
            <SubMenu item={item} key={index} />
          ))}
        </SidebarWrap>
      </SidebarNav>
    </IconContext.Provider>
  );
};

export default Sidebar;
