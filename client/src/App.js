import logo from './logo.svg';
import './App.css';
import { Box, Wrap, Center, Flex, Button } from "@chakra-ui/react"
import React from "react";

function App() {
  const [data, setData] = React.useState({});
  const [tan, setTan] = React.useState(8);
  const [tags, setTags] = React.useState([{ name: "fsfdsdf" }])
  const positon = [
    { top: "100px", left: "200px" },
    { top: "100px", left: "600px" },
    { left: "600px" },
    { right: "600px" },
    { top: "100px", right: "600px" },
    { bottom: "100px", right: "600px" },
    { top: "100px", right: "200px" },
    { bottom: "100px", right: "200px" },
    { right: "200px" },
    { left: "200px" },
    { bottom: "100px", left: "600px" }
  ]
  // Here we define our query as a multi-line string
  // Storing it in a separate .graphql/.gql file is also possible
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      }
      );
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Box borderRadius="50%" border="1px" w="150px" h="150px" color="white">
          {
            Object.entries(data).map((key, index) =>
              <Button colorScheme="whiteAlpha" size="md" justify="center" alignContent="center" flexDirection="column" pos="absolute" style={positon[index]} borderRadius="50%" border="1px" width="150px" height="150px">{key[0]}</Button>
            )
          }
        </Box>
      </header>
    </div>
  );
}

export default App;
