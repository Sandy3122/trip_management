import React from 'react';

const CardLayout = ({ title, children }) => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
            <div className="card shadow-lg m-2 col-sm-10 col-md-8 col-lg-5" style={{ borderRadius: '15px' }}>
                <div className="card-body p-4">
                    <h1 className="card-title text-center mb-4">{title}</h1>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default CardLayout;
