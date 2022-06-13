import React from 'react'

function About() {
  return (
    <div className='container mt-4'>
        <div className="row">
            <div className="col-md-8 m-auto">
                <h1 className="text-center">ABOUT BLOOD BANK</h1>
                <p>
                Nepal Blood is a service motive for the welfare of the society. We work to encourage and inspire people to donate blood and provide fresh blood to needy one in need to save life.

One unit of donated blood can save upto three people when supplied into three different components as Red blood cells, Fresh frozen plasma and Platelet concentrate/ platelet rich plasma.

As per the data, under normal circumstances, someone needs a blood transfusion in every two seconds. Blood transfusions are used for trauma victims - due to accidents and burns - heart surgery, organ transplants, women with complications during childbirth, newborns and premature babies, and patients receiving treatment for leukemia, cancer or other diseases, such as sickle cell disease and Thalassemia.
                </p>
                <h2>Future Scope</h2>
                <p>
                We are planning to expand our service with following features.
                </p>
                <ul>
                    <li>In house blood collection and storage</li>
                    <li>Team Collaboration</li>
                    <li>Event Filter</li>
                    <li>Multimedia Communication</li>
                </ul>
            </div>
            <div className='col-md-4 m-auto'>
                <img src='https://nepalblood.com/images/blood.png' alt='blood' className='img-fluid'/>
            </div>
        </div>
    </div>
  )
}

export default About