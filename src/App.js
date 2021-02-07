import { useEffect, useState } from 'react';
import SpellInput from './components.js/SpellInput';
import firebase from './firebase';

function App() {
  const [spells, setSpells] = useState([]);
  const [newSpellTitle, setNewSpellTitle] = useState('');

  useEffect(() => {

    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('spells').get();
      setSpells(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    }

    fetchData()
  });

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection('spells').add({
      id: Math.random(),
      title: newSpellTitle
    });
    setNewSpellTitle('');
  }

  if (spells.length > 0) {
    return (
      <ul>
        <input id="input" type="text" value={newSpellTitle} onChange={e => {
          setNewSpellTitle(e.target.value);
        }} />
        <button onClick={onCreate}>Add</button>
        {spells.map(spell => (
          <li key={spell.id}>
            <SpellInput spell={spell} />
          </li>
        ))}
      </ul>
    );
  } else {
    return <>Loading...</>
  }
}

export default App;
