import React, { useEffect } from 'react'
import Navbar from '../extras/Navbar'
import { bloglist } from './Bloglist'
import Blogsnav from '../extras/Blogsnav'
import { useState } from 'react'


const Blogs = () => {
    const list = bloglist
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchterm, setSearchterm] = useState('')
    const [filteredList, setFilteredList] = useState([]);
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
  return (
    <>
        <Navbar/>
        <Blogsnav onSelectCategory={setSelectedCategory}/>
        <div className='flex'></div>
        <div className="flex justify-center">
            <div className='grid md:grid-cols-4 md:w-3/4 drop-shadow-lg h-auto gap-3 mt-4'>
                <div className='md:col-span-1'>
                    <form action="" className='border-2 border-green-300 rounded pt-6 bg-green-300'>
                        <div className='m-2'>
                            <label htmlFor="" className='block text-gray-700 text-sm font-bold mb-2'>Search for doctors, blogs and categories</label>
                            <input 
                                type='text' 
                                placeholder='Search for doctors, blogs and categories' 
                                name='search' 
                                onChange={handleChange}
                                className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            />
                        </div>
                    </form>
                </div>
                <div className='md:col-span-3 mx-8'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredList.map((value)=>{
                            return (
                                <div className='col-span-1 shadow-md appearance-none rounded-lg border-1 border-grey-200 hover:bg-green-200'>
                                    <h2 className='p-2 text-xl font-bold text-green-600'>{value.title}</h2>
                                    <p className='p-2 text-md'>{value.author}</p>
                                    <div className='grid grid-cols-3 md:grid-cols-5 p-2 gap-1'>
                                        {value.tags.map((key)=>{
                                            const contentLength = key.length;
                                            const colSpan = contentLength > 8 ? 'col-span-2' : 'col-span-1';
                                            return (
                                                <div className={`text-sm text-gray-500 rounded-lg p-1 border-2 text-center border-green-300 ${colSpan}`}>{key}</div>
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