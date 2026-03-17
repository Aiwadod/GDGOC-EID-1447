import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { FaWhatsapp, FaSnapchatGhost, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Header from './Header';

// Font definitions (must match PageThree)
const FONTS = {
    IBM_PLEX_ARABIC: "'IBM Plex Arabic', sans-serif",
    AYNAMA_CURVED: "'Aynama Curved', sans-serif",
    KHALAYA: "'Khalaya', sans-serif",
    KHALAYA_VF: "'Khalaya VF', sans-serif",
};

const PageFour = () => {
    const location = useLocation();
    const { name, design } = location.state || {};
    const canvasRef = useRef(null);
    const [imageBlob, setImageBlob] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const sharePayload = useMemo(() => ({ title: 'عيد مبارك', text: 'عيد مبارك' }), []);

    const shareImage = async (platformLabel) => {
        if (!imageBlob) return;

        const file = new File([imageBlob], 'eid-card.png', { type: 'image/png' });
        const canShareFile =
            typeof navigator !== 'undefined' &&
            typeof navigator.share === 'function' &&
            typeof navigator.canShare === 'function' &&
            navigator.canShare({ files: [file] });

        if (canShareFile) {
            try {
                await navigator.share({ ...sharePayload, files: [file] });
                return;
            } catch (err) {
                console.log(err); // User cancelled or share failed
            }
        }

        // Fallback: download the image
        const url = URL.createObjectURL(imageBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `eid-card-${Date.now()}.png`;
        link.click();
        URL.revokeObjectURL(url);
    };

    useEffect(() => {
        if (!name || !design || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = design.image;

        img.onload = () => {
            // Use a reasonable max dimension for preview (similar to PageThree preview mode)
            const maxSide = 1200; // preview size
            const renderScale = Math.min(maxSide / img.width, maxSide / img.height, 1);
            const renderW = Math.max(1, Math.round(img.width * renderScale));
            const renderH = Math.max(1, Math.round(img.height * renderScale));

            canvas.width = renderW;
            canvas.height = renderH;
            ctx.clearRect(0, 0, renderW, renderH);
            ctx.drawImage(img, 0, 0, renderW, renderH);

            const safeName = (name && String(name).trim()) ? String(name).trim() : 'User Name';

            // Get design values with fallbacks
            const rawX = Number.isFinite(design.textX) ? design.textX : 0;
            const rawY = Number.isFinite(design.textY) ? design.textY : 0;
            const rawFont = Number.isFinite(design.fontSize) ? design.fontSize : 32;
            const fontFamily = design.fontFamily || FONTS.IBM_PLEX_ARABIC;

            // Scaling factors
            const sx = renderW / img.width;
            const sy = renderH / img.height;

            // Compute coordinates
            let x = rawX * sx;
            let y = rawY * sy;

            // Fallback for invalid coordinates
            const threshold = 50;
            if (x < threshold || y < threshold || rawX === 0 || rawY === 0) {
                x = renderW * 0.8;
                y = renderH * 0.85;
            }

            // Apply padding
            const padding = Math.max(20, renderW * 0.05);
            x = Math.min(Math.max(x, padding), renderW - padding);
            y = Math.min(Math.max(y, padding), renderH - padding);

            // Compute font size (minimum 40px)
            let fontSize = Math.round(rawFont * Math.min(sx, sy));
            fontSize = Math.max(40, fontSize);
            fontSize = Math.min(fontSize, renderH * 0.2);

            // Draw text with stroke and shadow for readability
            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.font = `bold ${fontSize}px ${fontFamily}`;
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = design.color || '#ffffff';

            // Outline
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = fontSize * 0.15;
            ctx.strokeText(safeName, x, y);
            ctx.fillText(safeName, x, y);
            ctx.restore();

            // Generate blob for sharing/download
            canvas.toBlob(
                (blob) => {
                    if (!blob) return;
                    setImageBlob(blob);
                    setIsReady(true);
                },
                'image/png',
                1
            );
        };

        img.onerror = (err) => console.error('Failed to load image', err);
    }, [name, design]);

    if (!name || !design) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="page-container">
            <Header />
            <main className="page-four">
                <div className="card split-card">
                    <div className="share-section">
                        <h3>كل عام وانتم الخير</h3>
                        <p className="share-subtitle">شاركوا فرحتكم مع احبابكم!</p>

                        <div className="share-buttons-grid">
                            <button className="share-btn whatsapp" onClick={() => shareImage('WhatsApp')} disabled={!isReady} aria-label="Share on WhatsApp">
                                <FaWhatsapp size={28} />
                            </button>
                            <button className="share-btn x-br" onClick={() => shareImage('X')} disabled={!isReady} aria-label="Share on X">
                                <FaXTwitter size={28} />
                            </button>
                            <button className="share-btn instagram" onClick={() => shareImage('Instagram')} disabled={!isReady} aria-label="Share on Instagram">
                                <FaInstagram size={28} />
                            </button>
                            <button className="share-btn snapchat" onClick={() => shareImage('Snapchat')} disabled={!isReady} aria-label="Share on Snapchat">
                                <FaSnapchatGhost size={28} />
                            </button>
                            <button className="share-btn tiktok" onClick={() => shareImage('TikTok')} disabled={!isReady} aria-label="Share on TikTok">
                                <FaTiktok size={28} />
                            </button>
                            <button className="share-btn linkedin" onClick={() => shareImage('LinkedIn')} disabled={!isReady} aria-label="Share on LinkedIn">
                                <FaLinkedinIn size={28} />
                            </button>
                        </div>
                    </div>

                    <div className="canvas-section">
                        <div className="page-four-preview">
                            <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <a href='https://linktr.ee/ai.wadod' target='.blank'>تصميم و تطوير <span>ودود</span></a>
            </footer>
        </div>
    );
};

export default PageFour;