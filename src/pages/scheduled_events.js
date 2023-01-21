import AppLayout from '@/components/Layouts/AppLayout'
import ListMeeting from '@/components/ListMeeting';
import Head from 'next/head'
import { useState } from 'react';

const Scheduled = () => {
    const [openTab, setOpenTab] = useState(1);
    const [color, setColor] = useState("blue");
    return (
        <AppLayout
            header ={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Scheduled Events
                </h2>
                
            }>

            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Upcoming
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                 Past
              </a>
            </li>
            
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <ListMeeting type="upcoming" />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <ListMeeting type="past" />
                </div>
                
              </div>
            </div>
          </div>
        </div>
             </div>
             </div>
            </div>
        </AppLayout>
    )
}

export default Scheduled
