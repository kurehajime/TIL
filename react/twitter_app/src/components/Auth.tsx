import React from 'react';
import styles from './Auth.module.css';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  makeStyles,
  Modal,
  IconButton,
  Box,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import CameraIcon from "@material-ui/icons/Camera";
import EmailIcon from "@material-ui/icons/Email";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import firebase from 'firebase';
import { auth, storage } from '../firebase';
import { updateUserProfile } from '../features/userSlice';
import { useDispatch } from 'react-redux';

const getModalStyle =() => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1657028839198-0b91c632f38d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  modal: {
    outline: "none",
    position: "absolute",
    width: 400,
    borderRadius: 10,
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10),
  },
}));

export const Auth : React.FC = () => {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLogin, setIsLogin] = React.useState(true);
  const [userName, setUserName] = React.useState('');
  const [avatarImage, setAvatarImage] = React.useState<File|null>(null);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState('');

  const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModal(false);
        setResetEmail("");
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail("");
      });
  };

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      setAvatarImage(e.target.files[0]);
      e.target.value = '';
    }
  }

  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password)
    .catch((err) => {
      alert(err.message)
    });
  }
  const signUpEmail = async () => {
    const authUser :firebase.auth.UserCredential|void = await auth.createUserWithEmailAndPassword(email, password)
    .catch((err) => {
      alert(err.message)
    });
    let url = '';
    if(avatarImage){
      const fileName = `${authUser?.user?.uid}_${new Date().getTime()}`
      await storage.ref(`avatars/${fileName}`).put(avatarImage)
      url = await storage.ref(`avatars/${fileName}`).getDownloadURL();
    }
    await authUser?.user?.updateProfile({
      displayName:userName,
      photoURL:url
    })
    dispatch(updateUserProfile({displayName:userName,photoURL:url}))
  }


  const signInGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider)
      .catch((err)=>{alert(err.message)})
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            {!isLogin && ( 
              <>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="userName"
              autoFocus
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Box textAlign="center">
              <IconButton>
                <label>
                  <AccountCircleIcon
                  fontSize='large'
                  className={
                    avatarImage 
                    ? styles.login_addIconLoaded 
                    : styles.login_addIcon}
                  />
                  <input type="file" 
                  className={styles.login_hiddenIcon}
                  onChange={onChangeImageHandler}/>
                </label>
              </IconButton>
            </Box>
            </>)
            }
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<EmailIcon />}
              className={classes.submit}
              onClick={isLogin ? async ()=>{
                try {
                  await signInEmail()
                } catch (error:any) {
                  alert(error.message)
                }
              } : async ()=>{
                try {
                  await signUpEmail()
                } catch (error:any) {
                  alert(error.message)
                }
              } }
              disabled={
                isLogin 
                ? !email || password.length < 6 
                : !userName || !email || password.length < 6 || !avatarImage
              }
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
            <Grid container>
              <Grid item xs>
                <span className={styles.login_reset} 
                onClick={()=>setOpenModal(true)}
                >Forgot Password</span>
                </Grid>
              <Grid item >
                <span className={styles.login_toggleMode} onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Create New Account' : 'Back to login'}
                </span>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={signInGoogle}
            >
              Sign In With Google
            </Button>
          </form>
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <div style={getModalStyle()} className={classes.modal}>
              <div className={styles.login_modal}>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="email"
                  name="email"
                  label="Reset E-mail"
                  value={resetEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setResetEmail(e.target.value);
                  }}
                />
                <IconButton onClick={sendResetEmail}>
                  <SendIcon />
                </IconButton>
              </div>
            </div>
          </Modal>
        </div>
      </Grid>
    </Grid>
  );
}

export default Auth;