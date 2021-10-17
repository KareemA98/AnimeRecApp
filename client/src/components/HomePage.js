
import { Box, Flex, Text, Input, Button, Spacer, VStack, InputGroup, InputLeftAddon, InputRightAddon, InputRightElement, Spinner } from '@chakra-ui/react'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, useRouteMatch, Link } from 'react-router-dom'
import React from 'react';
import axios from 'axios';
import ShowPage from './ShowPage';
const Home = ({setAnime, setTags}) => {
    return (
        <Router>
            <Switch>
            <Route exact path="/">
                    <HomePage/>
                </Route>
                <Route path={"/:value"}>
                    <ShowPage setTags={setTags} setAnime={setAnime} />
                </Route>
            </Switch>
        </Router>
    )

}

const HomePage = () => {
    const [value, setValue] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [suggestions, setSuggestions] = React.useState(["asdasd", "hfdgf"])
    const history = useHistory();
    const getAutoCompleteResults = async () => {
        setLoading("asda")
        console.log("asda")
        await axios.get("/search?term=" + value)
            .then(res => setSuggestions(res.data))
            .catch(err => console.log(err))
        setLoading(false)
    }
    return (
        <VStack  align="center" justify="center">
            <Text fontSize="100px" color="white">What Anime Should I Watch Next?</Text>
            {loading ? <Box>"adsasd" </Box> : <Box>"dfsdf" </Box>}

            <Box w="50%" >
                <InputGroup bg="white" size="sm">
                    <Input onBlur={getAutoCompleteResults} value={value} onChange={(e) => { console.log(e.target.value); setValue(e.target.value) }} placeholder="mysite" />
                    <InputRightElement>
                        {loading == "asda" ? <Spinner /> : null}
                    </InputRightElement>
                </InputGroup>
                <VStack p={4}>
                    {suggestions.map(val => <Box as="button" bg="white" w="100%">{val}</Box>)}
                </VStack>
            </Box>
            <Link to="/courses"> asdasdad </Link>
            <Button onClick={() => history.push(value)}>Submit</Button>
        </VStack>
    )
}
export default Home