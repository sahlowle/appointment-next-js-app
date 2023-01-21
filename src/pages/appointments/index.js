import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import MyAppointment from '../../components/MyAppointment'
import Link from 'next/link'

const Appointment = () => {   

    return (
        <AppLayout
            header ={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Appointment
                </h2>
                
            }>

            <Head>
                <title>Next JS - My Appointments</title>
            </Head>
            {/* {appointments.map((office, index) => (
                 <div className="w-1/3 h-56 relative overflow-hidden rounded-lg">
                 <img src={office.images[0].path} className="object-cover w-full h-full"></img>
             </div>
             ))} */}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
               
                    <div className="content-end bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-8 bg-white border-b border-gray-200">
                         My Appointment

                         {/* <div className='absolute right-20'>

                         </div> */}
                         <div className="relative">
                          <div className="absolute bottom-0 right-0  ..">
                         <Link href='/appointments/create' className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-lg leading-snug rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                          Create
                         </Link>

                          </div>
                        </div>
                         

                        </div>
                    </div>
                </div>
            </div>

            <MyAppointment />


            
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

export default Appointment
