import React, { useEffect } from 'react'
import Navbar from '../extras/Navbar'
import { bloglist } from './Bloglist'
import Blogsnav from '../extras/Blogsnav'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Blogs = () => {
    const list = bloglist
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchterm, setSearchterm] = useState('')
    const [filteredList, setFilteredList] = useState([]);
    const navigate = useNavigate()
    useEffect(()=>{
        const newFilteredList = selectedCategory === 'All' ? list : list.filter(blog => blog.category === selectedCategory);
        const finalFilteredList = newFilteredList.filter(term => 
            term.title.toLowerCase().includes(searchterm.toLowerCase()) ||
            term.author.toLowerCase().includes(searchterm.toLowerCase()) ||
            term.tags.some(
                keyword => keyword.toLowerCase().includes(searchterm.toLowerCase())
            ));

        setFilteredList(finalFilteredList);
    },[selectedCategory, searchterm])
    
    const handleChange = (e) =>{
        e.preventDefault()
        setSearchterm(e.target.value)
    }

    const handleClick = (props) =>{
        localStorage.setItem('title' , props.title)
        localStorage.setItem('author' , props.author)
        localStorage.setItem('text', props.text)
        localStorage.setItem('category', props.category)
        localStorage.setItem('tags',JSON.stringify(props.tags))
        localStorage.setItem('content', JSON.stringify(props.content))
        console.log(props.content);
        navigate('/blogpage')
    }
  return (
    <>
        <Navbar/>
        <Blogsnav onSelectCategory={setSelectedCategory}/>
        <div className='flex'></div>
        <div className="flex justify-center">
            <div className='grid md:grid-cols-3 md:w-3/4 drop-shadow-lg h-auto gap-3 mt-4'>
                <div className='md:col-span-1 p-4'>
                    <h2 className='text-[2rem] font-bold text-green-600 my-4'>Mediline Blogs</h2>
                    <p className='my-2 text-lg'>Get insights from healthcare experts at Mediline for health management, medical science and many more</p>
                </div>
                <div className='md:col-span-2 mx-4 md:mx-8'>
                    <div className="grid grid-cols-1 gap-8">
                        <form action="" className='sticky top-0'>
                            <div className='my-2'>
                                {/* <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-2'>Search for doctors, blogs and categories</label> */}
                                <input 
                                    type='text' 
                                    placeholder='Search for doctors, blogs and categories' 
                                    name='search' 
                                    onChange={handleChange}
                                    className='border-2 border-green-600 bg-green-100 appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                            </div>
                        </form>
                        {filteredList.map((value, index)=>{
                            return (
                                <div 
                                    key={index}
                                    className='col-span-1 shadow-md appearance-none rounded-lg border-1 border-grey-200 cursor-pointer px-4 py-2'
                                    onClick={()=>handleClick(value)}
                                >
                                    <h2 className='text-2xl font-bold text-green-600'>{value.title}</h2>
                                    <p className='text-md text-gray-400 mb-4'>{value.author}</p>
                                    <p className='mb-2'>{value.text}</p>
                                    <div className='flex gap-1'>
                                        {value.tags.map((key)=>{
                                            const contentLength = key.length;
                                            const colSpan = contentLength > 8 ? 'col-span-2' : 'col-span-1';
                                            return (
                                                <div className={`text-sm text-gray-500 rounded-lg p-1 border-2 text-center border-green-300 `}>{key}</div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Blogs