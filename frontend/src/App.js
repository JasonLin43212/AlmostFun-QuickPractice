import './App.css';
import QuickPractice from "./QuickPractice";

const QUESTIONS = [
    {
        a: 3,
        bIncorrect: [2, 3, 5],
        cIncorrect: [2, 3, 4],
        bAnswer: 4,
        cAnswer: 5,
    },
    {
        a: 4,
        bIncorrect: [2, 4, 5],
        cIncorrect: [2, 3, 4],
        bAnswer: 3,
        cAnswer: 5,
    },
    {
        a: 12,
        bIncorrect: [3, 4, 6],
        cIncorrect: [12, 14, 15],
        bAnswer: 5,
        cAnswer: 13,
    },
    {
        a: 9,
        bIncorrect: [6, 9, 16],
        cIncorrect: [14, 16, 17],
        bAnswer: 12,
        cAnswer: 15,
    },
    {
        a: 7,
        bIncorrect: [25, 26, 27],
        cIncorrect: [10, 15, 20],
        bAnswer: 24,
        cAnswer: 25,
    }
];

function App() {
  return (
    <div className="App">
        <QuickPractice questions={QUESTIONS} />
    </div>
  );
}

export default App;
