import React, { createContext, useState } from "react";
import { GoogleGenAI } from '@google/genai';  // Importing Gemini API

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState('');
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // [SECTION] API Configuration
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

      return result;
    } catch (error) {
      console.error('Error while fetching from Gemini API:', error);
      return 'Error occurred while fetching the response.';
    }
  };

  // [SECTION] Delay function for gradually updating result
  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData(prev => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    setPrevPrompts(prev => [...prev, input]);

    // [SECTION] To Call the Gemini API
    const response = await runGeminiAPI(input);

    // [SECTION] Processing the response
    let responseArray = response.split("**");
    let newResponse = '';
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
    setInput(""); 
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
