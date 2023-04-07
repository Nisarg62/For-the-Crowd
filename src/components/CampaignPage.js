import React, {useState, useRef} from 'react'
import { Button, Heading, Text, Card, CardBody, Progress, InputGroup, Input, InputRightAddon, Box, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, useDisclosure, Popover,PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,PopoverArrow,PopoverCloseButton, useToast, Link } from '@chakra-ui/react'
import { AiFillInfoCircle } from 'react-icons/ai'
import { BiDonateHeart } from 'react-icons/bi'
import { BsFillPeopleFill, BsFillChatSquareQuoteFill } from 'react-icons/bs'
import { FaAddressCard } from 'react-icons/fa'

function CampaignPage({ setPageState,setPState, campaign, currentAdd, signer, etherToWei, setCallData }) {

  const toast = useToast()
  const [switchLoading, setSwitchLoading] = useState(false)
  const [contriLoading, setContriLoading] = useState(false)
  const [targetLoading, setTargetLoading] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const [contribution, setContribution] = useState('')
  const errorState = Number(contribution) <= 0

  const [newTarget, setNewTarget] = useState('')
  const errorNewTarget = (Number(newTarget) <= 0) || (Number(newTarget) <= Number(campaign.balance))

  const handleContribution = () => {
    setContriLoading(true)
    const signedContract = campaign.contract.connect(signer)
    signedContract.contribute({value: etherToWei(contribution)}).then(res => {
      toast({
        title: 'Please Wait',
        description: "While the action gets confirmed on the chain",
        status: 'info',
        duration: 9000,
        isClosable: true,
      })
      res.wait().then(receipt => {
        setContriLoading(false)
        setCallData(receipt)
        toast({
          title: 'Contribution Added.',
          description: "Your contribution has been added to the campaign.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }).catch(err => {
        setContriLoading(false)
        toast({
            title: 'Something went wrong',
            description: "Please try again in some time",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
    })
    }).catch(err => {
      setContriLoading(false)
      toast({
          title: 'Something went wrong',
          description: "Please try again in some time",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
  })
  }

  const handleSwitchStatus = () => {
    setSwitchLoading(true)
    const signedContract = campaign.contract.connect(signer)
    signedContract.switchCampaignActiveStatus().then(res => {
      toast({
        title: 'Please Wait',
        description: "While the action gets confirmed on the chain",
        status: 'info',
        duration: 9000,
        isClosable: true,
      })
      res.wait().then(receipt => {
        setSwitchLoading(false)
        onClose()
        setCallData(receipt)
        toast({
          title: `Campaign ${campaign.active ? 'deactivated' : 'activated'}.`,
          description: `We've ${campaign.active ? 'deactivated' : 'activated'} your campaign for you.`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }).catch(err => {
        setSwitchLoading(false)
        toast({
            title: 'Something went wrong',
            description: "Please try again in some time",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
    })
    }).catch(err => {
      setSwitchLoading(false)
      toast({
          title: 'Something went wrong',
          description: "Please try again in some time",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
  })
  }

  function handleModifyTarget(){
    setTargetLoading(true)
    const signedContract = campaign.contract.connect(signer)
    signedContract.modifyTarget(etherToWei(newTarget)).then(res => {
      toast({
        title: 'Please Wait',
        description: "While the action gets confirmed on the chain",
        status: 'info',
        duration: 9000,
        isClosable: true,
      })
      res.wait().then(receipt => {
        setTargetLoading(false)
        setNewTarget('')
        setCallData(receipt)
        toast({
          title: 'Target Modified.',
          description: "Your campaign target has updated",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }).catch(err => {
        setTargetLoading(false)
        setNewTarget('')
        toast({
            title: 'Something went wrong',
            description: "Please try again in some time",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
    })
    }).catch(err => {
      setTargetLoading(false)
      setNewTarget('')
      toast({
          title: 'Something went wrong',
          description: "Please try again in some time",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
  })
  }

  const data = {
    minContri: {
      dis: 'Minimum Contribution',
      val: `${campaign.minContri} ETH `+`($${campaign.minContri * 1661}`.substring(0, 7) +`)`,
      icon: (<BiDonateHeart color='#ff634780' fontSize='300%' style={{ marginRight: '5%' }} />)
    },
    add: {
      dis: 'Wallet Address of Campaign Creator',
      val: campaign.manager,
      icon: (<FaAddressCard color='#ff634780' fontSize='300%' style={{ marginRight: '5%' }} />)
    },
    req: {
      dis: 'Number of Requests',
      val: campaign.reqLength,
      icon: (<BsFillChatSquareQuoteFill color='#ff634780' fontSize='300%' style={{ marginRight: '5%' }} />)
    },
    app: {
      dis: 'Number of Approvers',
      val: campaign.appCount,
      icon: (<BsFillPeopleFill color='#ff634780' fontSize='300%' style={{ marginRight: '5%' }} />)
    },
  }

  return (
    <div className='campaign-page-container aniPages' >
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              { campaign.active ? 'Deactivate Campaign' : 'Activate Campaign' }
            </AlertDialogHeader>

            {
              campaign.active
              ?
              (
                <AlertDialogBody>
                  Are you sure? Your campaign will move to the archives after this action.
                </AlertDialogBody>
              )
              :
              (
                <AlertDialogBody>
                  Are you sure? Your campaign will move to active campaigns after this action.
                </AlertDialogBody>
              )
            }

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button isLoading={switchLoading} colorScheme={ campaign.active ? 'red' : 'green' } onClick={handleSwitchStatus} ml={3}>
                { campaign.active ? 'Deactivate' : 'Activate' }
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <div className='campaign-page-left' >
        {
          !campaign.active
          ?
          (
            <div className='campaign-archived-card' >
              <div className='inner-campaign-archived-card' style={ campaign.manager.toUpperCase() === currentAdd.toUpperCase() ? { padding:'5% 25%' } : { padding:'5% 35%' }} >
                <Heading>ARCHIVED</Heading>
                {
                  campaign.manager.toUpperCase() === currentAdd.toUpperCase()
                  ?
                  (
                    <Text>You can always activate your campaign again</Text>
                  )
                  :
                  null
                }
              </div>
            </div>
          )
          :
          null
        }
        <div className='campaign-heading' >
          <Heading marginBottom='2%' >{campaign.title}</Heading>
          <Text>{campaign.desc}</Text>
        </div>
          {
            Object.keys(data).map((item, key) => (
              <Card style={{ margin: '1% 0%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection:'inherit' }} key={key} >
                <CardBody>
                  <Text>{data[item].dis}</Text>
                  <Text fontWeight='bold' >{data[item].val}</Text>
                </CardBody>
                {
                  data[item].icon
                }
              </Card>
            ))
          }
          <Card style={{ margin: '1% 0%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection:'inherit' }} >
            <CardBody>
              <Text>Campaign Address</Text>
              <Text fontWeight='bold' >{campaign.address}</Text>
              <Text>You can paste the above campaign contract address on <Link color='teal.500' target='_blank' href='https://sepolia.etherscan.io/'>Etherscan (Sepolia)</Link> for more info.</Text>
            </CardBody>
          </Card>
      </div>
      <div className='campaign-page-right' >
        <Card style={{ marginBottom: '3%' }} >
          <CardBody>
            <Text fontSize='md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
              Campaign Balance
              {
                campaign.balance >= campaign.targetAmt
                ?
                (
                  <Popover trigger='hover' defaultIsOpen={true} >
                    <PopoverTrigger>
                      <Button backgroundColor='white' >
                        <AiFillInfoCircle fontSize={'20px'} color='red' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent bg='#ff476c' color='white'>
                      <PopoverHeader fontWeight='bold'>Target Achieved!!</PopoverHeader>
                      <PopoverArrow bg='pink.500' />
                      <PopoverCloseButton bg='#d62e5d' />
                      <PopoverBody>
                        <Heading fontSize='md' >CONGRATULATIONS!!</Heading>
                        <Text>You can now either modify your campaign target OR deactivate your campaign.</Text>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover> 
                )
                :
                null
              }
            </Text>
            <Text fontSize='xl' fontWeight='bold' display='flex' >{campaign.balance} ETH <Text color='#ff634791' margin='0% 2%' >{`($${campaign.balance* 1661}`.substring(0, 7) +`)`}</Text> </Text>
            <Text display='flex' >target of {campaign.targetAmt} ETH <Text color='#00000082' margin='0% 2%' >{`($${campaign.targetAmt * 1661}`.substring(0, 7) +`)`}</Text></Text>
            <Progress value={(campaign.balance / campaign.targetAmt) * 100} size='xs' colorScheme='orange' marginTop='2%' />
          </CardBody>
        </Card>
        {
          campaign.active
          ?
          contriLoading
          ?
          (
            <Card style={{ backgroundColor: '#effbed', marginBottom: '3%' }} >
              <CardBody>
                <Heading color='#29da2e' marginBottom='2%' >Contribute Now!</Heading>
                <InputGroup>
                  <Input type='number' placeholder={campaign.minContri} onChange={(e) => {setContribution(e.target.value)}} />
                  <InputRightAddon children='ETH' backgroundColor='#29da2e' color='white' />
                </InputGroup>
                <Button isLoading={contriLoading} style={{ width: '100%', marginTop: '5%' }} colorScheme='green' backgroundColor={'#29da2e'} leftIcon={<BiDonateHeart />} >Contribute</Button>
              </CardBody>
            </Card>
          )
          :
          (
            <Card style={{ backgroundColor: '#effbed', marginBottom: '3%' }} >
              <CardBody>
                <Heading color='#29da2e' marginBottom='2%' >Contribute Now!</Heading>
                <InputGroup>
                  <Input type='number' placeholder={campaign.minContri} onChange={(e) => {setContribution(e.target.value)}} />
                  <InputRightAddon children='ETH' backgroundColor='#29da2e' color='white' />
                </InputGroup>
                {
                  campaign.balance >= campaign.targetAmt
                  ?
                  (
                    <Text color = 'green' fontWeight = 'bold' textAlign='center' > You can't currently donate as the target is reached.</Text>
                  )
                  :
                  (
                    <Button isActive={errorState} onClick={() => {if(!errorState)handleContribution()}} style={{ width: '100%', marginTop: '5%' }} colorScheme='green' backgroundColor={'#29da2e'} leftIcon={<BiDonateHeart />} >Contribute</Button>
                  )
                }
              </CardBody>
            </Card>
          )
          :
          null
        }
        <Card style={{ marginBottom: '3%' }} >
          <CardBody>
          <Box
              onClick={() => {
                setPageState('viewRequest')
                setPState("campaign")
              }}
              width='100%'
              as='button'
              p={4}
              color='white'
              fontWeight='bold'
              borderRadius='md'
              bgGradient='linear(to-r, red.500, yellow.500)'
              _hover={{
                bgGradient: 'linear(to-r, teal.500, green.500)',
              }}
              marginBottom='2%'
            >
              View Withdrawal Requests
            </Box>
            <Text> You can see where these funds are being used & if you have contribute you can also approve Withdrawal Requests.</Text>
          </CardBody>
        </Card>
        {
          (campaign.manager.toUpperCase() === currentAdd.toUpperCase()) && campaign.active && (Number(campaign.balance) > 0)
          ?
          (
            <Card style={{ marginBottom: '3%' }} >
              <CardBody>
              <Box
                  onClick={() => {
                    setPageState('createRequest')
                  }}
                  width='100%'
                  as='button'
                  p={4}
                  color='white'
                  fontWeight='bold'
                  borderRadius='md'
                  bgGradient='linear(to-r, red.500, yellow.500)'
                  _hover={{
                    bgGradient: 'linear(to-r, teal.500, green.500)',
                  }}
                  marginBottom='2%'
                >
                  Create Withdrawal Requests
                </Box>
                <Text> Hey {currentAdd.substring(0,5)+'...'+currentAdd.substring(currentAdd.length-4)} create a Withdarwal Request, take your project to new heights.</Text>
              </CardBody>
            </Card>
          )
          :
          null
        }
        {
          (campaign.manager.toUpperCase() === currentAdd.toUpperCase()) && campaign.active  && (campaign.balance >= campaign.targetAmt)
          ?
          targetLoading
          ?
          (
            <Card style={{ marginBottom: '3%' }} >
              <CardBody>
                <Button isLoading={true} colorScheme='green' width='100%' padding='7%' marginBottom='2%' ></Button>
                <Text fontWeight='bold' color='red' > New target must be greater than current campaign balance.</Text>
              </CardBody>
            </Card>
          )
          :
          (
            <Card style={{ marginBottom: '3%' }} >
              <CardBody>
              <InputGroup>
                <Input type='number' placeholder={`${Number(campaign.balance) + 0.1}`.substring(0, 6)} onChange={(e) => {setNewTarget(e.target.value)}} />
                <InputRightAddon children='ETH' backgroundColor='#2e49d6' color='white' />
              </InputGroup>
              <Text> Modify your campaign target according to your needs.</Text>
              <Box
                  onClick={() => {if(!errorNewTarget)handleModifyTarget()}}
                  width='100%'
                  as='button'
                  p={4}
                  color='white'
                  fontWeight='bold'
                  borderRadius='md'
                  bgGradient={errorNewTarget ? 'linear(to-r, #4e4e4e, #555555)' : 'linear(to-r, #c73ee5, #2e49d6)'}
                  _hover={errorNewTarget ? null :{
                    bgGradient: 'linear(to-r, #922ea7, #203396)',
                  }}
                  marginBottom='2%'
                  marginTop='5%'
                >
                  Modify Target
                </Box>
                <Text fontWeight='bold' color='red' > New target must be greater than current campaign balance.</Text>
              </CardBody>
            </Card>
          )
          :
          null
        }
        {
          campaign.manager.toUpperCase() === currentAdd.toUpperCase()
          ?
            switchLoading
            ?
            (
              <Card style={{ marginBottom: '3%' }} >
                <CardBody>
                  <Button isLoading={true} colorScheme={campaign.active ? 'red' : 'green'} width='100%' padding='7%' marginBottom='2%' ></Button>
                  <Text> Hey {currentAdd.substring(0,5)+'...'+currentAdd.substring(currentAdd.length-4)} want to {campaign.active ? 'deactivate' : 'activate'} your campaign.</Text>
                </CardBody>
              </Card>
            )
            :
            (
              <Card style={{ marginBottom: '3%' }} >
                <CardBody>
                  <Box
                    onClick={onOpen}
                    width='100%'
                    as='button'
                    p={4}
                    color='white'
                    fontWeight='bold'
                    borderRadius='md'
                    bgGradient={campaign.active ? 'linear(to-r, red.500, red.500)' : 'linear(to-r, #3ee553, #3ec8e5)'}
                    _hover={campaign.active ? {
                      bgGradient: 'linear(to-r, #852525, red.500)',
                    } : {
                      bgGradient: 'linear(to-r, #32ba43, #34aec7)'
                    }}
                    marginBottom='2%'
                  >
                    {campaign.active ? 'Deactivate' : 'Activate'}
                  </Box>
                  <Text> Hey {currentAdd.substring(0,5)+'...'+currentAdd.substring(currentAdd.length-4)} want to {campaign.active ? 'deactivate' : 'activate'} your campaign.</Text>
                </CardBody>
              </Card>
            )
          :
          null
        }
      </div>
    </div>
  )
}

export default CampaignPage