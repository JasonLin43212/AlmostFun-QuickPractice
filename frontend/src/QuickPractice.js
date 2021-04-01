import React, { Component } from 'react';
import './QuickPractice.css';

const UNANSWERED = 0;
const INCORRECT = 1;
const CORRECT = 2;

class QuickPractice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: this.props.questions,
            questionNumber: 1,
            questionState: UNANSWERED,
            bAnswer: null,
            cAnswer: null,
        }
    }

    render() {
        const { questions, questionNumber, questionState } = this.state;

        return <div className='quick-practice'>
            <h1>Quick Practice {questionNumber}/{questions.length}</h1>
            <span>What values of b and c will make it a valid right triangle?</span>
            <form className='answer-form'>
                <div className='answer-selection'>
                    <label>The value of b is:</label>
                </div>
                <div className='answer-selection'>
                    <label>The value of c is:</label>
                </div>

                <input type='button'/>
            </form>
        </div>
    }
}
export default QuickPractice;
