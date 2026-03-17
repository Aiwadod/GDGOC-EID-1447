import { useState, useRef, useEffect } from 'react';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';

const designs = [
    {
        id: 1,
        name: "عيد مبارك",
        image: "/images/design1.jpg",
        textX: 250, textY: 350, fontSize: 32, color: '#ffffff'
    },
    {
        id: 2,
        name: "عيد مبارك",
        image: "/images/design1.jpg",
        textX: 200, textY: 300, fontSize: 30, color: '#ff0000'
    },
    {
        id: 3,
        name: "عيد مبارك",
        image: "/images/design1.jpg",
        textX: 180, textY: 280, fontSize: 28, color: '#00ff00'
    },
    {
        id: 4,
        name: "عيد مبارك",
        image: "/images/design1.jpg",
        textX: 220, textY: 320, fontSize: 34, color: '#0000ff'
    },
    {
        id: 5,
        name: "عيد مبارك",
        image: "/images/design1.jpg",
        textX: 150, textY: 250, fontSize: 26, color: '#ffff00'
    },
    {
        id: 6,
        name: "عيد مبارك",
        image: "/images/design1.jpg",
        textX: 270, textY: 370, fontSize: 36, color: '#ff00ff'
    },
    {
        id: 7,
        name: "عيد مبارك",
        image: "/images/design1.jpg",
        textX: 190, textY: 290, fontSize: 32, color: '#00ffff'
    },
    {
        id: 8,
        name: "عيد مبارك",
        image: "/images/design1.jpg",
        textX: 210, textY: 310, fontSize: 30, color: '#ffffff'
    }
];
const PageThree = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userName = location.state?.name;
    const [selectedCard, setSelectedCard] = useState(null);
    const [activeCard, setActiveCard] = useState(null);
    const [previewDesign, setPreviewDesign] = useState(null);
    const canvasRefs = useRef([]);
    const popupCanvasRef = useRef(null);

    // Draw template image + user name onto a canvas.
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
        img.onerror = (err) => {
            console.error('خطأ في تحميل الصورة:', design.image, err);
        };
    };

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
            navigate('/page-four', { state: { name: userName, design: designs[selectedCard] }});
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
                                        // استدعاء الرسم فور توفر العنصر
                                        if (el) drawImageWithText(el, design, userName);
                                    }}
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
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