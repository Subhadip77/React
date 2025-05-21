import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  //assign required fileds
  const [length, setLength] = useState(10)
  const [allowDigits, setAllowDigits] = useState(false)
  const [allowSymbols, setAllowSymbols] = useState(false)
  const [allowCapsAlpha, setAllowCapsAlpha] = useState(true)
  const [allowSmallAlpha, setSmallAlpha] = useState(true)
  const [password, setPassword] = useState("")
  const [passwordStrength, setPasswordStrength] = useState("Weak");


  //assign required func

  const checkPasswordStrength = (password) => {
    let strengthPoints = 0;

    if (password.length >= 8) strengthPoints++;
    if (/[A-Z]/.test(password)) strengthPoints++;
    if (/[0-9]/.test(password)) strengthPoints++;
    if (/[^A-Za-z0-9]/.test(password)) strengthPoints++;

    if (strengthPoints <= 1) return "Weak";
    else if (strengthPoints === 2) return "Medium";
    else if (strengthPoints === 3) return "Strong";
    else return "Very Strong";
  };


  const passwordGenerator = useCallback(
    () => {
      let pass = " "
      let str = " "

      if(allowCapsAlpha) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      if(allowSmallAlpha) str += "abcdefghijklmnopqrstuvwxyz"
      if(allowDigits) str += "0123456789"
      if(allowSymbols) str += "~!@#$%^&*()_+=-),'"

      for(let i =  1; i <= length; i++){
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }
      
      setPassword(pass)

      // Set strength after generating
      const strength = checkPasswordStrength(pass);
      setPasswordStrength(strength);

    }, [length, allowCapsAlpha, allowDigits, allowSmallAlpha, allowSymbols, setPassword]
  )

  useEffect(
    ()=>{
      passwordGenerator()
    }, [length, allowCapsAlpha, allowDigits, allowSmallAlpha, allowSymbols, passwordGenerator]
  )

  const passRef = useRef(null)

  const passClipboardCopy = () => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }

  const increaseLength = () => {
    if(length < 30) setLength(length + 1)
  }

  const decreaseLength = () => {
    if(length > 1) setLength(length - 1)
  }


  return (
    <>
      
      <div className="container">
        <h1>Random Password Generator</h1>
        <p className="subtitle">Create strong and secure passwords to keep your account safe online.</p>

        <div className="password-box">
          <input 
          type="text" 
          className="password-output" 
          value={password}
          readOnly 
          ref={passRef}
          />
          <span className={`strength-label ${passwordStrength.toLowerCase().replace(" ", "-")}`}>{passwordStrength}</span>
          <button 
          className="copy-btn"
          onClick={passClipboardCopy}
          >
          Copy
          </button>
        </div>

        <div className="settings">
          <div className="length-control">
            <label>Password length: <span id="length-value">{length}</span></label>
            <div className="length-slider">
              <button 
              className="length-btn"
              onClick={decreaseLength}
              >-
              </button>
              <input 
              type="range" 
              min="5" 
              max="30" 
              value={length}
              className="slider" 
              onChange={(e) => setLength(e.target.value)}
              />
              <button 
              className="length-btn"
              onClick={increaseLength}
              >+
              </button>
            </div>
          </div>

          <div className="char-options">
            <label>
              <input 
              type="checkbox" 
              defaultChecked={allowCapsAlpha}
              onChange={() => {setAllowCapsAlpha(prev => !prev)}} 
              /> ABC
              </label>
            <label>
              <input 
              type="checkbox" 
              defaultChecked={allowSmallAlpha}
              onChange={() => {setSmallAlpha(prev => !prev)}}  
              /> abc
              </label>
            <label>
              <input 
              type="checkbox" 
              defaultChecked={allowDigits}
              onChange={() => {setAllowDigits(prev => !prev)}}  
              />123
            </label>
            <label>
              <input 
              type="checkbox" 
              defaultChecked={allowSymbols}
              onChange={() => {setAllowSymbols(prev => !prev)}}   
              /> #$&
            </label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
