import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', ...props }) => {
    const primaryBackgroundColor = '#3282B8';
    const primaryColor = '#fff';
    const secondaryBackgroundColor = '#BBE1FA';
    const secondaryColor = '#0F4C75';
    const outlineBorderColor = '#3282B8';
    const hoverActiveBackgroundColor = '#0F4C75';

    const baseStyle = {
        padding: '10px 24px',
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 16,
        border: 'none',
        cursor: 'pointer',
        transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out',
        outline: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
    };

    const variantStyles = {
        primary: {
            background: primaryBackgroundColor,
            color: primaryColor,
        },
        secondary: {
            background: secondaryBackgroundColor,
            color: secondaryColor,
        },
        outline: {
            background: 'transparent',
            color: outlineBorderColor,
            border: `2px solid ${outlineBorderColor}`,
        },
    };

    return (
        <button
            type={type}
            style={{ ...baseStyle, ...variantStyles[variant] }}
            onClick={onClick}
            {...props}
        >
            {children}
            <style>{`
                button[type="${type}"][style*="padding: 10px 24px"] {}
                button[type="${type}"][style*="background: ${primaryBackgroundColor}"]:hover,
                button[type="${type}"][style*="background: ${primaryBackgroundColor}"]:active {
                    background: ${hoverActiveBackgroundColor} !important;
                    color: ${primaryColor} !important;
                }
                button[type="${type}"][style*="background: ${secondaryBackgroundColor}"]:hover,
                button[type="${type}"][style*="background: ${secondaryBackgroundColor}"]:active {
                    background: ${hoverActiveBackgroundColor} !important;
                    color: ${primaryColor} !important;
                }
                button[type="${type}"][style*="border: 2px solid ${outlineBorderColor}"]:hover,
                button[type="${type}"][style*="border: 2px solid ${outlineBorderColor}"]:active {
                    background: ${outlineBorderColor} !important;
                    color: ${primaryColor} !important;
                }
                button[type="${type}"][style*="padding: 10px 24px"]:focus-visible {
                    box-shadow: 0 0 0 3px rgba(50, 130, 184, 0.4);
                    outline: none;
                }
                @media (max-width: 600px) {
                    button[type="${type}"][style*="padding: 10px 24px"] {
                        padding: 8px 16px;
                        font-size: 14px;
                    }
                }
            `}</style>
        </button>
    );
};

export default Button;