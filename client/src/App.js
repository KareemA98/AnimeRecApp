import logo from './logo.svg';
import './App.css';
import { Box, Wrap, Center, Flex, Button, Link, Text } from "@chakra-ui/react"
import React from "react";
import TagView from './components/TagView';
import { useAuth0 } from '@auth0/auth0-react';
import cryptoRandomString from 'crypto-random-string';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function App() {
  const [data, setData] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [tan, setTan] = React.useState(8);
  const [tags, setTags] = React.useState([{ name: "fsfdsdf" }])
  const [main, setMain] = React.useState("main")
  const [cookies, setCookie, removeCookie] = useCookies(['challenge', 'session']);
  const [session, setSession] = React.useState(cookies.session);
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
  } = useAuth0()
  const positon = [
    { top: "100px", left: "200px" },
    { top: "100px", left: "600px" },
    { left: "600px" },
    { right: "600px" },
    { top: "100px", right: "600px" },
    { bottom: "100px", right: "600px" },
    { top: "100px", right: "200px" },
    { bottom: "100px", right: "200px" },
    { right: "200px" },
    { left: "200px" },
    { bottom: "100px", left: "600px" }
  ]
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
    } , []);
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      }
      );
  }, []);

  const doAuth = () => {
    const code_verifier = cryptoRandomString({ length: 128, type: 'url-safe' });
    setCookie('challenge', code_verifier)
    window.location.href = "https://myanimelist.net/v1/oauth2/authorize?client_id=98ffcb05491c6a0d5c69cecfcb92a2d2&code_challenge=" + code_verifier + "&response_type=code&code_challenge_method=plain"
  }
  return (
    <div className="App">
      <header className="App-header">
        {
          main == "main" ?
            <Box borderRadius="50%" border="1px" h="150px" color="white">
              {!isAuthenticated && <Button onClick={() => doAuth()}>Authenticate</Button>}
              <Text color="white">{JSON.stringify(isAuthenticated)} + asdasd </Text>
              {
                Object.entries(data).map((key, index) =>
                  <Button colorScheme="whiteAlpha" size="md" pos="absolute" style={positon[index]} onClick={() => setMain(key[0])} borderRadius="50%" border="1px" width="150px" height="150px">{key[0]}</Button>
                )
              }
              {
                <Text>{JSON.stringify(cookies.session)}</Text>
              }
            </Box> :
            <TagView tag={main} data={data[main]} main={setMain} session={session} />

        }
      </header>
    </div>
  );
}

export default App;
