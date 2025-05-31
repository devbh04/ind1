'use client'
import React, { useState, useEffect } from 'react';
import quiz from '@/public/que';
import { useRouter } from 'next/navigation';

const Quiz = () => {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState('animate-fadeIn');
    const [allChosenOptions, setAllChosenOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [domain, setDomain] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);

    useEffect(() => {
        const storedDomain = localStorage.getItem('selectedDomain');
        if (!storedDomain) {
            router.push('/domain');
        } else {
            setDomain(storedDomain);
            const category = quiz.find(cat => cat.category === storedDomain);
            setCurrentCategory(category);
            if (category) {
                setCurrentQuestion(category.questions[0]);
            } else {
                router.push('/domain');
            }
        }
    }, [router.push]);

    const handleNext = () => {
        setFade('animate-fadeOut');
        setTimeout(() => {
            if (!selectedOption) {
                setAllChosenOptions([...allChosenOptions, { 
                    question: currentQuestion, 
                    chosenOption: 'not answered' 
                }]);
            }

            if (index < currentCategory.questions.length - 1) {
                setIndex(index + 1);
                setCurrentQuestion(currentCategory.questions[index + 1]);
                setFade('animate-fadeIn');
                setSelectedOption(null);
            } else {
                localStorage.setItem('userAnswers', JSON.stringify(allChosenOptions));
                setQuizCompleted(true);
            }
        }, 200);
        console.log(allChosenOptions);
    };

    const handleOption = (option) => {
        if (selectedOption) return;

        setSelectedOption(option);
        setAllChosenOptions([...allChosenOptions, { 
            question: currentQuestion, 
            chosenOption: option 
        }]);
    };

    const calculateScore = () => allChosenOptions.filter(choice => choice.chosenOption.isCorrect).length;

    const handleRedirect = () => {
        localStorage.setItem('quizScore', JSON.stringify(calculateScore()));
        router.push('/editor')
    };

    if (quizCompleted) {
        return (
            <div className='flex justify-center items-center'>
                <div className='text-center bg-white p-20 rounded-xl'>
                    <h1 className='text-3xl'>Quiz Completed!</h1>
                    <p className='text-xl mt-4'>Your Score: {calculateScore()} / {currentCategory.questions.length}</p>
                    <p className='text-xl mt-4'>Domain: {domain}</p>
                    <p className='text-xl mt-4'>Proceed with Coding Question</p>
                    <button 
                        className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mt-6'
                        onClick={handleRedirect}
                    >
                        Go Code
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='w-1/2 h-3/4 border-2 border-slate-300 border-solid rounded-xl overflow-hidden bg-white'>
                <div className={`p-28 ${fade}`}>
                    <h1 className='text-2xl border-2 p-4 rounded-xl shadow-md'>{index + 1}. {currentQuestion?.question}</h1>
                    {currentQuestion?.options.map((option, i) => (
                        <p 
                            key={i}
                            className={`text-xl drop-shadow-xl shadow-sm border-2 p-4 m-4 rounded-lg hover:bg-slate-100 cursor-pointer
                                ${selectedOption === option 
                                    ? (option.isCorrect !== undefined 
                                        ? option.isCorrect ? 'bg-green-500' : 'bg-red-500' 
                                        : 'bg-slate-200') 
                                    : ''}`}
                            onClick={() => handleOption(option)}
                            style={{ pointerEvents: selectedOption ? 'none' : 'auto' }}
                        >
                            {option.text}
                        </p>
                    ))}
                    <div className='flex flex-col items-center mt-8'>
                        <button className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700' onClick={handleNext}>
                            Next
                        </button>
                        <p className='mt-2'>{index + 1} of {currentCategory?.questions.length} questions</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
