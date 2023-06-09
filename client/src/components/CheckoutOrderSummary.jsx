import { useEffect, useState, useCallback } from "react";
import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  Badge,
  Box,
  Link,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { PhoneIcon, EmailIcon, ChatIcon } from "@chakra-ui/icons";
import { createOrder, resetOrder } from "../redux/actions/orderActions";
import CheckoutItem from "./CheckoutItem";
import PayPalButton from "./PayPalButton";
import { resetBasket } from "../redux/actions/basketActions";

const CheckoutOrderSummary = () => {
  const colorMode = mode("gray.600", "gray.400");
  const basketItems = useSelector((state) => state.basket);
  const { basket, subtotal } = basketItems;

  const user = useSelector((state) => state.basket);
  const { userInfo } = user;

  //paypal pay button
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const total = useCallback(() => Number(Number(subtotal)).toFixed(2), [subtotal]);

  const onPaymentSuccess = async (data) => {
    dispatch(
      createOrder({
        orderItems: basket,
        paymentMethod: data.paymentSource,
        paymentDetails: data,
        totalPrice: total(),
        userInfo,
      })
    );
    dispatch(resetOrder());
    dispatch(resetBasket());
    navigate("/order-success");
  };

  const onPaymentError = () => {
    toast({
      description:
        "something went wront during the payment process. Please try again or make sure that your PayPal account balance is enough for this purchase",
      status: "error",
      duration: "600000",
      isClosable: true,
    });
  };

  return (
    <Stack spacing='8' rounded='xl' padding='8' width='full'>
      <Heading size='md'>Order Summary</Heading>
      {basket.map((item) => (
        <CheckoutItem key={item.id} basketItem={item} />
      ))}

      <Stack spacing='6'>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={colorMode}>
            Subtotal
          </Text>
          <Text fontWeight='medium' color={colorMode}>
            {subtotal}
          </Text>
        </Flex>
        {/* <Flex justify='space-between'>
          <Text fontWeight='medium' color={colorMode}>
            Shipping
          </Text>
          <Text fontWeight='medium' color={colorMode}>
            {shipping() === 0 ? (
              <Badge rounded='full' px='2' fontSize='0.8em' colorScheme="='green">
                Free
              </Badge>
            ) : (
              `$${shipping()}`
            )}
          </Text>
        </Flex> */}
        <Flex justify='space-between'>
          <Text fontWeight='semibold' fontSize='lg'>
            Total
          </Text>
          <Text fontSize='xl' fontWeight='extrabold'>
            ${Number(total())}
          </Text>
        </Flex>
      </Stack>
      <PayPalButton
        total={total}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        disabled={buttonDisabled}
      />

      <Box align='center'>
        <Text fontSize='sm'> Have questions? or need help to complete your order?</Text>
        <Flex justifyContent='center' color={mode("purple.500", "purple.100")}>
          <Flex align='center'>
            <ChatIcon />
            <Text m='2'>Live Chat</Text>
          </Flex>
          <Flex align='center'>
            <PhoneIcon />
            <Text m='2'>Phone</Text>
          </Flex>
          <Flex align='center'>
            <EmailIcon />
            <Text m='2'>Email</Text>
          </Flex>
        </Flex>
      </Box>
      <Divider bg={mode("gray.400", "gray.800")} />
      <Flex justifyContent='center' my='6' fontWeight='semibold'>
        <p>or</p>
        <Link as={ReactLink} to='/books' ml='1'>
          Continue Shopping
        </Link>
      </Flex>
    </Stack>
  );
};

export default CheckoutOrderSummary;
