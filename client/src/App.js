import logo from './logo.svg';
import './App.css';
import { Box, Wrap, Center, Flex, Button, Link, Text, Spacer } from "@chakra-ui/react"
import React from "react";
import TagView from './components/TagView';
import { useAuth0 } from '@auth0/auth0-react';
import cryptoRandomString from 'crypto-random-string';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Home from './components/HomePage';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import ShowPage from './components/ShowPage';
import NavBar from './components/NavBar';

function App() {
  const [anime, setAnime] = React.useState("anime")
  const [tag, setTags] = React.useState("tag")
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [completed, setCompleted] = React.useState([])
  const [hideWatched, setHideWatched] = React.useState(false)
  const alterState = () => setHideWatched(prevCheck => !prevCheck)
  const [tan, setTan] = React.useState(8);
  const [cookies, setCookie, removeCookie] = useCookies(['challenge', 'session']);
  const history = useHistory();

  // Here we define our query as a multi-line string
  // Storing it in a separate .graphql/.gql file is also possible
  React.useEffect(() => {
    console.log(cookies.session)
    if (cookies.session) {
      setLoggedIn(true)
    } else {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      console.log(params)
      if (params.code == undefined) {
        console.log("und")
      } else {
        axios({ url: "/auth", method: "post", data: { challenge: cookies.challenge, code: params.code } })
          .then((res) => {
            setCookie('session', res.data)
            setLoggedIn(true)
          })
      }
    }
  }, []);
  React.useEffect(() => {
    if(loggedIn){
      axios({url:"/getMALList", method:"post", data:{session: cookies.session}})
      .then(res => setCompleted(res.data))
      .catch(err => console.log(err))
    }
  }, [loggedIn]);

  const doAuth = () => {
    const code_verifier = cryptoRandomString({ length: 128, type: 'url-safe' });
    setCookie('challenge', code_verifier)
    window.location.href = "https://myanimelist.net/v1/oauth2/authorize?client_id=98ffcb05491c6a0d5c69cecfcb92a2d2&code_challenge=" + code_verifier + "&response_type=code&code_challenge_method=plain"
  }

  const logOut = () => {
    removeCookie('session')
    setLoggedIn(false)
    setCompleted([])
  }

  return (
    <Router>
      <Box h="100vh" margin="0px" bg="gray.800">
        <NavBar anime={anime} tag={tag} doAuth={doAuth} loggedIn={loggedIn} hideWatched={hideWatched} alterState={alterState} logOut={logOut} />
        <Home setAnime={setAnime} setTags={setTags} completed={completed} hideWatched={hideWatched} loggedIn={loggedIn} setCompleted={setCompleted} />
      </Box>
    </Router>

  );
}

export default App;
