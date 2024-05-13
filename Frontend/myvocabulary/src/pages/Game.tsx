import { useEffect, useState } from 'react'
import "../app/globals.css";

export default function Game() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:8081/users')
      .then((res: any) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error(res)
        }
      })
      .then(resJson => {
        return resJson.data
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <div className="flex w-screen min-h-screen flex-col items-center justify-center">
        <div className='relative bg-slate-700 shadow-xl bg-opacity-30 rounded-3xl flex flex-col justify-center items-center w-full md:w-auto max-w-[80vw]'>
          <div className='p-10 rounded-3xl flex flex-col justify-center items-center gap-6 w-full'>
            <div className='flex flex-col justify-start items-center gap-4'>
              <div className='rounded-full bg-red-600 w-8 h-8'></div>
              <div className='break-words whitespace-normal'>มดตัวน้อยตัวนิด</div>
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center'>
              <div className='w-full bg-slate-600 bg-opacity-10 text-left px-4 py-3 rounded-xl cursor-pointer border-2 border-slate-600 hover:border-slate-500 hover:bg-slate-500 hover:shadow-lg hover:scale-105 active:scale-90 duration-200'>A. <span>ANT!!!!</span> </div>
              <div className='w-full bg-slate-600 bg-opacity-10 text-left px-4 py-3 rounded-xl cursor-pointer border-2 border-slate-600 hover:border-slate-500 hover:bg-slate-500 hover:shadow-lg hover:scale-105 active:scale-90 duration-200'>B. <span>ant little</span> </div>
              <div className='w-full bg-slate-600 bg-opacity-10 text-left px-4 py-3 rounded-xl cursor-pointer border-2 border-slate-600 hover:border-slate-500 hover:bg-slate-500 hover:shadow-lg hover:scale-105 active:scale-90 duration-200'>C. <span>ant tiny</span> </div>
              <div className='w-full bg-slate-600 bg-opacity-10 text-left px-4 py-3 rounded-xl cursor-pointer border-2 border-slate-600 hover:border-slate-500 hover:bg-slate-500 hover:shadow-lg hover:scale-105 active:scale-90 duration-200'>D. <span>ant</span> </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
