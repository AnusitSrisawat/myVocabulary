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
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const [wordType, setWordType] = useState(["Noun", "Pronoun", "Verb", "Adjective", "Adverb", "Preposition", "Conjunction", "Interjection"])

  const [selectedWordTypeEdit, setSelectedWordTypeEdit] = useState("")

  useEffect(() => {
    fetchData();
  }, []);

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

  const fetchSearchResults = async (term: string) => {
    try {
      const response = await fetch(`http://localhost:8081/api/search?term=${term}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log("responseData", responseData);

      setSearchResults(responseData);
      setData(responseData);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    fetchSearchResults(term);
  };

  const [formData, setFormData] = useState({
    inThai: '',
    inEnglish: '',
    inJapanese: '',
    wordType: ''
  });

  const handleChangeAdd = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleChangeAddSelect = (selectedOption: any) => {
    setFormData({
      ...formData,
      wordType: selectedOption
    });
  };
  const resetFormData = () => {
    setFormData({
      inThai: '',
      inEnglish: '',
      inJapanese: '',
      wordType: ''
    });
  };

  const handleSubmitAdd = async (e: any) => {
    e.preventDefault();

    try {

      await axios.post('http://localhost:8081/api/words/add', formData);

      setFormData({
        inThai: '',
        inEnglish: '',
        inJapanese: '',
        wordType: ''
      });

      fetchData();

    } catch (error) {
      console.error('Error adding word:', error);
    }
  };

  const deleteWord = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:8081/api/words/${id}`);

      fetchData();

      console.log(response.data.message);

    } catch (error) {
      console.error('Error deleting word:', error);
    }
  };


  return (
    <>
      <div className="relative flex w-screen max-w-screen min-h-screen h-fit flex-col lg:flex-row items-center lg:items-start justify-start lg:justify-center gap-10 md:gap-20 p-10 md:px-10 overflow-y-auto overflow-x-hidden">

        <div className='flex flex-col gap-10 md:gap-20 justify-between items-center w-fit md:h-fit lg:max-h-[90vh]'>

          <div className='relative bg-slate-600 shadow-xl bg-opacity-40 rounded-3xl flex flex-col justify-center items-center'>
            <div className='p-5 lg:p-10 rounded-3xl flex flex-col justify-center items-center gap-6'>
              <div className='flex flex-col justify-start items-center gap-2'>
                <div className='rounded-full w-10 h-10'>
                  {/* <img src="/words.svg" alt="words" className='w-full h-full hover:scale-105 active:scale-90 duration-200 cursor-pointer /> */}
                  <img src="/wordsWhite.svg" alt="words" className='w-full h-full hover:scale-105 active:scale-90 duration-200 cursor-pointer' />
                </div>
                {/* <div className='break-words whitespace-normal text-xl'>Form</div> */}
              </div>
              <div className='w-full flex flex-col gap-4 justify-center items-center'>

                <form onSubmit={handleSubmitAdd}>
                  <div className='w-full grid grid-cols-2 lg:flex flex-col justify-center items-center gap-4 min-w-52'>

                    <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-2 lg:gap-4 w-full">
                      <label htmlFor="inThai" className="block text-sm text-gray-200 whitespace-nowrap">
                        In Thai
                      </label>
                      <div className="w-full lg:w-32">
                        <input
                          type="text"
                          name="inThai"
                          id="inThai"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                          value={formData.inThai}
                          onChange={handleChangeAdd}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-2 lg:gap-4 w-full">
                      <label htmlFor="inEnglish" className="block text-sm text-gray-200 whitespace-nowrap">
                        In English
                      </label>
                      <div className="w-full lg:w-32">
                        <input
                          type="text"
                          name="inEnglish"
                          id="inEnglish"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                          value={formData.inEnglish}
                          onChange={handleChangeAdd}
                        />
                      </div>
                    </div>

                    {/* <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-2 lg:gap-4 w-full">
                      <label htmlFor="inJapanese" className="block text-sm text-gray-200 whitespace-nowrap">
                        In Japanese
                      </label>
                      <div className="w-full lg:w-32">
                        <input
                          type="text"
                          name="inJapanese"
                          id="inJapanese"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                          value={formData.inJapanese}
                          onChange={handleChangeAdd}
                        />
                      </div>
                    </div> */}

                    {/* <Listbox
                      name="wordType"
                      value={formData.wordType}
                      onChange={handleChangeAddSelect}>
                      {({ open }) => (
                        <>
                          <div className="relative flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-2 lg:gap-4 w-full">
                            <label htmlFor="wordType" className="block text-sm text-gray-200 whitespace-nowrap">
                              Word Type
                            </label>
                            <div className="w-full lg:w-32">
                              <Listbox.Button className="relative cursor-pointer w-full min-h-8 rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                <span className="flex items-center">
                                  <span className="block">{formData.wordType}</span>
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
                    </Listbox> */}

                  </div>

                  <div className="mt-6 flex items-center justify-center gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-200"
                      onClick={() => (resetFormData())}>
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

          <div className='hidden relative bg-slate-600 shadow-xl bg-opacity-40 rounded-3xl flex flex-col justify-center items-center'>
            <div className='p-10 rounded-3xl flex flex-col justify-center items-center gap-6'>
              <div className='flex flex-col justify-start items-center gap-2'>
                <div className='break-words whitespace-normal text-xl'>Edit Word</div>
              </div>
              <div className='w-full flex flex-col gap-4 justify-center items-center'>

                <form>
                  <div className='w-full grid grid-cols-2 lg:flex flex-col justify-center items-center gap-4 min-w-52'>

                    <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-2 md:gap-4 w-full">
                      <label htmlFor="In-Thai" className="block text-sm text-gray-200 whitespace-nowrap">
                        In Thai
                      </label>
                      <div className="w-full lg:w-32">
                        <input
                          type="text"
                          name="In-Thai"
                          id="In-Thai"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-2 md:gap-4 w-full">
                      <label htmlFor="In-English" className="block text-sm text-gray-200 whitespace-nowrap">
                        In English
                      </label>
                      <div className="w-full lg:w-32">
                        <input
                          type="text"
                          name="In-English"
                          id="In-English"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-2 md:gap-4 w-full">
                      <label htmlFor="In-Japanese" className="block text-sm text-gray-200 whitespace-nowrap">
                        In Japanese
                      </label>
                      <div className="w-full lg:w-32">
                        <input
                          type="text"
                          name="In-Japanese"
                          id="In-Japanese"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                        />
                      </div>
                    </div> */}

                    {/* <Listbox value={selectedWordTypeEdit} onChange={setSelectedWordTypeEdit}>
                      {({ open }) => (
                        <>
                          <div className="relative flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-2 md:gap-4 w-full">
                            <label htmlFor="WordType" className="block text-sm text-gray-200 whitespace-nowrap">
                              Word Type
                            </label>
                            <div className="w-full lg:w-32">
                              <Listbox.Button className="relative cursor-pointer w-full min-h-8 rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                <span className="flex items-center">
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
                    </Listbox> */}

                  </div>

                  <div className="mt-6 flex items-center justify-center gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-200"
                      onClick={() => (resetFormData())}>
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

        <div className='relative bg-slate-700 shadow-xl bg-opacity-40 rounded-3xl flex flex-col justify-start items-center md:items-start gap-4 p-5 w-full md:w-fit md:h-fit lg:max-h-[90vh]'>
          <div className='flex flex-col w-fit md:w-full justify-between items-center gap-y-4'>
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
                  className="block w-full h-fit md:max-8 rounded-md border-0 p-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div className='rounded-full w-5 h-5' onClick={() => (handleSearch)}>
                {/* <img src="/search.svg" alt="search" className='w-full h-full hover:scale-125 active:scale-100 duration-200 cursor-pointer' /> */}
                <img src="/searchWhite.svg" alt="search" className='w-full h-full hover:scale-125 active:scale-100 duration-200 cursor-pointer' />
              </div>
            </div>
          </div>

          <div className='relative flex flex-col justify-start items-start md:px-5 md:py-3 w-full max-h-[50vh] md:max-h-[80vh] overflow-auto rounded-3xl bg-slate-600 shadow-xl bg-opacity-30'>
            <table className="table-auto text-base rounded-3xl">
              <thead>
                <tr className='border-b-2 border-indigo-600 text-center'>
                  <th className='p-5 font-semibold border-r-2 border-indigo-600'> </th>
                  <th className='p-5 font-semibold'>Thai</th>
                  <th className='p-5 font-semibold'>English</th>
                  {/* <th className='p-5 font-semibold'>Japanese</th>
                  <th className='p-5 font-semibold'>Type</th> */}
                  <th className='p-5 font-semibold'>Actions</th>
                </tr>
              </thead>
              <tbody>

                {data.length > 0 ? (
                  <>
                    {
                      data.map((item: any, index: number) => (
                        <tr key={item.id} className={`border-b-2 text-center ${index === data.length - 1 ? 'border-transparent' : 'border-indigo-800'}`}>
                          <td className='p-5 font-normal border-r-2 border-indigo-600'>{index + 1}</td>
                          <td className='p-5 font-normal'>{item.in_thai == "" ? "-" : item.in_thai}</td>
                          <td className='p-5 font-normal'>{item.in_english == "" ? "-" : item.in_english}</td>
                          {/* <td className='p-5 font-normal'>{item.in_japanese == "" ? "-" : item.in_japanese}</td>
                      <td className='p-5 font-normal'>{item.word_type == "" ? "-" : item.word_type}</td> */}
                          <td className='p-5 font-normal flex flex-row gap-4 justify-center items-center'>
                            <div className='rounded-full w-6 h-6' onClick={() => deleteWord(item.id)}>
                              <img src="/bin.svg" alt="bin" className='w-full h-full hover:scale-125 active:scale-100 duration-200 cursor-pointer' />
                            </div>
                            {/* <div className='rounded-full w-6 h-6'>
                          <img src="/edit.svg" alt="edit" className='w-full h-full hover:scale-125 active:scale-100 duration-200 cursor-pointer' />
                        </div> */}1111
                          </td>
                        </tr>
                      ))
                    }
                  </>
                ) : (
                  <>
                    <tr className={`border-b-2 text-center border-transparent`}>
                      <td className='p-5 font-normal border-r-2 border-indigo-600'> </td>
                      <td className='p-5 font-normal'>no data</td>
                    </tr>
                  </>
                )}


              </tbody>
            </table>
          </div>
        </div>

        <div className='fixed top-0 left-0'>
          <div className='rounded-full w-10 h-10 m-5'>
            <Link href="/">
              {/* <img src="/back.svg" alt="back" className='w-full h-full hover:scale-125 active:scale-90 duration-200 cursor-pointer' /> */}
              <img src="/backWhite.svg" alt="back" className='w-full h-full hover:scale-125 active:scale-90 duration-200 cursor-pointer' />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
