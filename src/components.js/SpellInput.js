import React, { useState } from 'react'
import firebase from './../firebase';


export default function SpellInput({ spell }) {

  const [title, setTitle] = useState(spell.title);

  const onUpdate = () => {
    const db = firebase.firestore();
    db.collection('spells').doc(spell.id).update({title});
  }

  return (
    <>
      <input type="text" value={title} onChange={e => {
        setTitle(e.target.value);
      }} />
      <button onClick={onUpdate}>Update</button>
    </>
  )
}
