import React from 'react'
import axios from 'axios'
import { Button, Box, Image } from '@chakra-ui/react'
const ShowCircles = ({ bottom, left, title, id, session }) => {
    const [img, setImg] = React.useState("https://bit.ly/sage-adebayo")
    const getImage = async(id) => {
        const response = await axios({url:"/getImage", method:"post", data:{malID:id, session:session}})
        setImg(response.data.data)
    } 
    React.useEffect(() => {
        getImage(id)
    }, [])
    
    return (
        <Button
            onClick={() => console.log("asda")}
            pos="absolute"
            left={left}
            bottom={bottom}
            boxSize="200px"
            borderRadius="full"
        >
            <Image
                borderRadius="full"
                boxSize="200px"
                src={img}
                alt="Segun Adebayo"
            />
        </Button>
    )
}
export default ShowCircles