import React, { useState } from "react";
import axios from "axios";


const Testcenter = () => {
    const [values, setValues] = useState({
        center_name : '',
        address : "",
        zip : '',
        contact : ''
    })

    const [testvalues, setTestvalues] = useState({
        test_name : '',
        description : '',
        cost : ''
    })
    const [tests, setTests] = useState([])

    const handleChange = (e) =>{
        e.preventDefault()
        setValues(p=>({...p,[e.target.name] : e.target.value}))
    }

    const handleTestChange = (e)=>{
        e.preventDefault()
        setTestvalues(p=>({...p,[e.target.name] : e.target.value}))
    }

    const handleTestSubmit = (event) =>{
        event.preventDefault();

        const newTest = {
            test_name: testvalues.test_name,
            description: testvalues.description,
            cost: testvalues.cost,
        };

        setTests([...tests, newTest]);
        console.log(tests);

        setTestvalues({
            test_name: "",
            description: "",
            cost: "",
        });
    }
    const handleDelete= (e)=>{
        e.preventDefault()
        setTests([])
    }

    async function handleSubmit(){
        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }
        const body = JSON.stringify({
            center_name : values.center_name,
            address : values.address,
            zip : values.zip,
            contact : values.contact,
            tests : tests
        })
        const res = await axios.post('http://localhost:3000/registercenter',body,config)
        console.log(values);
    }

  return (
    <div className="grid md:grid-cols-2 gap-4 md:m-8">
        <div>
        <form className="border-2 border-green-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4" onSubmit={handleSubmit}>
            <div className="mb-4 mt-10">
                <label 
                    htmlFor="center_name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                   Center Name 
                </label>
                <input 
                    type="text"
                    name="center_name"
                    placeholder='name'
                    onChange={handleChange}
                    className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
            </div>
            <div className="mb-4 mt-10">
                <label 
                    htmlFor="address"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                   Address 
                </label>
                <input 
                    type="text"
                    name="address"
                    placeholder='address'
                    onChange={handleChange}
                    className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
            </div>
            <div className="mb-4 mt-10">
                <label 
                    htmlFor="zip"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                   Zip
                </label>
                <input 
                    type="text"
                    name="zip"
                    placeholder='zip'
                    onChange={handleChange}
                    className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
            </div>
            <div className="mb-4 mt-10">
                <label 
                    htmlFor="contact"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                   Contact 
                </label>
                <input 
                    type="text"
                    name="contact"
                    placeholder='Contact'
                    onChange={handleChange}
                    className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
            </div>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Post
                </button>
            <h2>Add Available Tests Details</h2>
        </form>
        </div>
        <div>
        <form onSubmit={handleTestSubmit} className="border-2 border-green-300 w-3/4 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4 mt-10">
                    <label 
                        htmlFor="test_name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                    Test Name
                    </label>
                    <input 
                        type="text"
                        name="test_name"
                        placeholder='name'
                        onChange={handleTestChange}
                        className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className="mb-4 mt-10">
                    <label 
                        htmlFor="description"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                    Description 
                    </label>
                    <input 
                        type="text"
                        name="description"
                        placeholder='description'
                        onChange={handleTestChange}
                        className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <div className="mb-4 mt-10">
                    <label 
                        htmlFor="cost"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                    Zip
                    </label>
                    <input 
                        type="text"
                        name="cost"
                        placeholder='Cost'
                        onChange={handleTestChange}
                        className='shadow appearance-none rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                </div>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Add
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                 onClick={handleDelete}
                >
                    Delete
                </button>
            </form>
            <div>
                <h2>Test List:</h2>
                <ul>
                    {tests.map((test, index) => (
                        <li key={index}>
                            Test Name: {test.test_name}, Description: {test.description}, Cost: {test.cost}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Testcenter