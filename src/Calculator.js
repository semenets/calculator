import React, { useState, useEffect } from 'react';
import './Calculator.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faDivide, faMinus, faPlus, faEquals } from '@fortawesome/free-solid-svg-icons'
import PlusMinus from "./icons/PlusMinus";
import Percent from "./icons/Percent";

const Calculator = () => {
  const [input, setInput] = useState('0');
  const [expression, setExpression] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const [highlightedButton, setHighlightedButton] = useState(null);

  const handleClick = (value) => {
    if (value === '.') {
      if (input.includes('.')) return;
      if (input === '') {
        setInput('0.');
        setExpression((prev) => prev + '0.');
      } else {
        setInput((prev) => prev + value);
        setExpression((prev) => prev + value);
      }
    } else {
      if (input === '0') {
        setInput((prev) => (prev + value).slice(1));
      } else {
        setInput((prev) => prev + value);
      }
      setExpression((prev) => prev + value);
    }
  };

  const actionClick = (operator) => {
    if (input === '') {
      return;
    }
    if (expression && !['+', '-', '*', '/'].includes(expression.slice(-1))) {
      setExpression((prev) => prev + ' ' + operator + ' ');
      setLastNumber(input);
      setInput('');
      setHighlightedButton(operator);
    }
  };

useEffect(() => {
  if (!isNaN(input)) {
    setLastNumber((prev) => prev);
  }
}, [input]);

const handleClear = () => {
  setInput('0');
  setExpression('');
  setLastNumber('');
  setHighlightedButton(null);
};

const plusMinus = () => {
if (input && input !== '0') {
  const newValue = input.startsWith('-') ? input.slice(1) : '-' + input;
  setInput(newValue);
  setExpression((prev) => prev.slice(0, -input.length) + newValue);
  }
};

const calculatePercentage = () => {
  if (input && expression) {
    const operators = ['+', '-', '*', '/'];
    let lastOperatorIndex = -1;
    let lastOperator = '';

    for (let i = expression.length - 1; i >= 0; i--) {
      if (operators.includes(expression[i])) {
        lastOperator = expression[i];
        lastOperatorIndex = i;
        break;
      }
    }
    let percentage = parseFloat(input);
    if (lastOperator === '*' || lastOperator === '/') {
        percentage *= 0.01;
    } else if (lastOperator) {
        const baseValue = parseFloat(expression.slice(0, lastOperatorIndex).trim());
        percentage = (baseValue * percentage) / 100;
    } else {
        percentage = percentage / 100;
    }
    setInput(String(percentage));
    setExpression((prev) => prev.slice(0, -input.length) + percentage);
  } else if (input) {
      const percentage = parseFloat(input) / 100;
      setInput(String(percentage));
      setExpression((prev) => prev.slice(0, -input.length) + percentage);
  }
};

const handleCalculate = () => {
  try {
      if (!expression) {
        setInput('0');
        return;
      }
      const result = eval(expression.replace(/ /g, ''));
      setInput(String(result));
      setExpression(String(result));
      setLastNumber('');
      setHighlightedButton(null);
  } catch (e) {
      setInput('0');
      setExpression('');
      setLastNumber('');
      setHighlightedButton(null);
  }
};

const getButtonClass = (key) => {
  return highlightedButton === key ? 'highlighted' : '';
};

  return (
    <div className="calculator">
      <div className="display">
        <div className="result">{input || lastNumber}</div>
      </div>
      <div className="buttons">
        <button onClick={handleClear} className={getButtonClass('AC')}>AC</button>
        <button onClick={plusMinus} className={getButtonClass('±')}><PlusMinus /></button>
        <button onClick={calculatePercentage} className={getButtonClass('%')}><Percent /></button>
        <button onClick={() => actionClick('/')} className={getButtonClass('/')}><FontAwesomeIcon className='faDivide' icon={faDivide} /></button>
        <button onClick={() => handleClick(7)} className={getButtonClass('7')}>7</button>
        <button onClick={() => handleClick(8)} className={getButtonClass('8')}>8</button>
        <button onClick={() => handleClick(9)} className={getButtonClass('9')}>9</button>
        <button onClick={() => actionClick('*')} className={getButtonClass('*')}><FontAwesomeIcon className='faXmark' icon={faXmark} /></button>
        <button onClick={() => handleClick(4)} className={getButtonClass('4')}>4</button>
        <button onClick={() => handleClick(5)} className={getButtonClass('5')}>5</button>
        <button onClick={() => handleClick(6)} className={getButtonClass('6')}>6</button>
        <button onClick={() => actionClick('-')} className={getButtonClass('-')}><FontAwesomeIcon className='faMinus' icon={faMinus} /></button>
        <button onClick={() => handleClick(1)} className={getButtonClass('1')}>1</button>
        <button onClick={() => handleClick(2)} className={getButtonClass('2')}>2</button>
        <button onClick={() => handleClick(3)} className={getButtonClass('3')}>3</button>
        <button onClick={() => actionClick('+')} className={getButtonClass('+')}><FontAwesomeIcon className='faPlus' icon={faPlus} /></button>
        <button onClick={() => handleClick(0)} className={`zero ${getButtonClass('0')}`}>0</button>
        <button onClick={() => handleClick('.')} className={getButtonClass('.')}>,</button>
        <button onClick={handleCalculate} className={getButtonClass('=')}><FontAwesomeIcon className='faEquals' icon={faEquals} /></button>
      </div>
    </div>
  );
};

export default Calculator;

