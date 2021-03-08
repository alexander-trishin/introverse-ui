import './LoadingOverlay.scss';

const LoadingOverlay = () => {
    return (
        <div className="loading-overlay">
            <div className="loader">
                <div>
                    <div className="arrow up outer-18"></div>
                    <div className="arrow down outer-17"></div>
                    <div className="arrow up outer-16"></div>
                    <div className="arrow down outer-15"></div>
                    <div className="arrow up outer-14"></div>
                </div>
                <div>
                    <div className="arrow up outer-1"></div>
                    <div className="arrow down outer-2"></div>
                    <div className="arrow up inner-6"></div>
                    <div className="arrow down inner-5"></div>
                    <div className="arrow up inner-4"></div>
                    <div className="arrow down outer-13"></div>
                    <div className="arrow up outer-12"></div>
                </div>
                <div>
                    <div className="arrow down outer-3"></div>
                    <div className="arrow up outer-4"></div>
                    <div className="arrow down inner-1"></div>
                    <div className="arrow up inner-2"></div>
                    <div className="arrow down inner-3"></div>
                    <div className="arrow up outer-11"></div>
                    <div className="arrow down outer-10"></div>
                </div>
                <div>
                    <div className="arrow down outer-5"></div>
                    <div className="arrow up outer-6"></div>
                    <div className="arrow down outer-7"></div>
                    <div className="arrow up outer-8"></div>
                    <div className="arrow down outer-9"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
