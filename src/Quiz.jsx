import { nanoid } from 'nanoid'

export default function Quiz(props) {

    function setCorrectClassName(index) {
        const isCorrect = props.shuffled_answers[index].isCorrect === true
        const isSelected = props.shuffled_answers[index].isSelected === true

        if (props.review) {
            if (isCorrect) {
                return "btn-answer-selected-correct"
            } else if (isSelected && isCorrect === false) {
                return "btn-answer-selected-wrong"
            } else {
                return "btn-answer-not-selected"
            }
        } else {
            return isSelected ? "btn-answer-selected" : "btn-answer"
        }
    }

    const answersHtml = props.shuffled_answers.map((item, i) => {
        return (
            <button
                key={nanoid()}
                className={setCorrectClassName(i)}
                onClick={() => props.selectAnswer(props.shuffled_answers[i].answer)}
                disabled={props.review}
            >
                <span className="btn-answer-text">
                    {props.shuffled_answers[i].answer}
                </span>
            </button>
        )
    })

    return (
        <div className="quiz-container">
            <h3 className="question">{props.question}</h3>
            <div className="answers">

                {answersHtml}

            </div>
            <hr className="break-line" />
        </div>
    )
}