// src/components/SendNotification.js
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { toast, Toaster } from 'react-hot-toast';

const SendNotification = () => {
    const [recipientEmails, setRecipientEmails] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await emailjs.send('service_x4f6x1b', 'template_8somydg', {
                to_email: recipientEmails,
                subject: subject,
                message: message,
            }, 'I-oDj-tKwleF7I4Vm');

            console.log('Email sent successfully:', response);
            toast.success('Notification sent successfully');
        } catch (err) {
            console.error('Error sending email:', err);
            setError('Error sending notification');
            toast.error('Error sending notification');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Send Notification</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="recipientEmails" className="block text-sm font-medium text-gray-700">Recipient Emails</label>
                    <input
                        type="text"
                        id="recipientEmails"
                        value={recipientEmails}
                        onChange={(e) => setRecipientEmails(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        placeholder="Enter email addresses separated by commas"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        placeholder="Enter subject"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        rows="4"
                        placeholder="Enter message"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send Notification'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
            <Toaster />
        </div>
    );
};

export default SendNotification;
