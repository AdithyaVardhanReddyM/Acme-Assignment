import NavBar from "@/components/NavBar";
import ProfileForm from "@/components/Profile-form";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="w-full h-full flex items-center justify-center p-5 md:px-20">
        <div className="w-full h-full max-w-5xl">
          <h1 className="font-semibold text-2xl mb-5">Edit profile</h1>
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default page;
