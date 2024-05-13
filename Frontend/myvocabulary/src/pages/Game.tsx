import { useEffect, useState } from 'react'
import Link from 'next/link';
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
      <div className="relative flex w-screen min-h-screen flex-col items-center justify-center gap-10 p-10">
        <div className='relative bg-slate-700 shadow-xl bg-opacity-30 rounded-3xl flex flex-col justify-center items-center w-full md:w-auto max-w-[80vw]'>
          <div className='p-10 rounded-3xl flex flex-col justify-center items-center gap-6 w-full'>
            <div className='flex flex-col justify-start items-center gap-4'>
              <div className='rounded-full w-10 h-10'>
                {/* <img src="/game.svg" alt="game" /> */}
                <img src="/gameWhite.svg" alt="game" className='w-full h-full hover:scale-105 active:scale-90 cursor-pointer' />
              </div>
              <div className='break-words whitespace-normal text-xl'>มดตัวน้อยตัวนิด</div>
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center text-base'>
              <div className='w-full bg-slate-600 bg-opacity-10 text-left px-4 py-3 rounded-xl cursor-pointer border-2 
              border-slate-600 hover:border-slate-500 hover:bg-slate-500 hover:shadow-lg hover:scale-105 active:scale-90 duration-200'>
                A. <span>ANT!!!!</span>
              </div>
              <div className='w-full bg-slate-600 bg-opacity-10 text-left px-4 py-3 rounded-xl cursor-pointer border-2 
              border-slate-600 hover:border-slate-500 hover:bg-slate-500 hover:shadow-lg hover:scale-105 active:scale-90 duration-200'>
                B. <span>ant little</span>
              </div>
              <div className='w-full bg-slate-600 bg-opacity-10 text-left px-4 py-3 rounded-xl cursor-pointer border-2 
              border-slate-600 hover:border-slate-500 hover:bg-slate-500 hover:shadow-lg hover:scale-105 active:scale-90 duration-200'>
                C. <span>ant tiny</span>
              </div>
              <div className='w-full bg-slate-600 bg-opacity-10 text-left px-4 py-3 rounded-xl cursor-pointer border-2 
              border-slate-600 hover:border-slate-500 hover:bg-slate-500 hover:shadow-lg hover:scale-105 active:scale-90 duration-200'>
                D. <span>ant</span>
              </div>
            </div>
          </div>
        </div>
        <div className='fixed top-0 left-0'>
          <div className='rounded-full w-10 h-10 m-5'>
            <Link href="/">
              {/* <img src="/back.svg" alt="back" className='w-full h-full hover:scale-125 active:scale-90 cursor-pointer /> */}
              <img src="/backWhite.svg" alt="back" className='w-full h-full hover:scale-125 active:scale-90 cursor-pointer duration-200' />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
