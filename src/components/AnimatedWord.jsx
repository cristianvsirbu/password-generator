import { useEffect, useState } from 'react';


const AnimatedWord = () => {
    const [word, setWord] = useState('Generator');
    const [animationInProgress, setAnimationInProgress] = useState(true);

    useEffect(() => {
        const symbols = '*!@#%^&+';
        const targetWord = 'Generator';
        const delay = 100; 
        const animationDuration = 2000; 
        const steps = Math.ceil(animationDuration / delay);
        const stepSize = Math.ceil(targetWord.length / steps);
        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep < steps) {
                const startIndex = currentStep * stepSize;
                const endIndex = Math.min(startIndex + stepSize, targetWord.length);
                const animatedLetters = word.split('').map((letter, index) => {
                    if (index >= startIndex && index < endIndex) {
                        return symbols[Math.floor(Math.random() * symbols.length)];
                    }
                    return letter;
                });
                setWord(animatedLetters.join(''));
                currentStep++;
            } else {
                clearInterval(interval);
                setTimeout(() => setAnimationInProgress(false), delay);
            }
        }, delay);

        return () => {
            clearInterval(interval);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <h2 id='generator'>{animationInProgress ? word : 'Generator'}</h2>;
};

export default AnimatedWord;


