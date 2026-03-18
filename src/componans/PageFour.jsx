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

    // ── رسم الصورة على الكانفاس لما الصفحة تفتح ──────────────
    useEffect(() => {
        if (!name || !design || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            // تصغير بسيط للعرض فقط — الحفظ بيكون بالجودة الكاملة
            const maxSide = 1200;
            const scale = Math.min(maxSide / img.naturalWidth, maxSide / img.naturalHeight, 1);
            const W = Math.round(img.naturalWidth * scale);
            const H = Math.round(img.naturalHeight * scale);

            canvas.width = W;
            canvas.height = H;
            ctx.clearRect(0, 0, W, H);
            ctx.drawImage(img, 0, 0, W, H);

            // حساب موضع النص بنفس طريقة PageThree
            const x = design.textX * (W / img.naturalWidth);
            const y = design.textY * (H / img.naturalHeight);
            const fs = Math.round(H * (design.fontSizeRatio || 0.05));

            ctx.save();
            ctx.font = `400 ${fs}px ${design.fontFamily}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = design.color;
            ctx.fillText(String(name).trim(), x, y);
            ctx.restore();

            // حفظ الصورة كـ blob جاهز للمشاركة والتحميل
            canvas.toBlob(blob => {
                if (!blob) return;
                setImageBlob(blob);
                setIsReady(true);
            }, 'image/png', 1);
        };

        img.onerror = err => console.error('فشل تحميل الصورة', err);
        img.src = design.image;
    }, [name, design]);

    // ── واتساب — بيستخدم Web Share API على الموبايل مباشرة ──
    const shareWhatsapp = async () => {
        if (!imageBlob) return;
        const file = new File([imageBlob], 'eid-card.png', { type: 'image/png' });
        const canShare =
            typeof navigator.share === 'function' &&
            typeof navigator.canShare === 'function' &&
            navigator.canShare({ files: [file] });

        if (canShare) {
            try {
                await navigator.share({ title: 'عيد مبارك', text: 'عيد مبارك', files: [file] });
            } catch (err) {
                // المستخدم ألغى المشاركة
                console.log(err);
            }
        } else {
            // ديسكتوب — يفتح واتساب ويب
            window.open('https://web.whatsapp.com/', '_blank');
        }
    };

    // ── باقي المنصات — تحميل الصورة فقط لأن المتصفح لا يدعم share مباشر ──
    const downloadImage = async () => {
        if (!imageBlob) return;
        const url = URL.createObjectURL(imageBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `eid-card-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // ── حماية — لو المستخدم جاء مباشرة بدون بيانات ──────────
    if (!name || !design) return <Navigate to="/" replace />;

    return (
        <div className="page-container">
            <Header />
            <main className="page-four">
                <div className="card split-card">

                    {/* قسم المشاركة */}
                    <div className="share-section">
                        <h3>كل عام وانتم الخير</h3>
                        <p className="share-subtitle">شاركوا فرحتكم مع احبابكم!</p>

                        <div className="share-buttons-grid">
                            {/* واتساب — يشارك مباشرة على الموبايل */}
                            <button className="share-btn whatsapp" onClick={shareWhatsapp} disabled={!isReady}>
                                <FaWhatsapp size={28} />
                            </button>

                            {/* باقي المنصات — تحميل فقط */}
                            <button className="share-btn x-br" onClick={downloadImage} disabled={!isReady}>
                                <FaXTwitter size={28} />
                            </button>
                            <button className="share-btn instagram" onClick={downloadImage} disabled={!isReady}>
                                <img src="/instagram.png" alt="" />
                            </button>
                            <button className="share-btn snapchat" onClick={downloadImage} disabled={!isReady}>
                                <img src="/snap.png" alt="" />
                            </button>
                            <button className="share-btn tiktok" onClick={downloadImage} disabled={!isReady}>
                                <img src="/tik-tok.png" alt="" />
                            </button>
                            <button className="share-btn linkedin" onClick={downloadImage} disabled={!isReady}>
                                <FaLinkedinIn size={28} />
                            </button>
                        </div>
                    </div>

                    {/* قسم معاينة الصورة */}
                    <div className="canvas-section">
                        <div className="page-four-preview">
                            <canvas
                                ref={canvasRef}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </div>
                    </div>

                </div>
            </main>

            <footer>
                <a href="https://linktr.ee/ai.wadod" target="_blank" rel="noreferrer">
                    تصميم و تطوير <span>ودود</span>
                </a>
            </footer>
        </div>
    );
};

export default PageFour;