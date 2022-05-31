import React from 'react'
import "./style.css";
import User from "../../utils/User";
import Api from '../../utils/Api';
import { toast } from "react-toastify"
import { Link, useNavigate } from 'react-router-dom';
import EventCard from './EventCard';
function AboutDonation({events}) {


  // const enrolled = events.filter(event => event.enrolled.includes(user._id))

  return (
    <div className='container events__section'>
      <h2>Blood Dontaion Events</h2>
      <div className='row'>
      {events.map((event,key) => (
        <EventCard event={event} key={key} />
      ))}
      </div>
    </div>
  )
}

export default AboutDonation