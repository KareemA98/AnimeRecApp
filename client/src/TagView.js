import { Box, Button, Wrap, Flex } from "@chakra-ui/react"

const TagView = ({ tag, data, main }) => {

    const noCrossOver = (top, left, array) => 
        (array.some(ele => 
            (top < ele.top + 200 && top > ele.top - 200 && left < ele.left + 200 && left > ele.left - 200 )
        ))
    const posArray = [{top : 350, left:800}];

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
            {/* <Box>{tag}</Box>
            <Button colorScheme="whiteAlpha" onClick={() => main("main")}> Go Back </Button> */}
            <Box pos="absolute" borderRadius="50%" bottom="0px" left="1000px" border="1px" h="150px" w="150px"> {data[0].title.romaji} </Box>
            {data.map((ani, index) =>
                <Button colorScheme="whiteAlpha" pos="absolute" borderRadius="50%" bottom={posArray[index].top + "px"} left={posArray[index].left + "px"} border="1px" h="200px" w="200px">
                    {ani.title.romaji}
                </Button>)
            } 
        </Box>
    )

}
export default TagView