import emailjs from '@emailjs/browser';

export const sendContactEmail = async (formData) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'sevice_gmail';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template-contact';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your-public-key';

    const templateParams = {
        user_name: formData.fullName,
        user_email: formData.email,
        user_phone: formData.phone,
        company_name: formData.companyName,
        aubject: formData.subject,
        message: formData.message,
    };

    try {
        if (publicKey && publicKey !== 'your_public_key') {
            const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
            return { success: true, response};
        } else {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log('Simulated EmailJS Send:', templateParams);
            return { success: true, simulated: true};
        }
    }  catch (error) {
        console.error('EmailJS Error:', error);
        throw new Error(error?.text || error?.message || 'Failed to send email via EmailJS');
    };
};