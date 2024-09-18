import React, { useState, useEffect } from 'react';
import bsnlLogo from '../assets/bsnl.png';
import airtelLogo from '../assets/airtel.png';
import ideaLogo from '../assets/idea.png';
import hathwayLogo from '../assets/hathway.png';
import jioLogo from '../assets/jio.png';
import vodafoneLogo from '../assets/vodafone.png';
import defaultLogo from '../assets/default.png'; // Default logo

const providerLogos = {
    Bsnl: bsnlLogo,
    Airtel: airtelLogo,
    Idea: ideaLogo,
    Hathway: hathwayLogo,
    Jio: jioLogo,
    Vodafone: vodafoneLogo,
};

function LeftSection({ sortBy, onSelectProvider }) {
    const [serviceProviders, setServiceProviders] = useState([]);

    useEffect(() => {
        const fetchServiceProviders = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/providers`);
                const data = await response.json();
                setServiceProviders(data);
            } catch (error) {
                console.error('Error fetching service providers:', error);
            }
        };

        fetchServiceProviders();
    }, [sortBy]);

    return (
        <div style={leftSectionContainerStyle}>
            <div style={headingContainerStyle}>
                <h2 style={{ margin: 0, paddingTop: '8px' }}>Service Providers List</h2>
                <p style={{ margin: 0, paddingTop: '8px', paddingBottom: '8px' }}>
                    Sorted by: {sortBy || 'None'}
                </p>
            </div>
            <div style={scrollableListStyle}>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    {serviceProviders.map(provider => (
                        <li
                            key={provider.id}
                            style={providerItemStyle}
                            onClick={() => onSelectProvider(provider)}
                        >
                            <div style={providerInfoStyle}>
                                <img
                                    src={providerLogos[provider.name] || defaultLogo}
                                    alt={`${provider.name} Logo`}
                                    style={logoStyle}
                                />
                                <div>
                                    <strong>{provider.name}</strong>
                                    <span style={{ marginLeft: '10px', color: '#777' }}>{provider.plan} Plan</span>
                                    <br />
                                    {sortBy === 'price' ? (
                                        <span>Price: {provider.price} &#8377;</span>
                                    ) : (
                                        <span>Rating: {provider.rating} &#9733;</span>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// Styles for the component
const leftSectionContainerStyle = {
    width: '60%',
    backgroundColor: '#ffffff',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
};

const headingContainerStyle = {
    flexShrink: 0,
    backgroundColor: '#f8f8f8',
    padding: '4px 8px',
    borderBottom: '1px solid #ddd',
};

const scrollableListStyle = {
    overflowY: 'auto',
    flexGrow: 1,
};

const providerItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
};

const providerInfoStyle = {
    display: 'flex',
    alignItems: 'center',
};

const logoStyle = {
    width: '50px',
    height: 'auto',
    marginRight: '10px',
};

export default LeftSection;
