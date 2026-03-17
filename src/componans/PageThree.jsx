import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';

// ============================================================================
// Font definitions – make sure these fonts are loaded in your project
// ============================================================================
const FONTS = {
    IBM_PLEX_ARABIC: "'IBM Plex Arabic', sans-serif",
    AYNAMA_CURVED: "'Aynama Curved', sans-serif",
    KHALAYA: "'Khalaya', sans-serif",
    KHALAYA_VF: "'Khalaya VF', sans-serif",
};

// ============================================================================
// Asset helpers
// ============================================================================
const getAssetUrlByFilename = (globMap, filename) => {
    const matchKey = Object.keys(globMap).find((k) => k.endsWith(`/${filename}`));
    return matchKey ? globMap[matchKey] : undefined;
};

const googleAssetUrls = import.meta.glob('../assets/images/google/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
});

const normalAssetUrls = import.meta.glob('../assets/images/normal/*.{png,jpg,jpeg,webp}', {
    eager: true,
    import: 'default',
});

// ============================================================================
// Design data – each design now includes a fontFamily property
// ============================================================================
const google = [
    {
        id: 1,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(googleAssetUrls, 'design1.jpg'),
        textX: 250, textY: 350, fontSize: 32, color: '#ffffff',
        fontFamily: FONTS.IBM_PLEX_ARABIC,
    },
    {
        id: 2,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(googleAssetUrls, 'design2.jpg'),
        textX: 200, textY: 300, fontSize: 30, color: '#ff0000',
        fontFamily: FONTS.AYNAMA_CURVED,
    },
    {
        id: 3,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(googleAssetUrls, 'design3.jpg'),
        textX: 180, textY: 280, fontSize: 28, color: '#00ff00',
        fontFamily: FONTS.KHALAYA,
    },
    {
        id: 4,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(googleAssetUrls, 'design4.jpg'),
        textX: 220, textY: 320, fontSize: 34, color: '#0000ff',
        fontFamily: FONTS.KHALAYA_VF,
    },
    {
        id: 5,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(googleAssetUrls, 'design5.jpg'),
        textX: 150, textY: 250, fontSize: 26, color: '#ffff00',
        fontFamily: FONTS.IBM_PLEX_ARABIC,
    },
    {
        id: 6,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(googleAssetUrls, 'design6.jpg'),
        textX: 270, textY: 370, fontSize: 36, color: '#ff00ff',
        fontFamily: FONTS.AYNAMA_CURVED,
    },
    {
        id: 7,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(googleAssetUrls, 'design7.jpg'),
        textX: 190, textY: 290, fontSize: 32, color: '#00ffff',
        fontFamily: FONTS.KHALAYA,
    },
    {
        id: 8,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(googleAssetUrls, 'design8.jpg'),
        textX: 210, textY: 310, fontSize: 30, color: '#ffffff',
        fontFamily: FONTS.KHALAYA_VF,
    },
    {
        id: 9,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(googleAssetUrls, 'design9.jpg'),
        textX: 230, textY: 330, fontSize: 28, color: '#000000',
        fontFamily: FONTS.IBM_PLEX_ARABIC,
    },
    {
        id: 10,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(googleAssetUrls, 'design10.jpg'),
        textX: 250, textY: 350, fontSize: 26, color: '#ffffff',
        fontFamily: FONTS.AYNAMA_CURVED,
    },
    {
        id: 11,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(googleAssetUrls, 'design11.jpg'),
        textX: 270, textY: 370, fontSize: 24, color: '#000000',
        fontFamily: FONTS.KHALAYA_VF,
    },
];

const normal = [
    {
        id: 1,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(normalAssetUrls, 'design1.jpg'),
        textX: 250, textY: 350, fontSize: 32, color: '#ffffff',
        fontFamily: FONTS.IBM_PLEX_ARABIC,
    },
    {
        id: 2,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(normalAssetUrls, 'design2.jpg'),
        textX: 200, textY: 300, fontSize: 30, color: '#ff0000',
        fontFamily: FONTS.AYNAMA_CURVED,
    },
    {
        id: 3,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(normalAssetUrls, 'design3.jpg'),
        textX: 180, textY: 280, fontSize: 28, color: '#00ff00',
        fontFamily: FONTS.KHALAYA,
    },
    {
        id: 4,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(normalAssetUrls, 'design4.jpg'),
        textX: 220, textY: 320, fontSize: 34, color: '#0000ff',
        fontFamily: FONTS.KHALAYA_VF,
    },
    {
        id: 5,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(normalAssetUrls, 'design5.jpg'),
        textX: 150, textY: 250, fontSize: 26, color: '#ffff00',
        fontFamily: FONTS.IBM_PLEX_ARABIC,
    },
    {
        id: 6,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(normalAssetUrls, 'design6.jpg'),
        textX: 270, textY: 370, fontSize: 36, color: '#ff00ff',
        fontFamily: FONTS.AYNAMA_CURVED,
    },
    {
        id: 7,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(normalAssetUrls, 'design7.jpg'),
        textX: 190, textY: 290, fontSize: 32, color: '#00ffff',
        fontFamily: FONTS.KHALAYA,
    },
    {
        id: 8,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(normalAssetUrls, 'design8.jpg'),
        textX: 210, textY: 310, fontSize: 30, color: '#ffffff',
        fontFamily: FONTS.KHALAYA_VF,
    },
    {
        id: 9,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(normalAssetUrls, 'design9.jpg'),
        textX: 230, textY: 330, fontSize: 28, color: '#000000',
        fontFamily: FONTS.IBM_PLEX_ARABIC,
    },
    {
        id: 10,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(normalAssetUrls, 'design10.jpg'),
        textX: 250, textY: 350, fontSize: 26, color: '#ffffff',
        fontFamily: FONTS.AYNAMA_CURVED,
    },
    {
        id: 11,
        name: "Eid Mubarak",
        image: getAssetUrlByFilename(normalAssetUrls, 'design11.jpg'),
        textX: 270, textY: 370, fontSize: 24, color: '#000000',
        fontFamily: FONTS.KHALAYA_VF,
    },
];

// ============================================================================
// PageThree Component
// ============================================================================
const PageThree = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userName = location.state?.name || 'User Name';
    console.log('📛 UserName in PageThree:', userName);

    const memberType = location.state?.memberType;
    const designs = memberType === 'gdsc' ? google : normal;
    const [selectedCard, setSelectedCard] = useState(null);
    const [activeCard, setActiveCard] = useState(null);
    const [previewDesign, setPreviewDesign] = useState(null);
    const canvasRefs = useRef([]);
    const popupCanvasRef = useRef(null);
    const observerRef = useRef(null);

    // --------------------------------------------------------------------------
    // Core drawing function
    // --------------------------------------------------------------------------
    const drawImageWithText = (canvas, design, userName, variant = 'grid') => {
        console.log('🖌️ Drawing on canvas for design ID:', design.id);
        if (!canvas) return;
        if (!design?.image) {
            console.error('❌ Missing design.image for design:', design);
            return;
        }

        console.log('Design raw values:', {
            textX: design.textX,
            textY: design.textY,
            fontSize: design.fontSize,
            color: design.color,
            fontFamily: design.fontFamily,
        });

        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = design.image;

        img.onload = () => {
            console.log(`✅ Image loaded: ${img.width}x${img.height}`);

            // Determine render size (thumbnail for grid, larger for preview)
            const maxSide = variant === 'preview' ? 1200 : 520;
            const renderScale = Math.min(maxSide / img.width, maxSide / img.height, 1);
            const renderW = Math.max(1, Math.round(img.width * renderScale));
            const renderH = Math.max(1, Math.round(img.height * renderScale));

            canvas.width = renderW;
            canvas.height = renderH;
            ctx.clearRect(0, 0, renderW, renderH);
            ctx.drawImage(img, 0, 0, renderW, renderH);

            const safeName = (userName && String(userName).trim()) ? String(userName).trim() : 'User Name';

            // Extract values with fallbacks
            const rawX = Number.isFinite(design.textX) ? design.textX : 0;
            const rawY = Number.isFinite(design.textY) ? design.textY : 0;
            const rawFont = Number.isFinite(design.fontSize) ? design.fontSize : 32;
            const fontFamily = design.fontFamily || FONTS.IBM_PLEX_ARABIC; // default font

            // Scaling factors
            const sx = renderW / img.width;
            const sy = renderH / img.height;

            // Compute initial coordinates
            let x = rawX * sx;
            let y = rawY * sy;

            // Fallback for invalid coordinates (too small)
            const threshold = 50;
            if (x < threshold || y < threshold || rawX === 0 || rawY === 0) {
                console.log(`⚠️ Coordinates too small (${x.toFixed(0)},${y.toFixed(0)}), using fallback position (bottom-right)`);
                x = renderW * 0.8;
                y = renderH * 0.85;
            }

            // Apply padding to avoid edge sticking
            const padding = Math.max(20, renderW * 0.05);
            x = Math.min(Math.max(x, padding), renderW - padding);
            y = Math.min(Math.max(y, padding), renderH - padding);

            // Compute font size (minimum 40px)
            let fontSize = Math.round(rawFont * Math.min(sx, sy));
            fontSize = Math.max(40, fontSize);
            fontSize = Math.min(fontSize, renderH * 0.2);

            // Draw text with shadow and stroke for readability
            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.font = `bold ${fontSize}px ${fontFamily}`;
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = design.color || '#ffffff';

            // Stroke outline
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = fontSize * 0.15;
            ctx.strokeText(safeName, x, y);
            ctx.fillText(safeName, x, y);
            ctx.restore();

            console.log(`✅ Text drawn: "${safeName}" at (${Math.round(x)},${Math.round(y)}) with font ${fontSize}px`);
        };

        img.onerror = (err) => console.error('❌ Error loading image:', design.image, err);
    };

    // --------------------------------------------------------------------------
    // Intersection Observer for lazy loading
    // --------------------------------------------------------------------------
    const observeCanvas = useCallback((canvas, design, userName, variant = 'grid') => {
        if (!canvas) return;
        if (!observerRef.current) {
            observerRef.current = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const canvasEl = entry.target;
                            const designStr = canvasEl.dataset.design;
                            const userNameStr = canvasEl.dataset.username;
                            const variantStr = canvasEl.dataset.variant;
                            if (designStr && userNameStr) {
                                try {
                                    const designObj = JSON.parse(designStr);
                                    drawImageWithText(canvasEl, designObj, userNameStr, variantStr || 'grid');
                                } catch (e) {
                                    console.error('Error parsing design data', e);
                                }
                            }
                            observerRef.current.unobserve(canvasEl);
                        }
                    });
                },
                { threshold: 0.1, rootMargin: '50px' }
            );
        }
        canvas.dataset.design = JSON.stringify(design);
        canvas.dataset.username = userName;
        canvas.dataset.variant = variant;
        observerRef.current.observe(canvas);
    }, []);

    // --------------------------------------------------------------------------
    // Preview modal drawing effect
    // --------------------------------------------------------------------------
    useEffect(() => {
        if (previewDesign && popupCanvasRef.current) {
            drawImageWithText(popupCanvasRef.current, previewDesign, userName, 'preview');
        }
    }, [previewDesign, userName]);

    // --------------------------------------------------------------------------
    // Event handlers
    // --------------------------------------------------------------------------
    const handleViewClick = (e, design) => {
        e.stopPropagation();
        setPreviewDesign(design);
    };

    const handleSelectClick = (e, index) => {
        e.stopPropagation();
        setSelectedCard(index);
        setActiveCard(null);
    };

    const handleNext = async () => {
        if (selectedCard === null) {
            alert('الرجاء اختيار تصميم أولاً');
            return;
        }

        const canvas = canvasRefs.current[selectedCard];
        if (!canvas) {
            alert('تعذر تجهيز الصورة، حاول مرة أخرى');
            return;
        }

        // Create both a blob (for downloading) and a dataURL (to pass to PageFour for share/preview).
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
        if (!blob) {
            alert('تعذر حفظ الصورة، حاول مرة أخرى');
            return;
        }

        const imageDataUrl = canvas.toDataURL('image/png');

        // Download immediately on the same user click.
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `eid-card-${userName || 'user'}-${timestamp}.png`;
        link.click();
        URL.revokeObjectURL(url);

        // Then go to PageFour (share-only).
        navigate('/page-four', {
            state: {
                name: userName,
                design: designs[selectedCard],
                imageDataUrl,
            },
        });
    };

    // Redirect if no user name
    if (!userName) {
        return <Navigate to="/" replace />;
    }

    // --------------------------------------------------------------------------
    // Render (all user-facing text in Arabic)
    // --------------------------------------------------------------------------
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
                                    ref={(el) => {
                                        canvasRefs.current[index] = el;
                                        if (el) observeCanvas(el, design, userName, 'grid');
                                    }}
                                    style={{ width: '100%', height: 'auto', display: 'block', background: '#f0f0f0' }}
                                />
                                {activeCard === index && (
                                    <div className="card-overlay" onClick={(e) => e.stopPropagation()}>
                                        <button className="btn-view" onClick={(e) => handleViewClick(e, design)}>عرض</button>
                                        <button className="btn-select" onClick={(e) => handleSelectClick(e, index)}>اختيار</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="action-buttons">
                        <Link to="/page-two" state={{ name: userName }}>
                            <button className="btn-yellow">السابق</button>
                        </Link>
                        <button onClick={handleNext}>التالي</button>
                    </div>
                </div>
            </main>

            {/* Preview Modal */}
            {previewDesign && (
                <div className="image-popup-overlay" onClick={() => setPreviewDesign(null)}>
                    <div className="image-popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="btn-close-popup" onClick={() => setPreviewDesign(null)}>×</button>
                        <canvas ref={popupCanvasRef} style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageThree;