import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import render from 'react-test-renderer'

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div);
})

// test('renders a message', () => {
//   const { container, getByText } = render(<Greeting />)
//   expect(getByText('Hello, world!')).toBeInTheDocument()
//   expect(container.firstChild).toMatchInlineSnapshot(`
//     <h1>Hello, World!</h1>
//   `)
// })