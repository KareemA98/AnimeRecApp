
import {
    Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure,
    Checkbox,Button,VStack,Flex, CheckboxGroup, useCheckboxGroup
} from "@chakra-ui/react"
import React from "react"

const FilterBox = ({ onClose, isOpen, tags, selectedTags, setSelectedTags }) => {
    const [filterTags, setFilterTags] = React.useState([])
    console.log(filterTags)
    React.useEffect(() =>{
        setFilterTags(selectedTags)
    }, [selectedTags])

    const checkFilterButton = () => filterTags.length < 1
    return (
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">Filtering</DrawerHeader>
                <DrawerBody>
                    <Flex flexDirection="column" justify="left">
                        <CheckboxGroup value={filterTags} onChange={val => setFilterTags(val)}>
                        {tags.map(tag => <Checkbox value={tag.name}> {tag.name} </Checkbox>)}
                        </CheckboxGroup>
                        
                        <Button isDisabled={checkFilterButton()} onClick={() => setSelectedTags(filterTags)}>Filter</Button>
                    </Flex>
                </DrawerBody>
            </DrawerContent>
        </Drawer>

    )
}
export default FilterBox