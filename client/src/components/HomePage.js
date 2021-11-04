
import { Box, Flex, Text, Input, Button, Spacer, VStack, InputGroup, InputLeftAddon, InputRightAddon, InputRightElement, Spinner } from '@chakra-ui/react'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, useRouteMatch, Link } from 'react-router-dom'
import React from 'react';
import axios from 'axios';
import ShowPage from './ShowPage';
import TagView from './TagView';
const HomePage = ({setShow, suggestions, setSuggestions}) => {
    const [value, setValue] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [lastTime, setLastTime] = React.useState(new Date)
    const history = useHistory();

    const getAutoCompleteResults = async (e) => {
        setValue(e.target.value)
        console.log(new Date - lastTime)
        console.log((new Date - lastTime))
        if (Math.floor((new Date() - lastTime)) < 700) {
            // get from variable
            console.log("asdad")
        } else {
            // get from url
            setLastTime(new Date)
            console.log(lastTime)
            setLoading("asda")
            await axios.get("/search?term=" + e.target.value)
                .then(res => setSuggestions(res.data))
                .catch(err => console.log(err))
        }
        setLoading(false)
    }
    return (
        <VStack align="center" justify="center">
            <Text fontSize="80px" color="white">What Anime Should I Watch Next?</Text>
            {loading ? <Box>"adsasd" </Box> : <Box>"dfsdf" </Box>}

            <Box w="50%" >
                <InputGroup bg="white" size="sm">
                    <Input value={value} onChange={(e) => getAutoCompleteResults(e)} placeholder="mysite" />
                    <InputRightElement>
                        {loading == "asda" ? <Spinner /> : null}
                    </InputRightElement>
                </InputGroup>
                <VStack p={4}>
                    {suggestions.map(val => <Box as="button" onClick={() => {setValue(val);setSuggestions([]);setShow(val)}} bg="white" w="100%">{val}</Box>)}
                </VStack>
            </Box>
            {/* <Button onClick={() => history.push('/' + value)}>Submit</Button> */}
        </VStack>
    )
}
export default HomePage