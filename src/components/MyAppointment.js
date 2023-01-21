import axios from '../lib/axios'
import { useState, useEffect } from 'react'
import Link from 'next/link'


const MyAppointment = () => {


  const [isLoading, setLoading] = useState(false)

  const [data, setData] = useState([]);

  useEffect(() => {

    setLoading(true)

    axios.get('/api/appointments')
    .then(response => {
      // console.log(response.data.data);
      setData(response.data.data)
    } )
    .catch(error => {
    })
   
  }, [])

  // if (isLoading) return <p>Loading...</p>

  return (
    <section className="bg-gray-100">
    <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    
    {data.map((item, index) => (
      <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        <div href="#" style={{ cursor: 'pointer' }} >
          
  
          <div className="mt-1 p-2">
          <p className="text-xl text-gray-700 font-semibold mt-1"> { item.event_name } </p>
          <p className="text-sm text-gray-700 font-semibold text-slate-400 mt-1"> { item.duration_name } , </p>
  
            <Link target='_blank' href={item.url} className=" flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-blue-500 duration-100 ">
                
  
                <button className="text-sm underline">View booking page</button>
              </Link>

              <hr></hr>

              <div className="mt-3 flex items-end justify-between">
              
              <div className="flex items-center space-x-1.5 rounded-lg px-4 py-1.5 text-blue-500 duration-100 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                </svg>

  
                <button className="text-sm" onClick={() => {navigator.clipboard.writeText(item.url)}}>Copy link</button>
              </div>

              <p>
              <button className="text-sm rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                Share
              </button>
              </p>
            </div>

             

          </div>
        </div>
      </article>
    ))}



      {/* <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        <a href="#">
          <div className="relative flex items-end overflow-hidden rounded-xl">
            <img src="https://i.imgur.com/YQqWQwj.jpg" alt="Hotel Photo" />
            <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-sm text-slate-400">4.9</span>
            </div>
          </div>
  
          <div className="mt-1 p-2">
            <h2 className="text-slate-700">The Hilton Hotel</h2>
            <p className="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>
  
            <div className="mt-3 flex items-end justify-between">
              <p>
                <span className="text-lg font-bold text-blue-500">$850</span>
                <span className="text-sm text-slate-400">/night</span>
              </p>
  
              <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
  
                <button className="text-sm">Add to cart</button>
              </div>
            </div>
          </div>
        </a>
      </article> */}

      </div>
    </section>
  )
}

export default MyAppointment