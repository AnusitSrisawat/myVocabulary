import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link';
import "../app/globals.css";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import axios from 'axios'; // Import Axios for making HTTP requests
import { log } from 'console';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Words() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [wordType, setWordType] = useState(["Noun", "Pronoun", "Verb", "Adjective", "Adverb", "Preposition", "Conjunction", "Interjection"])

  const [selectedWordTypeAdd, setSelectedWordTypeAdd] = useState("")
  const [selectedWordTypeEdit, setSelectedWordTypeEdit] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/words');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const [formDataAdd, setFormDataAdd] = useState({
    inThai: '',
    inEnglish: '',
    inJapanese: '',
    wordType: ''
  });

  const [formDataEdit, setFormDataEdit] = useState({
    inThai: '',
    inEnglish: '',
    inJapanese: '',
    wordType: ''
  });

  const handleChangeAdd = (e: any) => {
    setFormDataAdd({
      ...formDataAdd,
      // [e.target.name]: e.target.value
    });
  };

  const handleSubmitAdd = async (e: any) => {
    e.preventDefault();

    try {
      console.log("formDataAdd", formDataAdd);

      // Send the form data to your backend API endpoint
      await axios.post('http://localhost:8081/api/words/add', formDataAdd);
      // alert('Word added successfully');
      // Optionally, you can reset the form fields after successful submission
      setFormDataAdd({
        inThai: '',
        inEnglish: '',
        inJapanese: '',
        wordType: ''
      });
    } catch (error) {
      console.error('Error adding word:', error);
      // alert('Failed to add word. Please try again later.');
    }
  };
  const handleSubmitEdit = async (e: any) => {
    e.preventDefault();

    try {
      // Send the form data to your backend API endpoint
      await axios.post('http://localhost:8081/api/words/edit', formDataEdit);
      alert('Word edited successfully');
      // Optionally, you can reset the form fields after successful submission
      setFormDataEdit({
        inThai: '',
        inEnglish: '',
        inJapanese: '',
        wordType: ''
      });
    } catch (error) {
      console.error('Error editing word:', error);
      alert('Failed to edit word. Please try again later.');
    }
  };


  return (
    <>
      <div className="relative flex w-screen max-w-screen min-h-screen h-fit flex-col md:flex-row items-center justify-center gap-10 md:gap-20 p-10 md:px-10 overflow-y-auto overflow-x-hidden">

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

                <form onSubmit={handleSubmitAdd}>
                  <div className='w-full flex flex-col justify-center items-center gap-4 min-w-52'>

                    <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2 md:gap-4 w-full">
                      <label htmlFor="In-Thai" className="block text-sm text-gray-200 whitespace-nowrap">
                        In Thai
                      </label>
                      <div className="w-full md:w-32">
                        <input
                          type="text"
                          name="In-Thai"
                          id="In-Thai"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"

                          onChange={handleChangeAdd}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2 md:gap-4 w-full">
                      <label htmlFor="In-English" className="block text-sm text-gray-200 whitespace-nowrap">
                        In English
                      </label>
                      <div className="w-full md:w-32">
                        <input
                          type="text"
                          name="In-English"
                          id="In-English"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"

                          onChange={handleChangeAdd}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2 md:gap-4 w-full">
                      <label htmlFor="In-Japanese" className="block text-sm text-gray-200 whitespace-nowrap">
                        In Japanese
                      </label>
                      <div className="w-full md:w-32">
                        <input
                          type="text"
                          name="In-Japanese"
                          id="In-Japanese"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"

                          onChange={handleChangeAdd}
                        />
                      </div>
                    </div>

                    <Listbox onChange={handleChangeAdd}>
                      {({ open }) => (
                        <>
                          <div className="relative flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2 md:gap-4 w-full">
                            <label htmlFor="WordType" className="block text-sm text-gray-200 whitespace-nowrap">
                              Word Type
                            </label>
                            <div className="w-full md:w-32">
                              <Listbox.Button className="relative cursor-pointer w-full min-h-8 rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                <span className="flex items-center">
                                  {/* <img src={selectedWordTypeAdd.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                                  <span className="block">{selectedWordTypeAdd}</span>
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
                                        'relative cursor-pointer select-none py-2 pl-3 pr-9'
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
                      Add
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
                      <label htmlFor="In-Thai" className="block text-sm text-gray-200 whitespace-nowrap">
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
                      <label htmlFor="In-English" className="block text-sm text-gray-200 whitespace-nowrap">
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
                      <label htmlFor="In-Japanese" className="block text-sm text-gray-200 whitespace-nowrap">
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

                    <Listbox value={selectedWordTypeEdit} onChange={setSelectedWordTypeEdit}>
                      {({ open }) => (
                        <>
                          <div className="relative flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2 md:gap-4 w-full">
                            <label htmlFor="WordType" className="block text-sm text-gray-200 whitespace-nowrap">
                              Word Type
                            </label>
                            <div className="w-full md:w-32">
                              <Listbox.Button className="relative cursor-pointer w-full min-h-8 rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                <span className="flex items-center">
                                  {/* <img src={selectedWordTypeEdit.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                                  <span className="block">{selectedWordTypeEdit}</span>
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
                                        'relative cursor-pointer select-none py-2 pl-3 pr-9'
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

        <div className='relative bg-slate-600 shadow-xl bg-opacity-40 rounded-3xl flex flex-col justify-start items-center md:items-start gap-4 p-5 w-full md:w-fit md:h-[90vh]'>
          <div className='flex flex-col md:flex-row w-fit md:w-full justify-between items-center gap-y-4'>
            <div className='flex flex-row justify-center md:justify-start items-center gap-4 w-fit text-2xl font-bold px-4'>
              Words Database
            </div>
            <div className="flex flex-row justify-end items-center gap-4 w-fit">
              <div className="w-40">
                <input
                  type="text"
                  name="Search"
                  placeholder="Search"
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

          <div className='w-full overflow-auto'>
            <div className='relative flex flex-col justify-start items-start md:px-5 w-fit max-h-[50vh] md:max-h-[80vh]'>
              <table className="table-auto text-base">
                <thead>
                  <tr className='border-b-2 border-indigo-800 text-center'>
                    <th className='px-4 py-3 font-semibold'>id</th>
                    <th className='px-4 py-3 font-semibold'>In Thai</th>
                    <th className='px-4 py-3 font-semibold'>In English</th>
                    <th className='px-4 py-3 font-semibold'>In Japanese</th>
                    <th className='px-4 py-3 font-semibold'>Word Type</th>
                    <th className='px-4 py-3 font-semibold'>actions</th>
                  </tr>
                </thead>
                <tbody>

                  {data.map((item: any) => (
                    <tr key={item.id} className='border-b-2 border-indigo-950 text-center'>
                      <td className='px-4 py-3 font-normal'>{item.id == "" ? "-" : item.id}</td>
                      <td className='px-4 py-3 font-normal'>{item.in_thai == "" ? "-" : item.in_thai}</td>
                      <td className='px-4 py-3 font-normal'>{item.in_english == "" ? "-" : item.in_english}</td>
                      <td className='px-4 py-3 font-normal'>{item.in_japanese == "" ? "-" : item.in_japanese}</td>
                      <td className='px-4 py-3 font-normal'>{item.word_type == "" ? "-" : item.word_type}</td>
                      <td className='px-4 py-3 font-normal flex flex-row gap-2 justify-center items-center'>
                        <div>
                          <img src="" alt="" />1
                        </div>
                        <div>
                          <img src="" alt="" />2
                        </div>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
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
