import axios from "@/lib/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { format,addDays,subDays } from 'date-fns'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const Book = (props) => {
    const [payload, setPayload] = useState({ 
        'name':'','email':'','description':'','meet_time':1,'duration':10,'username':props.username,
        'slug':props.slug,'meet_date':'','time_zone':'','start_date':new Date(),'end_date':new Date()
    })

    const [data, setData] = useState([])

    const [timeZones, setTimeZones] = useState([]);  
    const [intDate, setIntDate] = useState(new Date());  
    const [startDate, setStartDate] = useState(new Date());  
    const [endDate, setEndDate] = useState(new Date());  

    const router = useRouter();

    useEffect(() => {

        
        fetch('http://worldtimeapi.org/api/timezone')
        .then((res) => res.json())
        .then((data) => {
            setTimeZones(data)
        })

        getData(props.username,props.slug)
       
      }, [])

      const submitForm = async event => {
        event.preventDefault()
        payload.meet_date = format(intDate,"yyyy-MM-dd HH:mm");
        console.log(payload);
        postForm(payload);
    }

    async function postForm(body) {
        
        axios
        .post('/api/meeting', body)
        .then((res) =>{
            console.log(res)
            if (res.data.success) {
                alert('Appointment Created Successfully');
                router.push('/success')
            }
        })
        .catch(error => {
            if (error.response.status !== 422) throw error
            // console.log(error.response.data.data)
            setErrors(error.response.data.data)

        })
    }

      function getData(username,slug){
        if (username) {
            axios.get('/api/appointments/'+username+'/'+slug)
        .then(response => {
            console.log(response.data.data);

            setData(response.data.data)


            const dt = response.data.data;

            payload.start_date = new Date(dt.start_date);
            payload.end_date = new Date(dt.end_date); 
            payload.duration = dt.duration; 

            console.log(payload)
        })
        .catch(error => {
            // router.push('/404')
        })
        }
        

      }

    return (
    <>
      <div>
        
        <div className="md:grid md:grid-cols-3 md:gap-6">

         
          <div className="mt-5 md:col-span-1 md:mt-0">
            <form action="#" method="POST" onSubmit={submitForm}>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    {/* Full Name  */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                          required
                          type="text"
                          name="name"
                          id="name"
                          value={payload.name}
                          // onChange={ e =>getSlug(e.target.value) }
                          onChange={ e =>setPayload({...payload,name:e.target.value}) }
                          className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  {/* End Full Name */}

                    {/* Email  */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                       Email
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                          @
                        </span>
                      <input
                          required
                          type="email"
                          name="email"
                          id="email"
                          value={payload.email}
                          // onChange={ e =>getSlug(e.target.value) }
                          onChange={ e =>setPayload({...payload,email:e.target.value}) }
                          className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  {/* End Full Name */}
                  
                  {/* Description */}
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
                  </div>
                    
                  {/* EndDescription */}

  
                  {/* Time Zones */}
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

                      {/* <InputError messages={errors.time_zone} className="mt-2" /> */}
                      
                  </div>
                   {/* End Time Zones */}

                 
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
            </form>
          </div>

          <div className="md:col-span-2 " >
            <div  className="px-4 sm:px-0 md:col-span-2 ">
            <p className="mt-1 text-2xl text-gray-600">
                {data.owner_name}
              </p>
              <h1 className="text-4xl pt-4 font-medium leading-6 text-gray-900">
              {data.event_name}
              </h1>
              <p className="mt-1 pt-4 text-2xl text-gray-600">
                {data.duration_name} 
              </p>
            </div>
            <div className="col-span-6 sm:col-span-4">
                <br></br>
                    <label htmlFor="last-name" className="block text-lg font-medium text-gray-700">
                       Available Date
                      </label>
                      <DatePicker
                      selected={intDate}
                      onChange={(date) => setIntDate(date)}
                      showTimeSelect
                      includeDateIntervals={[
                        { start:payload.start_date, end: payload.end_date},
                      ]}
                      dateFormat="yyyy-MM-dd | h:mm aa"
                      inline
                      timeIntervals={payload.duration}
    />
                    {/* <DatePicker 
                    required
                    selected={startDate} 
                    onChange={onChange} 
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy/MM/dd"
                    selectsRange
                    
                    /> */}
                                    
                    </div>
            
          </div>

        </div>

      </div>
      
      <h1 className="h-96">  </h1>
    

    </>
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

export default Book