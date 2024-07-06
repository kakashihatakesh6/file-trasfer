import React from 'react'

const DemoPage = () => {
    const handleSelect = (e) => {
        console.log(e)

    }
    return (
        <>
            <div className='flex flex-col'>


                <div className='text-red-400'>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <button className='flex bg-red-600 hover:bg-red-500 my-3' onClick={(e) => {handleSelect(e)}}>Select Me</button>
            </div>
        </>
    )
}

export default DemoPage