import React, {useState,useEffect,useRef} from 'react'
import FlashcardList from './FlashcardList'
import './app.css'
import axios from 'axios'

function App() {
  const[flashcards,setFlashcards] = useState([])
  const [categories,setCategories] = useState([])
useEffect(()=>{
  axios
  .get('https://opentdb.com/api_category.php')
  .then(res =>{
    setCategories(res.data.trivia_categories)

  })
})
 
 
  function decodeString(string){
    const textArea = document.createElement('textarea')
    textArea.innerHTML = string
    return textArea.value

  }

  function handleSubmit(e){
    e.preventDefault()
    axios
.get('https://opentdb.com/api.php',{
  params:{
    amount: amountEl.current.value,
    category: categoryEl.current.value
  }
})
.then(res => {
  setFlashcards(res.data.results.map((questionItem,index) => {
    const answer = decodeString(questionItem.correct_answer)
    const options = [
      ...questionItem.incorrect_answers.map(a => decodeString(a)), 
      answer]
    return{
      id: `${index}-${Date.now()}`,
      question: decodeString(questionItem.question),
      answer: answer,
      options: options.sort(() => Math.random() -.5)
    }
  }))
})
    
  }
const categoryEl = useRef()
const amountEl = useRef()

  return (
    <>
    <form className='header' onSubmit={handleSubmit}>
<div className='form-group'>
  <label htmlFor='category'>Category</label>
  <select id='category' ref= {categoryEl}>
    {categories.map(category =>{
      return <option value={category.id} key={category.id}>
        {category.name}
      </option>
    })}
  </select>
</div>
<div className='form-group'> 
<label htmlFor="amount"> Number of Questions</label>
<input type="number" id="amount" min='1'step='1' defaultValue={10} ref=
{amountEl}/>
</div>
<div className='fromGroup'>
  <button className='btn'>Generate</button>
</div>
    </form>
    <div className='container'>
    <FlashcardList flashcards={flashcards}/>
    </div>
    </>
    );
  }

export default App;
