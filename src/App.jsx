import { TextField, Stack, Button } from '@mui/material';
import './App.css';
import { useState } from 'react';

function App() {
  const [interest, setInterest] = useState(0);
  const [principle, setPrinciple] = useState(0);
  const [rate, setRate] = useState(0);
  const [year, setYear] = useState(0);

  const [invalidPrinciple, setInvalidPrinciple] = useState(false);
  const [invalidRate, setInvalidRate] = useState(false);
  const [invalidYear, setInvalidYear] = useState(false);

  const validateInput = (inputTag) => {
    const { name, value } = inputTag;

    if (name === 'principle') {
      setPrinciple(Number(value));
      if (/^\d*\.?\d+$/.test(value)) {
        setInvalidPrinciple(false);
      } else {
        setInvalidPrinciple(true);
      }
    } else if (name === 'rate') {
      setRate(Number(value));
      if (/^\d*\.?\d+$/.test(value)) {
        setInvalidRate(false);
      } else {
        setInvalidRate(true);
      }
    } else if (name === 'year') {
      setYear(Number(value));
      if (/^\d+$/.test(value)) {
        setInvalidYear(false);
      } else {
        setInvalidYear(true);
      }
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (principle && rate && year) {
      setInterest(principle * rate * year / 100);  // Dividing by 100 to get the correct percentage
    } else {
      alert("Please fill the form correctly");
    }
  };

  const handleReset = () => {
    setInterest(0);
    setPrinciple(0);
    setRate(0);
    setYear(0);
    setInvalidPrinciple(false);
    setInvalidRate(false);
    setInvalidYear(false);
  };

  return (
    <>
      <div style={{ width: '100%', minHeight: "100vh" }} className='d-flex justify-content-center align-items-center bg-dark'>
        <div className='bg-light p-5 rounded'>
          <h3>Simple Interest Calculator</h3>
          <p>Calculate your simple interest</p>
          <div className='bg-warning p-5 rounded text-center'>
            <h1>₹ {interest}</h1>
            <p className='fw-bolder'>Total Simple Interest</p>
          </div>
          <form className='mt-5'>
            {/* {Principle Amount} */}
            <div className='mb-3'>
              <TextField value={principle || ""} name='principle' onChange={(e) => validateInput(e.target)} className='w-100' id="outlined-principle" label="₹ Principle amount" variant="outlined" />
            </div>
            {/* {invalid principle} */}
            {
              invalidPrinciple && <div className='text-danger fw-bolder mb-3'>
                Invalid Principle amount
              </div>
            }

            {/* {Rate} */}
            <div className='mb-3'>
              <TextField value={rate || ""} name='rate' onChange={(e) => validateInput(e.target)} className='w-100' id="outlined-rate" label="% Rate" variant="outlined" />
            </div>
            {/* {invalid RATE} */}
            {
              invalidRate && <div className='text-danger fw-bolder mb-3'>
                Invalid Rate
              </div>
            }

            {/* {Year} */}
            <div className='mb-3'>
              <TextField value={year || ""} name='year' onChange={(e) => validateInput(e.target)} className='w-100' id="outlined-year" label="Time Period (Yr)" variant="outlined" />
            </div>
            {/* {invalid YEAR} */}
            {
              invalidYear && <div className='text-danger fw-bolder mb-3'>
                Invalid Year
              </div>
            }

            {/* {Buttons} */}
            <Stack direction="row" spacing={2}>
              <Button type='submit' onClick={handleCalculate} disabled={invalidPrinciple || invalidRate || invalidYear} variant="contained" style={{ width: '50%', height: '70px' }} className='bg-dark'>Calculate</Button>
              <Button type='button' onClick={handleReset} variant="outlined" style={{ width: '50%', height: '70px' }} className='border border-dark text-dark'>Reset</Button>
            </Stack>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;