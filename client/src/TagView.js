import { Box, Button, Wrap, Flex } from "@chakra-ui/react"

const TagView = ({ tag, data, main }) => {
    return (
        <Box w="100%">
            <Box>{tag}</Box>
            <Button colorScheme="whiteAlpha" onClick={() => main("main")}> Go Back </Button>
            <Flex justify="space-around">
            {data.map(ani => <Box border="1px" h="400px" w="200px"> {ani.title.romaji} </Box>)}
            </Flex>
        </Box>
    )

}
export default TagView