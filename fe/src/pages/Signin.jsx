import React, { useState } from 'react'

function Signin() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
  return (
    <div>
        <h1>SignIn</h1>
<form action="">
    <input type="text" placeholder='email'  value={email} onChange={(e)=>setemail(e.target.value)}/> <br/>
    <input type="text" placeholder='password' value={password} onChange={(e)=>setpassword(e.target.value)} /><br/>
</form>
    </div>
  )
}

export default Signin