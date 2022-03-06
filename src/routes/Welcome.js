import { Container, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#151719',
        width: '100%'
    },
    welcomeSectionContainer: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: theme.spacing(4),
    },
    titleContainer: {
        marginBottom: theme.spacing(2)
    },
    title: {
        color: theme.palette.primary.contrastText,
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center'
    },
    qcmText: {
        color: theme.palette.primary.dark,
        fontWeight: 'bold',
        fontSize: 40
    },
    descriptionTextContainer: {
        maxWidth: 600,
        marginBottom: theme.spacing(2)
    },
    descriptionText: {
        color: theme.palette.grey.A400,
        fontSize: 20,
        textAlign: 'center',
    },
    startButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(2)
    },
    startButton: {
        color: theme.palette.success.light,
        textTransform: 'none',
        fontSize: 18,
    },
    imgContainer: {
        width: '100%',
        flex: 1,
        backgroundColor: '#f00',
    },
    sourseSectionContainer: {
        height: '100vh',
        paddingTop: theme.spacing(2),
    },

}));

const Welcome = () => {
    const classes = useStyles();
    const [imgWidth, setImgWidth] = useState(0);
    const [imgHeight, setImgHeight] = useState(0);


    useEffect(() => {
        if (window.innerWidth>768) {
            setImgWidth(window.innerWidth * 0.6);
            setImgHeight(window.innerHeight * 0.7);
        } else {
            setImgWidth(window.innerWidth * 0.9);
            setImgHeight(window.innerHeight * 0.6);
        }
    }, [])

    return (
        <div
            className={classes.container}
        >
            <Container
                className={classes.welcomeSectionContainer}
            >
                <Container
                    className={classes.titleContainer}
                >
                    <Typography
                        variant='h1'
                        className={classes.title}
                    >
                        Pacemaker <span className={classes.qcmText}>QCM</span>
                    </Typography>
                </Container>
                <Container
                    className={classes.descriptionTextContainer}
                >
                    <Typography
                        variant='h1'
                        className={classes.descriptionText}
                    >
                        Votre guide qui vous accompagnera durant vos révisions pour le résidanat, profitez des nombreuses sources fiables est enrichissantes pour vôtre succès
                    </Typography>
                </Container>
                <Container
                    className={classes.startButtonContainer}
                >
                    <Button
                        size='large'
                        className={classes.startButton}
                        href="#sourses"
                    >
                        Commencer votre révision
                    </Button>
                </Container>
                <img
                    src={require('../assets/backgroundImage.jpg')}   
                    width={imgWidth}
                    height={imgHeight}                 
                />

            </Container>
            <Container
                className={classes.sourseSectionContainer}
                id="sourses"
            >
                <Container
                    className={classes.titleContainer}
                >
                    <Typography
                        variant='h1'
                        className={classes.title}
                    >
                        Nos sources
                    </Typography>
                </Container>
                <Container
                    className={classes.descriptionTextContainer}
                >
                    <Typography
                        variant='h1'
                        className={classes.descriptionText}
                    >
                        Pacemaker vous propose les sources suivantes, et Et on est à jour avec les dernières source pour mieux préparer votre examen.
                    </Typography>
                </Container>

            </Container>
        </div>
        
    );
}

export default Welcome;
