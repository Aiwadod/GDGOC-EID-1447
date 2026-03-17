import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Popup from './Popup';

const PageTwo = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const userName = location.state?.name;

    const handleNext = () => {
        if (selectedOption) {
            navigate('/page-three', { state: location.state });
        } else {
            setErrorMessage('الرجاء اختيار أحد الخيارات للمتابعة');
        }
    };

    // if user not enter name redirect to home page
    useEffect(() => {
        if (!userName) {
            navigate("/");
        }
    }, [userName, navigate]);

    return (
        <div className="page-container">
            <Header />
            <div className="page-two">
                <div className="card">
                    <h3 style={{ marginBottom: "40px" }}>هل انت من مستفيدين / اعضاء</h3>
                    <button
                        className={`btn-choice ${selectedOption === 'gdsc' ? 'selected' : ''}`}
                        onClick={() => setSelectedOption('gdsc')}
                    >
                        نادي قوقل
                    </button>
                    <button
                        className={`btn-choice blue ${selectedOption === 'other' ? 'selected' : ''}`}
                        onClick={() => setSelectedOption('other')}
                    >
                        غير ذالك
                    </button>

                    <div className="action-buttons">
                        <Link to="/">
                            <button className="yellow">السابق</button>
                        </Link>
                        <button onClick={handleNext}>التالي</button>
                    </div>
                </div>
            </div>

            <Popup
                message={errorMessage}
                onClose={() => setErrorMessage('')}
            />
        </div>
    );
};

export default PageTwo;
