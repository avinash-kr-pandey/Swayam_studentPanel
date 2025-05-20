import React from "react";

const Index = () => {
  return (
    <div
      style={{
        textAlign: "center",
        justifyItems: "center",
        padding: "3rem",
        background: "#f1f1f1",
        marginTop: "2rem",
        backgroundColor: "#282c34",
        color: "white",
        minHeight: "35vh",
      }}
    >
      <main>
        <h1>Welcome to the Home Page</h1>
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "1rem",
          background: "#f1f1f1",
          marginTop: "2rem",
          backgroundColor: "#282c34",
          color: "white",
        }}
      >
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
