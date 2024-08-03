import React from "react";
import MainLayout from "../layouts/MainLayout";
import Sidebar from "../components/Sidebar";
import AuthOverlay from "../components/AuthOverlay";
import ProfileSettings from "../components/ProfileSettings";

function Home() {
  return (
    <MainLayout>
      <>
        <AuthOverlay />
        <ProfileSettings />
        <Sidebar />
      </>
    </MainLayout>
  );
}

export default Home;
