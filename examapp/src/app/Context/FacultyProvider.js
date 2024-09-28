"use client";
// context/AuthProvider.js
import { createContext, useState, useContext } from "react";
import { RoleProvider } from "./AdminProvider";
import Cookies from "js-cookie";
// Create AuthContext
export const FacultyContext = createContext();

// Create AuthProvider to wrap your app
export function FacultyProvider({ children }) {
  const [facultyData, setFacultyData] = useState(null);
  const [listOfStudents, setListOfStudents] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  
  async function facultyLogin(facultyDetails) {
    let url = "http://localhost:3001/app/teachers/login";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // If sending JSON data
        authorization: localStorage.getItem("teacherFirebaseToken"),
      },
      body: JSON.stringify({
        email: facultyDetails.email,
        password: facultyDetails.password,
      }),
      // For POST, PUT, PATCH requests where you are sending a body
    });
    console.log("rollno" + facultyDetails.rollNo);
    Cookies.set("rollno", facultyDetails.rollNo, { expires: 1 }); // Set the cookie with 7-day expiry
    response = await response.json();

    
  }
  async function getFacultyProfile() {
    let rollno = Cookies.get("rollno");
    let url = `http://localhost:3001/app/teachers/seeDetails?rollno=${rollno}`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // If sending JSON data
        authorization: localStorage.getItem("teacherFirebaseToken"),
      },

      // For POST, PUT, PATCH requests where you are sending a body
    });

    response = await response.json();
    setFacultyData(response);
  }
  async function getListOfStudents(section) {
    let rollno = Cookies.get("rollno");
    let url = `http://localhost:3001/app/teachers/listOfStudents?rollno=${rollno}&section=${section}`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // If sending JSON data
        authorization: localStorage.getItem("teacherFirebaseToken"),
      },

      // For POST, PUT, PATCH requests where you are sending a body
    });

    response = await response.json();
    return response.studentList;
  }
  async function getStudentProfile(rollno) {
    let url = `http://localhost:3001/app/teachers/getStudentProfile?rollno=${rollno}`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // If sending JSON data
        authorization: localStorage.getItem("teacherFirebaseToken"),
      },

      // For POST, PUT, PATCH requests where you are sending a body
    });

    response = await response.json();
    return response.profile;
  }
  async function updateResult(rollno, marks) {
    let url = `http://localhost:3001/app/teachers/updateResult?rollno=${rollno}`;
    await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // If sending JSON data
        authorization: localStorage.getItem("teacherFirebaseToken"),
      },
      body: JSON.stringify({
        rollno:rollno,
        marks: marks
      }),

      // For POST, PUT, PATCH requests where you are sending a body
    });
  }

  return (
    <FacultyContext.Provider
      value={{
        facultyData,
        facultyLogin,
        getFacultyProfile,
        getListOfStudents,
        listOfStudents,
        studentProfile,
        getStudentProfile,
        updateResult,
      }}
    >
      {children}
    </FacultyContext.Provider>
  );
}
