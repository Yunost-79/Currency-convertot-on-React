import React, { useEffect, useRef, useState } from 'react';
import Block from './components/currencyBlock/block';
import './css/style.css';

// https://openexchangerates.org/api/latest.json?app_id=5de5418f322641d081b0cb3d18fc04be

function App() {
  const [fromCurrency, setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrise, setFromPrise] = useState(0);
  const [toPrise, setToPrise] = useState(1);

  // const [rates, setRates] = useState({});
  const ratesRef = useRef({});

  //Get json from API

  useEffect(() => {
    fetch('https://openexchangerates.org/api/latest.json?app_id=5de5418f322641d081b0cb3d18fc04be')
      .then((res) => res.json())
      .then((json) => {
        // setRates(json.rates);
        // console.log(json.rates);
        ratesRef.current = json.rates;
        onChangeToPrise(1);
      })
      .catch((err) => {
        console.warn(err);
        alert('Error 404');
      });
  }, []);

  const onChangeFromPrise = (value) => {
    const prise = value / ratesRef.current[fromCurrency];
    const result = prise * ratesRef.current[toCurrency];
    setToPrise(result.toFixed(3));
    setFromPrise(value);
  };

  const onChangeToPrise = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrise(result.toFixed(3));
    setToPrise(value);
  };

  useEffect(() => {
    onChangeFromPrise(fromPrise);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrise(toPrise);
  }, [toCurrency]);

  return (
    <div className="App">
      <>
        <Block value={fromPrise} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrise} />

        <Block value={toPrise} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrise} />
      </>
    </div>
  );
}

export default App;
