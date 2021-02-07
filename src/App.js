import { useEffect, useState } from 'react';
import firebase from './firebase';

function App() {
  const [spells, setSpells] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('spells').get();
      setSpells(data.docs.map(doc => doc.data()));
    }

    fetchData()
  });

  if (spells.length > 0) {
    return (
      <ul>
        {spells.map(spell => (
          <li key={spell.title}>{spell.title}</li>
        ))}
      </ul>
    );
  } else {
    return <>Loading...</>
  }
}

export default App;
