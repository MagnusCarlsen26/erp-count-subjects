import './App.css'
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { FaGithub } from "react-icons/fa";
import { DiGithubFull } from "react-icons/di";

function App() {

    const [subject,setSubject] = useState("")
    const [count,setCount] = useState(-1)
    const [email,setEmail] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [isSubscribed,setIsSubscribed] = useState(false)
    const [finalSubject,setFinalSubject] = useState("")
    useEffect( () => {
        (async() => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            console.log(isTouch)
            await axios.post('https://erp-subjects-server.vercel.app/traffic',{isTouch})
        })();
    },[])

    const getCount = async() => {
        const response = await axios.post("https://erp-subjects-server.vercel.app/count",{
            subject
        })
        setCount(response.data.count)
        setSuggestions(prev => []);
        setIsSubscribed(false)
        setFinalSubject(subject)
    }

    const subscribe = async() => {
        await axios.post("https://erp-subjects-server.vercel.app/subscribe",{
            email,
            subject
        })
        setIsSubscribed(true)
    }

    const handleSubjectChange = async (event) => {
        setSubject(event.target.value);
        if (event.target.value.length > 0) {
          setSuggestions(prev => []);   
          const response = await axios.post('https://erp-subjects-server.vercel.app/autocomplete', { subject });
          setSuggestions(prev => response.data);
        } else {
          setSuggestions(prev => []);
        }
    };
    console.log(subject)
    return (
        <div className="App">
            <header className="App-header">
                <div className="subject-and-count" style={{display : 'flex'}}>
                    <div>
                        <input placeholder="Subject Name" onChange={handleSubjectChange} list="autocomplete-suggestions" value={subject}/>
                        <div className='autocomplete-items'>
                            {suggestions.map((suggestion) => (
                            <div style={{fontSize:'0.6rem'}} onClick={e => {setSubject(suggestion)}}>
                                <p>{suggestion}</p>
                            </div>
                            ))}
                        </div>
                    </div>
                    &nbsp;
                    <div><button onClick={getCount}>Count Students</button></div>
                    <br />
                </div>
                {count > -1 && (
                <div>
                    <div>
                        <p>Number of Students in {finalSubject} = {count}</p>
                        <p>To get Updates on {finalSubject} subscribe here -</p>
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        &nbsp;
                        <button onClick={subscribe}>Subscribe</button>
                    </div>
                    {
                        isSubscribed ? `You are subscribed to ${finalSubject}.` : ""
                    }
                </div>
                )}
            <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', padding: '1rem 2rem', color: '#ddd' }}>
                <p>Created by Khushal Sindhav (B21AI039)</p>&nbsp;&nbsp;
                <a href="https://github.com/MagnusCarlsen26/erp-subjects/" style={{ textDecoration: 'none' }}>
                    <FaGithub style={{ color: '#fff' }} />
                </a>
            </footer>

            </header> 
        </div>
  )
}

export default App
