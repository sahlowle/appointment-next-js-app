import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import Button from '@/components/Button'
import Book from '@/components/Book'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const BookMeet = (query) => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '',
    })

    
    const [errors, setErrors] = useState([])

    useEffect(() => {
        // alert(example)
        // console.log(query)
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()
    }

    return (
        
             <div className="py-12 bg-gray-200 h-full">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
               
                    <div className="content-end overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-6  border-b border-gray-200">
                            <Book username={query.username} slug={query.slug} />
                        </div>
                    </div>
                </div>
            </div>
          
        
    )
}

BookMeet.getInitialProps = ({ query: { username,slug } }) => {
    return { username,slug }
  }
  

export default BookMeet


