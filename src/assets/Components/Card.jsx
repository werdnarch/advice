import React, { use, useEffect, useState } from 'react'
import dice from "../Images/icon-dice.svg"
import divider from  "../Images/pattern-divider-desktop.svg"

const BASE_URL = "https://api.adviceslip.com/advice"

const Card = () => {

  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState(null);
  const [adviceId, setAdviceId] = useState(null);

  


  const fetchAdvice = async () => {
    setAdvice(null);
    setAdviceId(null)
    setLoading(true)

    try {
      const response = await fetch(`${BASE_URL}?t=${Date.now()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch advice');
      }
      const result = await response.json();
      setAdviceId(result.slip.id);
      setAdvice(result.slip.advice);
      
    } catch (error) {
      console.error("error:", error);
    }finally{
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchAdvice();
  },[])

  return (
    <div className='card-wrapper'>

      {loading && <div className='loading-circle-wrapper'>
                      <div className="loading-circle">
                      </div>
                      
                  </div>}




     {advice !== null &&
        <div className='advice-container'>
        <p className='id'>advice id #{adviceId}</p>
        <p className='advice'>"{advice}"</p>
      </div>  
      }
      <div className='divider-container'><img src={divider}></img></div>

      <button className='change-button'
              onClick={fetchAdvice}
      >
        <img src={dice}></img>
        </button>     
    </div>
  )
}

export default Card
