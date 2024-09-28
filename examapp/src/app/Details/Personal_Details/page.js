"use client";
import React, { useContext } from "react";
import Student_Personal_Data from "../../Components/student_profile";

import { AuthContext } from "@/app/Context/AuthProvider";
import FacultyProfile from "@/app/Components/FacultyProfile";
export default function page() {
  
  return (
    <>
      <FacultyProfile />
    </>
  );
}
