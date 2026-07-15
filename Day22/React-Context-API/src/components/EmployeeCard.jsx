import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './EmployeeCard.css';

function EmployeeCard  ({
    employeeImage,
    employeeName,
    employeeId,
    department,
    designation,
    salary,
    email,
    phone,
    experience,
    status


}) 

{
    const { theme } = useTheme();

    const statusClass = status?.toLowerCase() || 'active';

    return (
        <div className={`employee-card ${theme}`}>
            <div className="card-header">
                <div className="image-wrapper">
                    <img
                    src={employeeImage}
                    alt={employeeName}
                    className="employee-image"
                    />
                    <span className={`status-badge ${statusClass}`}>
                        {status || 'Active'}
                    </span>
                </div>
                <div className="employee-intro">
                    <span className="emp-id">{employeeId}</span>
                    <h2 className="emp-name">{employeeName}</h2>
                    <span className="emp-designation">{designation}</span>
                </div>
            </div>

            <div className="card-body">
                <div className="detail-row">
                    <span className="detail-label">Department</span>
                    <span className="detail-value">{department}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Experience</span>
                    <span className="detail-value">{experience}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Salary</span>
                    <span className="detail-value font-highlight">Rs. {Number(salary).toLocaleString()}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Email</span>
                    <span className="detail-value text-link">{email}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Phone</span>
                    <span className="detail-value">{phone}</span>
                </div>
            </div>
        </div>
    );
}



export default EmployeeCard;