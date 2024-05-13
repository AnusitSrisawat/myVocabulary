import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link';
import "../app/globals.css";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Words() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [wordType, setWordType] = useState(["Noun", "Pronoun", "Verb", "Adjective", "Adverb", "Preposition", "Conjunction", "Interjection"])

  const [selected, setSelected] = useState("")

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
      <div className="relative flex w-screen max-w-screen min-h-screen h-fit flex-col md:flex-row items-center justify-center gap-10 md:gap-20 p-10 md:p-0 overflow-y-auto overflow-x-hidden">

        <div className='flex flex-col gap-10 md:gap-0 justify-between items-center w-fit md:h-[90vh]'>
          
          <div className='relative bg-slate-600 shadow-xl bg-opacity-40 rounded-3xl flex flex-col justify-center items-center'>
            <div className='p-10 rounded-3xl flex flex-col justify-center items-center gap-6'>
              <div className='flex flex-col justify-start items-center gap-2'>
                <div className='rounded-full w-10 h-10'>
                  {/* <img src="/words.svg" alt="words" className='w-full h-full hover:scale-105 active:scale-90 cursor-pointer /> */}
                  <img src="/wordsWhite.svg" alt="words" className='w-full h-full hover:scale-105 active:scale-90 cursor-pointer' />
                </div>
                <div className='break-words whitespace-normal text-xl'>New Word</div>
              </div>
              <div className='w-full flex flex-col gap-4 justify-center items-center'>

                <form>
                  <div className='w-full flex flex-col justify-center items-center gap-4 min-w-52'>

                    <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2 md:gap-4 w-full">
                      <label htmlFor="In-Thai" className="block text-sm text-gray-200">
                        In Thai
                      </label>
                      <div className="w-full md:w-32">
                        <input
                          type="text"
                          name="In-Thai"
                          id="In-Thai"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2 md:gap-4 w-full">
                      <label htmlFor="In-English" className="block text-sm text-gray-200">
                        In English
                      </label>
                      <div className="w-full md:w-32">
                        <input
                          type="text"
                          name="In-English"
                          id="In-English"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2 md:gap-4 w-full">
                      <label htmlFor="In-Japanese" className="block text-sm text-gray-200">
                        In Japanese
                      </label>
                      <div className="w-full md:w-32">
                        <input
                          type="text"
                          name="In-Japanese"
                          id="In-Japanese"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                        />
                      </div>
                    </div>

                    <Listbox value={selected} onChange={setSelected}>
                      {({ open }) => (
                        <>
                          <div className="relative flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2 md:gap-4 w-full">
                            <label htmlFor="WordType" className="block text-sm text-gray-200">
                              Word Type
                            </label>
                            <div className="w-full md:w-32">
                              <Listbox.Button className="relative w-full min-h-8 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                <span className="flex items-center">
                                  {/* <img src={selected.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                                  <span className="block">{selected}</span>
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                              </Listbox.Button>
                            </div>


                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {wordType.map((wordType) => (
                                  <Listbox.Option
                                    key={wordType}
                                    className={({ active }) =>
                                      classNames(
                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                        'relative cursor-default select-none py-2 pl-3 pr-9'
                                      )
                                    }
                                    value={wordType}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <div className="flex items-center">
                                          {/* <img src={wordType} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                                          <span
                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'block')}
                                          >
                                            {wordType}
                                          </span>
                                        </div>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active ? 'text-white' : 'text-indigo-600',
                                              'absolute inset-y-0 right-0 flex items-center pr-4'
                                            )}
                                          >
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>

                  </div>

                  <div className="mt-6 flex items-center justify-center gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-200">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-200"
                    >
                      Save
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>

          <div className='relative bg-slate-600 shadow-xl bg-opacity-40 rounded-3xl flex flex-col justify-center items-center'>
            <div className='p-10 rounded-3xl flex flex-col justify-center items-center gap-6'>
              <div className='flex flex-col justify-start items-center gap-2'>
                <div className='break-words whitespace-normal text-xl'>Edit Word</div>
              </div>
              <div className='w-full flex flex-col gap-4 justify-center items-center'>

                <form>
                  <div className='w-full flex flex-col justify-center items-center gap-4 min-w-52'>

                    <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2 md:gap-4 w-full">
                      <label htmlFor="In-Thai" className="block text-sm text-gray-200">
                        In Thai
                      </label>
                      <div className="w-full md:w-32">
                        <input
                          type="text"
                          name="In-Thai"
                          id="In-Thai"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2 md:gap-4 w-full">
                      <label htmlFor="In-English" className="block text-sm text-gray-200">
                        In English
                      </label>
                      <div className="w-full md:w-32">
                        <input
                          type="text"
                          name="In-English"
                          id="In-English"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2 md:gap-4 w-full">
                      <label htmlFor="In-Japanese" className="block text-sm text-gray-200">
                        In Japanese
                      </label>
                      <div className="w-full md:w-32">
                        <input
                          type="text"
                          name="In-Japanese"
                          id="In-Japanese"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                        />
                      </div>
                    </div>

                    <Listbox value={selected} onChange={setSelected}>
                      {({ open }) => (
                        <>
                          <div className="relative flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2 md:gap-4 w-full">
                            <label htmlFor="WordType" className="block text-sm text-gray-200">
                              Word Type
                            </label>
                            <div className="w-full md:w-32">
                              <Listbox.Button className="relative w-full min-h-8 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                <span className="flex items-center">
                                  {/* <img src={selected.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                                  <span className="block">{selected}</span>
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                              </Listbox.Button>
                            </div>


                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {wordType.map((wordType) => (
                                  <Listbox.Option
                                    key={wordType}
                                    className={({ active }) =>
                                      classNames(
                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                        'relative cursor-default select-none py-2 pl-3 pr-9'
                                      )
                                    }
                                    value={wordType}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <div className="flex items-center">
                                          {/* <img src={wordType} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                                          <span
                                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'block')}
                                          >
                                            {wordType}
                                          </span>
                                        </div>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active ? 'text-white' : 'text-indigo-600',
                                              'absolute inset-y-0 right-0 flex items-center pr-4'
                                            )}
                                          >
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>

                  </div>

                  <div className="mt-6 flex items-center justify-center gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-200">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-200"
                    >
                      Save
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>

        </div>

        <div className='relative bg-slate-600 shadow-xl bg-opacity-40 rounded-3xl flex flex-col justify-start items-start gap-4 p-5 w-full md:w-auto overflow-auto md:h-[90vh]'>
          <div className='flex flex-col md:flex-row w-full justify-between items-center gap-4'>
            <div className='flex flex-row justify-center md:justify-start items-center gap-4 w-full text-2xl font-bold px-4'>
              Words Database
            </div>
            <div className="flex flex-row justify-end items-center gap-4 w-full">
              <div className="w-full md:w-52">
                <input
                  type="text"
                  name="Search"
                  id="Search"
                  autoComplete="given-name"
                  className="block w-full h-8 rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                />
              </div>
              <div className='rounded-full w-5 h-5'>
                {/* <img src="/search.svg" alt="search" className='w-full h-full hover:scale-125 active:scale-100 cursor-pointer' /> */}
                <img src="/searchWhite.svg" alt="search" className='w-full h-full hover:scale-125 active:scale-100 cursor-pointer' />
              </div>
            </div>
          </div>

          <div className='relative flex flex-col justify-start items-start md:px-5 w-full md:w-auto overflow-auto max-h-[50vh] md:max-h-screen'>
            <table className="table-auto">
              <thead>
                <tr className='border-b-2 border-indigo-800'>
                  <th className='px-4 py-3'>Song</th>
                  <th className='px-4 py-3'>Artist</th>
                  <th className='px-4 py-3'>Artist</th>
                  <th className='px-4 py-3'>Year</th>
                </tr>
              </thead>
              <tbody>

                <tr className='border-b-2 border-indigo-950'>
                  <td className='px-4 py-3'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td className='px-4 py-3'>Malcolm Lockyer</td>
                  <td className='px-4 py-3'>Malcolm Lockyer</td>
                  <td className='px-4 py-3'>1961</td>
                </tr>
                <tr className='border-b-2 border-indigo-950'>
                  <td className='px-4 py-3'>Witchy Woman</td>
                  <td className='px-4 py-3'>The Eagles</td>
                  <td className='px-4 py-3'>The Eagles</td>
                  <td className='px-4 py-3'>1972</td>
                </tr>
                <tr className='border-b-2 border-indigo-950'>
                  <td className='px-4 py-3'>Shining Star</td>
                  <td className='px-4 py-3'>Earth, Wind, and Fire</td>
                  <td className='px-4 py-3'>Earth, Wind, and Fire</td>
                  <td className='px-4 py-3'>1975</td>
                </tr>
                <tr className='border-b-2 border-indigo-950'>
                  <td className='px-4 py-3'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td className='px-4 py-3'>Malcolm Lockyer</td>
                  <td className='px-4 py-3'>Malcolm Lockyer</td>
                  <td className='px-4 py-3'>1961</td>
                </tr>
                <tr className='border-b-2 border-indigo-950'>
                  <td className='px-4 py-3'>Witchy Woman</td>
                  <td className='px-4 py-3'>The Eagles</td>
                  <td className='px-4 py-3'>The Eagles</td>
                  <td className='px-4 py-3'>1972</td>
                </tr>
                <tr className='border-b-2 border-indigo-950'>
                  <td className='px-4 py-3'>Shining Star</td>
                  <td className='px-4 py-3'>Earth, Wind, and Fire</td>
                  <td className='px-4 py-3'>Earth, Wind, and Fire</td>
                  <td className='px-4 py-3'>1975</td>
                </tr>
                <tr className='border-b-2 border-indigo-950'>
                  <td className='px-4 py-3'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td className='px-4 py-3'>Malcolm Lockyer</td>
                  <td className='px-4 py-3'>Malcolm Lockyer</td>
                  <td className='px-4 py-3'>1961</td>
                </tr>
                <tr className='border-b-2 border-indigo-950'>
                  <td className='px-4 py-3'>Witchy Woman</td>
                  <td className='px-4 py-3'>The Eagles</td>
                  <td className='px-4 py-3'>The Eagles</td>
                  <td className='px-4 py-3'>1972</td>
                </tr>
                <tr className='border-b-2 border-indigo-950'>
                  <td className='px-4 py-3'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td className='px-4 py-3'>Malcolm Lockyer</td>
                  <td className='px-4 py-3'>Malcolm Lockyer</td>
                  <td className='px-4 py-3'>1961</td>
                </tr>
                <tr className='border-b-2 border-indigo-950'>
                  <td className='px-4 py-3'>Witchy Woman</td>
                  <td className='px-4 py-3'>The Eagles</td>
                  <td className='px-4 py-3'>The Eagles</td>
                  <td className='px-4 py-3'>1972</td>
                </tr>
                <tr className='border-b-2 border-indigo-950'>
                  <td className='px-4 py-3'>Shining Star</td>
                  <td className='px-4 py-3'>Earth, Wind, and Fire</td>
                  <td className='px-4 py-3'>Earth, Wind, and Fire</td>
                  <td className='px-4 py-3'>1975</td>
                </tr>
                <tr className='border-b-2 border-indigo-950'>
                  <td className='px-4 py-3'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td className='px-4 py-3'>Malcolm Lockyer</td>
                  <td className='px-4 py-3'>Malcolm Lockyer</td>
                  <td className='px-4 py-3'>1961</td>
                </tr>
                <tr className='border-b-2 border-indigo-950'>
                  <td className='px-4 py-3'>Witchy Woman</td>
                  <td className='px-4 py-3'>The Eagles</td>
                  <td className='px-4 py-3'>The Eagles</td>
                  <td className='px-4 py-3'>1972</td>
                </tr>
                <tr className='border-b-2 border-indigo-950'>
                  <td className='px-4 py-3'>Shining Star</td>
                  <td className='px-4 py-3'>Earth, Wind, and Fire</td>
                  <td className='px-4 py-3'>Earth, Wind, and Fire</td>
                  <td className='px-4 py-3'>1975</td>
                </tr>
                <tr className='border-b-2 border-indigo-950'>
                  <td className='px-4 py-3'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td className='px-4 py-3'>Malcolm Lockyer</td>
                  <td className='px-4 py-3'>Malcolm Lockyer</td>
                  <td className='px-4 py-3'>1961</td>
                </tr>
                <tr className='border-b-2 border-indigo-950'>
                  <td className='px-4 py-3'>Witchy Woman</td>
                  <td className='px-4 py-3'>The Eagles</td>
                  <td className='px-4 py-3'>The Eagles</td>
                  <td className='px-4 py-3'>1972</td>
                </tr>
                <tr className='border-b-2 border-indigo-950'>
                  <td className='px-4 py-3'>Shining Star</td>
                  <td className='px-4 py-3'>Earth, Wind, and Fire</td>
                  <td className='px-4 py-3'>Earth, Wind, and Fire</td>
                  <td className='px-4 py-3'>1975</td>
                </tr>

              </tbody>
            </table>
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
