import React, { useState, useEffect } from 'react';
import defaultLogo from '../assets/default.png';
const providerLogos = {
    Bsnl: require('../assets/bsnl.png'),
    Airtel: require('../assets/airtel.png'),
    Idea: require('../assets/idea.png'),
    Hathway: require('../assets/hathway.png'),
    Jio: require('../assets/jio.png'),
    Vodafone: require('../assets/vodafone.png'),

};

function RightSection({ providers = [], selectedProvider, onClose, onSort }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProvider, setFilteredProvider] = useState(null);

    useEffect(() => {
        if (searchTerm) {
            const provider = providers.find(p =>
                p.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
                p.name.toLowerCase() === searchTerm.toLowerCase()
            );
            setFilteredProvider(provider || null);
        } else {
            setFilteredProvider(selectedProvider);
        }
    }, [searchTerm, providers, selectedProvider]);

    return (
        <div style={rightSectionStyle}>
            <div style={searchContainerStyle}>
                <input
                    type="text"
                    placeholder="Search providers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={searchInputStyle}
                />
                <button
                    onClick={onClose}
                    style={closeButtonStyle}
                    aria-label="Close details"
                >
                    &times;
                </button>
            </div>

            <div style={sortButtonsContainerStyle}>
                <button onClick={() => onSort('price')} style={sortButtonStyle}>
                    Sort by Price
                </button>
                <button onClick={() => onSort('rating')} style={sortButtonStyle}>
                    Sort by Rating
                </button>
            </div>

            {filteredProvider ? (
                <>
                    <h3>{filteredProvider.name}</h3>
                    <img
                        src={providerLogos[filteredProvider.name] || defaultLogo} // Fallback to default logo
                        alt={`${filteredProvider.name} Logo`}
                        style={{ width: '100px', height: 'auto' }}
                    />
                    <p><strong>Plan:</strong> {filteredProvider.plan}</p>
                    <p><strong>Validity:</strong> {filteredProvider.validity}</p>
                    <p><strong>Price:</strong> {filteredProvider.price}</p>
                    <p><strong>Max Speed:</strong> {filteredProvider.max_speed}</p>
                    <p><strong>Contact:</strong> {filteredProvider.contact_number}</p>
                    <p><strong>Email:</strong> {filteredProvider.email}</p>
                    <p><strong>Description:</strong> {filteredProvider.description}</p>
                    <div style={actionButtonsStyle}>
                        <button onClick={() => alert(`Linking to ${filteredProvider.name}`)} style={actionButtonStyle}>
                            Link
                        </button>
                        <button onClick={() => alert(`Sharing ${filteredProvider.name}`)} style={actionButtonStyle}>
                            Share
                        </button>
                        <button onClick={() => alert(`Downloading ${filteredProvider.name} details`)} style={actionButtonStyle}>
                            Download
                        </button>
                    </div>
                </>
            ) : (
                <p>No provider found. Please try another search.</p>
            )}
        </div>
    );
}

const rightSectionStyle = {
    width: '40%',
    backgroundColor: '#f8f9fa',
    border: '1px solid #ccc',
    marginLeft: '16px',
    position: 'relative',
    boxSizing: 'border-box',
    overflowY: 'auto',
    padding: '8px 8px'
};

const searchContainerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
};

const searchInputStyle = {
    width: '100%',
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px'
};

const closeButtonStyle = {
    position: 'absolute',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '24px',
    color: '#333'
};

const sortButtonsContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
};

const sortButtonStyle = {
    padding: '12px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '14px'
};

const actionButtonsStyle = {
    marginTop: '20px',
    display: 'flex',
    gap: '10px'
};

const actionButtonStyle = {
    padding: '12px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '14px'
};

export default RightSection;
