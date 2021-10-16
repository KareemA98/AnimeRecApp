import { Box, Button, Wrap, Flex } from "@chakra-ui/react"
import ShowCircles from "./ShowCircles";

const TagView = ({ tag, data, main, session }) => {

    const noCrossOver = (top, left, array) => 
        (array.some(ele => 
            (top < ele.top + 200 && top > ele.top - 200 && left < ele.left + 200 && left > ele.left - 200 )
        ))
    const posArray = [{top : 300, left:700}];

    for (let i = 0; i < data.length; i++) {
        let top = Math.floor(Math.random() * 650);
        let left = Math.floor(Math.random() * 1400);
        console.log(noCrossOver(top, left, posArray))
        while (noCrossOver(top, left, posArray)) {
            console.log("while")
            top = Math.floor(Math.random() * 650);
            left = Math.floor(Math.random() * 1400);
            console.log(noCrossOver(top, left, posArray))
        }

        posArray.push({ top: top, left: left})
    }

    console.log(posArray)
    return (
        <Box w="100%">
            <Button pos="absolute" right="50px" bottom="0px" colorScheme="whiteAlpha" onClick={() =>{ main("main")}}> asdasd </Button>
            {/* <Box>{tag}</Box>
            <Button colorScheme="whiteAlpha" onClick={() => main("main")}> Go Back </Button> */}
            <Box pos="absolute" borderRadius="50%" bottom="45%" left="45%" border="1px" h="150px" w="150px"> {data[0].title.romaji} </Box>
            {data.map((ani, index) =>
                <ShowCircles  session = {session} bottom={posArray[index].top + "px"} left={posArray[index].left + "px"} title={ani.title.romaji} id={ani.idMal}>
                </ShowCircles>)
            } 
        </Box>
    )

}
export default TagView