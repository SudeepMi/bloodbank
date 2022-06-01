import React from 'react'
import AboutDonation from '../../components/AboutDonation'
import DonationCentres from '../../components/AboutDonation/DonationCentres'
import Heroslider from '../../components/Heroslider/Heroslider'
import Api from '../../utils/Api'

function Home() {

  const [events, setEvents] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    document.title = 'Blood Bank | Home'
      setLoading(true)
      Api.get('/events?limit=8').then(res => {
          setEvents(res.data.event)
          setLoading(false)
      }).catch(err => {
          setError(err.response.data.message)
          setLoading(false)
      })
  }, [])

  return (
    <div>
      <Heroslider />
     { !loading ? <AboutDonation events={events} /> : <p className='p-2 text-center'>"Loading......."</p>}
     { error ? <p>{error}</p> : ""}
      <div className='container'>
      <DonationCentres />
      </div>
    </div>
  )
}

export default Home