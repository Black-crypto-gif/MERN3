import React from 'react'

function Footer() {
  return (
    <footer>
        <div className="section">
            <div className="class1">
                <h2>Connection</h2>
                <li>I'm Using MongoDB as a database</li>
                <li>I'm Using Express to connect to the Database</li>
                <li>I'm using NodeJs as Environment</li>
            </div>
            <div className="class2">
                <h2>FrontEnd</h2>
                <li>I'm Using ReactJs as Frontend</li>
                <li>Using only CSS to style</li>
                <li>Other third party packages to control the dynamic</li>
            </div>
            <div className="class3">
                <h2>Bundler</h2>
                <li>Using Vite.js as Bundler</li>
                <li>HRM for watching states changing</li>
            <button className="btn-contact">
                Contact 
            </button>
            </div>
        </div>
    </footer>
  )
}

export default Footer