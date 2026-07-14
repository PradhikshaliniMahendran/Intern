import React, {useState, useEffect } from 'react';
import './StudentForm.css';

function StudentForm({onRegister, initialData, isEditing, onCancel}) {
    const [formData, setFormData] = useState({
        imageUrl:         '',
        fullName:         '',
        studentId:        '',
        email:            '',
        phone:            '',
        course:           '',
        age:              '',
        gender:           '',
        address:          '',
        password:         '',
        confirmPassword:  '',
    });

    const [errors, setErrors] = useState({});

    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        if (initialData) {
            setFormData({
                imageUrl: initialData.imageUrl || '',
                fullName: initialData.fullName || '',
                studentId: initialData.studentId || '',
                email: initialData.email || '',
                phone: initialData.phone || '',
                course: initialData.course || '',
                age: initialData.age || '',
                gender: initialData.gender || '',
                address: initialData.address || '',
                password: initialData.password || '',
                confirmPassword: initialData.confirmPassword || '',
    
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({...prev, [name]: ''}));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setPreviewUrl(base64String);
                setFormData(prev => ({
                    ...prev,
                    imageUrl: base64String
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = () => {
        const newErrors ={};

        if (!formData.fullName || formData.fullName.trim().length < 3) {
            newErrors.fullName = 'Full Name must be at least 3 characters.';
        }
        if (!formData.studentId) {
            newErrors.studentId = 'Student ID is required.';
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email (e.g. test@gmail.com).';
        }
        if (!formData.phone || formData.phone.length < 10) {
            newErrors.phone = 'Phone number must be at least 10 digits.';
        }
        if (!formData.course) {
            newErrors.course = 'Please select a course.';
        }
        if (!formData.age || formData.age < 16 || formData.age > 60) {
            newErrors.age = 'Age must be between 16 and 60.';
        }
        if (!formData.gender) {
            newErrors.gender = 'Please select a gender.';
        }
        if (!formData.address || formData.address.trim().length < 10) {
            newErrors.address = 'Address must be at least 10 characters.';
        }
        if (!formData.password || formData.password.length < 8) {
            newErrors.password = 'Password must contain at least 8 characters.';
        } else if (!/[A-Z]/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter.';
        } else if (!/[0-9]/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one number.';
        }
        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        return newErrors;
};

const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    console.log("Validation Errors:", validationErrors);

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    onRegister(formData);
};

return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
        <div className="form-section-title">Personal Information</div>

        <div className="form-group">
            <label htmlFor="imageUpload">Student Image</label>
            <input
                type="file"
                id="imageUpload"
                name="image/*"
                onChange={handleFileChange}
                className="file-input"
            />
            {previewUrl && (
                <img
                    src={previewUrl}
                    alt="preview"
                    className="image-preview"
                />
            )}
        </div>

        <input
            type="hidden"
            name="imageUrl"
            value={formData.imageUrl}
        />

            <div className="form-group">
                <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Mahendran Pradhikshalini"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'input-error' : ''}
                />
                {errors.fullName && <p className="error-msg">{errors.fullName}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="studentId">Student ID<span className="required">*</span></label>
                <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    placeholder="e.g. STU001"
                    value={formData.studentId}
                    onChange={handleChange}
                    className={errors.studentId ? 'input-error' : ''}
                    disabled={isEditing}
                />
                {errors.studentId && <p className="error-msg">{errors.studentId}</p>}
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="email">Email<span className="required">*</span></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="e.g. test@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <p className="error-msg">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number<span className="required">*</span></label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="e.g. 0712345678"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'input-error' : ''}
                    />
                    {errors.phone && <p className="error-msg">{errors.phone}</p>}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="course">Course<span className="required">*</span></label>
                    <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className={errors.course ? 'input-error' : ''}
                    >
                        <option value="">Select a course</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="Cloud Computing">Cloud Computing</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                    </select>
                    {errors.course && <p className="error-msg">{errors.course}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age<span className="required">*</span></label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="e.g. 22"
                        min="16"
                        max="60"
                        value={formData.age}
                        onChange={handleChange}
                        className={errors.age ? 'input-error' : ''}
                    />
                    {errors.age && <p className="error-msg">{errors.age}</p>}
                </div>    
            </div>

            <div className="form-group">
                <label>Gender <span className="required">*</span></label>
                <div className="radio-group">
                    {['Male', 'Female', 'Other'].map((g) => (
                        <label key={g} className="radio-label">
                            <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={formData.gender === g}
                            onChange={handleChange}
                            />
                            {g}
                        </label>
                    ))}
                </div>
            
                {errors.gender && <p className="error-msg">{errors.gender}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="address">Address<span className="required">*</span></label>
                <textarea
                    id="address"
                    name="address"
                    placeholder="Enter your full address..."
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? 'input-error' : ''}
                />
                {errors.address && <p className="error-msg">{errors.address}</p>}
            </div> 

            <div className="form-section-title" style={{ marginTop: '8px'}}> Security </div>
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="password">Password<span className="required">*</span></label>
                    <input
                    type="password"
                        id="password"
                        name="password"
                        placeholder="Min 8 chars, 1 uppercase, 1 number"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'input-error' : ''}
                    />
                    {errors.password && <p className="error-msg">{errors.password}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password<span className="required">*</span></label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Re-enter password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword ? 'input-error' : ''}
                    />
                    {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword}</p>}
                </div>
            </div>

            <button type="submit" className="submit-btn">
                {isEditing ? 'Update Student': 'Register Student'}
            </button>

            {isEditing && (
                <button type="button" className="cancel-btn" onClick={onCancel}>
                    Cancel
                </button>
            )}
        </form>
    );
}

export default StudentForm;