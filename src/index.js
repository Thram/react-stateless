import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import Stateless from "./Stateless";

import "./styles.css";

const valueRef = React.createRef();

let timer;
const redIfPair = ({ counter }) =>
  new Promise((resolve, reject) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(
      () => resolve(counter % 2 === 0 ? "red" : "black"),
      1000
    );
  });

class App extends PureComponent {
  state = { forcedCounter: 1 };

  changeTo10 = () => this.setState({ forcedCounter: 10 });
  render = () => (
    <div className="App">
      <h1>Stateless components using the render props pattern</h1>

      <Stateless
        value={{ counter: this.state.forcedCounter }}
        afterMount={({ value, change }) => change({ counter: value.counter + 1 })}
        beforeChange={async ({ counter }) => {
          const color = await redIfPair({ counter });
          valueRef.current.style.color = color;
        }}
        afterChange={async ({ counter }) => {
          this.setState({ forcedCounter: counter });
        }}
      >
        {({ value, change }) => (
          <div>
            <h2 ref={valueRef} style={{ transition: "color 1s ease" }}>
              Counter: {value.counter}
            </h2>
            <div>
              <button onClick={() => change({ counter: value.counter + 1 })}>
                +1
              </button>
              <button onClick={() => change({ counter: value.counter - 1 })}>
                -1
              </button>
            </div>
          </div>
        )}
      </Stateless>

      <button onClick={this.changeTo10}>Set To 10!</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
