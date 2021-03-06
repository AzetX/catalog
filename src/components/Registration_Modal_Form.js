import React, { useState } from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '150px',
    zIndex: 1000
}

const OVERLAY_STYLE = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}


function CheckNameUser({username, setNameValue}){
    return (
        <div className="username">
        <input type="text" placeholder="Full name..."  id="inputUsername" onChange={({target}) => setNameValue(target.value)}/>
        <label htmlFor="inputUsername" style={{color: username ? 'green' : 'red' }}>{(username) ?'✔':'✖' }</label> 
        </div>
    )}


function CheckDateOfBirthUser({dateOfBirth, setDateValue}){
  
    return (
        <div className="birthday">
        <input type="Date" id="inputBirthday" onChange={({target}) => {setDateValue(target.value)}}/>
        <label htmlFor="inputBirthday" style={{color: dateOfBirth ? 'green' : 'red' }}>{(dateOfBirth) ?'✔': '✖' }</label> 
        </div>
    )
}

function CheckPasswordUser({password, setPassValue}){
    return (
        <div className="userPassword">
        <input type="password" id="inputPassword" placeholder="Password..." onChange={({target})  => {setPassValue(target.value)}}/>
        <label htmlFor="inputPassword" style={{color: password ? 'green' : 'red' }}>{(password) ? '✔': '✖'}</label> 
        </div>
    )
}
function CheckMailUser({mail, setMailValue}){

    return (
        <div className="userEmail">
        <input type="email" id="inputEmail" placeholder="E-mail..." onChange={({target}) => {setMailValue(target.value)}}/>
        <label htmlFor="inputEmail" style={{color: mail ? 'green' : 'red' }}>{(mail)? '✔': '✖'}</label> 
        </div>
    )   
}



export default function ModalRegistration( {open, children, onClose} ) {
    const [nameValue, setNameValue] = useState('')
    const [passValue, setPassValue] = useState('')
    const [dateValue, setDateValue] = useState('')
    const [mailValue, setMailValue] = useState('')

    if(!open) return null

    let getDate = new Date().toLocaleDateString('RU')
    let dateToday = getDate.split('.').reverse().join('-')
    const domens = [".com", ".ru", ".net"]

    let username = (nameValue.length > '')
    let dateOfBirth = (dateValue > "" && dateValue <= dateToday)
    let password = (passValue.length > 6 && passValue.length > "")
    let mail = ((domens.some(i => (!mailValue.startsWith('@') && mailValue.includes('@') && mailValue.endsWith(i)) && !mailValue.endsWith('@' + i)) ? true: false) 
    && mailValue.length > '')

        const checkData = () =>{
            if(username && dateOfBirth && password && mail) { 
                setNameValue("")
                setPassValue("")
                setDateValue("")
                setMailValue("")
                return onClose()
            }       
        }
 
    return ReactDom.createPortal(
      <> 
        <div style={OVERLAY_STYLE} onClick={onClose}/>      
        <div style={MODAL_STYLES} >
        <div className="contentForm">
        <h1 className="titleFrom">Form registration</h1>
        <CheckNameUser setNameValue={setNameValue} username={username}/>
        <CheckDateOfBirthUser setDateValue={setDateValue} dateOfBirth={dateOfBirth}/>
        <CheckPasswordUser setPassValue={setPassValue} password={password}/>
        <CheckMailUser setMailValue={setMailValue} mail={mail} />
        <button onClick={checkData} className="registrationButton">Follow</button>
        <button onClick={onClose} className="registrationButton">Close</button>
        <div>{children}</div>
        </div>
        </div>
        
      </>,
      document.getElementById('portal')
    )
}
