import { useEffect, useState } from 'react';
import Link from 'next/link';
import "../app/globals.css";

interface Word {
  in_thai: string;
  in_english: string;
  in_japanese: string;
  word_type: string;
}

export default function Game() {
  const [count, setCount] = useState(0);
  const [choices, setChoices] = useState<Array<Array<Word>>>([]);
  const [data, setData] = useState<Array<Word>>([]);

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
      const otherWords = data.filter((word, index) => index !== i).slice(0, 3); // Exclude current word and get 3 random words

      const choices = shuffleArray([currentWord, ...otherWords]);
      result.push(choices);
    }

    setChoices(result);
  };

  const handleNext = () => {
    setCount((prevCount) => (prevCount + 1) % data.length); // Loop count within data length
    // console.log(count);
  };

  const currentWord = data[count];

  return (
    <>
      <div className="relative flex w-screen min-h-screen flex-col items-center justify-center gap-10 p-10">
        <div className='relative bg-slate-700 shadow-xl bg-opacity-30 rounded-3xl flex flex-col justify-center items-center w-full md:w-auto max-w-[80vw]'>
          <div className='p-10 rounded-3xl flex flex-col justify-center items-center gap-6 w-full'>
            <div className='flex flex-col justify-start items-center gap-4 md:gap-6'>
              <div className='rounded-full w-10 h-10'>
                <img src="/gameWhite.svg" alt="game" className='w-full h-full hover:scale-125 active:scale-90 duration-200 cursor-pointer' />
              </div>
              <div className='break-words whitespace-normal text-xl md:text-3xl'>{currentWord?.in_thai}</div>
            </div>

            {choices[count]?.map((choiceItem, choiceIndex) => (
              <div key={choiceIndex} className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 justify-center items-center text-base md:text-xl'>
                <div className='w-full bg-slate-600 bg-opacity-10 text-left px-4 py-3 md:px-5 md:py-4 rounded-xl cursor-pointer border-2 border-slate-600 hover:border-slate-500 hover:bg-slate-500 hover:shadow-lg hover:scale-105 active:scale-90 duration-200'
                  onClick={handleNext}>
                  {String.fromCharCode(65 + choiceIndex)}. <span>{choiceItem?.in_thai}</span>
                </div>
              </div>
            ))}
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
  );
}
