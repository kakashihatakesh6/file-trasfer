import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineContentCopy } from "react-icons/md";



const Home = () => {
  const [isHover, setIsHover] = useState(false)
  const [file, setFile] = useState(null)
  const [uploadPercentage, setUploadPercentage] = useState(0)
  const fileInputRef = useRef(null)

  const handleFileInput = (e) => {
    e.preventDefault();
    const files = e.target.files;
    console.log('Selected file: ', e.target.files[0]);
    setFile(files[0]);
    initiateFileUpload();
  }
  useEffect(() => {
    // console.log("Im running!")
    // console.log("Load P =>", uploadPercentage)
  }, [uploadPercentage])

  const handleBrowseBtn = (e) => {
    e.preventDefault()
    // Triggering Input element
    fileInputRef.current.click();
  }

  const handleDragover = (e) => {
    e.preventDefault()
    setIsHover(true)
    // console.log(e.dataTransfer.files)
  }

  const handleDragleave = (e) => {
    e.preventDefault();
    setIsHover(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsHover(true);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Dropped File after drag
      const files = e.dataTransfer.files;
      setFile(files[0]);
      console.log("Dropped file: ", files[0]);
      // handling file upload
      initiateFileUpload(files);
    }

  }

  const initiateFileUpload = async (files) => {
    try {
      // Set Form Data
      const formData = new FormData();
      formData.append('myfile', files[0]);

      // API Request
      const uploadURL = `${process.env.REACT_APP_PUBLIC_HOST}/api/files`;
      const response = await axios.post(uploadURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percentageComplete = Math.round((loaded * 100) / total);
          setUploadPercentage(percentageComplete);
          console.log(percentageComplete)
        }
      });
      // Getting a response
      const res = response.data;

      console.log("File uploaded Successfully!", res);
      // reset progress percentage and file
      setTimeout(() => {
        setUploadPercentage(0)
      }, 1000);

      setFile(null)
      setIsHover(false)

    } catch (error) {
      console.log("File Upload Failed", error)
      // reset progress percentage and file
      setUploadPercentage(0);
      setFile(null);
      setIsHover(false)
    }
  }


  return (
    <div className='min-h-screen grid grid-cols-1 md:grid-cols-2'>
      <div className='bg-blue-100 flex flex-col justify-center items-center '>
        <div className='bg-[#ffffff] p-8 shadow-md rounded-3xl'>
          <div className='flex flex-col justify-center items-center mb-12'>
            <h1 className='text-orange-500 text-4xl font-bold mb-4'>Welcome to File Sharing Point</h1>
            <p className='text-orange-700 text-lg font-semibold'>Share anywhere your photos, document & more</p>
          </div>

          <div className='flex w-full relative'
            onMouseEnter={() => { setIsHover(true) }} onMouseLeave={() => { setIsHover(false) }}
            onDragOver={handleDragover} onDragLeave={handleDragleave}
            onDrop={handleDrop}
          >
            <div className='flex w-full flex-col items-center justify-center h-60 border-4 border-dashed
           hover:bg-slate-200 hover:border-dotted transition duration-300 ease-in-out rounded-md m-4 border-gray-800 p-4'>
              <div className='relative flex justify-center items-center mb-4 transition-all ease-in-out'>
                <img className={`center z-10 w-16 h-16 transition duration-300 ease-in-out ${isHover ? '-translate-y-1' : ''}`}
                  src="/new-file-icon.png" alt="center-img" draggable='false' />
                <img className={`left absolute z-0 w-16 h-16 transition ease-in-out duration-300 ${isHover ? '-rotate-[10deg] origin-bottom scale-90 -translate-x-[20px]' : ''} `}
                  src="/new-file-icon.png" alt="left-img" draggable='false' />
                <img className={`right absolute z-0 w-16 h-16 transition ease-in-out duration-300 ${isHover ? 'rotate-[10deg] origin-bottom scale-90 translate-x-[20px]' : ''}`}
                  src="/new-file-icon.png" alt="right-img" draggable='false' />
              </div>
              <input ref={fileInputRef} type="file" name='file-input' className='hidden' onChange={handleFileInput} />
              <p className='text-lg'>Choose a file to upload
                <span onClick={handleBrowseBtn}
                  className='font-bold text-lg text-orange-700 cursor-pointer'> Browse</span>
              </p>
            </div>
          </div>

          <div className="relative flex w-full h-20 flex-col border-2 text-black border-gray-600 rounded-md">
            <div style={{ width: `${uploadPercentage}%` }} className={`absolute bg-progress flex bg-blue-300 h-full rounded-md transition-all ease-in duration-1000`}></div>
            <div className="absolute flex flex-col mt-3 z-10 inner-items pl-3">
              <h4 className='font-medium text-lg'>Uploading...</h4>
              <span className='font-bold transition-all delay-300 duration-200'>{uploadPercentage}%</span>
            </div>
            <div className={`absolute bottom-1 px-3 h-2 prgress-bar-small w-full z-10 flex`}>
              <div style={{width: `${uploadPercentage}%`}} className={`bg-blue-700 flex h-full rounded-md transition-all duration-1000 ease-in`}></div>
            </div>

            {/* <div className='flex w-full items-center px-3 h-10 border-2 mx-4 
          space-x-2'>
              <p className='text-lg'>http://localhost:5000/files/fdc0df7e-03b3-4b13-88b6-71e29cca9526</p>
              <span className='cursor-pointer'><MdOutlineContentCopy size={24} /></span>
          </div> */}

          </div>
        </div>





      </div>
      <div className='bg-blue-600 flex flex-col justify-center items-center p-8'>
        <h2 className='text-3xl font-bold mb-6'>Login Here</h2>
        <p className='text-white text-lg'>You can put any content here. The layout is responsive and adjusts to different screen sizes.</p>
      </div>

    </div>


  )
}

export default Home