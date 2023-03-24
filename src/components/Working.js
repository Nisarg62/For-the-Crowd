import React from 'react'
import { Card, CardHeader, CardBody, Flex, Box, Heading, Text } from '@chakra-ui/react'
import { BsFillShareFill } from 'react-icons/bs'
import { FcMoneyTransfer, FcDonate } from 'react-icons/fc'
import { ImArrowRight2 } from 'react-icons/im'

function Working() {
  return (
    <div>
        <div className='works-cards'>
            <Card maxW='sm'>
                <CardHeader>
                    <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <FcDonate fontSize={'2rem'} />

                        <Box>
                        <Heading size='sm'>Create a Campaign for Fundraising</Heading>
                        <Text>Simple and Easy</Text>
                        </Box>
                    </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>
                    It takes only 2 minutes. Just enter a few details about the funds you are raising for. Completely safe and secure on the blockchain.
                    </Text>
                </CardBody>
            </Card>
            <ImArrowRight2 color='white' fontSize='2rem'/>
            <Card maxW='sm'>
                <CardHeader>
                    <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <BsFillShareFill color='tomato' fontSize={'2rem'} />

                        <Box>
                        <Heading size='sm'>Share your Campaign</Heading>
                        <Text>Advertise it</Text>
                        </Box>
                    </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>
                    All you need to do is to share the Campaign with your friends, family and others. In no time, support will start pouring.
                    </Text>
                </CardBody>
            </Card>
            <ImArrowRight2 color='white' fontSize='2rem'/>
            <Card maxW='sm'>
                <CardHeader>
                    <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <FcMoneyTransfer color='tomato' fontSize={'2rem'} />

                        <Box>
                        <Heading size='sm'>Request and Withdraw Funds</Heading>
                        <Text>Reach your Goals</Text>
                        </Box>
                    </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>
                    The funds raised can be withdrawn directly to the recepient when 50% of the contributiors approve of the Withdrawal Request.
                    </Text>
                </CardBody>
            </Card>
        </div>
    </div>
  )
}

export default Working