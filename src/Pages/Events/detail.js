import React from 'react'
import { useParams } from 'react-router-dom'
import Api from '../../utils/Api'
const moment = require('moment')
function Detail() {
    const {id} = useParams()
    const [event, setEvent] = React.useState({})

    React.useEffect(() => {
        Api.get(`/events/${id}`)
            .then(res => {
                setEvent(res.data)
            }
        )
    }, [id])

  return (
    <div className='container'>
        <div className='card'>
            <div className='card-body'>
                <h5 className='card-title'>Event Name : {event.name}</h5>
                <img src={event.photo} alt='event' className='img-fluid' width={200}/>
                <p className='card-text'> Description : {event.desc}</p>
                <p className='card-text'>Date : { moment(event.time).format("YYYY-MM-DD HH:MM") }</p>
                <p className='card-text'>Location: {event.location}</p>
                <p className='card-text'>Note: {event.note}</p>
                <p className='card-text'>Organizer: {event.organizer}</p>
                {
                    event.status === 'upcoming' ?
                    <button className='btn btn-success'>Upcoming</button>
                    :
                    <button className='btn btn-danger'>Finished</button>
                }
                <p>Blood Donors Enrolled</p>
                {
                   event.enrolled && event?.enrolled.map((user,k) => {
                        return <li key={k}>{user.username}</li>
                        })
                }
                </div>
        </div>
    </div>
  )
}

export default Detail