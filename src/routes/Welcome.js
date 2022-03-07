import { Container, Typography, Button, Grid, Paper, Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { MenuBookRounded } from '@mui/icons-material';
import { Link } from "react-router-dom";
import CustomModal from '../component/Modal';
import { useStore } from '../store/Store';


const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#151719',
        width: '100%'
    },
    welcomeSectionContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: theme.spacing(4),
        minHeight: '100vh',
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
    sourceTitle: {
        color: theme.palette.primary.contrastText,
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: theme.spacing(2)
    },
    sourceStatusTesxt: {
        color: theme.palette.grey.A400,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: theme.spacing(2)
    },
    qcmText: {
        color: theme.palette.primary.dark,
        fontWeight: 'bold',
        fontSize: 40
    },
    descriptionTextContainer: {
        maxWidth: 600,
        marginBottom: theme.spacing(8)
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
    },
    sourseSectionContainer: {
        minHeight: '100vh',
        paddingTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    sourseItemContainer: {
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#151719',
        cursor: 'pointer',
        "&:hover": {
            opacity: 0.5
        }
    },
    sourceIconContainer: {
        height: 100,
        width: 100,
        borderRadius: 80,
        backgroundColor: theme.palette.primary.dark,
        marginBottom: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sourceIcon: { 
        color: '#fff',
        fontSize: 40 
    },
    contactText: {
        color: theme.palette.grey.A400,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: theme.spacing(8),
        marginTop: theme.spacing(8)
    },
    linkText: {
        color: theme.palette.primary.dark,
        fontSize: 20,
        textAlign: 'center',
        textDecoration: 'none',
        marginLeft: theme.spacing(1)
    },
}));

const SourceItem = ({toggleAlert, title, available}) => {
    const classes = useStyles();
    const [globalState] = useStore();

    return (
        <Grid
            item
            xs={12}
            md={6}
            lg={4}
        >
            <Link
                to={available?
                    `/${globalState?.modules[0]?.id}/${globalState?.modules[0]?.courses[0]?.id}/1`: '#'}
                style={{ textDecoration: "none" }}
            >
            <div
                className={classes.sourseItemContainer}
                onClick={available ? ()=>{} : toggleAlert}
                disabled={available}
            >
                <div
                    className={classes.sourceIconContainer}
                >
                    <MenuBookRounded className={classes.sourceIcon} />
                </div>
                <Typography
                    variant='h2'
                    className={classes.sourceTitle}
                >
                    {title}
                </Typography>
                <Typography
                    variant='h2'
                    className={classes.sourceStatusTesxt}
                >
                    {
                        available ? 'Source disponible': 'En cours de traitement'
                    }
                </Typography>
            </div>
            </Link>
        </Grid>
    )
}

const Welcome = () => {
    const classes = useStyles();
    const [imgWidth, setImgWidth] = useState(0);
    const [imgHeight, setImgHeight] = useState(0);
    const [showAlert, setShowAlert] = useState(false);

    const toggleAlert = () => {
        setShowAlert(!showAlert)
    }

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
                        variant='h2'
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
                <div>
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
                        Pacemaker vous propose les sources suivantes, et on est à jour avec les dernières source pour mieux préparer votre examen.
                    </Typography>
                </Container>

                <Grid container spacing={4} rowSpacing={6}>
                    <SourceItem 
                        toggleAlert={toggleAlert}
                        title={'Serie 200'}
                        available={true}
                    />
                    <SourceItem
                        toggleAlert={toggleAlert}
                        title={'Diagest'}
                        available={false}
                    />
                    <SourceItem
                        toggleAlert={toggleAlert}
                        title={'Hyperqcm'}
                        available={false}
                    />
                    <SourceItem
                        toggleAlert={toggleAlert}
                        title={'Banques Profs'}
                        available={false}
                    />
                    <SourceItem
                        toggleAlert={toggleAlert}
                        title={'Training cours'}
                        available={false}
                    />
                </Grid>
                </div>
                
                    <Typography
                        variant='h2'
                        className={classes.contactText}
                    >
                        Pour plus d'informations veuillez nous suivre sur notre 
                    <a
                        href="https://www.facebook.com/pacemakerqcm"
                        className={classes.linkText}
                        target="_blank"
                    >
                        page facebook
                    </a>
                    </Typography>
                
            </Container>
            <CustomModal
                showSynthesis={showAlert}
                toggleModal={toggleAlert}
                modalContent={'Cette source n est pas disponible pour le moment'}
            />
        </div>
        
    );
}

export default Welcome;
