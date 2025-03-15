import React, { useEffect, useState } from 'react'
import {useAuth, useUser} from "@clerk/clerk-react"  
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {useMutation} from '@tanstack/react-query'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { IKContext, IKImage,IKUpload  } from 'imagekitio-react';
import Upload from '../components/Upload';


function Write() {
    const {isLoaded, isSignedIn} = useUser()
    const [value, setValue] = useState('')
    const {getToken} = useAuth()
    const [cover, setCover] = useState("");
    const [img, setImg] = useState("");
    const [video, setVideo] = useState("");
    const [progress, setProgress] = useState(0);

    const navigate= useNavigate()

    useEffect(() => {
        img && setValue((prev) => prev + `<p><image src="${img.url}"/></p>`);
      }, [img]);
    
      useEffect(() => {
        video &&
          setValue(
            (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
          );
      }, [video]);

    const mutation = useMutation({
        mutationFn: async (newPost) => {
            console.log( JSON.stringify(newPost) + "hew post details")
          const token = await getToken();
          return axios.post(`${import.meta.env.VITE_API_URL}/posts`, JSON.stringify(newPost), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        },
      });
    
      if(!isLoaded){
        return (
            <div>Loading.</div>
        )
    }
    if(isLoaded && !isSignedIn){
        return (
            <div>Login to access.</div>
        )
    }
    
     async function handleSubmit (e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = {
            img: cover.filePath || "",
            title :formData.get("title"),
            desc :formData.get("desc"),
            category :formData.get("category"),
            content : value,
        }

        console.log(data)
        
        const token = await getToken();

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/posts`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
  
        console.log(res)

        navigate("/" + res.data.slug)

        //mutation.mutate(data)
    }

    
    return (
        <div className='h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6'>
            <h1 className="text-xl font-light">Create a new Article</h1>
            <form onSubmit={handleSubmit} action="" className='flex flex-col gap-7 flex-1 mb-3'>
                <Upload type="image" setProgress={setProgress} setData={setCover}>
                    <button type="button" className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
                        Add a cover image
                    </button>
                </Upload>
                <input name="title" className="text-2xl font-semibold bg-transparent outline-none" type="text" placeholder='New Article' />
                <div className='flex items-center gap-5'>
                    <label className='text-sm' htmlFor=""> choose a category:</label>
                    <select name="category" className='rounded-xl p-2 bg-white shadow-md'>
                        <option value="general">general</option>
                        <option value="national">National</option>
                        <option value="international">International</option>
                        <option value="technology">Technology</option>
                        <option value="education">Education</option>
                        <option value="finance">finance</option>
                    </select>
                </div>
                
                <button type="submit" className='text-xl mb-5 w-36  rounded-xl shadow-xl bg-blue-800 text-white p-2'>Send</button>
        
                <textarea defaultValue="Give description" className='rounded-xl p-4 bg-white shadow-md' name="desc"></textarea>
                <div className="flex flex-1">
                    <div className="flex flex-col gap-6 mr-2">

                        <Upload type="image" setProgress={setProgress} setData={setImg}>
                            📷
                            </Upload>
                            <Upload type="image" setProgress={setProgress} setData={setVideo}>
                            📽️
                        </Upload>
                    </div>
                    <ReactQuill theme="snow" className='flex-1 rounded-xl bg-white shadow-md' 
                        value={value}
                        readOnly={0 < progress && progress < 100} onChange={setValue}
                    />
                </div>
            </form>

        </div>
    )
}
    
export default Write