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

  return (
    <div style={contactStyle}>
      <h1>QinetiQ US IC-IA Business Unit</h1>
      <p>
        {" "}
        Adam Brook: adam.brook@us.qinetiq.com, Arpan Das:
        arpan.das@us.qinetiq.com, Trisha Nittala: trisha.nittala@us.qinetiq.com{" "}
      </p>
      <p>
        {" "}
        Samriddhi Kumar: samriddhi.kumar@us.qinetiq.com, Adam Pollak:
        adam.pollak@us.qinetiq.com{" "}
      </p>
    </div>
  );
};

export default Contact;
