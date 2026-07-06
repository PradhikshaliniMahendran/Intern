import React, {useState} from 'react';
import './AttendanceCard.css';

function AttendanceCard({ image, name, id, course, initialPresent, initialAbsent}) {

    const [status, setStatus] = useState("Not Marked");
    const [presentDays, setPresentDays] = useState(initialPresent);
    const [absentDays, setAbsentDays] = useState(initialAbsent);

    const handleMarkPresent = () => {
        if (status !== "Present") {
            setPresentDays(presentDays + 1);

            if (status === "Absent") {
                setAbsentDays(absentDays - 1);
            }

            setStatus("Present");
        }
    };

     const handleMarkAbsent = () => {
        if (status !== "Absent") {
            setAbsentDays(absentDays + 1);

            if (status === "Present") {
                setPresentDays(presentDays - 1);
            }

            setStatus("Absent");
        }
    };

    let statusClass = "status-badge ";
    if (status === "Present") statusClass += "status-present";
    else if (status === "Absent") statusClass += "status-absent";
    else statusClass += "status-pending";

    return (
        <div className= "attendance-card">
            <div className="card-header">
                <img src={image} alt={name} className="student-image" />
                <div className="student-info">
                    <h3 className="student-name">{name}</h3>
                    <p className="student-id">{id}</p>
                    <p className="student-course">{course}</p>
                </div>
            </div>

            <div className="card-body">
                <div className="stats-container">
                    <div className="stat-box">
                        <span className="stat-label">Present</span>
                        <span className="stat-value text-green">{presentDays}</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">Absent</span>
                        <span className="stat-value text-red">{absentDays}</span>
                    </div>
                </div>

                <div className="status-container">
                    <span className="status-label">Today's Status</span>
                    <span className={statusClass}>{status}</span>
                </div>
            </div>

            <div className="card-actions">
                <button
                    className={`btn btn-present ${status === "Present" ? "active" : ""}`}
                    onClick={handleMarkPresent}
                >
                    Mark Present
                </button>
                <button
                    className={`btn btn-absent ${status === "Absent" ? "active" : ""}`}
                    onClick={handleMarkAbsent}
                >
                    Mark Absent
                </button>
            </div>
        </div>
    
    );
}

export default AttendanceCard;