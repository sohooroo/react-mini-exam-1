
import './App.css'
import Header from './components/Header'
import AddMenu from './components/AddMenu'
import MenuCard from './components/MenuCard'
import { initialMenus } from './data'
import { useState } from 'react'

function App() {

  const [menus, setMenus]=useState(initialMenus)
  
  const addMenu =(name)=>{
    setMenus([...menus,{
      id:Date.now(),
      emoji:'🍽️',
      name:name,
      votes:0
    }])
  }

  return (
    <div className='app'>
      <Header title={'🍱오늘 점심 뭐 먹지?'}/>
      <AddMenu onAdd={addMenu}/>
      <ul className="menus">
        {menus.map((m)=>(
          <MenuCard key={m.id} {...m}/>
        ))}

      </ul>

      <footer className='footer'>
        <button type='button' className='reset'>투표 초기화</button>
      </footer>
    </div>
  )
}

export default App
