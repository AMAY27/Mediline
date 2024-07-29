import React, { useEffect, useState } from 'react'
import Navbar from '../extras/Navbar'
import { useDispatch, connect } from 'react-redux';
import { checkauthenticated, load_user, logout } from '../actions/auth';
import { useNavigate } from 'react-router-dom';

const Blogpage = ({isAuthenticated}) => {
    const [content, setContent] = useState([])
    const [tags, setTags] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(checkauthenticated())
    })

    // if(!isAuthenticated){
    //     navigate('/loginuser')
    // }

    useEffect(()=>{
        setContent(JSON.parse(localStorage.getItem('content')))
        setTags(JSON.parse(localStorage.getItem('tags')))
    },[])

    useEffect(()=>{
        console.log(tags);
    },[tags])
    const title = localStorage.getItem('title')
    const author = localStorage.getItem('author')
    const category = localStorage.getItem('category')
    const text = localStorage.getItem('text')
  return (
    <>
        <Navbar/>
        <div className='flex justify-center'>
            <div className='md:w-3/4 grid grid-cols-1 md:grid-cols-4 flex gap-2 h-auto mt-4 '>
                <div className='col-span-3 shadow-md'>
                    <div className='flex justify-center'>
                        <h2 className='text-4xl font-bold p-2 m-1'>{title}</h2>
                    </div>
                    <p className='text-lg mx-3 p-4'>~ {author}</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 md:mx-6 mx-3'>
                        <div className="col-span-1">
                            <div className='grid grid-cols-3 gap-1'>
                            {tags.map((key)=>{
                                const contentLength = key.length;
                                const colSpan = contentLength > 15 ? 'col-span-2' : 'col-span-1';
                                return (
                                    <div className={`text-sm text-gray-500 rounded-lg p-1 border-2 text-center border-green-300 ${colSpan}`}>{key}</div>
                                )
                            })}
                            </div>
                        </div>
                    </div>
                    <div className='m-1 md:m-3 text-md p-4 text-justify'>
                        {content.map((value,index)=>{
                            if(value.type === 'paragraph'){
                                return <p key={index} className='py-2'>{value.text}</p>
                            } else if(value.type==='image'){
                                return (
                                    <img
                                        key={index}
                                        src={value.src}
                                        alt={value.alt}
                                        className='blog-img h-40 md:h-96 w-full py-8'
                                    />
                                )
                            }
                        })}
                    </div>
                </div>
                <div className="mx-3 col-span-1 md:bg-green-200 md:rounded-lg md:border-2 md:border-green-300">
                    <div className='m-3 flex justify-center '>
                        <h2 className='text-lg p-2'>About the author</h2>
                        <h2 className='text-4xl font-bold p-2'>{author}</h2>
                    </div>
                    <div className='md:h-30 md:w-30'>
                        <img src="public/assets/ironman.jpg" alt="Tony stark" className='w-fit h-fit'/>
                    </div>
                    <p className='my-2 p-2 text-justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget feugiat justo, vel tristique metus. Fusce sed diam in lorem vulputate facilisis</p>
                </div>
            </div>
        </div>
    </>
  )
}

const mapStatetoProps = (state) =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStatetoProps, {logout}, null,{checkauthenticated,load_user})(Blogpage)