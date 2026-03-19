import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram, FaSnapchatGhost, FaTiktok } from 'react-icons/fa';
import Header from './Header';

const ICONS = {
    instagram: "data:image/png;base64,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",
    snap: "data:image/png;base64,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",
    tiktok: "data:image/png;base64,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",
};


const PageFour = () => {
    const location = useLocation();
    const { name, design } = location.state || {};
    const canvasRef = useRef(null);
    const [imageBlob, setImageBlob] = useState(null);
    const [isReady, setIsReady] = useState(false);

    // Share payload (without file)
    const sharePayload = useMemo(() => ({ title: 'Eid Mubarak', text: 'Eid Mubarak' }), []);

    // Universal share function – uses Web Share if available, otherwise downloads
    const shareImage = async () => {
        if (!imageBlob) return;

        const file = new File([imageBlob], 'eid-card.png', { type: 'image/png' });

        // Check if Web Share with files is supported
        if (typeof navigator.share === 'function' &&
            typeof navigator.canShare === 'function' &&
            navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    ...sharePayload,
                    files: [file]
                });
                return; // success
            } catch (err) {
                console.log('Share cancelled or failed', err);
                // fall through to download
            }
        }

        // Fallback: download the image
        const url = URL.createObjectURL(imageBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `eid-card-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Draw the card on canvas (same logic as PageThree)
    useEffect(() => {
        if (!name || !design || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            const maxSide = 1200;
            const scale = Math.min(maxSide / img.naturalWidth, maxSide / img.naturalHeight, 1);
            const W = Math.round(img.naturalWidth * scale);
            const H = Math.round(img.naturalHeight * scale);

            canvas.width = W;
            canvas.height = H;
            ctx.clearRect(0, 0, W, H);
            ctx.drawImage(img, 0, 0, W, H);

            const safeName = String(name || 'User Name').trim() || 'User Name';

            // Use same coordinate calculations as PageThree
            const x = design.textX * (W / img.naturalWidth);
            const y = design.textY * (H / img.naturalHeight);
            const fs = Math.round(H * (design.fontSizeRatio || 0.05));

            ctx.save();
            ctx.font = `400 ${fs}px ${design.fontFamily}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = design.color;
            ctx.fillText(safeName, x, y);
            ctx.restore();

            canvas.toBlob(blob => {
                if (!blob) return;
                setImageBlob(blob);
                setIsReady(true);
            }, 'image/png', 1);
        };

        img.onerror = err => console.error('Failed to load image', err);
        img.src = design.image;
    }, [name, design]);
    const shareWhatsapp = async () => {
        if (!imageBlob) return;
        const file = new File([imageBlob], 'eid-card.png', { type: 'image/png' });
        const canShare =
            typeof navigator.share === 'function' &&
            typeof navigator.canShare === 'function' &&
            navigator.canShare({ files: [file] });

        if (canShare) {
            try {
                await navigator.share({ title: '', files: [file] });
            } catch (err) { console.log(err); }
        } else {
            window.open('https://web.whatsapp.com/', '_blank');
        }
    };

    const shareX = async () => {
        if (!imageBlob) return;
        const url = URL.createObjectURL(imageBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'eid-card.png';
        a.click();
        URL.revokeObjectURL(url);
        setTimeout(() => {
            window.open('https://twitter.com/intent/tweet?text=""', '_blank');
        }, 500);
    };

    // Redirect if no data
    if (!name || !design) return <Navigate to="/" replace />;

    return (
        <div className="page-container">
            <Header />
            <main className="page-four">
                <div className="card split-card">
                    <div className="share-section">
                        <h3>كل عام وانتم الخير</h3>
                        <p className="share-subtitle">شاركوا فرحتكم مع احبابكم!</p>
                        <div className="share-buttons-grid">
                            {/* All buttons use the same share function – will open native share sheet */}
                            <button
                                className="share-btn whatsapp"
                                onClick={shareWhatsapp}
                                disabled={!isReady}
                                title="Share via WhatsApp"
                            >
                                <FaWhatsapp size={28} />
                            </button>
                            <button
                                className="share-btn x-br"
                                onClick={shareX}
                                disabled={!isReady}
                                title="Share via X"
                            >
                                <FaXTwitter size={28} />
                            </button>
                            <button
                                className="share-btn instagram"
                                onClick={shareImage}
                                disabled={!isReady}
                                title="Share via Instagram"
                            >
                                <img src="/instagram.png" alt="Instagram" style={{ width: 28, height: 28 }} />

                            </button>
                            <button
                                className="share-btn snapchat"
                                onClick={shareImage}
                                disabled={!isReady}
                                title="Share via Snapchat"
                            >
                                <img src="/snap.png" alt="Snapchat" style={{ width: 28, height: 28 }} />
                            </button>
                            <button
                                className="share-btn tiktok"
                                onClick={shareImage}
                                disabled={!isReady}
                                title="Share via TikTok"
                            >
                                <img src={ICONS.tiktok} alt="TikTok" style={{ width: 28, height: 28 }} />
                            </button>
                            <button
                                className="share-btn linkedin"
                                onClick={shareImage}
                                disabled={!isReady}
                                title="Share via LinkedIn"
                            >
                                <FaLinkedinIn size={28} />
                            </button>
                        </div>
                    </div>
                    <div className="canvas-section">
                        <div className="page-four-preview">
                            {/* <CountdownOverlay loaded={isReady} /> */}
                            <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <a href='https://linktr.ee/ai.wadod' target='_blank' rel="noopener noreferrer">
                    تصميم و تطوير <span>ودود</span>
                </a>
            </footer>
        </div>
    );
};

export default PageFour;