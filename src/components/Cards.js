import React from 'react'
import { Card, CardBody, Stack, Heading, Text, Divider, Button, Image, Progress } from '@chakra-ui/react'
import { BiWalletAlt } from 'react-icons/bi'
import { FaHandHoldingUsd, FaHandsHelping } from 'react-icons/fa'

function Cards({ setPageState, data, setCampaignIndex, setTypeWriter, ethToUsd}) {

  const handleCampaignPage = () => {
    setTypeWriter(true)
    setCampaignIndex(data.index)
    setPageState('campaign')
  }

  return (
    <Card maxW='xs' minW='xs' className='one-card' variant={'outline'} style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }} >
      <CardBody>
        <Image
          src={data.url}
          alt='Green double couch with wooden legs'
          borderRadius='lg'
          boxSize='280px'
          objectFit='cover'
        />
        <Stack mt='6' spacing='3'>
        <Heading size='md' style={{ display: 'flex', alignItems:'center', justifyContent: 'space-between' }} >{data.title.length > 40 ? `${data.title.substring(0, 40)}...` : data.title}<FaHandsHelping color={'tomato'} /></Heading>
          <Text fontSize='sm' style={{ display: 'flex', alignItems:'center', justifyContent: 'space-between', width: '35%' }} ><BiWalletAlt color='tomato' /> <b>{' 0x369...0b9'}</b></Text>
          <Text color='tomato' fontSize='2xl' style={{display: 'flex', justifyContent: 'space-between'}} >
            {data.balance} ETH {`($${data.balance*ethToUsd}`.substring(0, 7) +`)`}
            <Button onClick={handleCampaignPage} variant='solid' colorScheme='orange' backgroundColor={'tomato'} rightIcon={<FaHandHoldingUsd/>}>
            Support
            </Button>
          </Text>
          <Text color={'#0000008a'} >Target of {data.targetAmt} ETH {`($${data.targetAmt * ethToUsd}`.substring(0, 7) +`)`}</Text>
          <Progress value={(data.balance / data.targetAmt) * 100} size='xs' colorScheme='orange' />
        </Stack>
      </CardBody>
      <Divider />
    </Card>
  )
}

export default Cards