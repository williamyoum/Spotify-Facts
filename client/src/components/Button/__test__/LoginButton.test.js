import React from 'react';
import ReactDOM from 'react-dom';

import LoginButton from './../LoginButton';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<LoginButton></LoginButton>, div)
})
