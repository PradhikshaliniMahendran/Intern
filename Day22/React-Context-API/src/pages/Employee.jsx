import React from 'react';
import { useTheme } from '../context/ThemeContext';
import EmployeeCard from '../components/EmployeeCard';
import './Employee.css';

function Employees() {

    const { theme } = useTheme();

  const employees = [
    {
        employeeName: "Pradhikshalini",
        employeeId: "EMP001",
        department: "IT",
        designation: "Frontend Developer",
        salary: "150000",
        email: "mahendranpradhikshalini@gmail.com",
        phone: "0702345678",
        experience: "3 Years",
        status: "Active",
        employeeImage: "./pradhi.png"
    },
    {
        employeeName: "Midhurshan",
        employeeId: "EMP002",
        department: "IT",
        designation: "Software Engineer",
        salary: "180000",
        email: "vijayakumarmidhurshan@gmail.com",
        phone: "0778954333",
        experience: "2 Years",
        status: "Active",
        employeeImage: "./midh.png"
    },
    {
        employeeName: "Achindu",
        employeeId: "EMP003",
        department: "IT",
        designation: "Graphic Designer",
        salary: "110000",
        email: "achindu@gmail.com",
        phone: "0714578657",
        experience: "4 Years",
        status: "Inactive",
        employeeImage: "./achindu.png"
    },
    {
        employeeName: "Harani",
        employeeId: "EMP004",
        department: "Business",
        designation: "Accountant",
        salary: "100000",
        email: "harani@gmail.com",
        phone: "0749089912",
        experience: "1 Year",
        status: "Active",
        employeeImage: "./harani.png"
    },
    {
        employeeName: "Ridma",
        employeeId: "EMP005",
        department: "IT",
        designation: "Graphic Designer",
        salary: "110000",
        email: "ridmasew@gmail.com",
        phone: "0754447652",
        experience: "2 Years",
        status: "Inactive",
        employeeImage: "./ridma.png"
    },
    {
        employeeName: "Samitha",
        employeeId: "EMP006",
        department: "HM",
        designation: "HR Manager",
        salary: "170000",
        email: "sasmitha@gmail.com",
        phone: "0761225098",
        experience: "5 Years",
        status: "Active",
        employeeImage: "./sasmitha.png"
    },
    {
        employeeName: "Himansa",
        employeeId: "EMP007",
        department: "IT",
        designation: "Frontend Developer Intern",
        salary: "35000",
        email: "himansa@gmail.com",
        phone: "0714578544",
        experience: "1 Year",
        status: "Active",
        employeeImage: "./himansa.png"
    },
    {
        employeeName: "Kalindu",
        employeeId: "EMP008",
        department: "IT",
        designation: "Full Stack Developer",
        salary: "172000",
        email: "kalindum@gmail.com",
        phone: "0775643877",
        experience: "4 Years",
        status: "Active",
        employeeImage: "./kalindu.png"
    }
    
  ];

  return (
    <div className={`employees-page ${theme}`}>
      <header className="page-header">
        <h1 className="main-title">Employee Registry</h1>
        
      </header>
      <main className="employees-grid">
        {employees.map((emp, index) => (
          <EmployeeCard
          key={index} 
          employeeImage={emp.employeeImage} 
          employeeName={emp.employeeName} 
          employeeId={emp.employeeId} 
          department={emp.department} 
          designation={emp.designation} 
          salary={emp.salary} 
          email={emp.email} 
          phone={emp.phone} 
          experience={emp.experience} 
          status={emp.status} 
          />
        ))}
      </main>

      <footer className="page-footer">
        <p>Apptron Solutions &copy; 2026</p>
      </footer>
    </div>
  );

}


export default Employees;
