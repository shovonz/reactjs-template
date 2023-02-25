import "./styles.css";
import { useEffect, useState } from "react";
import Days from "./Days";

/**
 * Welcome! We are going to go through a comprehensive demo
 * of how to create components, interactions, and manage state
 * in React.
 *
 * 1. Create a table with one stock
 * 2. Add button to simulate random price
 * 3. Buy/Sell buttons
 * 4. Update portfolio values, quantity
 * 5. Cash, validate buy and sell orders
 * 6. Day counter
 * 7. Order history
 * 8. More stocks?
 * 9. Search bar
 * 10. How do we make this look better?
 *
 * NOTE: if you are having trouble following along, please
 * check out: `index-complete.js` for the full working demo.
 */
export default function App() {
  /**
   * 1. Getter function: reads value of state
   * 2. Setter function: lets you change the value of state
   * 3. Initial value
   */
  const initialPrice = 100;
  // -> Array[getter.fn, setter.fn, ...]
  /**
   * const returnValue = useState()...
   * const price = returnValue[0];
   * const setPrice = returnValue[1];
   */
  const [price, setPrice] = useState(initialPrice); // javascript
  const [tradeType, setTradeType] = useState("buy");
  const [quantity, setQuantity] = useState(0);
  const [shares, setShares] = useState(10);
  const [cash, setCash] = useState(10000);
  const [errorMessage, setErrorMessage] = useState("");
  const [days, setDays] = useState(1);
  const [history, setHistory] = useState([]);

  /**
   * Typescript:
   *
   * const quantity : int = 10;
   */

  // API calls
  // HTTP REST
  // fetch()
  // jquery() => ajax

  useEffect(() => {
    // Most comon case, you fetch data from a website
    // fetch()
    console.log("called");
  }, [history]);

  function simulate() {
    // Are you buying or selling
    setErrorMessage("");
    let quantityInt = parseInt(quantity);
    if (tradeType === "buy" && quantityInt > 0 && cash >= quantityInt * price) {
      setShares(shares + quantityInt);
      setCash(cash - quantityInt * price);
      // Day 72: Sold 1 $SPY at 382.3861902815435
      const message = `Day ${days}: Bought ${quantityInt} $SPY at ${price.toFixed(
        2
      )}`;
      // you MUST use setHistory to change history
      setHistory([
        <div>
          <div>{message}</div>
          <br></br>
        </div>,
        ...history
      ]);
    } else if (tradeType === "buy" && cash < quantityInt * price) {
      setErrorMessage("Not enough cash to buy stock");
    } else if (
      tradeType === "sell" &&
      quantityInt > 0 &&
      shares >= quantityInt
    ) {
      // Sell
      setShares(shares - quantityInt);
      setCash(cash + quantityInt * price);
      const message = `Day ${days}: Sold ${quantityInt} $SPY at ${price.toFixed(
        2
      )}`;
      // you MUST use setHistory to change history
      setHistory([<div>{message}</div>, ...history]);
    } else if (tradeType === "sell" && shares < quantityInt) {
      setErrorMessage("Not enough shares of stock");
    }

    // Update our portfolio accordingly

    setDays(days + 1);
    setPrice(price + 5 * (0.5 - Math.random()));
  }

  function onTradeTypeChange(event) {
    setTradeType(event.target.value);
  }

  function onQuantityChange(event) {
    setQuantity(event.target.value);
  }

  // below is html
  // curly braces for JS
  return (
    <>
      <h1 id="title">Trading Simulator - Michael</h1>
      <h2>Day: {days}</h2>
      <Days days={days} />
      <table>
        <tbody>
          <tr>
            <th>Stock</th>
            <th>Price</th>
            <th>Shares</th>
            <th>Total</th>
            <th>Action</th>
            <th>Quantity</th>
          </tr>

          <tr>
            <td>$SPY</td>
            <td>${price.toFixed(2)}</td>
            <td>{shares}</td>
            <td>${(shares * price).toFixed(2)}</td>
            <td>
              <select value={tradeType} onChange={onTradeTypeChange}>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </td>
            <td>
              <input value={quantity} onChange={onQuantityChange}></input>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={simulate}>Simulate!</button>
      <br></br>
      Cash: ${cash.toFixed(2)}
      <br></br>
      History:
      <div id="history">{history}</div>
      <br></br>
      {errorMessage}
      {shares > 10 ? "You have a lot of shares" : "You don't have many shares"}
    </>
  );
}
