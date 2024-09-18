import React, { useState, useEffect } from 'react';
import Header from './Header'; // Ensure the path to Header is correct
import LeftSection from './LeftSection';
import RightSection from './RightSection';

function ParentComponent() {
    const [serviceProviders, setServiceProviders] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [sortBy, setSortBy] = useState('None');

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
    }, []);

    const handleSelectProvider = (provider) => {
        setSelectedProvider(provider);
    };

    const handleClose = () => {
        setSelectedProvider(null);
    };

    const handleSort = (criteria) => {
        setSortBy(criteria);
    };

    return (
        <div style={parentContainerStyle}>
            <div style={headerContainerStyle}>
                <Header />
            </div>
            <div style={flexRowStyle}>
                <LeftSection
                    sortBy={sortBy}
                    onSelectProvider={handleSelectProvider}
                />
                <RightSection
                    providers={serviceProviders}
                    selectedProvider={selectedProvider}
                    onClose={handleClose}
                    onSort={handleSort}
                />
            </div>
        </div>
    );
}

const parentContainerStyle = {
    display: 'flex',
    flexDirection: 'column', // Align children in a row
    height: '100vh',
};

const headerContainerStyle = {
    height: '96px', // Set the height of the Header container
    flexShrink: 0,   // Prevent shrinking of the header
};

const flexRowStyle = {
    display: 'flex',
    flexDirection: 'row', // Align children in a row
    flexGrow: 1, // Allow the row to grow and take up the remaining space
    padding: '16px',
    height: 'calc(100vh - 128px)',
};

export default ParentComponent;
