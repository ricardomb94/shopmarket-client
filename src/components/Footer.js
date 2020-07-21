import React from 'react';
import{Link} from 'react-router-dom';

const Footer = () => (
    
    
    <footer className="container-fluid py-5 bg-primary">
      <div className="row">
        {<div className="col-12 col-md px-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="d-block mb-2"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg>
          <small className="d-block mb-3 text-muted">&copy; 2020</small>
        </div>}
        <div className="col-6 col-md">
          <h5>Qui sommes-nous</h5>
          <ul className="list-unstyled text-small">
          <li>
          <Link to="/" className="text-muted">Notre histoire</Link>
       </li>
           {/* <li><a className="text-muted" href="#">Cool stuff</a></li>
<li><a className="text-muted" href="#">Random feature</a></li>*/}
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>Resources</h5>
          <ul className="list-unstyled text-small">
           <li>
              <Link to="/" className="text-muted">Resource</Link>
           </li>
           <li>
              <Link to="/" className="text-muted">Resource name</Link>
           </li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>Qui sommes-nous</h5>
          <ul className="list-unstyled text-small">
            <li>
              <Link to="/" className="text-muted">Business</Link>
            </li>
            <li>
              <Link to="/" className="text-muted">Education</Link>
            </li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>Contact</h5>
          <ul className="list-unstyled text-small">
            <li>
              <Link to="/" className="text-muted">Equipe</Link>
            </li>
            <li>
              <Link to="/" className="text-muted"></Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>

)

export default Footer;