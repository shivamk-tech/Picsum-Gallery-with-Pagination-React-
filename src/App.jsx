import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [Userdata, setUserdata] = useState([]);
  const [index, setindex] = useState(1);
  const GetData = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=30`);
    setUserdata(response.data);
    console.log(Userdata);
  }

  let PrintUserData = 'Loading...'

  function previous(){
    if(index > 1){
      setUserdata([]);
      setindex(index-1);
    }
  }

  function next(){
    setUserdata([]);
    setindex(index+1);
  }

  if (Userdata.length > 0) {
    PrintUserData = Userdata.map((e, i) => {
      return (
        <a href={e.url} target="_blank">
          <div
            className='h-[220px] w-[220px] rounded-2xl overflow-hidden'
            key={i}>
            <img
              className='h-full w-full object-cover'
              src={e.download_url}
              alt="" />
            <div><h1>{e.author}</h1></div>
          </div>
        </a>
      )
    })
  }

  useEffect(() => {

    GetData();
  },[index])

  return (
    <div className=' bg-black flex flex-col justify-center items-center h-screen w-full'>
      <div className='flex flex-wrap gap-3 m-auto text-white bg-black'>
        {PrintUserData}
      </div>
      <div className='flex w-full p-5 justify-center items-center gap-1 bg-black '>
        <button
          onClick={previous}
          className='bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold'>
          Prev
        </button>
        <h2 className='text-white'>Page : {index}</h2>
        <button
          onClick={next}
          className='bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold'>
          Next
        </button>
      </div>
    </div>
  )
}

export default App
