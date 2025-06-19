import React from 'react';

function Footer() {
    return (
        <footer style={{
            background: '#0F4C75',
            color: '#FFFFFF',
            fontSize: 15,
            width: '100%',
            boxShadow: '0 -2px 16px rgba(50,130,184,0.10)',
            position: 'relative',
            left: 0,
            bottom: 0,
            zIndex: 100,
            borderRadius: 0,
            margin: 0,
            padding: 0,
            overflow: 'hidden',
            maxWidth: '100vw',
        }}>
            <nav aria-label="Footer" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 24,
                flexWrap: 'wrap',
                maxWidth: 1100,
                margin: '0 auto',
                padding: '16px 16px 0 16px',
                boxSizing: 'border-box',
            }}>
                <section style={{ minWidth: 120, marginBottom: 4 }}>
                    <h2 style={{ fontWeight: 700, marginBottom: 4, color: '#FFFFFF', fontSize: 16 }}>Smart Practice</h2>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li><a href="#" style={footerLink} title="Giới thiệu về Smart Practice">Giới thiệu</a></li>
                        <li><a href="#" style={footerLink} title="Liên hệ Smart Practice">Liên hệ</a></li>
                    </ul>
                </section>
                <section style={{ minWidth: 120, marginBottom: 4 }}>
                    <h2 style={{ fontWeight: 700, marginBottom: 4, color: '#FFFFFF', fontSize: 16 }}>Chính sách</h2>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li><a href="#" style={footerLink} title="Chính sách bảo mật">Bảo mật</a></li>
                        <li><a href="#" style={footerLink} title="Điều khoản sử dụng">Điều khoản</a></li>
                    </ul>
                </section>
                <address style={{ minWidth: 180, marginBottom: 4, fontStyle: 'normal' }}>
                    <h2 style={{ fontWeight: 700, marginBottom: 4, color: '#FFFFFF', fontSize: 16 }}>Liên hệ</h2>
                    <div style={{ color: '#FFFFFF', opacity: 0.9, margin: '1px 0' }}>
                        <span style={{ marginRight: 4 }}>📧</span> <a href="mailto:smartpracticesystem@gmail.com" style={footerLink} title="Gửi email">smartpracticesystem@gmail.com</a>
                    </div>
                    <div style={{ color: '#FFFFFF', opacity: 0.9, margin: '1px 0' }}>
                        <span style={{ marginRight: 4 }}>☎</span> <a href="tel:0123456789" style={footerLink} title="Gọi điện">0123 456 789</a>
                    </div>
                </address>
                <section style={{ minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 4 }}>
                    <h2 style={{ fontWeight: 700, marginBottom: 4, color: '#FFFFFF', fontSize: 16 }}>Kết nối</h2>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <a href="https://www.facebook.com/truongdhbachkhoa" style={iconLink} aria-label="Facebook" title="Facebook Đại học Bách Khoa" rel="noopener noreferrer" target="_blank"><svg width="18" height="18" fill="#FFFFFF" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" /></svg></a>
                        <a href="https://www.youtube.com/@truongdhbachkhoa" style={iconLink} aria-label="YouTube" title="YouTube Đại học Bách Khoa" rel="noopener noreferrer" target="_blank"><svg width="18" height="18" fill="#FFFFFF" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.386.574a2.994 2.994 0 0 0-2.112 2.112C0 8.072 0 12 0 12s0 3.928.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.5 20.5 12 20.5 12 20.5s7.5 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.928 24 12 24 12s0-3.928-.502-5.814zM9.545 15.568V8.432l6.545 3.568-6.545 3.568z" /></svg></a>
                    </div>
                </section>
            </nav>
            <div style={{
                width: '100%',
                borderTop: '1px solid #3282B8',
                padding: '8px 0 4px 0',
                textAlign: 'center',
                fontSize: 13,
                opacity: 0.7,
                background: '#1B262C',
                color: '#FFFFFF',
                marginTop: 8,
                boxSizing: 'border-box',
            }}>
                © 2025 Smart Practice System
            </div>
            <style>{`
                html, body, #root {
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100vw !important;
                    overflow-x: hidden !important;
                    background: #1B262C;
                }
                body {
                    box-sizing: border-box;
                }
                #root {
                    max-width: 100vw !important;
                }

                footer {
                    background: #0F4C75;
                    color: #FFFFFF;
                    font-size: 15px;
                    width: 100%;
                    box-shadow: 0 -2px 16px rgba(50,130,184,0.10);
                    position: relative;
                    left: 0;
                    bottom: 0;
                    z-index: 100;
                    border-radius: 0;
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                    max-width: 100vw;
                }

                .footer-content-inner {
                    display: flex;
                    justify-content: center;
                    gap: 24px;
                    flex-wrap: wrap;
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 16px 16px 0 16px;
                    box-sizing: border-box;
                }

                .footer-section-item {
                    min-width: 120px;
                    margin-bottom: 4px;
                }

                .footer-contact-item {
                    min-width: 180px;
                }

                .footer-social-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .footer-heading {
                    font-weight: 700;
                    margin-bottom: 4px;
                    color: #FFFFFF;
                }

                .footer-link-item {
                    color: #FFFFFF;
                    text-decoration: none;
                    display: block;
                    margin: 2px 0;
                    opacity: 0.9;
                    transition: opacity 0.2s ease-in-out;
                }
                .footer-link-item:hover {
                    opacity: 1;
                    text-decoration: underline;
                }

                .footer-info-item {
                    color: #FFFFFF;
                    opacity: 0.9;
                    margin: 1px 0;
                }

                .social-icons-container {
                    display: flex;
                    gap: 8px;
                }

                .icon-link-item {
                    color: '#FFFFFF';
                    display: inline-flex;
                    align-items: center;
                    text-decoration: 'none';
                    transition: 'opacity 0.2s ease-in-out';
                    opacity: 0.9;
                }
                .icon-link-item:hover {
                    opacity: 1;
                }

                .footer-copyright-text {
                    width: 100%;
                    border-top: 1px solid #3282B8;
                    padding: 8px 0 4px 0;
                    text-align: center;
                    font-size: 13px;
                    opacity: 0.7;
                    background: '#1B262C';
                    color: '#FFFFFF';
                    margin-top: 8px;
                    box-sizing: border-box;
                }

                @media (max-width: 900px) {
                    .footer-content-inner {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 12px;
                        padding: 16px;
                    }
                    .footer-section-item {
                        margin-bottom: 8px;
                    }
                }

                @media (max-width: 600px) {
                    footer {
                        font-size: 13px !important;
                    }
                    .footer-content-inner {
                        padding: 12px;
                    }
                    .footer-section-item {
                        min-width: unset;
                        width: 100%;
                        margin-bottom: 8px;
                    }
                    .footer-copyright-text {
                        font-size: 12px;
                        padding: 6px 0 2px 0;
                    }
                    .footer-social-item {
                        align-items: flex-start;
                    }
                }
            `}</style>
        </footer>
    );
}

const footerLink = {
    color: '#FFFFFF', textDecoration: 'none', display: 'block', margin: '2px 0', opacity: 0.9
};
const iconLink = {
    color: '#FFFFFF', display: 'inline-flex', alignItems: 'center', textDecoration: 'none', transition: 'opacity 0.2s', opacity: 0.9
};

export default Footer;