import { UsableLocale } from '@faker-js/faker/faker';
import { ChangeEvent, Dispatch, useState } from 'react';
import { UserList } from './UserList';

export function App() {
    const [locale, setLocale] = useState('en_AU' as UsableLocale);
    const [typoRate, setTypoRate] = useState(0 as number | undefined);
    const [seed, setSeed] = useState(0 as number | undefined);

    function getRandomSeed() {
        return Math.round(Math.random() * 2_147_483_647);
    }

    function handleLocaleChange(event: ChangeEvent) {
        const target = event.target as HTMLSelectElement;
        setLocale(target.value as UsableLocale);
    }

    function getChangeHandlerNumber(
        setter: Dispatch<number | undefined>,
        float?: boolean,
        min?: number,
        max?: number
    ) {
        return (event: ChangeEvent) => {
            const target = event.target as HTMLInputElement;
            if (target.value === '') {
                setter(undefined);
                return;
            }
            let value: number | undefined = float
                ? parseFloat(target.value)
                : parseInt(target.value);
            if (isNaN(value)) value = min ?? 0;
            if (min && value < min) value = min;
            if (max && value > max) value = max;
            setter(value);
        };
    }

    const typoRateHandler = getChangeHandlerNumber(setTypoRate, true, 0, 10000);

    return (
        <div className="container">
            <article>
                <header>
                    <h1>Computer, generate me some fake people!</h1>
                </header>
                <div className="grid">
                    <label>
                        Locale
                        <select onChange={handleLocaleChange} value={locale}>
                            <option value="en_AU">English, Australia</option>
                            <option value="ru">Russian, Russia</option>
                            <option value="de_AT">German, Austria</option>
                        </select>
                    </label>
                    <label>
                        Typos
                        <input
                            type="range"
                            placeholder="0"
                            step="0.1"
                            min="0"
                            max="10"
                            value={typoRate}
                            onChange={typoRateHandler}
                        ></input>
                        <input
                            type="number"
                            placeholder="0"
                            min="0"
                            max="10000"
                            value={typoRate}
                            onChange={typoRateHandler}
                        ></input>
                    </label>
                    <label>
                        Seed
                        <input
                            type="number"
                            value={seed}
                            onChange={getChangeHandlerNumber(setSeed)}
                        ></input>
                        <button onClick={() => setSeed(getRandomSeed())}>
                            Random
                        </button>
                    </label>
                </div>
            </article>
            <UserList seed={seed ?? 0} locale={locale} typos={typoRate ?? 0} />
        </div>
    );
}
