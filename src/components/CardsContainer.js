import React from 'react'
import { Skeleton, Stack, Card, CardBody, Image, Heading, Text, Button, Progress, Divider } from '@chakra-ui/react'
import { BiWalletAlt } from 'react-icons/bi'
import { FaHandHoldingUsd, FaHandsHelping } from 'react-icons/fa'
import Cards from './Cards'

function CardsContainer({ setPageState, allCampaigns, setCampaignIndex, loading, setTypeWriter, ethToUsd}) {
  const load = [1,2,3,4]
  return (
    <div className='cards-container' >
        {
          loading
          ?
          load.map(i => (
            <Skeleton key={i} className='one-card' style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }} >
              <Card maxW='xs' minW='xs' className='one-card' variant={'outline'} style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }} >
                <CardBody>
                  <Image
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                  />
                  <Stack mt='6' spacing='3'>
                    <Heading size='md' style={{ display: 'flex', alignItems:'center', justifyContent: 'space-between' }} >data.title<FaHandsHelping color={'tomato'} /></Heading>
                    <Text fontSize='sm' style={{ display: 'flex', alignItems:'center', justifyContent: 'space-between', width: '35%' }} ><BiWalletAlt color='tomato' /> <b>{' 0x369...0b9'}</b></Text>
                    <Text color='tomato' fontSize='2xl' style={{display: 'flex', justifyContent: 'space-between'}} >
                      data.balance ETH {`({data.balance*ethToUsd}`.substring(0, 7) +`)`}
                      <Button variant='solid' colorScheme='orange' backgroundColor={'tomato'} rightIcon={<FaHandHoldingUsd/>}>
                      Support
                      </Button>
                    </Text>
                    <Text color={'#0000008a'} >Target of data.targetAmt ETH {`({data.targetAmt * ethToUsd}`.substring(0, 7) +`)`}</Text>
                    <Progress value={100} size='xs' colorScheme='orange' />
                  </Stack>
                </CardBody>
                <Divider />
              </Card>
            </Skeleton>
          ))
          :
          allCampaigns.map((data, index) => data.active ? (
            <Cards setPageState={setPageState} data={data} key={index} setCampaignIndex={setCampaignIndex} 
            setTypeWriter={setTypeWriter} ethToUsd={ethToUsd}/>
          ):null)
        }
    </div>
  )
}

export default CardsContainer