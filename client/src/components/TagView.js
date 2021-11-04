import { Box, Button, Wrap, Flex, Text, Spacer, Checkbox, VStack, Spinner } from "@chakra-ui/react"
import ShowCircles from "./ShowCircles";
import { useParams } from "react-router";
import React from "react";
import axios from "axios";

const TagView = ({ setTags, completed, hideWatched, loggedIn, setCompleted, show, setSelectedTags, selectedTags }) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const [data, setData] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [pageData, setPageData] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    React.useEffect(async () => {
        if (show) {
            setLoading(true)
            console.log(show)
            var comp = completed
            if (!hideWatched) { comp = [] }
            const tags = await axios({ url: "/getShow", method: "post", data: { show: show } })
            console.log(tags)
            setTags(tags.data)
            if(tags.data[0]){
                setSelectedTags([tags.data[0].name])
            } else {
                setSelectedTags([]) 
            }
        }
    }, [show]);



    React.useEffect( async () => {
        if (selectedTags) {
            setPage(1);
            const returnData = await axios({ url: "/getTagInfo", method: "post", data: { tag: selectedTags, completed:completed, page:page } })
            console.log(returnData)
            setPageData(returnData.data.data.Page.pageInfo);
            setData(returnData.data.data.Page.media);
            setLoading(false)
        }
    }, [selectedTags, hideWatched])

    React.useEffect( async () => {
        if (selectedTags) {
            const returnData = await axios({ url: "/getTagInfo", method: "post", data: { tag: selectedTags, completed:completed, page:page } })
            console.log(returnData)
            setPageData(returnData.data.data.Page.pageInfo);
            setData(returnData.data.data.Page.media);
        }
    }, [page])

    // const noCrossOver = (top, left, array) =>
    // (array.some(ele =>
    //     (top < ele.top + 200 && top > ele.top - 200 && left < ele.left + 200 && left > ele.left - 200)
    // ))
    // const posArray = [{ top: 300, left: 700 }];

    // for (let i = 0; i < data.length; i++) {
    //     let top = Math.floor(Math.random() * 650);
    //     let left = Math.floor(Math.random() * 1400);
    //     console.log(noCrossOver(top, left, posArray))
    //     while (noCrossOver(top, left, posArray)) {
    //         console.log("while")
    //         top = Math.floor(Math.random() * 650);
    //         left = Math.floor(Math.random() * 1400);
    //         console.log(noCrossOver(top, left, posArray))
    //     }

    //     posArray.push({ top: top, left: left })
    // }

    if(loading) return <Spinner color="white"> asdasd</Spinner>

    return (

         data.length > 1 ? 
        <Flex m={3} flexDirection="column" >
            <Wrap spacing={5} m={2} justify="center" >
                {data.slice(0, -3).map((ani, index) =>
                    <ShowCircles data={ani} completed={completed} img={ani.coverImage.large} loggedIn={loggedIn} setCompleted={setCompleted}>
                    </ShowCircles>)
                }
            </Wrap>
            <Wrap m={2} spacing={3} justify="center" align="center">
                <Button isDisabled={page == 1} onClick={() => setPage(old => old - 1)} w="150px" h="150px" size="lg">Previous</Button>
                <Spacer />
                {data.slice(-3).map((ani, index) =>
                    <ShowCircles data={ani} img={ani.coverImage.large} completed={completed} loggedIn={loggedIn} setCompleted={setCompleted}>
                    </ShowCircles>)
                }
                <Spacer />
                <VStack>
                    <Text color="white"> {pageData.total} </Text>
                    <Text color="white"> {`Page ${page} out of ${pageData.lastPage} pages`} </Text>
                    <Button isDisabled={page == pageData.lastPage} w="150px" h="150px" onClick={() => setPage(old => old + 1)} >Next</Button>
                </VStack>
            </Wrap>
        </Flex> :
        <Text color="white">No results found</Text>
    )

}
export default TagView