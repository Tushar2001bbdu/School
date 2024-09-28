"use client"

import { createContext, useState,useContext } from 'react';

// Create AuthContext
export const AdminContext = createContext();

// Create AuthProvider to wrap your app
export function AdminProvider({ children }) {
  
   async function sendPhoto(image){
    console.log("blob",image)
    let url = `http://localhost:3001/app/attendance/sendphoto`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // If sending JSON data
        
      }
      ,body:JSON.stringify({"url":image})
     
      // For POST, PUT, PATCH requests where you are sending a body
    });

  

   }
        
          

    
    
   return (
        <AdminContext.Provider value={{ sendPhoto}}>
            {children}
        </AdminContext.Provider>
    );
}
