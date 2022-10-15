export default function WelcomePage(props) {
    return (
        <div className="welcome-page-container">
            <h1 className="title">Quizzical</h1>
            <p className="description">Best quiz game in town!</p>
            <button
                className="start-button"
                onClick={props.onClick}
            >
                <span className="start-button-text">
                    Start quiz
                </span>
            </button>
        </div>
    )
}