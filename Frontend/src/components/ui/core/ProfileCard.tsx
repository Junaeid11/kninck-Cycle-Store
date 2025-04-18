"use client";

import { useEffect, useState } from "react";
import { getMyProfile } from "@/services/profile";
import Image from "next/image";
import Loading from "../loading";
import { IUser } from "@/types";
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  User,
  ShieldEllipsis,
} from "lucide-react";
import { FaGenderless } from "react-icons/fa";

const ProfilePage = () => {
  const [profile, setProfile] = useState<IUser | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        if (res?.success) {
          setProfile(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <Loading />;

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-red-500 text-lg font-semibold">
          Failed to load profile
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6">
      <div className="bg-gradient-to-tr from-blue-100 via-white to-sky-100 shadow-xl rounded-2xl p-8 border border-gray-200">
        {/* Header Image & Name */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <Image
              src={
                profile.profile.photo ||
                "https://static.thenounproject.com/png/354384-200.png"
              }
              alt="Profile Picture"
              width={140}
              height={140}
              className="rounded-full border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-800 flex items-center gap-2">
            <User className="text-indigo-600" />
            {profile.name}
          </h1>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <Mail className="h-4 w-4 text-gray-400" />
            {profile.email}
          </p>
        </div>

        {/* Info Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="flex items-start gap-3">
            <Phone className="text-teal-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p>{profile.profile.phoneNo || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
          <ShieldEllipsis/>
            <div>
        
              <p className="text-sm font-medium text-gray-500">Gender</p>
              <p>{profile.profile.gender || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="text-amber-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Date of Birth</p>
              <p>{profile.profile.dateOfBirth || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="text-purple-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p>{profile.profile.address || "N/A"}</p>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default ProfilePage;
