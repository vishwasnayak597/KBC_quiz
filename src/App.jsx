import './App.css';
import {useEffect,useMemo,useState} from 'react';
import data from './data';
import Start from "./components/Start";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber,setQuestionNumber]=useState(1);
  const [timeOut,setTimeOut]=useState(false);
  const [earned, setEarned] = useState("₹ 0")

  
  const moneyPyramid = useMemo(() =>
      [
        { id: 1, amount: "₹ 1000" },
        { id: 2, amount: "₹ 2000" },
        { id: 3, amount: "₹ 5000" },
        { id: 4, amount: "₹ 10000" },
        { id: 5, amount: "₹ 20000" },
        { id: 6, amount: "₹ 40000" },
        { id: 7, amount: "₹ 80000" },
        { id: 8, amount: "₹ 1,60,000" },
        { id: 9, amount: "₹ 3,20,000" },
        { id: 10, amount: "₹ 5,00,000" },
        { id: 11, amount: "₹ 10,00,000" },
        { id: 12, amount: "₹ 25,00,000" },
        { id: 13, amount: "₹ 50,00,000" },
        { id: 14, amount: "₹ 1,00,00,000" },
        { id: 15, amount: "₹ 2,00,00,000" },
      ].reverse(),
    []
  );
  
  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
    {!username ? (
      <Start setUsername={setUsername} />
    ) : (
      <>
        <div className="main">
          {timeOut ? (
            <h1 className="endText">You earned: {earned}</h1>
          ) : (
            <>
              <div className="top">
                <div className="timer">
                  <Timer
                    setTimeOut={setTimeOut}
                    questionNumber={questionNumber}
                  />
                </div>
              </div>
           <div className="bottom">
              <Trivia data={data} setTimeOut={setTimeOut} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber}/>
        </div>
        </>
          )}
      </div>
      <div className='pyramid'>
        <ul className="moneyList">
           {moneyPyramid.map((money)=>(
             <li className={questionNumber === money.id?'moneyListItem active':'moneyListItem'}>
               <span className='moneyListItemNumber'>{money.id}</span>
               <span className='moneyListItemAmount'>{money.amount}</span>
             </li>
           ))}
        </ul>
      </div>
      </>
    )}
    </div>
  );
}

export default App;
