"use client";

import { Edit, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { UserProfile } from "@/lib/userProfileSchema";

const Profile = () => {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/profile");
        const data = response.data;
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex">
        <Loader2 className="animate-spin mr-2" />
        Loading
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl p-6">
      <div className="flex w-full flex-col">
        <div className="flex justify-between gap-10 md:gap-32 items-center">
          <h1 className="text-start font-bold text-2xl">My Profile</h1>
          <Link href="/edit-profile">
            <Button className="flex gap-2 bg-blue-500 hover:bg-slate-500">
              <Edit />
              Edit profile
            </Button>
          </Link>
        </div>
        <div className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center overflow-hidden mt-10">
          <img
            src={profileData?.imgUrl || "/person.svg"}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex justify-between mt-10 w-full">
          <div className="flex flex-col gap-2">
            <div>First Name</div>
            <div className="rounded-xl bg-zinc-50 shadow-lg p-2">
              {profileData?.firstname}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Last Name</div>
            <div className="rounded-xl bg-zinc-50 shadow-lg p-2">
              {profileData?.lastname}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2">
          <div>Email</div>
          <div className="rounded-xl bg-zinc-50 shadow-lg p-2">
            {profileData?.email}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2">
          <div>Address</div>
          <div className="rounded-xl bg-zinc-50 shadow-lg p-2">
            {profileData?.address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
