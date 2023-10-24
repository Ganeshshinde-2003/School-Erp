import React from "react";
import ReactDom from "react-dom";
import "./Modal.css";
const Backdrop = ({ setShowModal }) => {
  return <div className="backdrop" onClick={() => setShowModal(false)} />;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="w-full">{props.children}</div>
    </div>
  );
};
const portal = document.getElementById("overlay");
const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Backdrop setShowModal={props.setShowModal} />,
        portal
      )}
      {ReactDom.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portal
      )}
    </React.Fragment>
  );
};
export default Modal;
