import React, { Component } from 'react';
import Latex from 'react-latex';
import './QuickPractice.css';

const UNANSWERED = 0;
const INCORRECT = 1;
const CORRECT = 2;
const FINISHED = 3;

class QuickPractice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: this.props.questions,
            questionNumber: 1,
            questionState: UNANSWERED,
            bChoice: null,
            cChoice: null,
        }
    }

    handleChoiceSelection = (selected, choice) => {
        this.setState({ [choice]: selected });
    }

    checkAnswer = () => {
        this.setState((state) => {
            const { bChoice, cChoice, questions, questionNumber, questionState } = state;

            if (questionState === CORRECT) {
                return {
                    questionState: UNANSWERED,
                    questionNumber: questionNumber + 1,
                    bChoice: null,
                    cChoice: null,
                };
            }

            const currentQuestion = questions[questionNumber-1];
            const newQuestionState = bChoice === currentQuestion.bAnswer && cChoice === currentQuestion.cAnswer
                ? (questionNumber === questions.length)
                    ? FINISHED
                    : CORRECT
                : INCORRECT;
            return { questionState: newQuestionState };
        });
    }

    resetQuestions = () => {
        this.setState({
            questionState: UNANSWERED,
            questionNumber: 1,
            bChoice: null,
            cChoice: null,
        });
    }
    /**
     * Functions for rendering different parts of the widget
     */
    renderTriangle = (sideA) => {
        return <div className='triangle-image'>
            <svg width="200" height="200">
              <polygon
                  points="30,30 30,140 170,140"
                  style={{ fill: '#e75480', stroke: 'black', 'strokeWidth': 3}}
              />
              <polygon
                  points="30,140 30,120 50,120 50,140"
                  style={{ fill: '#e75480', stroke: 'black', 'strokeWidth': 3}}
              />
              <text fill="black" fontSize="20" fontFamily="Verdana" x="0" y="95">
                  {sideA}
              </text>
              <text fill="black" fontSize="20" fontFamily="Verdana" x="90" y="165">
                  b
              </text>
              <text fill="black" fontSize="20" fontFamily="Verdana" x="110" y="80">
                  c
              </text>
            </svg>
        </div>
    }

    renderAnswerResponse = () => {
        const { questions, questionNumber, questionState } = this.state;
        const currentQuestion = questions[questionNumber - 1];
        const [a, b, c] = [currentQuestion.a, currentQuestion.bAnswer, currentQuestion.cAnswer];

        const mathString = `
        $$a^2 + b^2 = c^2$$
        $$${a}^2 + ${b}^2 = ${c}^2$$
        $$${a*a} + ${b*b} = ${c*c}$$
        $$${a*a + b*b} = ${c*c}$$
        `;
        const explanation = <>
            Correct! Using Pythagorean's Theorem, we can see that:
            <Latex displayMode={true}>{mathString}</Latex>
        </>;

        switch (questionState) {
            case UNANSWERED:
                return <></>;
            case INCORRECT:
                return <p className='answer-response'>Not quite 🙈 Try again!</p>;
            case CORRECT:
                return <p className='answer-response'>
                    {explanation}
                </p>;
            case FINISHED:
                return <p className='answer-response'>
                    {explanation}
                    <br/>
                    Nice work! You completed all the questions! 👏🏿👏🏽👏🏻
                </p>;
            default:
                break;
        }
    }

    renderAnswerSelection = () => {
        const { bChoice, cChoice, questionState} = this.state;
        const currentQuestion = this.state.questions[this.state.questionNumber - 1];

        return <>
            <p className='question'>What values of b and c will create a valid right triangle?</p>
            <form className='answer-form'>
                <div className='answer-selection'>
                    <label className='answer-label'>The value of b is:</label>
                    { currentQuestion.bChoices.map((choice, k) => (
                        <label className='radio-label' key={k}>
                            <input
                                checked={choice === bChoice}
                                onChange={() => this.handleChoiceSelection(choice, "bChoice")}
                                type='radio'
                                value={choice}
                            />
                            {choice}
                        </label>
                    ))}
                </div>
                <div className='answer-selection'>
                    <label className='answer-label'>The value of c is:</label>
                    { currentQuestion.cChoices.map((choice, k) => (
                        <label className='radio-label' key={k}>
                            <input
                                checked={choice === cChoice}
                                onChange={() => this.handleChoiceSelection(choice, "cChoice")}
                                type='radio'
                                value={choice}
                            />
                            {choice}
                        </label>
                    ))}
                </div>

                {this.renderAnswerResponse()}

                <input
                    className='answer-button'
                    onClick={questionState === FINISHED ? this.resetQuestions : this.checkAnswer}
                    type='button'
                    value={
                        questionState === CORRECT
                            ? 'Next Question!'
                            : (questionState === FINISHED)
                                ? 'Restart!'
                                :'Check!'
                    }
                />
            </form>
        </>;
    }

    render() {
        const { questions, questionNumber } = this.state;
        const currentQuestion = questions[questionNumber - 1];

        return <div className='quick-practice'>
            <h1 className='widget-title'>Quick Practice {questionNumber}/{questions.length}</h1>
            {this.renderTriangle(currentQuestion.a)}
            {this.renderAnswerSelection()}
        </div>
    }
}
export default QuickPractice;
