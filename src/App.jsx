import React from 'react'
import './App.css'
import WelcomePage from "./WelcomePage.jsx"
import Quiz from "./Quiz.jsx"
import Btn from "./Btn.jsx"


function App() {

  const [page, setPage] = React.useState(1)
  const [questions, setQuestions] = React.useState([])
  const [review, setReview] = React.useState(false)
  const [callApi, setCallApi] = React.useState(false)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=22&difficulty=medium&type=multiple")
    .then(res => res.json())
    .then(data => setQuestions(
      data.results.map(q => {
        return {
          ...q,
          shuffled_answers: shuffle([q.correct_answer, ...q.incorrect_answers])
        }
      })
    ))
  }, [callApi])

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    const ca = array[0]

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array.map(answer => {
      return {
        answer,
        isCorrect: answer === ca ? true : false,
        isSelected: false
      }
    });
  }

  const QuestionsList = questions.map(obj => {
    return (<Quiz
      key={obj.question}
      question={obj.question}
      shuffled_answers={obj.shuffled_answers}
      selectAnswer={selectAnswer}
      review={review}
    />)
  })

  function startQuiz() {
    setPage(2)
  }

  function selectAnswer(a) {
    const updated = questions.map(q => {
      return q.shuffled_answers.map(o => {
        return o.answer === a ?
          { ...o, isSelected: !o.isSelected } :
          o
      })
    })

    setQuestions(prevQuizData => {
      return prevQuizData.map((question, index) => {
        return {
          ...question,
          shuffled_answers: updated[index]
        }
      })
    })
  }

  function checkAnswers() {
    let score = 0
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].shuffled_answers.length; j++) {
        const q = questions[i].shuffled_answers[j]
        if (q.isCorrect && q.isSelected) {
          score++
        }
      }
    }
    setCount(score)

    setReview(prev => prev = true)

    if (review) {
      setReview(prev => prev = false)

      setPage(1)
      const updated = questions.map(q => {
        return q.shuffled_answers.map(o => {
          return { ...o, isSelected: false }
        })
      })
      setCallApi(prev => !prev)
      setQuestions(prevQuizData => {
        return prevQuizData.map((question, index) => {
          return {
            ...question,
            shuffled_answers: updated[index]
          }
        })
      })
    } else {
      setPage(2)
    }
  }

  return (
    page === 1 ?
      <WelcomePage
        onClick={startQuiz}
      /> :
      <div>
        {QuestionsList}
        <Btn
          review={review}
          checkAnswers={checkAnswers}
          count={count}
        />
      </div>
  )
}

export default App
