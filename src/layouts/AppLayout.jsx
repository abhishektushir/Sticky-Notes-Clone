import React from "react";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <header>hello</header>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default AppLayout;
