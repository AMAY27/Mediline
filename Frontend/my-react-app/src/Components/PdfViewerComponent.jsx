import React, { useEffect } from 'react'

const PdfViewerComponent = ({isOpen, pdf, onClose}) => {
    useEffect(() => {
        const pdfViewer = document.getElementById('pdfViewer');
        if (pdf && pdfViewer) {
            pdfViewer.src = pdf;
        }
    }, [pdf]);
    if(!isOpen) return null
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white sm:px-4 py-2 rounded-lg z-30 w-full h-full sm:w-4/5 sm:h-4/5 overflow-y-auto">
        <div className='flex justify-end mb-2'>
            <button onClick={onClose} className='border-2 border-green-500 px-2 rounded-xl hover:bg-green-500 hover:text-white'>X</button>
        </div>
        <iframe id="pdfViewer" width="100%" height="100%">
        </iframe>
      </div>
    </div>
  )
}

export default PdfViewerComponent