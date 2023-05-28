import React from 'react';
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

import { db } from "../../config/firebase";
import { getDocs, collection } from  "firebase/firestore";

function AnimalCards ({type}) {
  const [animalList, setAnimalList] = useState([]);

  const animalsCollectionRef = collection(db, "pets");

    const getAnimalList = async () => {
        try { 
            const data = await getDocs(animalsCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(), 
                id: doc.id,
            }));
            setAnimalList(filteredData)
        } catch (err) {
            console.error(err)
        }
    };
    useEffect(() => {
        getAnimalList();
    }, []);

  return (
    <div>
        {animalList.map((animal) => {
            if (animal.type === type || type == "all") return(
            <div>
                <Typography>{animal.name}</Typography>
            </div>)
        })}
    </div>
  )
}

export default AnimalCards