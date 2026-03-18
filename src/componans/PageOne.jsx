import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';

const PageOne = () => {
    const location = useLocation();
    const [name, setName] = useState(location.state?.name || '');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleNext = () => {
        const trimmed = name.trim();
        const arabicOnly = /^[\u0600-\u06FF\s]+$/;
        const words = trimmed.split(/\s+/).filter((w) => w.length > 0);

        if (!trimmed) {
            setErrorMessage('الرجاء إدخال الاسم');
            return;
        }

        if (!arabicOnly.test(trimmed)) {
            setErrorMessage('الرجاء كتابة الاسم باللغة العربية فقط');
            return;
        }

        if (words.length >= 2) {
            navigate('/page-two', { state: { name } });
        } else {
            setErrorMessage("يرجى إدخال الاسم الثنائي فقط");
        }
    };

    return (
        <div className="page-container">
            <Header />
            <div className="page-one">
                <div className="card">
                    <h3>أدخل الاسم الثنائي</h3>
                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                    <input
                        type="text"
                        placeholder="اسمك يهمنا!"
                        value={name}
                        onChange={(e) => {
                            // Collapse multiple consecutive spaces into one
                            const val = e.target.value.replace(/  +/g, ' ');
                            setName(val);
                            // Error 1: show Arabic-only error while typing non-Arabic
                            const arabicOnly = /^[\u0600-\u06FF\s]*$/;
                            if (val && !arabicOnly.test(val)) {
                                setErrorMessage('الرجاء كتابة الاسم باللغة العربية فقط');
                            } else {
                                setErrorMessage('');
                            }
                        }}
                        onKeyDown={(e) => {
                            // Error 2: when space is pressed, remind user to complete their two-part name
                            if (e.key === ' ') {
                                setErrorMessage('أكمل كتابة اسمك الثنائي');
                            }
                        }}
                        style={errorMessage ? { backgroundColor: '#e53e3e', color: '#fff', border: '2px solid #c53030' } : {}}
                    />
                    <button onClick={handleNext}>التالي</button>
                </div>
            </div>
            <footer>
                <a href='https://linktr.ee/ai.wadod' target='_blank'><img src="/copy.png" alt="" /></a>
            </footer>
        </div>
    );
};

export default PageOne;
