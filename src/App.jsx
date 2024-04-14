import { useCallback, useEffect, useReducer, useRef, useState } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  
  const passwordGenerator= useCallback(()=>{
    let pass="";
    let str= "ABCDEFGHIGHKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str+= "0123456789";
    if (charAllowed) str+= "!@#$%^&*";

    for(let i=0;i<length;i++){
      let randomIndex = Math.floor(Math.random() * str.length);
      pass+= str.charAt(randomIndex)
    }
    setPassword(pass)

  }, [length,numberAllowed,charAllowed,setPassword] )
  const passwordRef= useRef(null);
  const copyPassword=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{passwordGenerator()}, [length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
    <div className='p-4 mt-10'>
      <h1 className='text-4xl text-center text-white'> Password generator</h1>
      <div className='p-4 w-full max-w-md bg-gray-800 justify-center mx-auto shadow-md mt-8 rounded-xl'>
        <div className='flex mb-4'> 
         <input 
          type="text"
          value={password}
          className='w-full p-2 rounded-sm'
          placeholder='password'
          readOnly="true"
          ref={passwordRef}
          />
          <button onClick={copyPassword} className='bg-orange-400 rounded-sm px-4 mx-1'>
            copy
          </button>
        </div>
        <div className='flex'>
          <input type="range"
          min={8} 
          max={100}
          value={length}
          onChange={(e)=>{setLength(e.target.value)}}
          className='cursor-pointer'/>
          <label  className='mx-1 text-orange-400'> Length : {length}</label>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          onChange={(e)=>{setNumberAllowed((prev)=>!prev)}}
          className='cursor-pointer mx-2'/>
          <label  className='mx-0 text-orange-400'> Numbers allowed </label>
          <input type="checkbox"
          defaultChecked={charAllowed}
          onChange={(e)=>{setCharAllowed((prev)=>!prev)}}
          className='cursor-pointer mx-2'/>
          <label  className='mx-0 text-orange-400'> Characters allowed </label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
