"use client"
import React, { useEffect, useState } from 'react'
import { Quintessential } from 'next/font/google'
import { AiFillCaretRight } from "react-icons/ai";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { NativeSelect } from "@mui/material";
import axios from "axios";
import { useRouter } from 'next/navigation';




{/* for font */}
const quintessential=Quintessential({
  subsets:["latin"],
  weight:"400",
});



const semesterCourses={
  "1-1":[{ name: "CSE 1100", credit: 0.75,title:"Computer Fundamentals and Ethics Sessional",teacher:"Dr. Md. Rabiul Islam" }, { name: "CSE 1102", credit: 1.5,title:"Structured Programming Sessional",teacher:""  },{ name:"EEE 1152",credit:0.75,title:"Basic Electrical Engineering Sessional",teacher:"" } ,{ name:"HUM 1114",credit:0.75,title:"Functional English Sessional",teacher:"" } ,{ name:"CHEM 1114",credit:0.75,title:"Inorganic and Physical Chemistry Sessional",teacher:"" }],
  "1-2":[{ name: "CSE 1200", credit: 0.75,title:"Competitive Programming Sessional",teacher:""  }, { name: "CSE 1202", credit: 1.5,title:"Data Structure Sessional",teacher:""  },{ name:"EEE 1252",credit:1.5,title:"Electronic Devices and Circuits Sessional",teacher:"" } ,{ name:"CSE 1204",credit:1.5,title:"Object Oriented Programming Sessional",teacher:"" } ,{ name:"PHY 1214",credit:0.75,title:"Physics Sessional",teacher:"" }],
  "2-1":[{ name: "CSE 2100", credit: 0.75,title:"Software Development Project I",teacher:""  }, { name: "CSE 2102", credit: 1.5,title:"Discrete Mathematics Sessional",teacher:""  },{ name:"EEE 2152",credit:0.75,title:"Electrical Drives and Instrumentations Sessional",teacher:"" } ,{ name:"CSE 2104",credit:1.5,title:"Digital Logic Design Sessional",teacher:"" }],
  "2-2":[{ name: "CSE 2200", credit: 0.75,title:"Technical Writing and Presentation Sessional",teacher:""  }, { name: "CSE 2202", credit: 1.5,title:"Algorithm Analysis and Design Sessional",teacher:"Md. Mazharul Islam"  },{ name:"CSE 2204",credit:0.75,title:"Numerical Methods Sessional",teacher:"" } ,{ name:"CSE 2106",credit:1.5,title:"Microprocessors,Microcontrollers and Assembly Language Sessional",teacher:"" }],
  "3-1":[{ name: "CSE 3100", credit: 0.75,title:"Web Based Application Project",teacher:""  }, { name: "CSE 3102", credit: 1.5,title:"Database Systems Sessional",teacher:"Barshon Sen" },{ name:"CSE 3106",credit:0.75,title:"Computer Interfacing and Embadded System Sessional",teacher:""} ,{ name:"CSE 3108",credit:0.75,title:"Computer Architecture Sessional",teacher:""}],
  "3-2":[{ name: "CSE 3200", credit: 0.75,title:"Software Development Project II",teacher:"" }, { name: "CSE 3202", credit: 0.75,title:"Operating Systems Sessional",teacher:"" },{ name:"CSE 3204",credit:0.75,title:"Data Communication Sessional",teacher:""} ,{ name:"CSE 3206",credit:0.75,title:"Software Engineering Sessional",teacher:""},{ name:"CSE 3208",credit:0.75,title:"Artificial Intelligence  Sessional",teacher:""},{ name:"CSE 3210",credit:0.75,title:"Digital Signal Processing Sessional",teacher:""}],
  "4-1":[{ name: "CSE 4000", credit: 1.00,title:"Project/Thesis I",teacher:"" }, { name: "CSE 4102", credit: 0.75,title:"Compiler Design Sessional",teacher:"" },{ name:"CSE 4104",credit:1.5,title:"Computer Networks Sessional",teacher:""} ,{ name:"CSE 4106",credit:0.75,title:"Digital Image Processing Sessional",teacher:""},{ name:"CSE 4108",credit:0.75,title:"Industrial Attachment",teacher:""},{ name:"CSE 4110",credit:0.75,title:"Information Systems Analysis and Design Sessional",teacher:""},{ name: "CSE 4112", credit: 0.75,title:"Unix Programming Sessional",teacher:"" }, { name: "CSE 4114", credit: 0.75,title:"Digital System Design Sessional",teacher:"" },{ name:"CSE 4116",credit:0.75,title:"Simulation and Modeling Sessional",teacher:""} ,{ name:"CSE 4118",credit:0.75,title:"Wireless Networks Sessional",teacher:""},{ name:"CSE 4120",credit:0.75,title:"Data Mining Sessional",teacher:""},{ name:"CSE 4122",credit:0.75,title:"Computer Vision Sessional",teacher:""},{ name:"CSE 4124",credit:0.75,title:"Knowledge Engineering Sessional",teacher:""}],
  "4-2":[{ name: "CSE 4000", credit: 1.00,title:"Project/Thesis II",teacher:"" }, { name: "CSE 4202", credit: 0.75,title:"Computer Graphics Sessional",teacher:"" },{ name:"CSE 4204",credit:0.75,title:"Machine Learning Sessional",teacher:""} ,{ name:"CSE 4206",credit:0.75,title:"Security and Privacy Sessional",teacher:""},{ name:"CSE 4208",credit:0.75,title:"Seminar",teacher:""}]
 
};

/*const courseTableMap = {
  "CSE 1100": "cse1100_table",
  "CSE 2202": "cse2202_table",
  
};*/







const studentpage = () => {
 const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
const [reportDate, setReportDate] = useState("");
const [file,setFile] = useState<File | null>(null);
const [students,setStudents] = useState<any[]>([]); 
const [uploading, setUploading] = useState(false);
const [file1, setFile1] = useState(null);
const [roll, setRoll] = useState("");
const [teacher,setTeacher]=useState("");
const router = useRouter();
const [avgMarks, setAvgMarks] = useState(0);
const [avgAttendance, setAvgAttendance] = useState(0);


//const semesters = Object.keys(semesterCourses); 

const selectedCourseData =
  semesterCourses[selectedSemester]?.find(
    (course) => course.name === selectedCourse
  );

+









useEffect(() => {
  window.scrollTo(0,0);
  //roll from localstorage
  const savedRoll = localStorage.getItem("roll");
  if (!savedRoll) {
    router.push("/"); //go login page
    return;
  }
  setRoll(savedRoll);
}, []);



 /*const rowCount = selectedCourseData
  ? selectedCourseData.credit * 8
  : 0; */

useEffect(() => {
  if (!selectedCourse) return;
  
console.log("roll:", roll);
  console.log("course:", selectedCourse);

  fetch(`http://localhost:4000/students?roll=${roll}&course=${encodeURIComponent(selectedCourse)}`)
    .then(res => res.json())
    .then(data => {
      /*console.log("full data:", data);
  console.log("students length:", data.students?.length);*/
    setStudents(data.students || []);
      setAvgMarks(data.avgMarks || 0);
  setAvgAttendance(data.avgAttendance || 0);
    });

}, [selectedCourse]);
  
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
       const selectedFile = e.target.files[0];
    
    //Optional:Only PDF allow korar extra check
    if (selectedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed!");
      e.target.value = ""; //input clear
      return;
    }

    setFile1(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file1 || !selectedCourse || !reportDate) {

alert("Please select Course, Date and upload a PDF file");
    return;
    }
    

    setUploading(true);

    const formData = new FormData();
    formData.append("pdf", file1);
    formData.append("course", selectedCourse); // optional:send course info
formData.append("reportDate", reportDate);
formData.append("roll", roll);
    try {
    const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      });



const result = await response.json();

if (!response.ok) {
      //show error
      alert(` ${result.error}`);
      return;
    }


    if (result.success) {
      alert(`Report uploaded successfully for ${reportDate}`);
      setFile1(null);  //file clear
      setReportDate("");         
      
    } else {
      alert(result.error || "Upload failed");
    }
  } catch (error) {
    console.error("Upload error:", error);
    alert("Network error! Please check if server is running.");
  } finally {
    setUploading(false);
  }
};
  

const handleLogout = () => {
  localStorage.removeItem("roll");
  router.push("/");
};


{/*const handleSubmit = async () => {
    if (!file1) return;

    const formData = new FormData();
    formData.append("pdf", file1);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    });
  };*/}



return (
    <div  className="min-h-screen">
{/* Lab porformance heading */}

        <div className='bg-blue-900 w-full flex items-center  px-4 py-4'>
            <div className="flex items-center"><AiFillCaretRight className='text-3xl md:text-5xl text-white'/></div>
<span  className={`${quintessential.className} text-white  text-xl md:text-4xl`}>LAB PERFORMANCE TRACKER</span>
        </div>

<div className='flex flex-col lg:flex-row'>
{/* semester no */}
<div className='bg-gray-500 w-full lg:w-44 lg:min-h-screen'>
           <div className='h-14 w-full flex items-center justify-center'>
            <span className='text-white text-3xl font-bold'>Semester</span>
           </div>



           <div className='h-1 bg-black'/>
<div className='flex flex-row flex-wrap lg:flex-col gap-2 p-2 lg:w-32'>
            <Card
    className={`h-8 w-full flex items-center justify-center cursor-pointer p-0 px-4 lg:w-full lg:ml-2 ${
      selectedSemester === "1-1" ? "bg-blue-200" : ""
    }`}
    onClick={() => {
      setSelectedSemester("1-1");
      setSelectedCourse("");
      setStudents([]);
  setAvgMarks(0);
  setAvgAttendance(0);
      
    }}
  >
    <span className='font-bold text-lg text-black'>1-1</span>
  </Card>

  <Card
    className={`h-8 w-full flex items-center justify-center cursor-pointer p-0 px-4 lg:w-full lg:ml-2 ${
      selectedSemester === "1-2" ? "bg-blue-200" : ""
    }`}
    onClick={() => {
      setSelectedSemester("1-2");
      setSelectedCourse("");
      setStudents([]);
  setAvgMarks(0);
  setAvgAttendance(0);
    }}
  >
    <span className='font-bold text-lg text-black'>1-2</span>
  </Card>
<Card
    className={`h-8 w-full flex items-center justify-center cursor-pointer p-0 px-4 lg:w-full lg:ml-2 ${
      selectedSemester === "2-1" ? "bg-blue-200" : ""
    }`}
    onClick={() => {
      setSelectedSemester("2-1");
      setSelectedCourse("");
      setStudents([]);
  setAvgMarks(0);
  setAvgAttendance(0);
    }}
  >
    <span className='font-bold text-lg text-black'>2-1</span>
  </Card>

  <Card
    className={`h-8 w-full flex items-center justify-center cursor-pointer p-0 px-4 lg:w-full lg:ml-2 ${
      selectedSemester === "2-2" ? "bg-blue-200" : ""
    }`}
    onClick={() => {
      setSelectedSemester("2-2");
      setSelectedCourse("");
      setStudents([]);
  setAvgMarks(0);
  setAvgAttendance(0);
    }}
  >
    <span className='font-bold text-lg text-black'>2-2</span>
  </Card>
  <Card
    className={`h-8 w-full flex items-center justify-center cursor-pointer p-0 px-4 lg:w-full lg:ml-2 ${
      selectedSemester === "3-1" ? "bg-blue-200" : ""
    }`}
    onClick={() => {
      setSelectedSemester("3-1");
      setSelectedCourse("");
      setStudents([]);
  setAvgMarks(0);
  setAvgAttendance(0);
    }}
  >
    <span className='font-bold text-lg text-black'>3-1</span>
  </Card>

  <Card
    className={`h-8 w-full flex items-center justify-center cursor-pointer p-0 px-4 lg:w-full lg:ml-2 ${
      selectedSemester === "3-2" ? "bg-blue-200" : ""
    }`}
    onClick={() => {
      setSelectedSemester("3-2");
      setSelectedCourse("");
      setStudents([]);
  setAvgMarks(0);
  setAvgAttendance(0);
    }}
  >
    <span className='font-bold text-lg text-black'>3-2</span>
  </Card>
  <Card
    className={`h-8 w-full flex items-center justify-center cursor-pointer p-0 px-4 lg:w-full lg:ml-2 ${
      selectedSemester === "4-1" ? "bg-blue-200" : ""
    }`}
    onClick={() => {
      setSelectedSemester("4-1");
      setSelectedCourse("");
      setStudents([]);
  setAvgMarks(0);
  setAvgAttendance(0);
    }}
  >
    <span className='font-bold text-lg text-black'>4-1</span>
  </Card>

  <Card
    className={`h-8 w-full flex items-center justify-center cursor-pointer p-0 px-4 lg:w-full lg:ml-2 ${
      selectedSemester === "4-2" ? "bg-blue-200" : ""
    }`}
    onClick={() => {
      setSelectedSemester("4-2");
      setSelectedCourse("");
      setStudents([]);
  setAvgMarks(0);
  setAvgAttendance(0);
    }}
  >
    <span className='font-bold text-lg text-black'>4-2</span>
  </Card>

           </div>
{/*Lab Report Section*/}
<div className='mt-5 w-full'>
<h1 className='text-white text-xl font-bold text-center'>LAB REPORT</h1>
<div className='h-1 bg-black'/>
{/*course select*/}
<div className='bg-yellow-50 w-full flex items-center justify-center'>
    <NativeSelect
  className='w-4/5'
  value={selectedCourse}
   onChange={(e) => {
      setSelectedCourse(e.target.value);
      sessionStorage.setItem("course", e.target.value);
    }}
 
>
  <option value="">Select Course</option>
  {(semesterCourses[selectedSemester] || []).map((course, idx) => (
    <option key={idx} value={course.name}>
      {course.name}
    </option>
  ))}
</NativeSelect>
  </div>


<div className='h-1 bg-black'/>

{/*Lab Report select*/}
<div className='bg-yellow-50 h-10 w-full flex items-center justify-center'>
    <select className='w-4/5'>
<option value="lab_report">Lab Report</option>
<option value="lab_final">Lab Final Report</option>
</select>
  </div>


<div className='h-1 bg-black'/>
{/*date select*/}
  <div className='bg-yellow-50 h-10 w-full flex items-center justify-center'>
    <input className='w-4/5'
  type="date"
  value={reportDate}
  onChange={(e) => setReportDate(e.target.value)}
/>
  </div>



<div className='h-1 bg-black'/>

<div className='bg-yellow-50 w-full p-2 flex flex-col items-center'>
    <label className="block text-sm font-medium mb-1 w-4/5 font-bold">Upload PDF</label>
    <input
      type="file"
        accept="application/pdf"
          onChange={handleFileChange}
         className="block w-4/5 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 "
                />
      {file1 && (
        <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
        <span>{file1.name}</span>
            <button
           onClick={() => setFile1(null)}
             className="text-red-600 hover:text-red-800 shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
     {/*Submit Button*/}         
<button
     onClick={handleSubmit}
         disabled={!file1 || uploading || !selectedCourse || !reportDate}
       className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-green-700 text-white font-medium py-2 rounded transition"
              >
      {uploading ? "Uploading..." : "Submit Report"}
              </button>


<div className='h-1 bg-black'/>
{/* Logout Button */}
<div className='flex justify-center'>
  <button
    onClick={handleLogout}
    className='bg-red-600 hover:bg-red-700 text-white font-medium  px-6 py-2 rounded text-sm md:text-base'
  >
    Logout
  </button>
</div>

{/*file select*/}
  {/*<div className='flex items-center bg-yellow-50 h-10 '>
   {!file1 ? ( 
   <label className=" ml-4 cursor-pointer bg-green-500 text-black px-4 py-1 rounded">
    Upload PDF
    <input
      type="file"
      accept="application/pdf"
      className="hidden"
      onChange={(e) => setFile1(e.target.files?.[0] || null)}
    />


  </label>

   ):
 (
  
    <div className="flex items-center ml-4 gap-3">
      <span className="text-sm text-gray-700">{file1.name}</span>

      {/* remove file button */}
      {/*<button
        onClick={() => setFile1(null)}
        className="text-red-500 text-sm"
      >
        ✕
      </button>
    </div>
  )}


  </div>
*/}
{/*<div className='h-1 bg-black'/>*/}
{/*button*/}
 {/* <div className='flex items-center bg-yellow-50 h-10 '>
   <button 
    onClick={handleSubmit}
    disabled={!file1}
   className={`ml-8 px-4 py-1 rounded text-white ${
      file1 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
    }`}>
Submit
</button>

  </div>*/}



</div>


</div> 
{/*table,course code,course title,avg,attendence*/}
<div className='w-full  relative'>
  {/*course code,credit*/}
  <div className='flex flex-col md:flex-row w-full'>
{/*course code*/}
<div className='w-full md:w-1/3 bg-yellow-50 p-4'>
  <div className='flex flex-wrap items-center gap-2 lg:ml-14 mt-4'>
<h1 className='font-bold text-base md:text-xl'>Course Code:</h1>
    <NativeSelect
  
  value={selectedCourse}
  onChange={(e) => setSelectedCourse(e.target.value)}
>
  <option value="">Select Course</option>
  {(semesterCourses[selectedSemester] || []).map((course, idx) => (
    <option key={idx} value={course.name}>
      {course.name}
    </option>
  ))}
</NativeSelect>
  </div>
{/*credit*/}
<div className='flex items-center gap-2 mt-2 lg:ml-14 mt-2'>
<h1 className='font-bold text-base md:text-xl'>Credit:</h1>
<h1 className='font-bold text-base md:text-xl'>{selectedCourseData ? selectedCourseData.credit : 0}</h1>
</div>
</div>
{/*course title,teacher name*/}
<div className='w-full md:flex-1 bg-yellow-50 p-4 border-t md:border-t-0 md:border-l border-gray-300'>
{/*course title*/}
<div className='flex flex-wrap items-center gap-2 lg:ml-18'>
 <h1 className='font-bold text-base md:text-xl '>Course Title:</h1>
      <h1 className='font-bold text-base md:text-xl'>{selectedCourseData ? selectedCourseData.title : "Select Course"} </h1>
</div>
{/*teacher name*/}
<div className='flex flex-wrap items-center mt-2 lg:ml-18'>
  <div className='flex items-center gap-1'></div>
<h1 className='font-bold text-base md:text-xl'>Teacher Name:</h1>
<h1 className='font-bold text-base md:text-xl'>{selectedCourseData ? selectedCourseData.teacher:""}</h1>
 </div>

 {/*Roll*/}
        <div className='flex items-center gap-1 lg:ml-18 mt-2'>
<h1 className='font-bold text-base md:text-xl'>Roll:</h1>
<h1 className='font-bold text-base md:text-xl'>{roll}</h1>
</div>
</div>
</div>
{/*Table,avg,lab final*/}
<div className='flex flex-col lg:flex-row'>
{/*Table*/}
<div className='bg-sky-50 flex-1 p-4 overflow-x-auto '>
   <table  className="w-full text-center border border-black text-sm md:text-base">
        <thead>
          <tr>
            <th className="border border-black p-2 md:p-3">Lab No</th>
          <th className="border border-black p-2 md:p-3">Date</th>
          <th className="border border-black p-2 md:p-3">Obtain Marks</th>
          <th className="border border-black p-2 md:p-3">Attendance</th>
          <th className="border border-black p-2 md:p-3">Lab Report</th>
          </tr>
        </thead>
        <tbody>
   {students.map((s:any,index)=> (
    <tr key={index}>
       <td className="border border-black p-2 md:p-3">{index + 1}</td>
            <td className="border border-black p-2 md:p-3">{s.marking_date}</td>
            <td className="border border-black p-2 md:p-3">{s.marks}</td>
            <td className="border border-black p-2 md:p-3">{s.attendance}</td>
            <td className="border border-black p-2 md:p-3">
{s.file_name ? (
        <span className="text-green-600 font-medium">Report Submitted</span>
      ) : (
        <span className="text-red-500 font-medium">No Report Submitted</span>
      )}
</td>

    </tr>
  ))}
</tbody>
      </table>

</div>
{/*avg,lab final,quiz*/}
<div className='flex flex-col lg:flex-col bg-purple-50 w-full lg:w-35'>

  {/*avg marks*/}
  <div className='h-46 w-full lg:w-35 border-2 border-black flex flex-col items-center justify-center'>
    <h1 className='font-bold text-xl '>Avg</h1>
    <h1 className='font-bold text-xl '>Marks</h1>
    <h1 className='text-xl font-bold '>{avgMarks}</h1>
  </div>

  {/*avg attendance*/}
  <div className='h-46 w-full lg:w-35 border-2 border-black flex flex-col items-center justify-center'>
    <h1 className='font-bold text-xl '>Avg</h1>
    <h1 className='font-bold text-xl '>Attendence</h1>
    <h1 className='text-xl font-bold '>{avgAttendance}%</h1>
  </div>

  {/*lab final*/}
  <div className='h-46 w-full lg:w-35 border-2 border-black flex flex-col items-center justify-center'>
    <h1 className='font-bold text-xl '>Lab</h1>
    <h1 className='font-bold text-xl '>Final</h1>
    <h1 className='text-xl font-bold '>10</h1>
  </div>
  {/*quiz*/}
  <div className='h-46 w-full lg:w-35 border-2 border-black flex flex-col items-center justify-center'>
    <h1 className='font-bold text-xl '>Quiz</h1>
    <h1 className='text-xl font-bold '>10</h1>
  </div>

</div>
</div>






</div>





</div>



<div>



        </div>





        </div>
  )
}

export default studentpage