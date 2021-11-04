import './App.css';
import { Box, Flex, Button, Spacer, useDisclosure } from "@chakra-ui/react"
import React from "react";
import TagView from './components/TagView';
import cryptoRandomString from 'crypto-random-string';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import FilterBox from './components/filterBox';


function App() {
  const [anime, setAnime] = React.useState("anime")
  const [tags, setTags] = React.useState([])
  console.log(tags)
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [completed, setCompleted] = React.useState([])
  const [hideWatched, setHideWatched] = React.useState(false)
  const alterState = () => setHideWatched(prevCheck => !prevCheck)
  const [tan, setTan] = React.useState(8);
  const [cookies, setCookie, removeCookie] = useCookies(['challenge', 'session']);
  const history = useHistory();
  const [show, setShow] = React.useState(null)
  const [selectedTags, setSelectedTags] = React.useState(null)
  const [suggestions, setSuggestions] = React.useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

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
    if (loggedIn) {
      axios({ url: "/getMALList", method: "post", data: { session: cookies.session } })
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
      <Flex>
        <Box as="button" _hover={{ bg: "gray.300" }} w="10vh" h="100vh" bg="gray.400" onClick={onOpen}>
          <FontAwesomeIcon size="lg" icon={faArrowCircleRight} />
        </Box>
        <Box h="100vh" w="200vh" bg="gray.800">
          {/* <NavBar anime={anime} tag={tag} doAuth={doAuth} loggedIn={loggedIn} hideWatched={hideWatched} alterState={alterState} logOut={logOut} /> */}
          <Flex alignItems="initial" justify="space-evenly" >
            <Spacer/>
            <HomePage setShow={setShow} suggestions={suggestions} setSuggestions={setSuggestions}  />
            {loggedIn ? <Button m={3} marginLeft="100px"  onClick={logOut}>Logout of MAL</Button> :
            <Button m={3} marginLeft="100px"  onClick={doAuth}>Login to MAL hgjhbjhb</Button>}
          </Flex>
          { suggestions.length < 1 ? 
          <TagView setTags={setTags} completed={completed} hideWatched={hideWatched}
           loggedIn={loggedIn} setCompleted={setCompleted} show={show} setSelectedTags={setSelectedTags}
           selectedTags={selectedTags}
            ></TagView> :
            <Box> suggestion over 1 </Box> 
          }
          {JSON.stringify(selectedTags)}
        </Box>
      </Flex>
        <FilterBox isOpen={isOpen} onClose={onClose} tags={tags} selectedTags={selectedTags}/>
    </Router>

  );
}

export default App;
