import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "../Database/SidebarData";
import { IconContext } from "react-icons/lib";
import SubMenu from "./SubMenu";

const SidebarNav = styled.nav`
  background-image: linear-gradient( #333333,  #333333);
  height: 100vh;
  display: flex;
  border: 1px solid #333333;
  justify-content: center;
  position: sticky;
  top: 2.7rem;
  z-index: 10;
  overflow: auto;
  width: 25rem;
`;

const SidebarWrap = styled.div`
  width: 100%;
  broder : 1px solid #333333;
`;

const Sidebar = () => {
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <SidebarNav>
          <SidebarWrap>
            <div>
              <img src="assets/images/logo.png" className="w-full	" />
            </div>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
