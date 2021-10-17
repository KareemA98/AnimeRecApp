import { Box, Wrap, Center, Flex, Button, Link, Text } from "@chakra-ui/react"
import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import cryptoRandomString from 'crypto-random-string';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import TagView from "./TagView";
import { useHistory, useRouteMatch, BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";

const ShowPage = ({setAnime, setTags}) => {
    let params = useParams()
    setAnime(params.value)
    console.log(params)
    const [data, setData] = React.useState([]);
    const [main, setMain] = React.useState("main")
    const [cookies, setCookie, removeCookie] = useCookies(['challenge', 'session']);
    const [session, setSession] = React.useState(cookies.session);
    const [tag, setTag] = React.useState("")
    const history = useHistory()
    let { path, url } = useRouteMatch();
    console.log([path, url])
    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
            }
            );
    }, []);
    return (
        <>
            <Flex bg="gray.600" justify="center">
                <Text m={2} fontSize="30px">{params.value}</Text>
            </Flex>
            <Switch>
                <Route exact path={path}>
                    <Flex wrap>
                        {
                            data.map((key, index) =>
                                <Button colorScheme="whiteAlpha" size="md" onClick={() => { setTag(key.name); history.push(url + '/' + key.name)}} borderRadius="50%" border="1px" width="150px" height="150px">{key.name}</Button>
                            )
                        }
                    </Flex>
                </Route>
                <Route path={url + '/:tags'}>
                    <TagView setTags={setTags}></TagView>
                </Route>
            </Switch>
        </>
    )
}
const Show = () => {

}
export default ShowPage