import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import connectDB from "./db";
import type { Application, Request, Response } from "express";
import path from "path";
const app: Application = express();
const port: number = 4000;

app.use(cors());
app.use(express.json());




app.post("/login", async (req: Request, res: Response) => {
  try {
    const { roll, password } = req.body;

    if (!roll || !password) {
      return res.status(400).json({ error: "Roll and password required" });
    }

    const db = await connectDB();
    const [rows]: any = await db.execute(
      `SELECT * FROM login_info WHERE roll = ? AND password = ?`,
      [roll, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid roll or password" });
    }

    res.json({ success: true, roll: rows[0].roll });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});





// home route
app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

// GET students data
app.get("/students", async (req: Request, res: Response) => {
  try {
   const { roll, course } = req.query;
   
console.log("roll:", roll);
    console.log("course:", course);

if (!roll || !course) {
      return res.status(400).json({ error: "roll and course required" });
    }
 

    
    
    const db = await connectDB();

    const [rows] = await db.query<any[]>(
     `SELECT marking_date, marks, attendance,file_name
 FROM marks 
 WHERE roll = ? AND course_code = ?
 ORDER BY marking_date`,
[roll, course]
    );

console.log("rows length:", rows.length);
console.log("rows:", rows);

    const [avgResult]=await db.query<any[]>(
     `SELECT AVG(marks) as avgMarks,SUM(attendance)*100/COUNT(*) as avgAttendance
 FROM marks 
 WHERE roll = ? AND course_code = ?
 `,
[roll, course]
    );

console.log("avgResult:", avgResult); 

    res.json({
students: rows,
  avgMarks:parseFloat(avgResult[0].avgMarks).toFixed(2) || 0,
  avgAttendance:parseFloat(avgResult[0].avgAttendance).toFixed(0) || 0

    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


const upload=multer({
  storage:multer.memoryStorage(),
  limits:{fileSize:20*1024*1024},
  fileFilter:(req,file,cb) => {
    if (file.mimetype==="application/pdf") {
      cb(null,true);
    } else {
      cb(new Error("Only PDF files are allowed!"));
    }
  }


});

// Upload route
app.post("/upload", upload.single("pdf"), async(req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }



    const roll = req.body.roll;
const courseCode = req.body.course;
const markingDate = req.body.reportDate;

   

    


if (!markingDate) {
      return res.status(400).json({ error: "Report date is required" });
    }


    const db = await connectDB();

//check date 
   const [rows]: any = await db.execute(
  `SELECT marking_date FROM marks WHERE roll = ? AND course_code = ? AND marking_date = ?`,
  [roll, courseCode, markingDate]
); 


    if (rows.length === 0) {
      return res.status(400).json({ 
        error: `Invalid date! ${markingDate} is not a valid marking date.` 
      });
    }



    await db.execute(
      `UPDATE marks SET file_name = ?, file_data = ?, uploaded_at = CURRENT_TIMESTAMP
   WHERE roll = ? AND course_code = ? AND marking_date = ?`,
  [req.file.originalname, req.file.buffer, roll, courseCode, markingDate]
    );


   /* const query = `
      INSERT INTO ${tableName} 
  (course_code, file_name, file_data, marking_date)
  VALUES (?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    file_name = VALUES(file_name),
    file_data = VALUES(file_data)
    `;

    await db.execute(query, [
      courseCode,
      req.file.originalname,
      req.file.buffer,
      markingDate
    ]);*/

    console.log(`PDF Saved | Course: ${courseCode} | Date: ${markingDate}`);

    res.json({ 
     success: true,
      message: "PDF saved successfully",
      courseCode,
     markingDate
    });
  } catch (err: any) {
    console.error("❌ Upload Error:", err.message);
    res.status(500).json({ 
      error: "Failed to save PDF in database",
      details: err.message 
    });
  }
});



app.listen(port, () => {
  console.log(`server running on port ${port}`);
});