# **React**
1. Hello. I'm Nina Viter. And I will tell you about react.js.
2. Let’s answer the first question. **What is React?**
*React* is an open-source, front end, JavaScript library for building user interfaces. React is The Most Popular JavaScript library.
3. It was created by Jordan Walke, a software engineer at Facebook.
4. Okey, let's look at an example of React usage in HTML with JSX and JavaScript.
*The Greeter function* is a React component that accepts a property greeting. 
*The variable App* is an instance of the Greeter component where the greeting property is set to 'Hello World!'. 
*The ReactDOM.render method* renders our App component inside the DOM element   with id root.
5.When displayed in a web browser the result will be "Hello World".
6. React has some Notable features:
    JSX
    Virtual DOM
    Components
    Props
    State
    Lifecycle methods
    Hooks
7. **JSX** is an extension of the JavaScript language.
JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement()  and/or appendChild() methods.
Below you can see an example of jsx usage.
8. **The virtual DOM** is only a virtual representation of the DOM.
When the component changes, React updates the virtual DOM tree. Once the virtual DOM has been updated, React then compares the current version of the virtual DOM with the previous version. This process is called *“diffing”*.
Once React find out which virtual DOM objects have been changed, then React updates only those objects, in the real DOM.
9. **Component** splits UI into independent and reusable pieces which optionally accepts input called props and returns react element. Every React component have their own structure, methods.
10. In React, we have mainly two types of components. They are:
 ­­ * **Functional Components**
A functional component is just a plain javascript function which takes props as an argument and returns a react element. A functional component is stateless, that means  it doesn't have state.
  * **Class-based components**
A class component requires you to extend from React.Component and create a render function which returns a React element. Sometimes class component called "statefull", because it has state. Inside class components you can use lifecycle methods.
11. **Props** are external, and not controlled by the component itself. It’s passed down from parent component to child component. You can use props both in class and functional components.
  * This is how you pass props to a component:
  * This prop is called message and has the value “my friend”. We can access this prop inside the Hello component, like this:
12. **State**
Another feature in React is state. The state is an object where you store property values that belongs to the component. When the state object changes, the component re-renders.
  * To initialize the state in the class component simply set this.state  in the constructor() method.
  * To change a value in the state object, use the this.setState() method.
13. Each component in React has a **lifecycle** which you can monitor and manipulate during its three main phases.
There are: *Mounting*, *Updating*, and *Unmounting*.
On slide you can see the diagram that shows methods that can be used in these phases. I’ll tell you about some of them.
  * **Constructor()**
It is first method which gets called in the lifecycle of react component. It is used to initialise the component with initial state. It receives props as an argument and we can set state in this method.
  * **render()**
It is the only required method in react component. It tells what to display on the screen. render() method is pure function which means it doesn’t modify the state. It returns the same result each time it is invoked and it does not directly interact with the browser.
  * **ComponentDidMount()**
This method gets called when react component has finished the rendering part. It is good place to load data from remote endpoint and update the state with the result. This will refresh the UI. Whenever we make any change in the state then render() methods gets called which will ultimately reflect the changes on the screen.
14. **Hooks** 
Hooks are a new addition in React 16.8. React Hooks are functions that let us hook into the React state and lifecycle features from function components. That means that hooks allow us to easily manipulate the state of our functional component without needing to convert them into class components.
React provides a few basic and additional "hooks".
I want to show you an example with hook useState.
  * In a class, we initialize the count state to 0 by setting this.state to { count: 0 } in the constructor:
  * In a function component, we have no this, so we can’t assign or read this.state. Instead, we call the useState Hook directly inside our component:
Well, It was my short review of React and thank you for watching.
