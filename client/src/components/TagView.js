import { Box, Button, Wrap, Flex, Text } from "@chakra-ui/react"
import ShowCircles from "./ShowCircles";
import { useParams } from "react-router";
import React from "react";
import axios from "axios";

const TagView = ({setTags}) => {
    const tags = useParams().tags
    setTags(tags)
    const session = "asdas"
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        axios({url:"/getTagInfo", method:"post", data:{tag:tags}})
            .then((res) => {
                setData(res.data.data.Page.media)
            }
            );
    }, []);
    const noCrossOver = (top, left, array) =>
    (array.some(ele =>
        (top < ele.top + 200 && top > ele.top - 200 && left < ele.left + 200 && left > ele.left - 200)
    ))
    const posArray = [{ top: 300, left: 700 }];

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

        posArray.push({ top: top, left: left })
    }

    console.log(posArray)
    return (
            <>
            <Flex bg="gray.700" justify="center">
                <Text m={2} fontSize="30px">{tags}</Text>
            </Flex>
            <Wrap m= {2} h="10px" w="90%">
                {data.map((ani, index) =>
                    <ShowCircles data={ani} img={ani.coverImage.large}>
                    </ShowCircles>)
                }
            </Wrap>
            </>
    )

}
export default TagView