import React, { useState } from 'react'
import { uploadReport } from '../Services/api.services'

const ReportUploadForm = () => {
    const[files, setFiles] = useState([]);
    const userId = localStorage.getItem("userId")

    const handleFileChange = (e) => {
        const addedFiles = e.target.files;
        console.log(addedFiles);
        if(addedFiles){
            const addedFilesArray = Array.from(addedFiles);

            addedFilesArray.forEach((pdf)=>{
                const fileExist = files.some((prevFiles)=>prevFiles.name === pdf.name);
                fileExist ? alert("File already uploaded") : setFiles((prev) => [...prev, pdf])
                // setFiles((prev) => [...prev, pdf])
            })
            console.log(files);
        }
    }

    const handleUpload = async(e) => {
        e.preventDefault();
        if(files.length===0){
            alert("Please add some files")
        }
        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));
        try {
            const resp = await uploadReport(formData, userId)
            console.log(resp);
            if(resp.status===200){
                setFiles([]);
                alert("Files uploaded Successfully")
            }
            else{
                alert("Error While adding file, try again")
            }
        } catch (error) {
            alert("Error While adding file, try again")
        }
    }

    const handleFileDelete = (index) => {
        setFiles((prev)=>{
            const newFiles = [...prev];
            newFiles.splice(index,1);
            return newFiles;
        })
    }
  return (
    <div className='flex-col items-center justify-items-center text-center pb-8'>
        <form action="" className='md:px-36 pt-8' onSubmit={handleUpload}>
            <label htmlFor="images" className='mb-2 block text-md font-medium py-8 mb-4 rounded-md border-dashed border-2 border-green-500 bg-green-100'>
                <p className='mb-4 block font-medium pt-4'>Upload reports from the device</p>
                <span className="font-bold text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-white p-2 rounded-md">Browse</span>
                <input
                    type='file'
                    name='images'
                    id='images'
                    accept='application/pdf'
                    onChange={handleFileChange}
                    multiple 
                    className='hidden'
                />
            </label>
            {files.map((file, index)=>(
                <div key={index} className='flex justify-between px-4 p-2 mb-2 bg-gray-100 rounded-md'>
                    <h2 className='text-md'>{file.name}</h2>
                    <h2 className='text-md text-red-500 font-bold cursor-pointer' onClick={()=>handleFileDelete(index)}>X</h2>
                </div>
            ))}
            <button type='submit' className='p-2 rounded-md w-full border-2 border-green-500 hover:bg-green-500 hover:text-white'>Upload</button>
        </form>
    </div>
  )
}

export default ReportUploadForm