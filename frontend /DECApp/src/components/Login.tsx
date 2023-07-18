// import React from 'react'

export default function Login() {
  return (
    <div>
      <h1 className="logo">DECApp Login</h1>
      <div className="loginForm">
        <form>
          <input type="text" name="email" id="email" placeholder="email" />
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <br />
          <input type="submit" id="submit" />
          <br />
        </form>
      </div>
    </div>
  );
}
