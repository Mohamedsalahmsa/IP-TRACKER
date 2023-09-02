import { useState } from 'react';
import './Header.css'
import { MdKeyboardArrowRight } from 'react-icons/md';

// leafLet Import
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

// Components
import LocationMarker from './location-marker/LocationMarker';

// rtk query
import { useTrackIPQuery } from '../../Services/ipAdress';
import { skipToken } from '@reduxjs/toolkit/dist/query';

function Header() {

    const [inputValue , setInputValue] = useState("")
    const [searchTern , setSearchTern] = useState(skipToken)

    const {data,error,isLoading} = useTrackIPQuery(searchTern);

    const hundleSubmit = (e) => {
    e.preventDefault();
    setSearchTern(inputValue)
    }

    return (
        <>
            <div className="ParentBg">

                <div className="SearchContent">
                    <h2>IP Address Tracker</h2>
                    <div className="SearchForm">
                        <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} className='input' type="text" placeholder='Search For any IP address or domain'/>
                        <button className='btn' onClick={hundleSubmit}><MdKeyboardArrowRight/></button>
                    </div>
                </div>

                <div className={data === undefined ? "hide" : "showContent"}>
                    {error ? (
                        <>Error occurred</>
                    ) : isLoading ? (
                        <>Loading ...</>
                    ) : data ? (
                        <>
                    <ul>
                        <li>
                            <p>IP ADDRESS</p>
                            <h2>{data.ip}</h2>
                        </li>
                        <hr />
                        <li>
                            <p>LOCATION</p>
                            <h2>{data.location.city},{data.location.region},{data.location.country}</h2>
                        </li>
                        <hr />
                        <li>
                            <p>TIMEZONE</p>
                            <h2>{data.location.timezone}</h2>
                        </li>
                        <hr />
                        <li>
                            <p>ISP</p>
                            <h2>{data.isp}</h2>
                        </li>
                    </ul>
                        </>
                    ) : null}

                </div>

        

            </div>

    {isLoading ? (<>Loading ...</>) : data ? (
            <section>
        
            <MapContainer id='so'  center={[data.location.lat, data.location.lng]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={{lat: data.location.lat, lng: data.location.lng}} />
            </MapContainer>
    </section>
    ) : (
        <section>
        
            <MapContainer id='so'  center={[51.585, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={{lat: 51.585, lng: -0.09}} />
            </MapContainer>
    </section>
    )}


        </>
    )
}

export default Header