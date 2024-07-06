import axios from 'axios'
import React, { useRef, useState } from 'react'
import { MdOutlineContentCopy } from "react-icons/md";



const Home = () => {
  const [isHover, setIsHover] = useState(false)
  const [copied, setCopied] = useState(false)
  const [file, setFile] = useState(null)
  const [uploadPercentage, setUploadPercentage] = useState(0)
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null)
  const copyInputRef = useRef(null)
  const [downloadLink, setDownloadLink] = useState('')

  const handleFileInput = (e) => {
    e.preventDefault();
    const files = e.target.files;
    console.log('Selected file: ', e.target.files[0]);
    setFile(files[0]);
    initiateFileUpload(files);
  }

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

      //Set upload
      setUploading(true)
      setDownloadLink('')

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
        setUploading(false)
        setDownloadLink(res?.file);
        setUploadPercentage(0);
      }, 2000);

      setFile(null);
      setIsHover(false);

    } catch (error) {
      console.log("File Upload Failed", error)
      // reset progress percentage and file
      setUploadPercentage(0);
      setFile(null);
      setIsHover(false)
    }
  }

  const handleCopy = (e) => {
    e.preventDefault();
    copyInputRef.current.select();
    const copiedText = copyInputRef.current.value;
    // document.execCommand('copy');
    navigator.clipboard.writeText(copiedText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000);
    });

  }


  return (
    <div className='min-h-screen flex w-full'>
      <div className='bg-blue-100 flex w-full flex-col justify-start pt-6 md:pt-10 items-center '>

        <div className='bg-[#ffffff] p-4 mx-2 md:p-8 shadow-md rounded-3xl transition-all ease-in-out'>

          <div className='flex flex-col justify-center items-center mb-4 md:mb-10'>
            <h1 className='text-orange-500 text-center text-3xl md:text-4xl font-bold mb-2 :mb-4'>Welcome to File Sharing Point</h1>
            <p className='text-orange-700 md:text-lg font-semibold'>Share anywhere your favorite photos, document & more</p>
          </div>


          <div className='flex w-full relative px-4 py-2 mb-4 '
            onMouseEnter={() => { setIsHover(true) }} onMouseLeave={() => { setIsHover(false) }}
            onDragOver={handleDragover} onDragLeave={handleDragleave}
            onDrop={handleDrop}
          >
            <div className='flex w-full flex-col items-center justify-center h-60 border-[3px] border-dashed
           hover:bg-blue-100 hover:border-dotted transition duration-300 ease-in-out rounded-md border-blue-400'>

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
                  className='font-bold text-lg text-blue-700 cursor-pointer'> Browse</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col px-4">

            {/* Uploading Prgoress Bar */}
            {uploading &&
              <div className='flex mb-3 relative h-20 flex-col w-full border-2 text-black border-blue-200 border-dashed rounded-md'>

                <div style={{ width: `${uploadPercentage}%` }} className={`absolute bg-progress flex bg-blue-300 h-full rounded-sm transition-all ease-in duration-1000`}></div>
                <div className="absolute flex flex-col mt-3 z-10 inner-items pl-3">
                  <h4 className='font-medium text-lg'>Uploading...</h4>
                  <span className='font-bold transition-all delay-300 duration-200'>{uploadPercentage}%</span>
                </div>
                <div className={`absolute bottom-1 px-3 h-2 prgress-bar-small w-full z-10 flex`}>
                  <div style={{ width: `${uploadPercentage}%` }} className={`bg-blue-700 flex h-full rounded-md transition-all duration-1000 ease-in`}></div>
                </div>

              </div>
            }

            {/* Download / Copy Link */}
            {downloadLink &&
              <div>
                <h3 className='text-center font-medium text-xl text-blue-700 mb-4'>Link expires in 24 hours</h3>
                <div className='flex relative w-full items-center scroll-smooth rounded-md px-1 h-10 border-2 border-dashed border-blue-300 bg-[#D2E0FB]'>
                  <input ref={copyInputRef} type='text' value={downloadLink} className='text-lg w-full bg-transparent outline-none pr-8' readOnly />
                  <span onClick={handleCopy} className='absolute right-1 cursor-pointer text-blue-800'><MdOutlineContentCopy size={24} /></span>
                </div>
                {copied && <p className='text-base text-blue-600 font-semibold text-center'>Copied to clipboard!</p>}
              </div>
            }

          </div>
        </div>



      </div>


    </div >


  )
}

export default Home