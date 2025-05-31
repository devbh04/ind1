'use client';
import CodePS from '@/public/codePS';
import { Editor } from '@monaco-editor/react';
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';

function getRandomValue() {
  const domain = localStorage.getItem('selectedDomain');
  if (domain && CodePS[domain]) {
    const arr = CodePS[domain];
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
  return "No domain selected or domain does not exist";
}

function CodeEditor() {
  const [code, setCode] = useState('// Your code here');
  const [ps, setPs] = useState('');
  const [language, setLanguage] = useState('javascript')
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if selectedDomain exists in localStorage
    const domain = localStorage.getItem('selectedDomain');
    if (!domain) {
      router.push('/domain');
      return;
    }

    // If domain exists, proceed with loading the content
    const randomValue = getRandomValue();
    console.log(randomValue);
    setPs(randomValue);
    setIsLoading(false);
  }, [router]);

  const handleChange = (value) => {
    setCode(value);
    console.log(code);
  }

  const handleClick = () => {
    console.log(code);
    localStorage.setItem('code', JSON.stringify([{ code }, { ps }]));
    router.push('/');
  }

  const handleLanguage = (value) => {
    console.log(value);
    setLanguage(value)
  }

  if (isLoading) {
    return <div className='flex justify-center items-center h-screen'>Loading...</div>;
  }

  return (
    <div className='flex justify-center items-center'>
      <div className='p-4 border-2 rounded-xl bg-slate-200 border-slate-400'>
        <div className='flex items-center justify-between pb-2'>
          <div>
            <h1 className='text-xl font-semibold flex gap-2 items-center'>Problem Statement
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </h1>
            <p>{ps}</p>
          </div>
          <div className='flex gap-2 items-center'>
            <DropdownMenuRadioGroupDemo handleLanguage={handleLanguage}/>
            <button className='bg-yellow-400 p-2 rounded-lg' onClick={handleClick}>Submit Code</button>
          </div>
        </div>
        <div className='p-2 bg-gray-900 rounded-xl'>
          <Editor
            height="70vh"
            width="70vw"
            language={language}
            theme={"vs-dark"}
            value={code}
            onChange={handleChange}
            options={{
              fontSize: 18,
            }}
          />
        </div>
      </div>
    </div>
  );
}

const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "C++", value: "cpp" },
  { label: "C", value: "c" },
  { label: "Java", value: "java" },
  { label: "R", value: "r" },
];

function DropdownMenuRadioGroupDemo({handleLanguage}) {
  const [position, setPosition] = useState("bottom");
  const [language, setLanguage] = useState("Select language");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{language}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select below language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            {languages.map((language) => (
                <DropdownMenuRadioItem key={language.value} value={language.value} onClick = {()=>{handleLanguage(language.value); setLanguage(language.label)}}>
                {language.label}
              </DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CodeEditor;