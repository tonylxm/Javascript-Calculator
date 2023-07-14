// AUTHOR: Tony Lim
// DATE CREATED: 10/07/23
// LAST MODIFIED: 14/07/23

import './App.css';
import React from 'react';

const calcData = [
  { id: "clear", value: "AC" },
  { id: "delete", value: "DEL" },
  { id: "divide", value: "/" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "multiply", value: "*" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "subtract", value: "-" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "add", value: "+" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
  { id: "equals", value: "=" }
];

const operators = ["AC", "DEL", "/", "*", "+", "-", "="];
const numbers  = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Display = ({ input, output }) => (
  <div className="output">
    <span className="result">{output}</span>
    <span id="display" className="input">{input}</span>
  </div>
);

const Key = ({ keyData: { id, value }, handleInput }) => (
  <button id={id} onClick={() => handleInput(value)}>
    {value}
  </button>
);

const Keyboard = ({ handleInput }) => (
  <div className="keys">
    {calcData.map((key) => (
      <Key key={key.id} keyData={key} handleInput={handleInput} />
    ))}
  </div>
);

const App = () => {
  const [input, setInput] = React.useState("0")
  const [output, setOutput] = React.useState()
  const [calculatorData, setCalculatorData] = React.useState()

  const handleSubmit = () => {
    const result = eval(calculatorData);
    setInput(`${result}`);
    setCalculatorData(calculatorData + "=" + `${result}`);
  }

  const handleClear = () => {
    setInput("0");
    setCalculatorData("");
  }

  const handleDelete = () => {}
  
  const handleNumbers = (value, last, secondLast) => {

    if (last == 0) {
      return;
    } else {
      setInput(`${value}`);
      setCalculatorData(calculatorData + `${value}`);
    }
  }

  const dotOperator = () => {}

  const handleOperators = (value, last, secondLast) => {
    if (last === "=") {
      setCalculatorData(eval(calculatorData) + `${value}`); 
    } else {
      setInput(`${value}`);
      setCalculatorData(calculatorData + `${value}`);
    }
      
  }

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);
    const last = calculatorData[calculatorData.length - 1];
    const secondLast = calculatorData[calculatorData.length - 2];

    switch(value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case "DEL":
        handleDelete();
        break;
      case number:
        handleNumbers(value, last, secondLast);
        break;
      case ".":
        dotOperator(value);
        break;
      case operator:
        handleOperators(value, last, secondLast);
        break;
      default:
        break;
    }
  }

  const handleOutput = () => {
    setOutput(calculatorData)
  }

  React.useEffect(() => {
    handleOutput()
  }, [calculatorData])

  return (
    <div className='background'>
      <div className="container">
        <div className="calculator">
          <Display input={input} output={output} />
          <Keyboard handleInput={handleInput} />
        </div>
      </div>
      {/* <h1 className="author">JavaScript Calculator by Tony Lim</h1> */}
    </div>
  )
}

export default App;
