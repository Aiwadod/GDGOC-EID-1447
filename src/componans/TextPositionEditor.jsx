import { useState, useRef, useEffect, useCallback } from 'react';

// ============================================================
// استورد نفس البيانات من ملفك الأصلي
// ============================================================
import.meta.glob; // placeholder - استبدل الـ designs بتاعتك هنا

const FONTS = {
    IBM_PLEX_ARABIC: "'IBM Plex Arabic', sans-serif",
    AYNAMA_CURVED:   "'Aynama Curved', sans-serif",
    KHALAYA:         "'Khalaya', sans-serif",
    KHALAYA_VF:      "'Khalaya VF', sans-serif",
};

const getAssetUrlByFilename = (globMap, filename) => {
    const matchKey = Object.keys(globMap).find((k) => k.endsWith(`/${filename}`));
    return matchKey ? globMap[matchKey] : undefined;
};

const googleAssetUrls = import.meta.glob('../assets/images/google/*.{png,jpg,jpeg,webp}', {
    eager: true, import: 'default',
});
const normalAssetUrls = import.meta.glob('../assets/images/normal/*.{png,jpg,jpeg,webp}', {
    eager: true, import: 'default',
});

// ============================================================
// البيانات الأولية — نفس مصفوفتك الأصلية
// ============================================================
const INITIAL_GOOGLE = [
    { id:1,  name:"Eid Mubarak", image: getAssetUrlByFilename(googleAssetUrls,'design1.jpg'),  textX:700, textY:600, fontSize:32, color:'#ffffff', fontFamily:FONTS.IBM_PLEX_ARABIC },
    { id:2,  name:"Eid Mubarak", image: getAssetUrlByFilename(googleAssetUrls,'design2.jpg'),  textX:200, textY:300, fontSize:30, color:'#ff0000', fontFamily:FONTS.AYNAMA_CURVED },
    { id:3,  name:"Eid Mubarak", image: getAssetUrlByFilename(googleAssetUrls,'design3.jpg'),  textX:180, textY:280, fontSize:28, color:'#00ff00', fontFamily:FONTS.KHALAYA },
    { id:4,  name:"Eid Mubarak", image: getAssetUrlByFilename(googleAssetUrls,'design4.jpg'),  textX:220, textY:320, fontSize:34, color:'#0000ff', fontFamily:FONTS.KHALAYA_VF },
    { id:5,  name:"Eid Mubarak", image: getAssetUrlByFilename(googleAssetUrls,'design5.jpg'),  textX:150, textY:250, fontSize:26, color:'#ffff00', fontFamily:FONTS.IBM_PLEX_ARABIC },
    { id:6,  name:"Eid Mubarak", image: getAssetUrlByFilename(googleAssetUrls,'design6.jpg'),  textX:270, textY:370, fontSize:36, color:'#ff00ff', fontFamily:FONTS.AYNAMA_CURVED },
    { id:7,  name:"Eid Mubarak", image: getAssetUrlByFilename(googleAssetUrls,'design7.jpg'),  textX:190, textY:290, fontSize:32, color:'#00ffff', fontFamily:FONTS.KHALAYA },
    { id:8,  name:"Eid Mubarak", image: getAssetUrlByFilename(googleAssetUrls,'design8.jpg'),  textX:210, textY:310, fontSize:30, color:'#ffffff', fontFamily:FONTS.KHALAYA_VF },
    { id:9,  name:"Eid Mubarak", image: getAssetUrlByFilename(googleAssetUrls,'design9.jpg'),  textX:230, textY:330, fontSize:28, color:'#000000', fontFamily:FONTS.IBM_PLEX_ARABIC },
    { id:10, name:"Eid Mubarak", image: getAssetUrlByFilename(googleAssetUrls,'design10.jpg'), textX:250, textY:350, fontSize:26, color:'#ffffff', fontFamily:FONTS.AYNAMA_CURVED },
    { id:11, name:"Eid Mubarak", image: getAssetUrlByFilename(googleAssetUrls,'design11.jpg'), textX:270, textY:370, fontSize:24, color:'#000000', fontFamily:FONTS.KHALAYA_VF },
];

const INITIAL_NORMAL = [
    { id:1,  name:"Eid Mubarak", image: getAssetUrlByFilename(normalAssetUrls,'design1.jpg'),  textX:250, textY:350, fontSize:32, color:'#ffffff', fontFamily:FONTS.IBM_PLEX_ARABIC },
    { id:2,  name:"Eid Mubarak", image: getAssetUrlByFilename(normalAssetUrls,'design2.jpg'),  textX:200, textY:300, fontSize:30, color:'#ff0000', fontFamily:FONTS.AYNAMA_CURVED },
    { id:3,  name:"Eid Mubarak", image: getAssetUrlByFilename(normalAssetUrls,'design3.jpg'),  textX:180, textY:280, fontSize:28, color:'#00ff00', fontFamily:FONTS.KHALAYA },
    { id:4,  name:"Eid Mubarak", image: getAssetUrlByFilename(normalAssetUrls,'design4.jpg'),  textX:220, textY:320, fontSize:34, color:'#0000ff', fontFamily:FONTS.KHALAYA_VF },
    { id:5,  name:"Eid Mubarak", image: getAssetUrlByFilename(normalAssetUrls,'design5.jpg'),  textX:150, textY:250, fontSize:26, color:'#ffff00', fontFamily:FONTS.IBM_PLEX_ARABIC },
    { id:6,  name:"Eid Mubarak", image: getAssetUrlByFilename(normalAssetUrls,'design6.jpg'),  textX:270, textY:370, fontSize:36, color:'#ff00ff', fontFamily:FONTS.AYNAMA_CURVED },
    { id:7,  name:"Eid Mubarak", image: getAssetUrlByFilename(normalAssetUrls,'design7.jpg'),  textX:190, textY:290, fontSize:32, color:'#00ffff', fontFamily:FONTS.KHALAYA },
    { id:8,  name:"Eid Mubarak", image: getAssetUrlByFilename(normalAssetUrls,'design8.jpg'),  textX:210, textY:310, fontSize:30, color:'#ffffff', fontFamily:FONTS.KHALAYA_VF },
    { id:9,  name:"Eid Mubarak", image: getAssetUrlByFilename(normalAssetUrls,'design9.jpg'),  textX:230, textY:330, fontSize:28, color:'#000000', fontFamily:FONTS.IBM_PLEX_ARABIC },
    { id:10, name:"Eid Mubarak", image: getAssetUrlByFilename(normalAssetUrls,'design10.jpg'), textX:250, textY:350, fontSize:26, color:'#ffffff', fontFamily:FONTS.AYNAMA_CURVED },
    { id:11, name:"Eid Mubarak", image: getAssetUrlByFilename(normalAssetUrls,'design11.jpg'), textX:270, textY:370, fontSize:24, color:'#000000', fontFamily:FONTS.KHALAYA_VF },
];

// ============================================================
// TextPositionEditor — أداة ضبط مكان النص بالسحب
// ============================================================
const TextPositionEditor = () => {
    const [category, setCategory]     = useState('google'); // 'google' | 'normal'
    const [activeIdx, setActiveIdx]   = useState(0);
    const [previewName, setPreviewName] = useState('محمد أحمد');
    const [copied, setCopied]         = useState(false);

    // نسخ قابلة للتعديل من البيانات
    const [googleDesigns, setGoogleDesigns] = useState(INITIAL_GOOGLE);
    const [normalDesigns, setNormalDesigns] = useState(INITIAL_NORMAL);

    const canvasRef  = useRef(null);
    const imgRef     = useRef(null);
    const dragging   = useRef(false);
    const imgLoaded  = useRef(false);

    const designs        = category === 'google' ? googleDesigns : normalDesigns;
    const setDesigns     = category === 'google' ? setGoogleDesigns : setNormalDesigns;
    const currentDesign  = designs[activeIdx];

    // ─── رسم الصورة + النص على الكانفاس ───────────────────────
    const redraw = useCallback(() => {
        const canvas = canvasRef.current;
        const img    = imgRef.current;
        if (!canvas || !img || !imgLoaded.current) return;

        const ctx = canvas.getContext('2d');
        canvas.width  = img.naturalWidth;
        canvas.height = img.naturalHeight;

        ctx.drawImage(img, 0, 0);

        const { textX, textY, fontSize, color, fontFamily } = currentDesign;
        const scaledFont = Math.max(12, fontSize);

        ctx.save();
        ctx.shadowColor    = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur     = 10;
        ctx.shadowOffsetX  = 2;
        ctx.shadowOffsetY  = 2;
        ctx.font           = `bold ${scaledFont}px ${fontFamily}`;
        ctx.textAlign      = 'center';
        ctx.textBaseline   = 'middle';
        ctx.fillStyle      = color;
        ctx.strokeStyle    = '#000000';
        ctx.lineWidth      = scaledFont * 0.12;
        ctx.strokeText(previewName, textX, textY);
        ctx.fillText(previewName, textX, textY);
        ctx.restore();

        // نقطة حمراء تدل على الموضع
        ctx.beginPath();
        ctx.arc(textX, textY, 8, 0, Math.PI * 2);
        ctx.fillStyle   = 'rgba(255,50,50,0.85)';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth   = 2;
        ctx.stroke();
    }, [currentDesign, previewName]);

    // ─── تحميل الصورة لما يتغير التصميم ───────────────────────
    useEffect(() => {
        imgLoaded.current = false;
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = currentDesign.image || '';
        img.onload = () => {
            imgRef.current  = img;
            imgLoaded.current = true;
            redraw();
        };
    }, [currentDesign.image]);

    // ─── إعادة الرسم لما تتغير أي قيمة ───────────────────────
    useEffect(() => { redraw(); }, [redraw]);

    // ─── تحويل نقطة الماوس لإحداثيات الصورة الأصلية ──────────
    const getImgCoords = (e) => {
        const canvas = canvasRef.current;
        const rect   = canvas.getBoundingClientRect();
        const scaleX = canvas.width  / rect.width;
        const scaleY = canvas.height / rect.height;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: Math.round(Math.min(Math.max((clientX - rect.left) * scaleX, 0), canvas.width)),
            y: Math.round(Math.min(Math.max((clientY - rect.top)  * scaleY, 0), canvas.height)),
        };
    };

    // ─── تحديث موضع النص ──────────────────────────────────────
    const updatePos = (e) => {
        const { x, y } = getImgCoords(e);
        setDesigns(prev => prev.map((d, i) =>
            i === activeIdx ? { ...d, textX: x, textY: y } : d
        ));
    };

    // ─── تحديث خاصية معينة (fontSize / color) ─────────────────
    const updateProp = (key, val) => {
        setDesigns(prev => prev.map((d, i) =>
            i === activeIdx ? { ...d, [key]: val } : d
        ));
    };

    // ─── توليد الكود الجاهز للنسخ ─────────────────────────────
    const generateCode = (cat) => {
        const arr = cat === 'google' ? googleDesigns : normalDesigns;
        return arr.map(d =>
            `    {\n        id: ${d.id},\n        name: "${d.name}",\n        image: getAssetUrlByFilename(${cat}AssetUrls, 'design${d.id}.jpg'),\n        textX: ${d.textX}, textY: ${d.textY},\n        fontSize: ${d.fontSize}, color: '${d.color}',\n        fontFamily: FONTS.${Object.entries(FONTS).find(([,v])=>v===d.fontFamily)?.[0] || 'IBM_PLEX_ARABIC'},\n    },`
        ).join('\n');
    };

    const fullCode =
`// ═══════════════════════════════════════
// google array
// ═══════════════════════════════════════
const google = [
${generateCode('google')}
];

// ═══════════════════════════════════════
// normal array
// ═══════════════════════════════════════
const normal = [
${generateCode('normal')}
];`;

    const handleCopy = () => {
        navigator.clipboard.writeText(fullCode).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    // ═══════════════════════════════════════════════════════════
    // Render
    // ═══════════════════════════════════════════════════════════
    return (
        <div style={s.page}>
            <div style={s.header}>
                <h2 style={s.title}>🎨 أداة ضبط مكان النص</h2>
                <p style={s.subtitle}>اسحب النقطة الحمراء على الصورة لتحديد موضع النص</p>
            </div>

            {/* ── شريط التحكم العلوي ── */}
            <div style={s.toolbar}>
                {/* اختيار النوع */}
                <div style={s.group}>
                    <label style={s.label}>النوع</label>
                    <div style={s.segmented}>
                        {['google','normal'].map(cat => (
                            <button key={cat} style={{ ...s.seg, ...(category===cat ? s.segActive : {}) }}
                                onClick={() => { setCategory(cat); setActiveIdx(0); }}>
                                {cat === 'google' ? 'Google' : 'Normal'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* اسم المعاينة */}
                <div style={s.group}>
                    <label style={s.label}>اسم المعاينة</label>
                    <input style={s.input} value={previewName}
                        onChange={e => setPreviewName(e.target.value)} placeholder="اكتب اسمك" />
                </div>

                {/* حجم الخط */}
                <div style={s.group}>
                    <label style={s.label}>حجم الخط: <b>{currentDesign.fontSize}px</b></label>
                    <input type="range" min="10" max="120" step="1"
                        value={currentDesign.fontSize}
                        onChange={e => updateProp('fontSize', +e.target.value)}
                        style={{ width: 120 }} />
                </div>

                {/* لون النص */}
                <div style={s.group}>
                    <label style={s.label}>لون النص</label>
                    <input type="color" value={currentDesign.color}
                        onChange={e => updateProp('color', e.target.value)}
                        style={{ width: 44, height: 32, border: 'none', cursor: 'pointer', borderRadius: 6 }} />
                </div>

                {/* زر النسخ */}
                <button style={{ ...s.copyBtn, ...(copied ? s.copyBtnDone : {}) }} onClick={handleCopy}>
                    {copied ? '✅ تم النسخ!' : '📋 نسخ الكود الكامل'}
                </button>
            </div>

            <div style={s.body}>
                {/* ── قائمة التصاميم ── */}
                <div style={s.sidebar}>
                    <p style={s.sideTitle}>التصاميم</p>
                    {designs.map((d, i) => (
                        <button key={d.id} onClick={() => setActiveIdx(i)}
                            style={{ ...s.thumb, ...(i === activeIdx ? s.thumbActive : {}) }}>
                            <span style={s.thumbNum}>{d.id}</span>
                            <span style={s.thumbCoord}>{d.textX}, {d.textY}</span>
                        </button>
                    ))}
                </div>

                {/* ── الكانفاس الرئيسي ── */}
                <div style={s.canvasWrap}>
                    <canvas
                        ref={canvasRef}
                        style={s.canvas}
                        onMouseDown={e  => { dragging.current = true;  updatePos(e); }}
                        onMouseMove={e  => { if (dragging.current) updatePos(e); }}
                        onMouseUp={()   => { dragging.current = false; }}
                        onMouseLeave={()=> { dragging.current = false; }}
                        onTouchStart={e => { dragging.current = true;  updatePos(e); }}
                        onTouchMove={e  => { e.preventDefault(); if (dragging.current) updatePos(e); }}
                        onTouchEnd={()  => { dragging.current = false; }}
                    />
                    <div style={s.coords}>
                        X: <b>{currentDesign.textX}</b> &nbsp;|&nbsp; Y: <b>{currentDesign.textY}</b>
                    </div>
                </div>

                {/* ── معاينة الكود ── */}
                <div style={s.codePanel}>
                    <p style={s.sideTitle}>الكود الجاهز</p>
                    <pre style={s.pre}>{fullCode}</pre>
                </div>
            </div>
        </div>
    );
};

// ============================================================
// Styles
// ============================================================
const s = {
    page:       { fontFamily: 'sans-serif', direction: 'rtl', padding: '1rem', background: '#0f172a', minHeight: '100vh', color: '#e2e8f0' },
    header:     { marginBottom: '1rem' },
    title:      { fontSize: 20, fontWeight: 700, margin: 0 },
    subtitle:   { fontSize: 13, color: '#94a3b8', marginTop: 4 },
    toolbar:    { display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end', background: '#1e293b', padding: '12px 16px', borderRadius: 10, marginBottom: 16 },
    group:      { display: 'flex', flexDirection: 'column', gap: 4 },
    label:      { fontSize: 12, color: '#94a3b8' },
    segmented:  { display: 'flex', border: '1px solid #334155', borderRadius: 6, overflow: 'hidden' },
    seg:        { padding: '6px 14px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 13 },
    segActive:  { background: '#3b82f6', color: '#fff' },
    input:      { padding: '6px 10px', background: '#0f172a', border: '1px solid #334155', borderRadius: 6, color: '#e2e8f0', fontSize: 13, width: 140 },
    copyBtn:    { marginTop: 'auto', padding: '8px 16px', background: '#3b82f6', border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' },
    copyBtnDone:{ background: '#16a34a' },
    body:       { display: 'grid', gridTemplateColumns: '110px 1fr 280px', gap: 12, alignItems: 'start' },
    sidebar:    { display: 'flex', flexDirection: 'column', gap: 6 },
    sideTitle:  { fontSize: 12, color: '#64748b', margin: '0 0 6px' },
    thumb:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', background: '#1e293b', border: '1px solid #334155', borderRadius: 6, cursor: 'pointer', color: '#94a3b8', fontSize: 12 },
    thumbActive:{ background: '#1d4ed8', border: '1px solid #3b82f6', color: '#fff' },
    thumbNum:   { fontWeight: 700, fontSize: 14 },
    thumbCoord: { fontSize: 10, opacity: 0.7 },
    canvasWrap: { position: 'relative' },
    canvas:     { width: '100%', height: 'auto', display: 'block', borderRadius: 8, border: '2px solid #334155', cursor: 'crosshair' },
    coords:     { position: 'absolute', bottom: 8, left: 8, background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: 12, padding: '3px 8px', borderRadius: 4 },
    codePanel:  { background: '#1e293b', borderRadius: 10, padding: 12, maxHeight: '75vh', overflow: 'auto' },
    pre:        { fontSize: 10, color: '#7dd3fc', whiteSpace: 'pre-wrap', wordBreak: 'break-all', margin: 0, lineHeight: 1.6 },
};

export default TextPositionEditor;
