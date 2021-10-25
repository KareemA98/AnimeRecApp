import React from 'react'
import axios from 'axios'
import {
    Button, Box, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Lorem, ModalFooter, ModalBody,
    Tabs, TabList, Tab, TabPanel, TabPanels, Grid, GridItem, Text, Container, Flex, Wrap
} from '@chakra-ui/react'
import { useCookies } from 'react-cookie';
const ShowCircles = ({ img, data, loggedIn, completed, setCompleted }) => {
    // const [img, setImg] = React.useState("https://bit.ly/sage-adebayo")
    // const getImage = async(id) => {
    //     const response = await axios({url:"/getImage", method:"post", data:{malID:id, session:session}})
    //     setImg(response.data.data)
    // } 
    // React.useEffect(() => {
    //     getImage(id)
    // }, [])
    const background = () => {
        switch(completed[data.idMal]) {
            case "completed" :
               return  "blue"
            case "watching" :
                return "green"
            case "on_hold" :
                return "yellow"
            case "dropped" : 
                return "red"
            case "plan_to_watch":
                return "purple"
            default :
                return "white"
        }
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const [sendingToMal, setSendingToMal] = React.useState(false)
    const addToMalList = () => {
        setSendingToMal(true)
        const session = cookies.session
        axios({
            method:"post",
            url:"/AddToMal",
            data: {
                session: session,
                id: data.idMal
            }
        })
        .then(res => {
            console.log(res)
            setCompleted(old => 
                {
                    old[data.idMal] = "plan_to_watch"
                    return old
                }
            )
            setSendingToMal(false)
        })
        .catch(err => console.log(err))
    }
    return (
        <>
            <Button
                onClick={onOpen}
                boxSize="230px"
                borderRadius="full"
                bg={background}
            >
                <Image
                    borderRadius="full"
                    boxSize="200px"
                    src={img}
                    alt="Segun Adebayo"
                />
            </Button>
            <Modal isOpen={isOpen} size="xl" onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{data.title.english ?? data.title.romaji}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex>
                            <Image
                                h="300px"
                                src={img}
                                alt="Segun Adebayo"
                            />
                            <Container>
                                <Text noOfLines={12} color="gray.500"> {data.description} </Text>
                            </Container>
                        </Flex>
                        <Flex m={2} justify="space-around">
                            <Text p={2} w="300px" fontSize="20px"  color="gray.700"> Avalible On </Text>
                            <Wrap>
                            {data.externalLinks.map(link => <Button onClick={() => window.open(link.url, '_blank')}>{link.site}</Button>) }
                            </Wrap>
                        </Flex>
                        <Flex justify="space-around">
                            <Text color="gray.500"> Episodes: {data.episodes} </Text>
                            <Text color="gray.500"> Status: {data.status} </Text>
                            <Text color="gray.500"> Season Year: {data.seasonYear} </Text>
                        </Flex>
                        <Flex justify="flex-end">
                        {loggedIn ? 
                        <Button isDisabled={data.idMal in completed} isLoading={sendingToMal} onClick={addToMalList}>Add to MAL List</Button>
                        : 
                        <Text> not logged in </Text>}
                        </Flex>
                    </ModalBody>
                </ModalContent >
            </Modal >
        </>
    )
}
export default ShowCircles