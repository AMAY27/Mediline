import React from 'react'
import { FaFileAlt, FaRegEye, FaFileDownload   } from "react-icons/fa";

const ReportListingComponents = ({title, date, pdfUrl, handlePdfOpen}) => {
    const dateString = new Date(date);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = dateString.toLocaleDateString('en-GB', options);


  return (
    <div className='p-4 space-y-2 rounded-xl shadow-full mb-2'>
        {/* <tr>
            <td><h2 className='truncate ...'>{title}</h2></td>
            <td><h2 className="text-gray-400 italic">{formattedDate}</h2></td>
            <td>
                <div className='flex items-center space-x-2 text-green-500 text-xl'>
                    <FaRegEye/>
                    <FaFileDownload/>
                </div>
            </td>
        </tr> */}
        <div className='flex justify-between'>
            <div className='max-w-[70%]'>
                <div className="flex items-center space-x-2">
                    <FaFileAlt className='text-gray-500'/>
                    <h2 className='truncate ...'>{title}</h2>
                </div>
                <div className="flex items-center">
                    <h2 className="text-gray-400 italic">{formattedDate}</h2>
                </div>
            </div>
            <div className='flex items-center space-x-2 text-green-500 text-lg'>
                <div className='border-2 border-gray-300 p-1 rounded-md cursor-pointer' onClick={() => handlePdfOpen(pdfUrl)}><FaRegEye/></div>
                <div className='border-2 border-gray-300 p-1 rounded-md cursor-pointer'><FaFileDownload/></div>
            </div>
        </div>
    </div>
  )
}

export default ReportListingComponents