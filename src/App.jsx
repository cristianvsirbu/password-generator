import { useState } from 'react';
import { useForm } from './components/useForm';
import { getRandomChar, getSymbol } from './utils';
import { toast } from "react-hot-toast";
import AnimatedWord from './components/AnimatedWord';
import DarkMode from './components/DarkMode';
import './index.css'

const App = () => {
    const [values, setValues] = useForm({
        length: 6,
        capitals: false,
        smalls: false,
        numbers: false,
        symbols: false
    })

    const [result, setResult] = useState("");

    const fieldsArray = [
        {
            field: values.capitals,
            getChar: () => getRandomChar(65, 90)
        },
        {
            field: values.smalls,
            getChar: () => getRandomChar(97, 122)
        },
        {
            field: values.numbers,
            getChar: () => getRandomChar(48, 57)
        },
        {
            field: values.symbols,
            getChar: () => getSymbol()
        }
    ]

    const handleOnSubmit = (e) => {
        e.preventDefault();
        let generatedPass = "";
        const checkedFields = fieldsArray.filter(({ field }) => field);

        for (let i = 0; i < values.length; i++) {
            const index = Math.floor(Math.random() * checkedFields.length);
            const letter = checkedFields[index]?.getChar();

            if (letter) {
                generatedPass += letter;
            }
        }

        if (generatedPass) {
            setResult(generatedPass);
        } else {
            toast.error("Select at least one option!")
        }
    }

    const [isCopied, setIsCopied] = useState(false);

    const textStyle = {
        color: isCopied ? "#4bb973" : "#171A1F",
        transition: "0.1s ease-out"
    };

    const handleClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(result);
            toast.success("Copied!")
            setIsCopied(true);
        } else {
            toast.error("No password to copy!")
        }
    }




    return (
        <section>
            <form id='pg-form' onSubmit={handleOnSubmit}>
                <h2 className='h2-gradient'>Password <AnimatedWord /></h2>
                <div className='container'>
                    <div className='result'>
                        <input type='text'
                            disabled
                            id='result'
                            placeholder='Minimum 6 characters'
                            readOnly
                            value={result}
                            style={textStyle}
                        />
                        <div className='clipboard' onClick={handleClipboard}>
                            <img src='/src/assets/icons/copy2.svg' id='clipboard' />
                        </div>

                    </div>
                    <div>
                        <div className='field'>
                            <label htmlFor='length'>Length</label>
                            <input type='number'
                                id='length'
                                min={6}
                                max={16}
                                name='length'
                                value={values.length}
                                onChange={setValues}
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor='capitals'>Capitals</label>
                            <input type='checkbox' className='checkbox-container' id='capitals' name='capitals' checked={values.capitals} onChange={setValues} />
                        </div>
                        <div className='field'>
                            <label htmlFor='smalls'>Lowercase Characters</label>
                            <input type='checkbox' className='checkbox-container' id='smalls' name='smalls' checked={values.smalls} onChange={setValues} />
                        </div>
                        <div className='field'>
                            <label htmlFor='numbers'>Numbers</label>
                            <input type='checkbox' className='checkbox-container' id='numbers' name='numbers' checked={values.numbers} onChange={setValues} />
                        </div>
                        <div className='field'>
                            <label htmlFor='symbols'>Symbols</label>
                            <input type='checkbox' className='checkbox-container' id='symbols' name='symbols' checked={values.symbols} onChange={setValues} />
                        </div>
                        <button type="submit" id='generate-button' onClick={() => setIsCopied(false)}>Generate Password</button>
                    </div>
                </div>
                <DarkMode />
            </form>
        </section>
    );
}

export default App