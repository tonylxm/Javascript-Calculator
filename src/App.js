// AUTHOR: Tony Lim
// DATE CREATED: 10/07/23
// LAST MODIFIED: 25/07/23

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
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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
  const [output, setOutput] = React.useState("")
  const [calculatorData, setCalculatorData] = React.useState("")

  const handleSubmit = () => {
    const result = eval(calculatorData);
    setInput(`${result}`);
    setOutput(`${calculatorData}` + "=" + `${result}`);
  }

  const handleClear = () => {
    setInput("0");
    setCalculatorData("");
  }

  const handleDelete = () => {
    if (calculatorData.length > 1 && input !== 0) {
      setInput(`${input.slice(0, input.length - 1)}`)
      setCalculatorData(`${calculatorData.slice(0, calculatorData.length - 1)}`);
    } else {
      handleClear();
    }
  }

  const handleNumbers = (value) => {
    if (!calculatorData.length || output.includes("=")) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        setCalculatorData(`${calculatorData}`);
      } else {
        const lastChar = calculatorData[calculatorData.length - 1];
        const isLastCharOperator = operators.includes(lastChar);
        setInput(isLastCharOperator ? `${value}` : `${input}${value}`);
        setCalculatorData(`${calculatorData}${value}`);
      }
    }
  }

  const dotOperator = () => {
    const lastChar = calculatorData[calculatorData.length - 1];
    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if (operators.includes(lastChar)) {
        setInput("0.");
        setCalculatorData(`${calculatorData}0.`);
      } else {
        setInput(lastChar === "." || input.includes(".") ? `${input}` : `${input}.`)
        setCalculatorData(lastChar === "." || input.includes(".") ? `${calculatorData}` : `${calculatorData}.`);
      }
    }
  }

  const handleOperators = (value) => {
    const lastChar = calculatorData[calculatorData.length - 1];
    const isLastCharOperator = operators.includes(lastChar);
    const secondLastChar = calculatorData[calculatorData.length - 2];
    const isSecondLastCharOperator = operators.includes(secondLastChar);

    if (calculatorData.length || (value === "-" && lastChar !== "-")) {
      setInput(`${value}`);
      if ((isLastCharOperator && value !== "-") || isLastCharOperator && isSecondLastCharOperator) {
        if (isSecondLastCharOperator) {
          setCalculatorData(`${calculatorData.substring(0, calculatorData.length - 2)}${value}`);
        } else {
          setCalculatorData(`${calculatorData.substring(0, calculatorData.length - 1)}${value}`);
        }
      } else {
        if (output.includes("=")) {
          const result = eval(calculatorData);
          setCalculatorData(`${result}${value}`);
        } else {
          setCalculatorData(`${calculatorData}${value}`);
        }
          
      }
    }
  }

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
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
        handleNumbers(value);
        break;
      case ".":
        dotOperator();
        break;
      case operator:
        handleOperators(value);
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
    <div className="container">
      <div className="calculator">
        <Display input={input} output={output} />
        <Keyboard handleInput={handleInput} />
      </div>
      <div className='author'>
        <h3>JavaScript Calculator by Tony Lim</h3>
        <a  target="_blank" href="https://github.com/tonylxm/javascript-calculator">Source Code</a>
      </div>
    </div>
  )
}

export default App;
