import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';

function Login() {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const Login = () => {
        const formData = new FormData();
        formData.append('phone_number', phone)
        formData.append('password', password)
        axios({
            url: 'https://realauto.limsa.uz/api/auth/signin',
            method: 'POST',
            data: formData,
        }).then(res => {
            localStorage.setItem('accessToken',res?.data?.data?.tokens?.accessToken?.token)
            navigate('/home')
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <div className='max-w-[1200px] mx-auto'>
            <div class="w-[400px] mx-auto pt-50">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Phone Number
                        </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="phone" placeholder="901234567" onChange={(e) =>setPhone(e?.target?.value)} />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" onChange={(e) =>setPassword(e?.target?.value)} />
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={Login}>
                            Sign In
                        </button>
                        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
                <p class="text-center text-gray-500 text-xs">
                    &copy;2020 Acme Corp. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default Login