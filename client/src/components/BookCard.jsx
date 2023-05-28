import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  Button,
  Tooltip,
  Stack,
  Link,
  HStack,
  Text,
} from "@chakra-ui/react";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { Link as ReactLink } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Rating = ({ rating, numReviews }) => {
  const { iconSize, setIconSize } = useState("14px");
  return (
    <Flex>
      <HStack spacing='2px'>
        <StarIcon size={iconSize} w='14px' color='orange.500' />
        <StarIcon size={iconSize} w='14px' color={rating >= 2 ? "orange.500" : "gray.200"} />
        <StarIcon size={iconSize} w='14px' color={rating >= 3 ? "orange.500" : "gray.200"} />
        <StarIcon size={iconSize} w='14px' color={rating >= 4 ? "orange.500" : "gray.200"} />
        <StarIcon size={iconSize} w='14px' color={rating >= 5 ? "orange.500" : "gray.200"} />
      </HStack>
      <Text fontSize='md' fontWeight='bold' ml='4px'>
        {`${numReviews} ${numReviews === 1 ? "Review" : "Reviews"}`}
      </Text>
    </Flex>
  );
};

const BookCard = ({ book }) => {
  return (
    <Stack
      p='2'
      spacing='3px'
      bg={useColorModeValue("white", "gray.750")}
      minW='250px'
      h='500px'
      borderWidth='2px'
      rounded='lg'
      shadow='lg'
      position='relative'
    >
      {book.isNew && <Circle size='10px' position='absolute' top={3} right={3} bg='green.300' />}
      {book.stock && <Circle size='10px' position='absolute' top={3} right={3} bg='red.300' />}
      <Image src={book.image} alt={book.name} roundedTop='lg' />

      <Box flex='2' maxH='8' alignItems='baseline'>
        {book.stock <= 0 && (
          <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='red'>
            Sold Out
          </Badge>
        )}
        {book.isNew && (
          <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>
            New
          </Badge>
        )}
      </Box>

      <Flex mt='2' justifyContent='space-between' alignContent='center'>
        <Link as={ReactLink} to={`/book${book._id}`} pt='2' cursor='pointer'>
          <Box fontSize='2x1' fontWeight='semibold' lineHeight='tight'>
            {book.name}
          </Box>
        </Link>
      </Flex>

      <Flex justifyContent='space-between' alignContent='center' py='2'>
        <Rating rating={book.rating} numReviews={book.numReviews} />
      </Flex>

      <Flex justify='space-between'>
        <Box fontSize='2x1' color={useColorModeValue("gray.800", "white")}>
          <Box as='span' color={"gray.600"} fontSize='lg'>
            $
          </Box>
          {book.price.toFixed(2)}
        </Box>
        <Tooltip label='Add to Basket' bg='white' placement='top' color='gray.900' fontSize='1.25em'>
          <Button variant='ghost' display='flex' disabled={book.stock <= 0}>
            <Icon as={RiShoppingBasket2Line} h={8} w={8} alignSelf='center' />
          </Button>
        </Tooltip>
      </Flex>
    </Stack>
  );
};

export default BookCard;