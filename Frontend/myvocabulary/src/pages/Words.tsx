import { useEffect, useState } from 'react'
import Link from 'next/link';
import "../app/globals.css";

export default function Words() {
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
      <div className="relative flex w-screen min-h-screen flex-col items-center justify-center">
        <div className='relative bg-slate-700 shadow-xl bg-opacity-30 rounded-3xl flex flex-col justify-center items-center'>
          <div className='p-10 rounded-3xl flex flex-col justify-center items-center gap-6'>
            <div className='flex flex-col justify-start items-center gap-4'>
              <div className='rounded-full w-10 h-10'>
                {/* <img src="/setting.svg" alt="setting" className='w-full h-full hover:scale-105 active:scale-90 cursor-pointer /> */}
                <img src="/settingWhite.svg" alt="setting" className='w-full h-full hover:scale-105 active:scale-90 cursor-pointer' />
              </div>
              <div className='break-words whitespace-normal'>New Word</div>
            </div>
            <div className='w-full flex flex-col gap-4 justify-center items-center'>

              <form>
                <div className='w-full flex flex-col justify-center items-center gap-4 min-w-52'>

                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="In-Thai" className="block text-sm font-medium text-gray-200">
                      In Thai
                    </label>
                    <div className="">
                      <input
                        type="text"
                        name="In-Thai"
                        id="In-Thai"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="In-English" className="block text-sm font-medium text-gray-200">
                      In English
                    </label>
                    <div className="">
                      <input
                        type="text"
                        name="In-English"
                        id="In-English"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="In-Japanese" className="block text-sm font-medium text-gray-200">
                      In Japanese
                    </label>
                    <div className="">
                      <input
                        type="text"
                        name="In-Japanese"
                        id="In-Japanese"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                      />
                    </div>
                  </div>

                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button type="button" className="text-sm font-semibold leading-6 text-gray-200">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>

        <div className='absolute top-0 left-0'>
          <div className='rounded-full w-10 h-10 m-10'>
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
