import React from 'react'
import { FaFileAlt, FaRegEye, FaFileDownload   } from "react-icons/fa";

const ReportListingComponents = ({title, date}) => {
    const dateString = new Date(date);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = dateString.toLocaleDateString('en-GB', options);

  return (
    <div className='border-b-2 border-green-300 p-2 space-y-2'>
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
            <div className='flex items-center space-x-2 max-w-[70%]'>
                <FaFileAlt/>
                <h2 className='truncate ...'>{title}</h2>
            </div>
            <div className='flex items-center space-x-2 text-green-500 text-xl'>
                <div className=''><FaRegEye/></div>
                <FaFileDownload/>
            </div>
        </div>
        <div className="flex items-center">
            <h2 className="text-gray-400 italic">{formattedDate}</h2>
        </div>
    </div>
  )
}

export default ReportListingComponents