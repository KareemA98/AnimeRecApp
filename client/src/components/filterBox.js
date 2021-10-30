
import {
    Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure,
    Checkbox,Button,VStack,Flex, CheckboxGroup, useCheckboxGroup
} from "@chakra-ui/react"
import React from "react"

const FilterBox = ({ onClose, isOpen, tags, selectedTags }) => {
    const [filterTags, setFilterTags] = React.useState(selectedTags)
    const as = useCheckboxGroup
    React.useEffect(() =>{
        setFilterTags(selectedTags)
    }, [selectedTags])
    return (
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">Filtering</DrawerHeader>
                <DrawerBody>
                    <Flex flexDirection="column" justify="left">
                        <CheckboxGroup onChange={(value) => {console.log(value)}}>
                        {tags.map(tag => <Checkbox> {tag.name} </Checkbox>)}
                        </CheckboxGroup>
                        
                        <Button>Filter</Button>
                    </Flex>
                </DrawerBody>
            </DrawerContent>
        </Drawer>

    )
}
export default FilterBox