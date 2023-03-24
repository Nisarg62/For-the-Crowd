import React from 'react'
import { Button, Heading, Text } from '@chakra-ui/react'
import { Card, CardBody, Stack, Image, Progress } from '@chakra-ui/react'
import { FaHandHoldingUsd, FaHandsHelping } from 'react-icons/fa'

function MyCampaignCard({ setPageState, camp, setCampaignIndex }) {

    const handleCampaignPage = () => {
        setCampaignIndex(camp.index)
        setPageState('campaign')
        }

  return (
    <Card direction={{ base: 'column', sm: 'row' }} variant={'outline'} style={ camp.active ? { marginBottom: '2%', boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" } : {marginBottom: '2%', boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", backgroundColor:'#d6d6d6'}} >
            <Image
            src={camp.url}
            borderRadius='lg'
            maxW={{ base: '100%', sm: '300px' }}
            objectFit='cover'
            />
            <Stack width='70%'>
            <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }} >
                <Heading size='md' style={{ display: 'flex', alignItems:'center', justifyContent: 'space-between' }} >{camp.title}<FaHandsHelping color={'tomato'} /></Heading>
                <Text color='tomato' fontSize='2xl' style={{display: 'flex', justifyContent: 'space-between'}} >
                    {camp.balance} ETH {`($${camp.balance * 1661}`.substring(0, 7) +`)`}
                    <Button onClick={handleCampaignPage} variant='solid' colorScheme='orange' backgroundColor={'tomato'} rightIcon={<FaHandHoldingUsd/>}>
                    Check Status
                    </Button>
                </Text>
                <Text color={'#0000008a'} >Target of {camp.targetAmt} ETH {`($${camp.targetAmt * 1661}`.substring(0, 7) +`)`}</Text>
                <Progress value={(camp.balance / camp.targetAmt) * 100} size='xs' colorScheme='orange' />
            </CardBody>
            </Stack>
            {
                !camp.active
                ?
                (
                    <div className='archive-card' >
                        <div className='inner-archive-card' >
                            ARCHIVED
                        </div>
                    </div>
                )
                :
                null
            }
        </Card>
  )
}

export default MyCampaignCard