import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';

const FONTS = {
    IBM_PLEX_ARABIC: "'IBM Plex Arabic', sans-serif",
    AYNAMA_CURVED: "'Aynama Curved', sans-serif",
    KHALAYA: "'Khalaya', sans-serif",
    KHALAYA_VF: "'Khalaya VF', sans-serif",
};

const getAssetUrlByFilename = (globMap, filename) => {
    const matchKey = Object.keys(globMap).find((k) => k.endsWith(`/${filename}`));
    return matchKey ? globMap[matchKey] : undefined;
};

const googleAssetUrls = import.meta.glob('../assets/images/google/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });
const normalAssetUrls = import.meta.glob('../assets/images/normal/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });

// Coordinates on original image 4962x7016
const google = [
    { id: 1, image: getAssetUrlByFilename(googleAssetUrls, 'design1.jpg'), textX: 2481, textY: 2455, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 2, image: getAssetUrlByFilename(googleAssetUrls, 'design2.jpg'), textX: 2481, textY: 5444, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 3, image: getAssetUrlByFilename(googleAssetUrls, 'design3.jpg'), textX: 2481, textY: 5444, fontSizeRatio: 0.05, color: '#9caabc', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 4, image: getAssetUrlByFilename(googleAssetUrls, 'design4.jpg'), textX: 2481, textY: 6595, fontSizeRatio: 0.05, color: '#bcbcbc', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 5, image: getAssetUrlByFilename(googleAssetUrls, 'design5.jpg'), textX: 2481, textY: 6050, fontSizeRatio: 0.05, color: '#c8b89a', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 6, image: getAssetUrlByFilename(googleAssetUrls, 'design6.jpg'), textX: 2481, textY: 5355, fontSizeRatio: 0.06, color: '#393938', fontFamily: FONTS.KHALAYA },
    { id: 7, image: getAssetUrlByFilename(googleAssetUrls, 'design7.jpg'), textX: 2481, textY: 1584, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.AYNAMA_CURVED },
    { id: 8, image: getAssetUrlByFilename(googleAssetUrls, 'design8.jpg'), textX: 2481, textY: 6560, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.AYNAMA_CURVED },
    { id: 9, image: getAssetUrlByFilename(googleAssetUrls, 'design9.jpg'), textX: 2481, textY: 1700, fontSizeRatio: 0.06, color: '#c1803a', fontFamily: FONTS.AYNAMA_CURVED },
    { id: 10, image: getAssetUrlByFilename(googleAssetUrls, 'design10.jpg'), textX: 2481, textY: 2355, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.AYNAMA_CURVED },
    { id: 11, image: getAssetUrlByFilename(googleAssetUrls, 'design11.jpg'), textX: 2821, textY: 1760, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.AYNAMA_CURVED },
];

const normal = [
    { id: 1, image: getAssetUrlByFilename(normalAssetUrls, 'design1.jpg'), textX: 2481, textY: 2455, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 2, image: getAssetUrlByFilename(normalAssetUrls, 'design2.jpg'), textX: 2481, textY: 5444, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 3, image: getAssetUrlByFilename(normalAssetUrls, 'design3.jpg'), textX: 2481, textY: 5444, fontSizeRatio: 0.05, color: '#9caabc', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 4, image: getAssetUrlByFilename(normalAssetUrls, 'design4.jpg'), textX: 2481, textY: 6595, fontSizeRatio: 0.05, color: '#bcbcbc', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 5, image: getAssetUrlByFilename(normalAssetUrls, 'design5.jpg'), textX: 2481, textY: 6050, fontSizeRatio: 0.05, color: '#c8b89a', fontFamily: FONTS.IBM_PLEX_ARABIC },
    { id: 6, image: getAssetUrlByFilename(normalAssetUrls, 'design6.jpg'), textX: 2481, textY: 5355, fontSizeRatio: 0.06, color: '#393938', fontFamily: FONTS.KHALAYA },
    { id: 7, image: getAssetUrlByFilename(normalAssetUrls, 'design7.jpg'), textX: 2481, textY: 1584, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.AYNAMA_CURVED },
    { id: 8, image: getAssetUrlByFilename(normalAssetUrls, 'design8.jpg'), textX: 2481, textY: 6560, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.AYNAMA_CURVED },
    { id: 9, image: getAssetUrlByFilename(normalAssetUrls, 'design9.jpg'), textX: 2481, textY: 1700, fontSizeRatio: 0.06, color: '#c1803a', fontFamily: FONTS.AYNAMA_CURVED },
    { id: 10, image: getAssetUrlByFilename(normalAssetUrls, 'design10.jpg'), textX: 2481, textY: 2355, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.AYNAMA_CURVED },
    { id: 11, image: getAssetUrlByFilename(normalAssetUrls, 'design11.jpg'), textX: 2821, textY: 1760, fontSizeRatio: 0.05, color: '#ffffff', fontFamily: FONTS.AYNAMA_CURVED },
];

function drawCard(canvas, design, userName, variant = 'grid') {
    if (!canvas || !design?.image) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
        const maxSide = variant === 'preview' ? 1200 : 520;
        const scale = Math.min(maxSide / img.naturalWidth, maxSide / img.naturalHeight, 1);
        const W = Math.round(img.naturalWidth * scale);
        const H = Math.round(img.naturalHeight * scale);
        canvas.width = W + 1;
        canvas.height = H;
        ctx.drawImage(img, 0, 0, W, H);
        const name = String(userName || 'User Name').trim() || 'User Name';
        const x = design.textX * (W / img.naturalWidth);
        const y = design.textY * (H / img.naturalHeight);
        const fs = Math.round(H * (design.fontSizeRatio || 0.05));
        ctx.save();
        ctx.font = `400 ${fs}px ${design.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = design.color;
        ctx.fillText(name, x, y);
        ctx.restore();
    };
    img.src = design.image;
}

const PageThree = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userName = location.state?.name || 'User Name';
    const memberType = location.state?.memberType;
    const designs = memberType === 'gdsc' ? google : normal;

    const [selectedCard, setSelectedCard] = useState(null);
    const [activeCard, setActiveCard] = useState(null);
    const [previewDesign, setPreviewDesign] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const canvasRefs = useRef([]);
    const popupCanvasRef = useRef(null);

    const setCanvasRef = useCallback((el, index, design) => {
        if (!el) return;
        canvasRefs.current[index] = el;
        drawCard(el, design, userName, 'grid');
    }, [userName]);

    useEffect(() => {
        if (previewDesign && popupCanvasRef.current)
            drawCard(popupCanvasRef.current, previewDesign, userName, 'preview');
    }, [previewDesign, userName]);

    const handleNext = async () => {
        if (selectedCard === null) {
            setErrorMessage('الرجاء اختيار تصميم أولاً');
            return;
        }

        const design = designs[selectedCard];

        // ✅ temporary canvas with original image size
        const fullCanvas = document.createElement('canvas');
        await new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                fullCanvas.width = img.naturalWidth;
                fullCanvas.height = img.naturalHeight;
                const ctx = fullCanvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const name = String(userName || 'User Name').trim() || 'User Name';
                const x = design.textX;
                const y = design.textY;
                const fs = Math.round(img.naturalHeight * (design.fontSizeRatio || 0.05));

                ctx.save();
                ctx.font = `400 ${fs}px ${design.fontFamily}`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = design.color;
                ctx.fillText(name, x, y);
                ctx.restore();
                resolve();
            };
            img.onerror = reject;
            img.src = design.image;
        });

        const blob = await new Promise(res => fullCanvas.toBlob(res, 'image/png'));
        if (!blob) { setErrorMessage('تعذر حفظ الصورة، حاول مرة أخرى'); return; }

        const imageDataUrl = fullCanvas.toDataURL('image/png');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `eid-card-${userName}-${timestamp}.png`;
        a.click();
        URL.revokeObjectURL(url);

        navigate('/page-four', { state: { name: userName, design: designs[selectedCard], imageDataUrl } });
    };

    if (!userName) return <Navigate to="/" replace />;

    return (
        <div className="page-container">
            <Header />
            <main className="page-three">
                <div className="card">
                    <h3 className="page-three-title">اختر التصميم المناسب لك</h3>
                    <div className="grid-container">
                        {designs.map((design, index) => (
                            <div
                                key={design.id}
                                className={`grid-item ${selectedCard === index ? 'selected' : ''}`}
                                onClick={() => setActiveCard(activeCard === index ? null : index)}
                                role="button"
                                tabIndex={0}
                            >
                                <canvas
                                    ref={el => setCanvasRef(el, index, design)}
                                    style={{ width: '100%', height: 'auto', display: 'block', background: '#f0f0f0' }}
                                />
                                {activeCard === index && (
                                    <div className="card-overlay" onClick={e => e.stopPropagation()}>
                                        <button className="btn-view" onClick={e => { e.stopPropagation(); setPreviewDesign(design); }}>عرض</button>
                                        <button className="btn-select" onClick={e => { e.stopPropagation(); setSelectedCard(index); setActiveCard(null); setErrorMessage(''); }}>اختيار</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                    <div className="action-buttons">
                        <Link to="/page-two" state={{ name: userName }}>
                            <button className="btn-yellow">السابق</button>
                        </Link>
                        <button onClick={handleNext}>التالي</button>
                    </div>
                </div>
            </main>
            {previewDesign && (
                <div className="image-popup-overlay" onClick={() => setPreviewDesign(null)}>
                    <div className="image-popup-content" onClick={e => e.stopPropagation()}>
                        <button className="btn-close-popup" onClick={() => setPreviewDesign(null)}>×</button>
                        <canvas ref={popupCanvasRef} style={{ maxWidth: '100%', maxHeight: '90vh' }} />
                    </div>
                </div>
            )}
            <footer>
                <a href='https://linktr.ee/ai.wadod' target='_blank'>تصميم و تطوير <span>ودود</span></a>
            </footer>
        </div>
    );
};

export default PageThree;