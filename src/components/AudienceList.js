// frontend/src/components/AudienceSegmentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AudienceSegmentList = ({ setShowForm, setShowCampaignData }) => {
    const [segments, setSegments] = useState([]);
    const [message, setMessage] = useState('');
    const [toggleSendBtn, setToggleSendBtn] = useState(false);
    const [showText, setShowText] = useState('');

    const openCampaignList = (segmentId) => {
        setShowCampaignData({
            show: true,
            audienceId: segmentId
        })
        setShowForm(6);
    }

    const createCommunication = async(segment, index) => {
        const communicationData = { audienceSegmentId : segment?._id,  users: segment?.users };

        try {
            // Mock API call
            const response = await axios.post('http://localhost:7000/api/v1/audience/communication/create', communicationData);

            if (response?.data?.success) {
                // setOrder(initialFormState);  // Reset the form after success
                toast.success('Communication Created Successfully');
                setMessage("");
                // setAudienceSegmentId('');
                // setName('');
            }

        } catch (error) {
            toast.error('Failed to create Campaign.');
        }


        setToggleSendBtn(true);
        setShowText(index);
    }

    const handleSendMessage = async(segment) => {

        const communicationData = { audienceSegmentId : segment?._id,  message };

        try {
            // Mock API call
            const response = await axios.post('http://localhost:7000/api/v1/audience/send/text', communicationData);

            if (response?.data?.success) {
                toast.success('Message sent Successfully');
                setMessage("");
               
            }
        } catch (error) {
            toast.error('Failed to send message.');
        }
    }

    useEffect(() => {
        const fetchSegments = async () => {

            const response = await axios.get('http://localhost:7000/api/v1/audience/');
            if (response?.data?.success) {
                setSegments(response.data.data);
            }
        };
        fetchSegments();
    }, []);

    console.log("vshjhj : ", showText)
    return (
        <div>
            <h2>Audience Segments</h2>
            <div className="card-container" >
                {segments.map((segment, index) => (
                    <div >
                        <div onClick={() => { openCampaignList(segment._id) }}>
                            <Card
                                key={segment._id}
                                title={segment.name}
                                content={`Conditions: ${JSON.stringify(segment.conditions)}`}
                                segment={segment}
                            />
                        </div>

                        <div>
                            {
                                toggleSendBtn && index == showText ? <div style={{ display: 'flex', maxWidth: '600px', width: '100%', alignItems: 'center', margin: '0 auto', justifyContent: 'center' }}>
                                    <label>Message</label>
                                    <input
                                        type="text"
                                        name="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        style={{ width: '100%', padding: '8px', margin: '5px 0px', maxWidth: '200px', width: '100%', padding: '8px' }}
                                    />
                                </div> : ""
                            }
                        </div>


                        <button className={toggleSendBtn&& index == showText  ? "calculateButton" : "logout-button"} onClick={() => { toggleSendBtn ? handleSendMessage(segment) : createCommunication(segment, index) }}>{toggleSendBtn && index == showText ?  "Send Message" :"Want to Send Message" }  </button>
                    </div>
                ))}
            </div>
            <ToastContainer  />
        </div>
    );
};

export default AudienceSegmentList;