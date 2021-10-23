import { Box, Wrap, Center, Flex, Button, Link, Text } from "@chakra-ui/react"
import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import cryptoRandomString from 'crypto-random-string';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import TagView from "./TagView";
import { useHistory, useRouteMatch, BrowserRouter as Router, Switch, Route, useParams, Redirect } from "react-router-dom";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Lorem,
    useDisclosure
} from "@chakra-ui/react"

const ShowPage = ({ setAnime, setTags, completed, hideWatched, loggedIn }) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params)
    setAnime(params.val)
    const [data, setData] = React.useState([]);
    const [main, setMain] = React.useState("main")
    const [cookies, setCookie, removeCookie] = useCookies(['challenge', 'session']);
    const [session, setSession] = React.useState(cookies.session);
    const [tag, setTag] = React.useState("")
    const history = useHistory()
    const { isOpen, onOpen, onClose } = useDisclosure()
    let { path, url } = useRouteMatch();
    console.log([path, url])
    React.useEffect(() => {
        axios({ method: "post", url: "/getShow", data: { show: params.val } })
            .then((res) => setData(res.data))
    }, []);
    if (!params.val) return <Redirect to="/"></Redirect> 
    return (
        <>
            <Switch>
                <Route exact path={path}>
                    <Wrap spacing="30px" m={4} justify="center" >
                        {
                            data.map((key, index) =>
                                <Button colorScheme="whiteAlpha" size="md" onClick={() => { setTag(key.name); history.push('/Choice?tag=' + key.name) }} borderRadius="50%" border="1px" width="150px" height="150px">{key.name}</Button>
                            )
                        }
                    </Wrap>
                </Route>
                <Route path={url + '/:tags'}>
                    <TagView setTags={setTags} completed={completed} hideWatched={hideWatched} loggedIn={loggedIn}></TagView>
                </Route>
            </Switch>
        </>
    )
}
const Show = () => {

}
export default ShowPage