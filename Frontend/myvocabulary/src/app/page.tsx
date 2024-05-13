import Image from "next/image";
import Link from 'next/link';
import "./globals.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className='relative bg-slate-700 shadow-xl bg-opacity-30 rounded-3xl flex flex-col justify-center items-center p-10 gap-5'>
        
        <Link href="/Game">
          <div className='bg-slate-500 bg-opacity-30 p-5 rounded-2xl flex flex-row justify-center items-center min-w-40 border-2 border-slate-600 hover:border-slate-500 hover:bg-slate-500 hover:shadow-lg hover:scale-105 active:scale-90 duration-200 cursor-pointer'>
            Game
          </div>
        </Link>

        <Link href="/Words">
          <div className='bg-slate-500 bg-opacity-30 p-5 rounded-2xl flex flex-row justify-center items-center min-w-40 border-2 border-slate-600 hover:border-slate-500 hover:bg-slate-500 hover:shadow-lg hover:scale-105 active:scale-90 duration-200 cursor-pointer'>
            <div className='break-words whitespace-normal'>Words</div>
          </div>
        </Link>

        <Link href="/Setting">
          <div className='bg-slate-500 bg-opacity-30 p-5 rounded-2xl flex flex-row justify-center items-center min-w-40 border-2 border-slate-600 hover:border-slate-500 hover:bg-slate-500 hover:shadow-lg hover:scale-105 active:scale-90 duration-200 cursor-pointer'>
            <div className='rounded-full w-10 h-10'>
              {/* <img src="/setting.svg" alt="setting" className='w-full h-full hover:scale-105 active:scale-90 cursor-pointer /> */}
              <img src="/settingWhite.svg" alt="setting" className='w-full h-full hover:scale-105 active:scale-90 cursor-pointer' />
            </div>
            <div className='break-words whitespace-normal'>Setting</div>
          </div>
        </Link>

      </div>
    </main>
  );
}
