import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Card, Grid, Paper, Grow, CardMedia, CardContent, CardActions, Button } from '@mui/material';

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
        <Grow in>
            <Grid container justify="center" alignItems='flex-start' spacing={1}>
            {animalList.map((animal) => {
                if (animal.type === type || type == "all") return(
                <div>
                    <Grid item minWidth={270} sx={{marginRight: 2, marginBottom: 2}}>
                        <Paper elevation={2}>
                            <div>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        alt="pet photo"
                                        height="200"
                                        image={animal.artworkURI}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant='h5'>{animal.name}</Typography>
                                        <Typography variant="body2">Age: {animal.age}</Typography>
                                        <Typography variant="body2">Sex: {animal.sex}</Typography>
                                        <Typography variant="body2">Shelter: {animal.shelterName}</Typography>
                                        <Typography variant="body2">Sponsor: {animal.creatorName}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </div>
                        </Paper>
                    </Grid>
                </div>)
            })}
            </Grid>
        </Grow>
    </div>
  )
}

export default AnimalCards