import React from "react";

const Contact = () => {
  const contactStyle = {
    backgroundColor: "#020f2fe3", // dark blue
    color: "white",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const emailStyle = {
    color: "white",
    textDecoration: "underline",
  };

  return (
    <div style={contactStyle}>
      <h1>QinetiQ US IMS Business Unit</h1>
      <p>
        <a href="mailto:adam.brook@us.qinetiq.com" style={emailStyle}>
          Adam Brook: adam.brook@us.qinetiq.com
        </a>
        ,{" "}
        <a href="mailto:arpan.das@us.qinetiq.com" style={emailStyle}>
          Arpan Das: arpan.das@us.qinetiq.com
        </a>
        ,{" "}
        <a href="mailto:trisha.nittala@us.qinetiq.com" style={emailStyle}>
          Trisha Nittala: trisha.nittala@us.qinetiq.com
        </a>
      </p>
      <p>
        <a href="mailto:samriddhi.kumar@us.qinetiq.com" style={emailStyle}>
          Samriddhi Kumar: samriddhi.kumar@us.qinetiq.com
        </a>
        ,{" "}
        <a href="mailto:adam.pollak@us.qinetiq.com" style={emailStyle}>
          Adam Pollak: adam.pollak@us.qinetiq.com
        </a>
      </p>
    </div>
  );
};

export default Contact;
