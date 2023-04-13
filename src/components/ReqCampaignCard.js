import React from 'react'
import { Button, Heading, Text } from '@chakra-ui/react'
import { Card, CardBody, Stack, Image, Progress } from '@chakra-ui/react'
import { FaHandHoldingUsd, FaHandsHelping } from 'react-icons/fa'

function ReqCampaignCard({ setPageState, setPState, setCampaignIndex, camp, ethToUsd }) {

    const handleCampaignPage = () => {
        setCampaignIndex(camp.index)
        setPState('viewRequests')
        setPageState('viewRequest')
        }

  return (
    <Card className='aniDesc' direction={{ base: 'column', sm: 'row' }} style={{ display: 'flex', flexDirection: 'column' }}  variant={'outline'} style={ camp.active ? { marginBottom: '2%', boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" } : {marginBottom: '2%', boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", backgroundColor:'#d6d6d6'}} width='100%' height='200px'>
            <Image
            src={camp.url}
            borderRadius='lg'
            maxW={{ base: '100%', sm: '300px' }}
            objectFit='cover'
            />
            <Stack width='70%'>
            <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width:'100%' }} >
                <Heading size='md' style={{ display: 'flex', alignItems:'center', justifyContent: 'space-between' }} >{camp.title}<FaHandsHelping color={'tomato'} /></Heading>
                <Text color='tomato' fontSize='2xl' style={{display: 'flex', justifyContent: 'space-between'}} >
                    {camp.balance} ETH {`($${camp.balance * ethToUsd}`.substring(0, 7) +`)`}
                    <Button onClick={handleCampaignPage} variant='solid' colorScheme='orange' backgroundColor={'tomato'} rightIcon={<FaHandHoldingUsd/>}>
                    View Requests
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

export default ReqCampaignCard