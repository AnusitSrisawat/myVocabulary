import { useEffect, useState } from 'react';
import Link from 'next/link';
import "../app/globals.css";

interface Word {
  id: string;
  in_thai: string;
  in_english: string;
  in_japanese: string;
  word_type: string;
}

export default function Game() {
  const [totalCorrectPoint, setTotalCorrectPoint] = useState(0);
  const [totalWrongPoint, setTotalWrongPoint] = useState(0);
  const [correctPoint, setCorrectPoint] = useState(0);
  const [wrongPoint, setWrongPoint] = useState(0);
  const [countMax, setCountMax] = useState(0);
  const [count, setCount] = useState(0);
  const [ans, setAns] = useState(false);
  const [clickAns, setClickAns] = useState('');
  const [choices, setChoices] = useState<Array<Array<Word>>>([]);
  const [data, setData] = useState<Array<Word>>([]);

  const [lang, setLang] = useState('tha');
  const [toLang, setToLang] = useState('eng');

  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/words');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData: Array<Word> = await response.json();
      setData(responseData);
      FourChoices(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const shuffleArray = (array: Array<Word>): Array<Word> => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const FourChoices = (data: Array<Word>) => {
    const result: Array<Array<Word>> = [];
    for (let i = 0; i < data.length; i++) {
      const currentWord = data[i];
      const filteredWords = data.filter((word, index) => index !== i); // Exclude current word
      const shuffledWords = shuffleArray(filteredWords); // Shuffle the remaining words
      const otherWords = shuffledWords.slice(0, 3); // Take the first three words from shuffled array

      const choices = shuffleArray([currentWord, ...otherWords]);
      result.push(choices);
    }
    setChoices(result);
  };

  const ansNext = (id: string) => {
    setAns(true);
    if (id == currentWord.id) {
      setCorrectPoint((prevCount) => (prevCount + 1));
      setTotalCorrectPoint((prevCount) => (prevCount + 1));
    } else {
      setWrongPoint((prevCount) => (prevCount + 1));
      setTotalWrongPoint((prevCount) => (prevCount + 1));
    }

    setTimeout(() => {
      setAns(false);
      setCountMax((prevCount) => (prevCount + 1));
      setCount((prevCount) => (prevCount + 1) % data.length); // Loop count within data length
    }, 1000); // 2 seconds delay
  };

  const handleNext = () => {
    setAns(true);
    if (count <= countMax) {
      setAns(false);
    }
    setCount((prevCount) => (prevCount + 1) % data.length); // Loop count within data length
  };

  const handlePrev = () => {
    setAns(true);
    setCount((prevCount) => (prevCount - 1) % data.length); // Loop count within data length
  };

  const togglepoint = () => {
    setToggle(!toggle);
  };

  const currentWord = data[count];

  return (
    <>
      <div className="relative flex w-screen min-h-screen flex-col items-center justify-center gap-10 p-10">
        <div className='relative bg-slate-700 shadow-xl bg-opacity-30 rounded-3xl flex flex-col justify-center items-center w-full md:w-auto min-w-[50vw] md:min-w-[30vw] max-w-[80vw]'>
          <div className='relative p-10 rounded-3xl flex flex-col justify-center items-center gap-6 w-full'>

            {count > 0 && false && (
              <div className='absolute top-0 left-0'>
                <div className='rounded-full w-8 h-8 m-5'>
                  <button onClick={handlePrev}>
                    {/* <img src="/back.svg" alt="back" className='w-full h-full hover:scale-125 active:scale-90 cursor-pointer /> */}
                    <img src="/backWhite.svg" alt="back" className='w-full h-full hover:scale-125 active:scale-90 cursor-pointer duration-200' />
                  </button>
                </div>
              </div>
            )}

            {count < countMax && false && (
              <div className='absolute top-0 right-0'>
                <div className='rounded-full w-8 h-8 m-5 -scale-x-100'>
                  <button onClick={handleNext}>
                    {/* <img src="/back.svg" alt="back" className='w-full h-full hover:scale-125 active:scale-90 cursor-pointer /> */}
                    <img src="/backWhite.svg" alt="back" className='w-full h-full hover:scale-125 active:scale-90 cursor-pointer duration-200' />
                  </button>
                </div>
              </div>
            )}

            <div className='flex flex-col justify-start items-center gap-4'>
              <div className='rounded-full w-10 h-10'>
                <img src="/gameWhite.svg" alt="game" className='w-full h-full hover:scale-125 active:scale-90 duration-200 cursor-pointer' />
              </div>
              <div className='break-words whitespace-normal text-xl md:text-3xl'>
                {lang === 'tha' && <span> {currentWord?.in_thai}</span>}
                {lang === 'eng' && <span> {currentWord?.in_english}</span>}
                {lang === 'jpn' && <span> {currentWord?.in_japanese}</span>}
              </div>
            </div>

            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 justify-center items-center text-base md:text-xl'>
              {choices[count]?.map((choiceItem, choiceIndex) => (
                <div key={choiceIndex} className={`w-full bg-slate-600 bg-opacity-10 text-left px-4 py-3 md:px-5 md:py-4 rounded-xl cursor-pointer border-2 border-slate-600 hover:border-slate-500 hover:bg-slate-500 hover:shadow-lg hover:scale-105 active:scale-90 duration-200
                ${currentWord?.id == choiceItem?.id && ans ? '!bg-green-500 bg-opacity-100 border-2 !border-green-600 !hover:border-green-500 !hover:bg-green-500' : ''} 
                ${currentWord?.id != choiceItem?.id && ans && clickAns == choiceItem?.id ? '!bg-red-500 bg-opacity-100 border-2 !border-red-600 !hover:border-red-500 !hover:bg-red-500' : ''}`}
                  onClick={() => { ansNext(choiceItem?.id); setClickAns(choiceItem?.id) }}>
                  {String.fromCharCode(65 + choiceIndex)}.

                  {toLang === 'tha' && <span> {choiceItem?.in_english}</span>}
                  {toLang === 'eng' && <span> {choiceItem?.in_english}</span>}
                  {toLang === 'jpn' && <span> {choiceItem?.in_japanese}</span>}

                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='fixed top-0 left-0'>
          <div className='rounded-full w-10 h-10 m-5'>
            <Link href="/">
              {/* <img src="/back.svg" alt="back" className='w-full h-full hover:scale-125 active:scale-90 cursor-pointer duration-200' /> */}
              <img src="/backWhite.svg" alt="back" className='w-full h-full hover:scale-125 active:scale-90 cursor-pointer duration-200' />
            </Link>
          </div>
        </div>

        <div className={`fixed top-0 right-0 duration-200 bg-slate-600 md:bg-transparent rounded-3xl ${toggle ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className={`relative rounded-full w-full h-fit p-2 md:p-5 flex flex-col justify-start items-start gap-2 duration-200`}>
            <div className={`absolute top-0 left-0 flex justify-start items-start px-7 py-7 md:py-7 -translate-x-full duration-200 ${toggle ? 'md:px-0' : 'md:px-5 -scale-100'}`}
              onClick={() => togglepoint()}>
              {/* <img src="/chevronLeft.svg" alt="chevronLeft" className='w-5 h-5 hover:scale-125 active:scale-90 cursor-pointer duration-200' /> */}
              <img src="/chevronLeftWhite.svg" alt="chevronLeft" className='w-5 h-5 hover:scale-125 active:scale-90 cursor-pointer duration-200' />
            </div>

            <div className='flex flex-row justify-start items-center gap-2 lg:gap-4 bg-slate-600 bg-opacity-30 px-4 py-2 rounded-2xl w-full'>
              {/* <img src="/correct.svg" alt="correct" className='w-6 h-6 hover:scale-125 active:scale-90 cursor-pointer duration-200' /> */}
              <img src="/correctWhite.svg" alt="correct" className='w-6 h-6 hover:scale-125 active:scale-90 cursor-pointer duration-200' />
              <div className='whitespace-nowrap'>Total Correct : {totalCorrectPoint}</div>
            </div>
            <div className='flex flex-row justify-start items-center gap-2 lg:gap-4 bg-slate-600 bg-opacity-30 px-4 py-2 rounded-2xl w-full'>
              {/* <img src="/wrong.svg" alt="wrong" className='w-6 h-6 hover:scale-125 active:scale-90 cursor-pointer duration-200' /> */}
              <img src="/wrongWhite.svg" alt="wrong" className='w-6 h-6 hover:scale-125 active:scale-90 cursor-pointer duration-200' />
              <div className='whitespace-nowrap'>Total Wrong : {totalWrongPoint}</div>
            </div>
            <div className='flex flex-row justify-start items-center gap-2 lg:gap-4 bg-slate-600 bg-opacity-30 px-4 py-2 rounded-2xl w-full'>
              {/* <img src="/correct.svg" alt="correct" className='w-6 h-6 hover:scale-125 active:scale-90 cursor-pointer duration-200' /> */}
              <img src="/correctWhite.svg" alt="correct" className='w-6 h-6 hover:scale-125 active:scale-90 cursor-pointer duration-200' />
              <div className='whitespace-nowrap'>Correct : {correctPoint}</div>
            </div>
            <div className='flex flex-row justify-start items-center gap-2 lg:gap-4 bg-slate-600 bg-opacity-30 px-4 py-2 rounded-2xl w-full'>
              {/* <img src="/wrong.svg" alt="wrong" className='w-6 h-6 hover:scale-125 active:scale-90 cursor-pointer duration-200' /> */}
              <img src="/wrongWhite.svg" alt="wrong" className='w-6 h-6 hover:scale-125 active:scale-90 cursor-pointer duration-200' />
              <div className='whitespace-nowrap'>Wrong : {wrongPoint}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
