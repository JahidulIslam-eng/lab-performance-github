import mysql from "mysql2/promise";


async function connectDB() {
  try{
const db =await mysql.createPool({
  host:"localhost",
  user:"root",
  password:"",
  database:"students_marks",
  dateStrings:true,
  waitForConnections:true,
  connectionLimit:10,
});
console.log("database connected");
 return db;
  } catch(err){
console.log("database connection lost",err);
process.exit(1);
  }
}



export default connectDB;