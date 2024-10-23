import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) =>{
    
    const [input , setInput] = useState("")
    const [recentPrompt , setRecentPrompt] = useState("")
    const [prevPrompt , setprevPrompt] = useState([])
    const [showResult,setShowResult] = useState(false)
    const [loading , setLoading] = useState(false)
    const [resultData , setresultData] = useState("")

    const delayPara =(index,nextWord) =>{
        setTimeout(function (){
            setresultData(prev => prev + nextWord);
        },75*index)
    }  

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSend = async (prompt) => {
        setresultData("")
        setLoading(true)
        setShowResult(true)

        let response ;
        if(prompt !== undefined){
            setRecentPrompt(prompt)
            response = await run(prompt);
        }
        else{
            setprevPrompt(prev => [...prev,input])
            setRecentPrompt(input)
            response = await run(input)
        }

        let responseArray = response.split("**");
        let newResponse = "";
        for(let i=0;i<responseArray.length;i++){
            if(i === 0 || i % 2 !== 1){
                newResponse += responseArray[i] + "</br>";
            }
            else{
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");

        for(let i=0;i<newResponseArray.length;i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord + " ");
        }
       
        setLoading(false)
        setInput('')   
    } 

    const contextValue  = {
        onSend,
        prevPrompt,
        setprevPrompt,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value = {contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider