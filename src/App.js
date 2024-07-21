import './style.css';
import { useEffect, useState } from 'react';
import supabase from './supabase';

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    async function getFacts() {
      setIsLoading(true);
      let query = supabase.from('facts').select('*');
      if (currentCategory !== "all") query = query.eq("category", currentCategory);

      const { data: facts, error } = await query.order("likes", { ascending: false }).limit(20);
      if (!error) setFacts(facts);
      else alert("A problem was encountered while fetching data...");
      setIsLoading(false);
    }
    getFacts();
  }, [currentCategory]);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? <NewFactForm setFacts={setFacts} setShowForm={setShowForm} /> : null}
      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? <Loader /> : <FactList facts={facts} setFacts={setFacts} />}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Logo" />
        <h1>FACTASTIC</h1>
      </div>
      <button className="btn btn-large btn-open" onClick={() => setShowForm((show) => !show)}>
        {showForm ? 'Close' : 'Share a fact'}
      </button>
    </header>
  );
}

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(e) {
    // Preventing browser from reloading
    e.preventDefault();
    // Checking if data is valid and creating a new fact
    if (text && isValidHttpUrl(source) && category && text.length <= 200) {
      // Enter new fact to Supabase and receive the new fact object
      setIsUploading(true);
      const { data: newFact, error } = await supabase.from("facts").insert([{ text, source, category }]).select();
      setIsUploading(false);
      if (!error) {
        // Adding new Fact to UI
        if (!error) setFacts((facts) => [newFact[0], ...facts]);
        // Reset Input fields
        setText("");
        setSource("");
        setCategory("");
        // Closing the form
        setShowForm(false);
      } else {
        console.error("Error inserting new fact into Supabase:", error);
      }
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Share a fact with the world..." value={text} disabled={isUploading} onChange={(e) => setText(e.target.value)} />
      <span>{200 - text.length}</span>
      <input type="text" placeholder="Trustworthy source..." value={source} disabled={isUploading} onChange={(e) => setSource(e.target.value)} />
      <select value={category} disabled={isUploading} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => <option key={cat.name} value={cat.name}>{cat.name.toUpperCase()}</option>)}
      </select>
      <button className="btn btn-large" disabled={isUploading}>Post</button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button className="btn btn-all-categories" onClick={() => setCurrentCategory("all")}>All</button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category" onClick={() => setCurrentCategory(cat.name)}
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed = fact.likes + fact.upvotes < fact.downvotes;
  async function handleVotes(colName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase.from('facts').update({ [colName]: fact[colName] + 1 }).eq("id", fact.id).select();
    setIsUpdating(false);
    if (!error) setFacts((facts) => facts.map((f) => f.id === fact.id ? updatedFact[0] : f));

  };
  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[DISPUTED❓]</span> : null}
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span className="tag" style={{ backgroundColor: CATEGORIES.find((entry) => entry.name === fact.category).color }}>
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button onClick={() => handleVotes("likes")} disabled={isUpdating}>❤️ {fact.likes}</button>
        <button onClick={() => handleVotes("upvotes")} disabled={isUpdating}>👍 {fact.upvotes}</button>
        <button onClick={() => handleVotes("downvotes")} disabled={isUpdating}>👎 {fact.downvotes}</button>
      </div>
    </li>
  );
}

function FactList({ facts, setFacts }) {
  if (facts.length === 0) {
    return <p className="message">No Facts under this category yet! Create the first one ✌️</p>;
  }
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => <Fact key={fact.id} fact={fact} setFacts={setFacts} />)}
      </ul>
      <p>There are {facts.length} facts in the database. Feel free to add your own!</p>
    </section>
  );
}

export default App;