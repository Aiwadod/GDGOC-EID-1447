import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';

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

const google = [
    {
        id: 1,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design1.jpg'),
        textX: 250, textY: 350, fontSize: 32, color: '#ffffff'
    },
    {
        id: 2,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design2.jpg'),
        textX: 200, textY: 300, fontSize: 30, color: '#ff0000'
    },
    {
        id: 3,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design3.jpg'),
        textX: 180, textY: 280, fontSize: 28, color: '#00ff00'
    },
    {
        id: 4,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design4.jpg'),
        textX: 220, textY: 320, fontSize: 34, color: '#0000ff'
    },
    {
        id: 5,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design5.jpg'),
        textX: 150, textY: 250, fontSize: 26, color: '#ffff00'
    },
    {
        id: 6,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design6.jpg'),
        textX: 270, textY: 370, fontSize: 36, color: '#ff00ff'
    },
    {
        id: 7,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design7.jpg'),
        textX: 190, textY: 290, fontSize: 32, color: '#00ffff'
    },
    {
        id: 8,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design8.jpg'),
        textX: 210, textY: 310, fontSize: 30, color: '#ffffff'
    },
    {
        id: 9,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design9.jpg'),
        textX: 230, textY: 330, fontSize: 28, color: '#000000'
    },
    {
        id: 10,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design10.jpg'),
        textX: 250, textY: 350, fontSize: 26, color: '#ffffff'
    },
    {
        id: 11,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(googleAssetUrls, 'design11.jpg'),
        textX: 270, textY: 370, fontSize: 24, color: '#000000'
    },
];

const normal = [
    {
        id: 1,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design1.jpg'),
        textX: 250, textY: 350, fontSize: 32, color: '#ffffff'
    },
    {
        id: 2,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design2.jpg'),
        textX: 200, textY: 300, fontSize: 30, color: '#ff0000'
    },
    {
        id: 3,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design3.jpg'),
        textX: 180, textY: 280, fontSize: 28, color: '#00ff00'
    },
    {
        id: 4,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design4.jpg'),
        textX: 220, textY: 320, fontSize: 34, color: '#0000ff'
    },
    {
        id: 5,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design5.jpg'),
        textX: 150, textY: 250, fontSize: 26, color: '#ffff00'
    },
    {
        id: 6,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design6.jpg'),
        textX: 270, textY: 370, fontSize: 36, color: '#ff00ff'
    },
    {
        id: 7,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design7.jpg'),
        textX: 190, textY: 290, fontSize: 32, color: '#00ffff'
    },
    {
        id: 8,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design8.jpg'),
        textX: 210, textY: 310, fontSize: 30, color: '#ffffff'
    },
    {
        id: 9,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design9.jpg'),
        textX: 230, textY: 330, fontSize: 28, color: '#000000'
    },
    {
        id: 10,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design10.jpg'),
        textX: 250, textY: 350, fontSize: 26, color: '#ffffff'
    },
    {
        id: 11,
        name: "عيد مبارك",
        image: getAssetUrlByFilename(normalAssetUrls, 'design11.jpg'),
        textX: 270, textY: 370, fontSize: 24, color: '#000000'
    },
];
const PageThree = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userName = location.state?.name;
    const memberType = location.state?.memberType;
    const designs = memberType === 'gdsc' ? google : normal;
    const [selectedCard, setSelectedCard] = useState(null);
    const [activeCard, setActiveCard] = useState(null);
    const [previewDesign, setPreviewDesign] = useState(null);
    const canvasRefs = useRef([]);
    const popupCanvasRef = useRef(null);
    const observerRef = useRef(null); // مراقب التقاطع

    // دالة رسم الصورة والنص (بدون تغيير)
    const drawImageWithText = (canvas, design, userName) => {
        if (!canvas) return;
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
            ctx.fillText(userName, design.textX, design.textY);
        };
        img.onerror = (err) => console.error('خطأ في تحميل الصورة:', design.image, err);
    };

    // دالة لبدء مراقبة عنصر canvas
    const observeCanvas = useCallback((canvas, design, userName) => {
        if (!canvas) return;

        // إذا لم يتم إنشاء الـ observer بعد، قم بإنشائه
        if (!observerRef.current) {
            observerRef.current = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const canvasEl = entry.target;
                        // استرجاع البيانات من data attributes
                        const designStr = canvasEl.dataset.design;
                        const userNameStr = canvasEl.dataset.username;
                        if (designStr && userNameStr) {
                            try {
                                const designObj = JSON.parse(designStr);
                                drawImageWithText(canvasEl, designObj, userNameStr);
                            } catch (e) {
                                console.error('خطأ في تحليل بيانات التصميم', e);
                            }
                        }
                        // بعد الرسم، توقف عن مراقبة هذا العنصر
                        observerRef.current.unobserve(canvasEl);
                    }
                });
            }, { threshold: 0.1, rootMargin: '50px' }); // يبدأ التحميل عندما يصبح العنصر على بعد 50px من الظهور
        }

        // تخزين بيانات التصميم واسم المستخدم في data attributes
        canvas.dataset.design = JSON.stringify(design);
        canvas.dataset.username = userName;

        // بدء المراقبة
        observerRef.current.observe(canvas);
    }, []);

    // عرض الصورة في النافذة المنبثقة (نفس الكود)
    useEffect(() => {
        if (previewDesign && popupCanvasRef.current) {
            drawImageWithText(popupCanvasRef.current, previewDesign, userName);
        }
    }, [previewDesign, userName]);

    const handleViewClick = (e, design) => {
        e.stopPropagation();
        setPreviewDesign(design);
    };

    const handleSelectClick = (e, index) => {
        e.stopPropagation();
        setSelectedCard(index);
        setActiveCard(null);
    };

    const handleNext = () => {
        if (selectedCard !== null) {
            const selectedCanvas = canvasRefs.current[selectedCard];
            if (selectedCanvas) {
                selectedCanvas.toBlob((blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `eid-card-${userName || 'user'}-${Date.now()}.png`;
                        link.click();
                        URL.revokeObjectURL(url);
                    }
                    navigate('/page-four', { state: { name: userName, design: designs[selectedCard] } });
                }, 'image/png');
            } else {
                navigate('/page-four', { state: { name: userName, design: designs[selectedCard] } });
            }
        } else {
            alert('الرجاء اختيار أحد التصاميم للمتابعة');
        }
    };

    if (!userName) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="page-container">
            <Header />
            <main className="page-three">
                <div className="card">
                    <h3 className="page-three-title">أختار التصميم الذي يناسبك</h3>

                    <div className="grid-container">
                        {designs.map((design, index) => (
                            <div
                                key={design.id}
                                className={`grid-item ${selectedCard === index ? 'selected' : ''}`}
                                onClick={() => setActiveCard(activeCard === index ? null : index)}
                                role="button"
                                tabIndex={0}
                                aria-label={`Select template ${index + 1}`}
                            >
                                <canvas
                                    ref={(el) => {
                                        canvasRefs.current[index] = el;
                                        if (el) observeCanvas(el, design, userName); // استخدام lazy loading
                                    }}
                                    style={{ width: '100%', height: 'auto', display: 'block', background: '#f0f0f0' }} // خلفية مؤقتة
                                />
                                {activeCard === index && (
                                    <div className="card-overlay" onClick={(e) => { e.stopPropagation(); setActiveCard(null); }}>
                                        <button className="btn-view" onClick={(e) => handleViewClick(e, design)}>عرض</button>
                                        <button className="btn-select" onClick={(e) => handleSelectClick(e, index)}>إختيار</button>
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

            {previewDesign && (
                <div className="image-popup-overlay" onClick={() => setPreviewDesign(null)}>
                    <div className="image-popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="btn-close-popup" onClick={() => setPreviewDesign(null)}>×</button>
                        <canvas ref={popupCanvasRef} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageThree;