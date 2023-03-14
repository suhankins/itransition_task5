import { useState } from 'react';

type modalParams = {
    string: string;
};
export function Modal({ string }: modalParams) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <dialog open={open}>
                <article className="w-full">
                    <a
                        href="#close"
                        aria-label="Close"
                        onClick={() => setOpen(!open)}
                        className="close"
                    />
                    <h3>Here's your table as CSV</h3>
                    <textarea value={string} readOnly />
                    <button
                        onClick={() => navigator.clipboard.writeText(string)}
                    >
                        Copy to clipboard
                    </button>
                </article>
            </dialog>
            <button onClick={() => setOpen(!open)} className="saveasCSV">
                Save as CSV
            </button>
        </>
    );
}
