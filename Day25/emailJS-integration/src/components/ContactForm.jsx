import React, { useState } from 'react';
import { useForm } from '../hooks/useForm.js';
import { sendContactEmail } from '../services/emailService';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';


const initialValues = {
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
};

const validateForm = (values) => {
    const errors = {};
    if (!values.fullName.trim()){
        errors.fullName = 'Full name is required';
    }
    if (!values.email.trim()){
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = 'Please enter a valid email address';
    }
    if (!values.subject.trim()){
        errors.subject = 'Subject is required';
    }
    if (!values.message.trim()){
        errors.message = 'Message content cannot be empty';
    } else if (values.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters long';
    }
    return errors;

};

const ContactForm = () => {
    const { values, errors, handleChange, handleValidate, resetForm } = useForm(
        initialValues,
        validateForm
    );

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);

        const isvalid = handleValidate();
        if (!isvalid) return;

        setLoading(true);

        try {
            await sendContactEmail(values);
            setStatus('success');
            resetForm();
        } catch (err){
            console.error(err)
            setErrorMessage(err.message || 'Failed to send email. Please try again.');
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-card">
            <h2 className="form-title">Send Us a Message</h2>
            <p className="form-subtitle">Fill out the form below and our technical support team will get back to you.</p>

            {status === 'success' && (
                <SuccessMessage onDismiss={() => setStatus(null)} />
            )}

            {status === 'success' && (
                <ErrorMessage message={errorMessage} onDismiss={() => setStatus(null)} />
            )}

            <form onSubmit={handleSubmit} noValidate className="contact-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name <span className="req">*</span></label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="e.g Pradhikshalini"
                            value={values.fullName}
                            onChange={handleChange}
                            className={errors.fullName ? 'input-error' : ''}
                        />
                        {errors.fullName && <span className="field-err">{errors.fullName}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address <span className="req">*</span></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="pradhikshalini@company.com"
                            value={values.email}
                            onChange={handleChange}
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <span className="field-err">{errors.email}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="+94 123 456 789"
                            value={values.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="companyName">Company Name</label>
                        <input
                            type="text"
                            id="CompanyName"
                            name="companyName"
                            placeholder="Acme Corp"
                            value={values.companyName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="subject">Subject <span className="req">*</span></label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="How can we help you"
                        value={values.subject}
                        onChange={handleChange}
                        className={errors.subject ? 'input-error' : ''}
                    />
                    {errors.subject && <span className="field-err">{errors.subject}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message <span className="req">*</span></label>
                    <textarea
                        id="message"
                        rows="5"
                        placeholder="Please detail your request or technical support needs..."
                        value={values.message}
                        onChange={handleChange}
                        className={errors.message ? 'input-error' : ''}
                    ></textarea>
                    {errors.message && <span className="field-err">{errors.message}</span>}
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? (
                        <span className="loading-state">
                            <span className="spinner"></span> Sending Message...
                        </span>
                    ) : (
                        <span>🚀 Send Message</span>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;