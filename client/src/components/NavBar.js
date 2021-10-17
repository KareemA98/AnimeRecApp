import { Flex, Text, Spacer, Button, Checkbox } from "@chakra-ui/react"
import { useHistory } from "react-router"
const NavBar = ({anime, tag, doAuth, loggedIn}) => {
    const history = useHistory()
    return (
        <Flex bg="gray.500" justify="flex-end" padding={1}>
          <Text fontSize="30px">ARA-ARA</Text>
          <Button m={2} onClick={() => history.push('/')}>Home</Button>
          <Spacer />
          <Text fontSize="30px">{anime}</Text>
          <Spacer />
          <Text fontSize="30px">{tag}</Text>
          <Spacer />
          {loggedIn ? <><Checkbox defaultIsChecked>Hide Watched</Checkbox> <Text m={2} fontSize="30px">Logged In</Text> <Button m={2} onClick={doAuth}>Logout of MAL</Button> </> : <Button m={2} onClick={doAuth}>Login to MAL</Button> }
          
        </Flex>
    )
}
export default NavBar