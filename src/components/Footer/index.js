import React from 'react'

function Footer() {
  return (
<footer className="page-footer font-small blue pt-4 mt-5">
  <div className="container text-center text-md-left">
    <div className="row">
      <div className="col-md-6 mt-md-0 mt-3">
        <h5 className="text-uppercase brand-color">BLOOD BANK</h5>
        <p>Lets pledge to donate blood and save life.</p>
      </div>
      <hr className="clearfix w-100 d-md-none pb-3" />
      <div className="col-md-3 mb-md-0 mb-3">

        <h5 className="text-uppercase">Links</h5>

        <ul className="list-unstyled">
          <li>
            <a href="#!">About Blood Bank</a>
          </li>
          <li>
            <a href="#!">Request Blood</a>
          </li>
          <li>
            <a href="#!">Donate Blood</a>
          </li>
          <li>
            <a href="#!">User Dashboard</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div className="footer-copyright text-center py-3">© 2022 Copyright:
    <a href="/"> Blood Bank</a> Developed with &hearts; by Amit Yadav
  </div>
</footer>
  )
}

export default Footer