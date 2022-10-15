export default function Btn(props) {
    return (
        <div className="btn-div">
            <span className="score">
                {props.review && `You score ${props.count}/5 correct answers`}
            </span>
            <button
                className="btn-check"
                onClick={props.checkAnswers}
            >
                <span className="btn-check-text">
                    {props.review ? "Play again" : "Check answers"}
                </span>
            </button>
        </div>
    )
}