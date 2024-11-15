// frontend/src/components/CampaignHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            const response = await axios.get(`http://localhost:7000/api/v1/campaign/`);
            if(response?.data?.success){
                setCampaigns(response.data.data);
            }
        };

        fetchCampaigns();
    }, []);

    return (
        <div>
            <h2>Campaign List</h2>
            <ul>
                {campaigns.map((campaign) => (
                    <li key={campaign._id}>
                        <strong>{campaign.name}</strong> - {campaign.message} (Sent at: {new Date(campaign.sentAt).toLocaleString()})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CampaignList;