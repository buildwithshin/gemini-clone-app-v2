import React, { useContext, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { GoogleGenAI } from '@google/genai';  // Importing Gemini API

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

  const apiKey = process.env.REACT_APP_API_KEY;  
  const model = 'gemini-2.0-flash'; 
  const config = {
    responseMimeType: 'text/plain',
  };

  // [SECTION] Function to call Gemini API and process the result
  const runGeminiAPI = async (prompt) => {
    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
      });

      const response = await ai.models.generateContentStream({
        model,
        config,
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      });

      let result = '';
      for await (const chunk of response) {
        result += chunk.text;
      }

      
      onSent(result); 
    } catch (error) {
      console.error('Error while fetching from Gemini API:', error);
      onSent('Error occurred while fetching the response.');
    }
  };

  // [SECTION] Handle sending the prompt
  const handleSendPrompt = () => {
    setInput(input.trim());
    if (input.trim()) {
      runGeminiAPI(input);
    }
  };

  return (
    <div className='main'>
      <div className='nav'>
        <p>Gemini</p>
        <img src={assets.user} alt='user' />
      </div>

      <div className='main-container'>
        {!showResult ? (
          <>
            <div className='greet'>
              <p>
                <span>Hello, I'am Gemini!</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className='cards'>

              {/* First card */}
              <div className='card'>
                <p>Suggest beautiful places to see on an upcoming road trip.</p>
                <img src={assets.compass} alt='' />
              </div>

              {/* Second card */}
              <div className='card'>
                <p>Briefly summarize this concept: Urban Planning</p>
                <img src={assets.bulb} alt='' />
              </div>

              {/* Third card */}
              <div className='card'>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message} alt='' />
              </div>

              {/* Fourth card */}
              <div className='card'>
                <p>Improve the readability of the following code</p>
                <img src={assets.code} alt='' />
              </div>
            </div>
          </>
          
        ) : (
          <div className='result'>
            <div className='result-title'>
              <img src={assets.user} alt='' />
              <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
              <img src={assets.gemini} alt='' />
              {loading ? (
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </div>
        )}

        <div className='main-bottom'>
          <div className='search-box'>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type='text'
              placeholder='Enter a prompt here'
            />
            <div>
              <img src={assets.gallery} alt='' />
              <img src={assets.mic} alt='' />
              {input ? (
                <img onClick={handleSendPrompt} src={assets.send} alt='' />
              ) : null}
            </div>
          </div>

          <p className='bottom-info'>
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
