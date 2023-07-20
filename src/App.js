import "./styles.css";
import { useState } from "react";

// const initialItems = [
//   {
//     description: "socks",
//     quantity: 2,
//     packed: false,
//     id: 1,
//   },
//   {
//     description: "trousers",
//     quantity: 5,
//     packed: true,
//     id: 2,
//   },
//   {
//     description: "condoms",
//     quantity: 3,
//     packed: false,
//     id: 3,
//   },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;

  function addItem(item) {
    setItems((items) => [...items, item]);
  }

  function updateItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function deleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function clearList() {
    setItems([]);
  }

  return (
    <div className="App">
      <Logo />
      <Form addItem={addItem} />
      <PackingList
        items={items}
        updateItem={updateItem}
        deleteItem={deleteItem}
        clearList={clearList}
      />
      <Footer numItems={numItems} packedItems={packedItems} />
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <h1>🚢Traveller's Hub🚢</h1>
    </div>
  );
}

function Form({ addItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      description: description,
      quantity: quantity,
      packed: false,
      id: Date.now(),
    };
    addItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <div className="Form">
      <p>How many items you wanna add?</p>
      <form onSubmit={handleSubmit}>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

function PackingList({ items, updateItem, deleteItem, clearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortItems;

  if (sortBy === "input") {
    sortItems = items;
  }

  if (sortBy === "description") {
    sortItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packaging") {
    sortItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <div className="list-items">
        {sortItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            updateItem={updateItem}
            deleteItem={deleteItem}
          />
        ))}
      </div>
      <div className="sort">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort By Input</option>
          <option value="description">Sort By Description</option>
          <option value="packaging">Sort by packaging</option>
        </select>
        <button onClick={clearList}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, updateItem, deleteItem }) {
  return (
    <div className="item">
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => updateItem(item.id)}
      />
      <p style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </p>
      <span onClick={() => deleteItem(item.id)}>❌</span>
    </div>
  );
}

function Footer({ numItems, packedItems }) {
  const percentage = Math.round((packedItems / numItems) * 100);
  return (
    <>
      <footer>
        {numItems ? (
          <p>
            You have {numItems} items on your list and you have already packed
            {packedItems}({percentage} %)
          </p>
        ) : (
          <p>Start packing bitch, we ain't got an eternity!</p>
        )}
      </footer>
    </>
  );
}
