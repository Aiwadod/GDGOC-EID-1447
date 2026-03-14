import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from './Header';

/**
 * PageThree Component
 * 
 * This component displays a gallery of design templates. 
 * Users can select a template card which overlays their name (passed via route state).
 */
const PageThree = () => {
    const location = useLocation();
    
    // Retrieve the user's name passed from the previous step.
    // Falls back to "اسم تجريبي" (Dummy Name) if accessed directly without state.
    const userName = location.state?.name || "اسم تجريبي";
    
    // State to keep track of the currently chosen template index
    const [selectedCard, setSelectedCard] = useState(null);

    // Handler for proceeding to the next step
    const handleNext = () => {
        if (selectedCard !== null) {
            // Future step: Navigate to a final preview, download page, or perform API call
            alert(`تم اختيار التصميم رقم ${selectedCard + 1} لـ ${userName}`);
        } else {
            // Prompt the user to select a template if none is selected
            alert('الرجاء اختيار أحد التصاميم للمتابعة');
        }
    };

    return (
        <div className="page-container">
            {/* Common Application Header */}
            <Header />
            
            <main className="page-three">
                <div className="card">
                    {/* Page Title */}
                    <h3 className="page-three-title">أختار التصميم الذي يناسبك</h3>
                    
                    {/* Gallery Grid for Templates */}
                    <div className="grid-container">
                        {/* Render 8 placeholder template cards */}
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                            <div 
                                key={index} 
                                className={`grid-item ${selectedCard === index ? 'selected' : ''}`}
                                onClick={() => setSelectedCard(index)}
                                role="button"
                                tabIndex={0}
                                aria-label={`Select template ${index + 1}`}
                            >
                                {/* Placeholder for the actual card image */}
                                <div className="image-placeholder"></div>
                                {/* Name overlaid on the card design */}
                                <div className="name-overlay">{userName}</div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Navigation Buttons Container */}
                    <div className="action-buttons">
                        <Link to="/page-two">
                            <button className="btn-yellow">السابق</button>
                        </Link>
                        <button onClick={handleNext}>التالي</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PageThree;
