import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import useSWR from 'swr'
import axios from '../../lib/axios'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import InputError from '@/components/InputError'
import { format } from 'date-fns'

import "react-datepicker/dist/react-datepicker.css"
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router'

const Create = () => {

  const router = useRouter()

    const [errors, setErrors] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if(end){
        const av_date = start.toISOString().split('T')[0]+'|'+end.toISOString().split('T')[0]
        setPayload({...payload,date_available:av_date})
    }

  };


  const onTimeChange = (dates) => {

    setStartTime(dates)
   
  }
 

    const { user } = useAuth({ middleware: 'auth' })

    const [payload, setPayload] = useState({ 
        'event_name':'','description':'','slug':'','date_type':1,'date_available':'',
        'duration_type':1,'duration':'20','time_zone':'','start_time':'','end_time':''
    })

    const [timeZones, setTimeZones] = useState([]);

    useEffect(() => {

      fetch('http://worldtimeapi.org/api/timezone')
        .then((res) => res.json())
        .then((data) => {
            setTimeZones(data)
        })
       
      }, [])

    

    async function handleSubmit(e) {
        e.preventDefault();

        payload.start_time = format(startTime,'HH:mm');
        payload.end_time = format(endTime,'HH:mm');

        console.log(payload)

        postForm(payload);
    }
    
    function slugify(str) {
        return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    

    async function getSlug(name) {

        setPayload({...payload,event_name:name})

        // setPayload({...payload,slug:slugify(name)})  
       
    }

    async function postForm(body) {
        
        axios
        .post('/api/appointments', body)
        .then((res) =>{
            // console.log(res)
            if (res.data.success) {
                alert('Appointment Created Successfully');
                router.push('/appointments')
            }
        })
        .catch(error => {
            if (error.response.status !== 422) throw error
            // console.log(error.response.data.data)
            setErrors(error.response.data.data)

        })
    }
    

    return (
        <AppLayout
            header ={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Appointment
                </h2>
                
            }>

            <Head>
                <title>Next JS - Create Event</title>
            </Head>
            {/* {appointments.map((office, index) => (
                 <div className="w-1/3 h-56 relative overflow-hidden rounded-lg">
                 <img src={office.images[0].path} className="object-cover w-full h-full"></img>
             </div>
             ))} */}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
               
                    <div className="content-end overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-6  border-b border-gray-200">
                            <form name="myForm" onSubmit={handleSubmit} >
                            <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Event Details</h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
       
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                      Event name 
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          required
                          type="text"
                          name="event_name"
                          id="event_name"
                          value={payload.event_name}
                          // onChange={ e =>getSlug(e.target.value) }
                          onChange={ e =>setPayload({...payload,event_name:e.target.value}) }
                          className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        
                        <InputError messages={errors.event_name} className="mt-2" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        required
                        id="description"
                        name="description"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="you@example.com..."
                        value={payload.description}
                        onChange={ e =>setPayload({...payload,description:e.target.value}) }
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                      Event link *: {window.location.host}/{user.username}/
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        
                        <input
                          type="text"
                          name="slug"
                          id="slug"
                          required
                          pattern="^[a-z](-?[a-z])*$"
                          className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={payload.slug}
                          onChange={ e =>setPayload({...payload,slug:e.target.value}) }
                        />
                        <InputError messages={errors.slug} className="mt-2" />
                      </div>
                    </div>
                  </div>
                </div>
               
              </div>
         
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Book Time</h3>
              <p className="mt-1 text-sm text-gray-600">
              When can people book this event?
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
           
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                       Available Date
                      </label>
                    <DatePicker 
                    required
                    selected={startDate} 
                    onChange={onChange} 
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy/MM/dd"
                    selectsRange
                    
                    />
                    
                    <InputError messages={errors.date_available} className="mt-2" />
                
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      Duration
                      </label>
                      <input
                        required
                        type="number"
                        name="duration"
                        id="duration"
                        value={payload.duration}
                        onChange={ e =>setPayload({...payload,duration:e.target.value}) }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Duration Type
                      </label>
                      <select
                        required
                        id="duration_type"
                        name="duration_type"
                        value={payload.duration_type}
                        onChange={ e =>setPayload({...payload,duration_type:e.target.value}) }
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value={1}> Minutes </option>
                        <option value={2}>Hours</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                      Time Zone
                      </label>
                      <select
                        required
                        name="time_zone"
                        id="time_zone"
                        value={payload.time_zone}
                        onChange={ e =>setPayload({...payload,time_zone:e.target.value}) }
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="" > Select .. </option>

                        {timeZones.map((item, index) => (
                            <option value={item}> {item} </option>
                        ))}
                        
                      </select>

                      <InputError messages={errors.time_zone} className="mt-2" />
                      
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                    <h3 className="p-2 text-lg font-medium leading-6 text-gray-900">Set your Available hours</h3>

                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                       Time From
                      </label>
                      <DatePicker
                        selected={startTime} 
                        startDate={startTime}
                        onChange={ e =>setStartTime(e) }
                        // onChange={onTimeChange} 
                        // onChange={event => { onTimeChange(event,"sunday_start"); }}
                        showTimeSelect 
                        showTimeSelectOnly 
                        dateFormat="HH:mm" 
                        timeIntervals={payload.duration} 
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                       Time To
                      </label>
                      <DatePicker
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        selected={endTime} 
                        startDate={endTime}
                        onChange={ e =>setEndTime(e) }
                        showTimeSelect 
                        showTimeSelectOnly 
                        dateFormat="HH:mm" 
                        timeIntervals={payload.duration} 
                        />
                    </div>

                

                  </div>
                </div>
                
                
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
            
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>



            
        </AppLayout>
    )
}

// export async function getStaticProps() {
//     const response = await axios.get('/api/appointments');

//     // return {
//     //     props: {
//     //         offices: []
//     //     },
//     // }

//     const stringRes = JSON.stringify(response);
//     return {
//         props: {
//           offices: response.data.data
//         }
//     };
// }

export default Create
