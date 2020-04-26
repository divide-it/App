import * as React from 'react';

const { useState } = React;

const Counter = (): JSX.Element => {
    const [counter, setCounter] = useState(0);
    const incrementCounter = (): void => {
        setCounter(counter + 1);
    };
    const decrementCounter = (): void => {
        if (counter > 0) {
            setCounter(counter - 1);
        }
    };
    return (
        <div className="container p-b-md p-r-md p-l-md has-text-centered">
            <hr />
            Counter:
            <h1 className="title is-size-1">{counter}</h1>
            <button className="button" onClick={decrementCounter}>
                - Decrement
            </button>{' '}
            <button className="button" onClick={incrementCounter}>
                Increment +
            </button>
        </div>
    );
};

export default Counter;
