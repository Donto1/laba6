import React, { useContext, useEffect } from 'react'
import uuid from 'react-uuid'
import { useState } from 'react'
import { DataContext } from './Context'
import { BrowserRouter as Navigate, useNavigate } from 'react-router-dom'

export default function Reg() {
    const navigate = useNavigate()
    const context = useContext(DataContext)
    const [NewUser, setNewUser] = useState({id:id(), name:'', age: 0, password:'', basket:[], order:[]})
    const [pass, setPass] = useState('')
    const [logIn, setLogIn] = useState()
    const [trueName, setTrueName] = useState({error:'', color:''})
    const [trueAge, setTrueAge] = useState({error:'', color:''})
    const [truePass, setTruePass] = useState({error:'', color:''})
    const [truePassLast, setTruePassLast] = useState({error:'', color:''})


    function id() {
        return uuid()
      }

      function valid(event) {
        event.preventDefault();
        let quality = 0
        setTrueName({error:'', color:''})
        setTrueAge({error:'', color:''})
        setTruePass({error:'', color:''})
        setTruePassLast({error:'', color:''})
        if (NewUser.name.length >= 2) {
            quality += 1
        } else setTrueName({error:'Имя короткое', color:'Red'})
        if (NewUser.age >= 18 && NewUser.age <= 110) {
            quality += 1
        } else if (NewUser.age > 120) {
            setTrueAge({error:'Слишком много, не думаете?', color:'Red'})
        } else setTrueAge({error:'Ваш возраст меньше 18 лет', color:'Red'})
        if (NewUser.password.length >= 8) {
            quality += 1
        } else setTruePass({error:'Пароль меньше 8 символов', color:'Red'})
        if (NewUser.password === pass) {
            quality += 1
        }
      }

      useEffect(() => {
        if (logIn) {
            navigate("/log")
        }
      })
    

  return (
    <form onSubmit={(event) => valid(event)}>
        <label htmlFor="name">Имя:</label>
        <input style={{ borderColor: trueName.color }} type="text" id='name' value={NewUser.name} onChange={(event) => setNewUser({id:NewUser.id, name:event.target.value, age: NewUser.age, password:NewUser.password, likes:[]})} />
            <p style={{ color: 'red' }}>{trueName.error}</p>
        <label htmlFor="age">Возраст:</label>
        <input style={{ borderColor: trueAge.color }} type="age" id='age' value={NewUser.age} onChange={(event) => setNewUser({id:NewUser.id, name: NewUser.name, age: event.target.value, password:NewUser.password, likes:[]})}/>
            <p style={{ color: 'red' }}>{trueAge.error}</p>
        <label htmlFor="pswd">Пароль:</label>
        <input style={{ borderColor: truePass.color }} type='password' id='pswd' value={NewUser.password} onChange={(event) => setNewUser({id:NewUser.id, name:NewUser.name, age: NewUser.age, password:event.target.value, likes:[]})} />
            <p style={{ color: 'red' }}>{truePass.error}</p>
        <button type="submit">Зарегистрироваться</button>
    </form>
  )
}
