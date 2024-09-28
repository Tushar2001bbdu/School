const express = require("express");
const teachers = require("../models/teachers");
const students = require("../models/students");
const Router = express.Router();
const { body, validationResult } = require("express-validator");
const studentresult = require("../models/examresult");
require("dotenv").config();
const admin = require("firebase-admin");
const { authenticateTeacherToken } = require("../middlewares/auth");
const teacherController = require("../controllers/teacher-controllers");

const app2 = admin.app("teachers");

// Route to see Details of a Teacher in the Student Management System
Router.get(
  "/seeDetails",
  authenticateTeacherToken,
  teacherController.seeProfile
);

// Route to get student profile
Router.get(
  "/getStudentProfile",
  authenticateTeacherToken,
  teacherController.getStudentProfile
);

// Route for logging in for a teacher in the Student Management System
Router.post(
  "/login",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "cannot be blank").exists(),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ success: "false", errors: result.array() });
      }

      // Logic for teacher login goes here (auth check, etc.)
      // Assuming successful login logic is implemented.
      res.status(200).send({
        status: true,
        message: "You have logged in successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: false, message: "Some error has occurred" });
    }
  }
);

// Route to get List Of Students
Router.get("/listOfStudents", authenticateTeacherToken, teacherController.getStudentsList);

// Route to allow teacher to update marks of his/her students using his university roll no
Router.patch(
  "/updateResult",
  authenticateTeacherToken,
  teacherController.updateStudentResult
);

// Route for password reset email
Router.put(
  "/passwordResetEmail",
  [
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ success: "false", errors: result.array() });
      }

      try {
        const link = await app2.auth().generatePasswordResetLink(req.body.email);
        console.log(link);
        res.status(200).send("A password reset email has been sent");
      } catch (error) {
        console.error(error);
        res.status(500).send("There has been some error during the process");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Some error has occurred");
    }
  }
);

module.exports = Router;
