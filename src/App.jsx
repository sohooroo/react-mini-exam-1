
import './App.css'
import Header from './components/Header'
import AddMenu from './components/AddMenu'
import MenuCard from './components/MenuCard'
import { initialMenus } from './data'
import { useState,useEffect } from 'react'
function loadMenus(){
  const saved = localStorage.getItem('lunch-menus')
  return saved? JSON.parse(saved):initialMenus
}

function App() {

  const [menus, setMenus]=useState(initialMenus)

  const total =menus.reduce((sum, m)=>sum + m.votes, 0)
  const topVotes=Math.max(...menus.map((m)=>m.votes))


  useEffect(()=>{
    
    document.title=`${total}표 투표 중`

  },[total])
  

  useEffect(()=>{

    localStorage.setItem(`lunch-menus`,JSON.stringify(menus))
  },[menus])


  const vote=(id)=>{
    setMenus(menus.map((m)=>(m.id===id?{...m,votes:m.votes+1}:m)))
  }
  
  const addMenu =(name)=>{
    setMenus([...menus,{
      id:Date.now(),
      emoji:'🍽️',
      name:name,
      votes:0
    }])
  }

  const reset=()=> setMenus(menus.map((m)=>({...m, votes:0})))


  return (
    <div className='app'>
      <Header title={'🍱오늘 점심 뭐 먹지?'} total={total}/>
      <AddMenu onAdd={addMenu}/>
      <ul className="menus">
        {menus.map((m)=>(
          <MenuCard
            key={m.id}
            {...m}
            isTop={topVotes > 0 && m.votes == topVotes}
            onVote={()=>vote(m.id)}
          />
        ))}

      </ul>

      <footer className='footer'>
        <button type='button' className='reset' onClick={reset}>투표 초기화</button>
      </footer>
    </div>
  )
}

export default App
