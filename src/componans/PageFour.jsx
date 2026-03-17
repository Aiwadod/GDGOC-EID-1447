import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { FaWhatsapp, FaSnapchatGhost, FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Header from './Header';

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
                // User cancelled or OS share failed — fall back to download.
                console.log(err);
            }
        }

        alert(`المشاركة عبر ${platformLabel} غير مدعومة مباشرة على هذا الجهاز. الصورة تم حفظها عند الضغط على "التالي" — شاركها يدويًا من المعرض.`);
    };

    useEffect(() => {
        if (!name || !design || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = design.image;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            ctx.font = `bold ${design.fontSize}px 'Cairo', sans-serif`;
            ctx.fillStyle = design.color;
            ctx.textAlign = 'right';
            ctx.fillText(name, design.textX, design.textY);

            // Create a PNG blob for download/share.
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
        </div>
    );
};

export default PageFour;