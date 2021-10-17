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
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ShowPage from './components/ShowPage';

function App() {
  const [anime, setAnime] = React.useState("anime")
  const [tag, setTags] = React.useState("tag")
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [tan, setTan] = React.useState(8);
  const [cookies, setCookie, removeCookie] = useCookies(['challenge', 'session']);

  // Here we define our query as a multi-line string
  // Storing it in a separate .graphql/.gql file is also possible
  React.useEffect(() => {
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
  }, []);
  const doAuth = () => {
    const code_verifier = cryptoRandomString({ length: 128, type: 'url-safe' });
    setCookie('challenge', code_verifier)
    window.location.href = "https://myanimelist.net/v1/oauth2/authorize?client_id=98ffcb05491c6a0d5c69cecfcb92a2d2&code_challenge=" + code_verifier + "&response_type=code&code_challenge_method=plain"
  }

  return (
    <Box h="100vh" margin="0px" bg="gray.800">
      <Flex bg="gray.500" justify="flex-end" padding={1}>
        <Text fontSize="30px">ARA-ARA</Text>
        <Spacer/>
        <Text fontSize="30px">{anime}</Text>
        <Spacer/>
        <Text fontSize="30px">{tag}</Text>
        <Spacer/>
        <Button m={2} onClick={() => doAuth()}>Login to MAL</Button>
      </Flex>
      <Home setAnime={setAnime} setTags={setTags} />
    </Box>

  );
}

export default App;
