import React, { Component } from 'react';
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
        this.setState((state) => ({
            questionState: UNANSWERED,
            questionNumber: 1,
            bChoice: null,
            cChoice: null,
        }))
    }
    /**
     * Functions for rendering different parts of the widget
     */
    renderAnswerResponse = () => {
        const { questions, questionNumber, questionState } = this.state;
        const currentQuestion = questions[questionNumber - 1];

        const explanation = <>
            Correct! Using Pythagorean's Theorem, we can check that {currentQuestion.a}^2
            + {currentQuestion.bAnswer}^2 = {currentQuestion.cAnswer}^2
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
            <span>What values of b and c will make it a valid right triangle?</span>
            <form className='answer-form'>
                <div className='answer-selection'>
                    <label>The value of b is:</label>
                    { currentQuestion.bChoices.map((choice, k) => (
                        <label key={k}>
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
                    <label>The value of c is:</label>
                    { currentQuestion.cChoices.map((choice, k) => (
                        <label key={k}>
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
                            ? 'Next Question'
                            : (questionState === FINISHED)
                                ? 'Restart'
                                :'Check'
                    }
                />
            </form>
        </>;
    }

    render() {
        const {
            questions,
            questionNumber,
            questionState,
        } = this.state;
        const currentQuestion = questions[questionNumber - 1];

        return <div className='quick-practice'>
            <h1>Quick Practice {questionNumber}/{questions.length}</h1>

            <p>One side is {currentQuestion.a}</p>

            {this.renderAnswerSelection()}
        </div>
    }
}
export default QuickPractice;
