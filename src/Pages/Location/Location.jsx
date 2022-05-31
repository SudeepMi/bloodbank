import React from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Api from '../../utils/Api';
import User from '../../utils/User';
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import Map from './Map'

const LocationPin = ({ text }) => (
    <div className="pin">
      <Icon icon={locationIcon} className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
)

function Location() {
    const {id} = useParams();
    const [location, setLocation] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')

    React.useEffect(() => {
        document.title = "Location"
        if (!User().user) {
            window.location.href = "/login"
        }
    }, [])

    React.useEffect(() => {
        setLoading(true)
        Api.get('/location/'+id)
            .then((res) => {
                if (res.status === 200) {
                    setLocation(res.data.location)
                    setLoading(false)
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message)
                setLoading(false)
            })
    }, [])

    const centerLocation = {
        lat: 37.42216,
        lng: -122.08427,
      }
  return (
    <div className='container'>
        <div className='row'>
                { loading ? <div className='text-center'>Loading...</div> : 
            <div className='col-md-12'>
                <h1>Location</h1>
               <Map />
                </div>
                }
                </div>
    </div>
  )
}

export default Location