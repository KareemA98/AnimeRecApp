import { Flex, Text, Spacer, Button } from "@chakra-ui/react"
import { useHistory } from "react-router"
const NavBar = ({anime, tag}) => {
    const history = useHistory()
    return (
        <Flex bg="gray.500" justify="flex-end" padding={1}>
          <Text fontSize="30px">ARA-ARA</Text>
          <Spacer />
          <Text fontSize="30px">{anime}</Text>
          <Spacer />
          <Text fontSize="30px">{tag}</Text>
          <Spacer />
          <Button m={2} onClick={() => history.push('/')}>Home</Button>
          <Button m={2}>Login to MAL</Button>
        </Flex>
    )
}
export default NavBar