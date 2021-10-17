import React from 'react'
import axios from 'axios'
import {
    Button, Box, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Lorem, ModalFooter, ModalBody,
    Tabs, TabList, Tab, TabPanel, TabPanels, Grid, GridItem, Text, Container, Flex, Wrap
} from '@chakra-ui/react'
const ShowCircles = ({ img, data }) => {
    // const [img, setImg] = React.useState("https://bit.ly/sage-adebayo")
    // const getImage = async(id) => {
    //     const response = await axios({url:"/getImage", method:"post", data:{malID:id, session:session}})
    //     setImg(response.data.data)
    // } 
    // React.useEffect(() => {
    //     getImage(id)
    // }, [])
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button
                onClick={onOpen}
                boxSize="230px"
                borderRadius="full"
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
                        <Flex justify="space-around">
                            <Text p={2} w="300px" fontSize="20px"  color="gray.700"> Avalible On </Text>
                            <Wrap>
                            {data.externalLinks.map(link => <Button onClick={() => window.location.href = link.url}>{link.site}</Button>) }
                            </Wrap>
                        </Flex>
                    </ModalBody>
                </ModalContent >
            </Modal >
        </>
    )
}
export default ShowCircles