import './App.css';
import QuickPractice from "./QuickPractice";

const QUESTIONS = [
    {
        a: 3,
        bChoices: [2, 3, 4, 5],
        cChoices: [2, 3, 4, 5],
        bAnswer: 4,
        cAnswer: 5,
    },
    {
        a: 4,
        bChoices: [3, 4, 5, 6],
        cChoices: [5, 6, 7 ,8],
        bAnswer: 3,
        cAnswer: 5,
    },
    {
        a: 12,
        bChoices: [3, 4, 5, 6],
        cChoices: [12, 13, 14, 15],
        bAnswer: 5,
        cAnswer: 13,
    },
    {
        a: 9,
        bChoices: [6, 9, 12, 16],
        cChoices: [14, 15, 16, 17],
        bAnswer: 12,
        cAnswer: 15,
    },
    {
        a: 7,
        bChoices: [18, 20, 22, 24],
        cChoices: [24, 25, 26, 27],
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
