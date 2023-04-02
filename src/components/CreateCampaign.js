import React, {useState} from 'react'
import { Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Heading, Text, InputGroup, InputRightAddon, InputLeftAddon, Alert, AlertIcon, AlertTitle, AlertDescription, useToast } from '@chakra-ui/react'
import { MdArrowBack } from 'react-icons/md'
import { AiFillPlusCircle } from 'react-icons/ai'

function CreateCampaign({ setPageState, campaignFactory, signer, etherToWei, setCallData }) {

    const [loading, setloading] = useState(false)
    const toast = useToast()
 
    const handleHome = () => {
        setPageState('home')
    }
    
    const [input, setInput] = useState({
        minContri: null,
        name: null,
        desc: null,
        url: null,
        targetAmt: null
    }) 
    
    const errorMinContri = input.minContri === ''
    const errorName = input.name === ''
    const errorDesc = input.desc === ''
    const errorUrl = input.url === ''
    const errorTarget = input.targetAmt === ''
    const errorJpgExtension = input.url?.substring(input.url.length - 4, input.url.length) !== '.jpg'
    const errorPngExtension = input.url?.substring(input.url.length - 4, input.url.length) !== '.png'
    const errorJpegExtension = input.url?.substring(input.url.length - 5, input.url.length) !== '.jpeg'
    const errorWebpExtension = input.url?.substring(input.url.length - 5, input.url.length) !== '.webp'
    const errorExtension = (errorJpegExtension === false || errorJpgExtension === false || errorPngExtension === false || errorWebpExtension === false) ? false : true
    
    const [alertState, setAlertState] = useState(false)
    const [extAlertState, setExtAlertState] = useState(false)
    
    const handleCreate = () => {
        setAlertState(false)
        setExtAlertState(false)
        setloading(true)
        if((etherToWei(input.minContri) <= 0) || (etherToWei(input.targetAmt) <= 0)){
            setAlertState(true)
            setloading(false)
            return
        }
        if(errorExtension){
            setExtAlertState(true)
            setloading(false)
            return
        }
        setAlertState(false)

        const campaignFactorySigner = campaignFactory.connect(signer)
        campaignFactorySigner.createCampaign(etherToWei(input.minContri), input.name, input.desc, etherToWei(input.targetAmt), input.url).then(res => {
            toast({
                title: 'Please Wait',
                description: "While the action gets confirmed on the chain",
                status: 'info',
                duration: 9000,
                isClosable: true,
              })
            res.wait().then(receipt => {
                setloading(false)
                handleHome()
                setCallData(receipt)
                toast({
                    title: 'Campaign created.',
                    description: "We've created your campaign for you.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
            })
            .catch(err => {
                setloading(false)
                toast({
                    title: 'Something went wrong',
                    description: "Please try again in some time",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
            })
        }).catch(err => {
            setloading(false)
            toast({
                title: 'Something went wrong',
                description: "Please try again in some time",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        })
    }

  return (
    <div className='form-container' >
        <div onClick={handleHome} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', width: '15%' }} >
            <MdArrowBack color='tomato'/>
            <Text color='tomato' fontWeight='bold'>Go Back</Text>
        </div>
        <Heading style={{ marginBottom: '5%' }} >Create a New Campaign</Heading>

        <FormControl isInvalid={errorName} style={{ marginBottom: '3%' }} >
            <FormLabel>Campaign Name</FormLabel>
                <InputGroup>
                    <Input type='text' value={input.name} onChange={(e) => {
                        setInput({...input, name: e.target.value})
                    }} />
                </InputGroup>
                {!errorName ? (
                    <FormHelperText >
                    Give a name that best describes your campaign.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage >Name is required.</FormErrorMessage>
                )}
        </FormControl>
        <FormControl isInvalid={errorDesc} style={{ marginBottom: '3%' }} >
            <FormLabel>Campaign Description</FormLabel>
                <InputGroup>
                    <Input type='text' value={input.desc} onChange={(e) => {
                        setInput({...input, desc: e.target.value})
                    }} />
                </InputGroup>
                {!errorDesc ? (
                    <FormHelperText >
                    Give a brief explaination of your campaign.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage >Description is required.</FormErrorMessage>
                )}
        </FormControl>
        <FormControl isInvalid={errorUrl} style={{ marginBottom: '3%' }} >
            <FormLabel>Image URL</FormLabel>
                <InputGroup>
                    <InputLeftAddon children='https://' />
                    <Input type='url' value={input.url} onChange={(e) => {
                        setInput({...input, url: e.target.value})
                    }} />
                </InputGroup>
                {!errorUrl ? (
                    <FormHelperText >
                    An image that describes your campaign. (FORMATS ACCEPTED : .jpg, .png, .jpeg, .webp)
                    </FormHelperText>
                ) : (
                    <FormErrorMessage >Image URL is required. (FORMATS ACCEPTED : .jpg, .png, .jpeg)</FormErrorMessage>
                )}
        </FormControl>
        <FormControl style={{ marginBottom: '3%' }} >
            <FormLabel>Minimum Contribution Amount</FormLabel>
                <InputGroup>
                    <Input type='number' value={input.minContri} onChange={(e) => {
                        setInput({...input, minContri: e.target.value})
                    }} />
                    <InputRightAddon children='ETH' />
                </InputGroup>
                {!errorMinContri ? (
                    <FormHelperText >
                    This is the minimum amount that people will donate to be a part of your campaign.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage >Minimum amount is required.</FormErrorMessage>
                )}
        </FormControl>
        <FormControl isInvalid={errorTarget} style={{ marginBottom: '3%' }} >
            <FormLabel>Target Amount</FormLabel>
                <InputGroup>
                    <Input type='number' value={input.targetAmt} onChange={(e) => {
                        setInput({...input, targetAmt: e.target.value})
                    }} />
                    <InputRightAddon children='ETH' />
                </InputGroup>
                {!errorTarget ? (
                    <FormHelperText >
                    The amount that you want to gather.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage >Target amount is required.</FormErrorMessage>
                )}
        </FormControl>
        {
            alertState
            ?
            (
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Amount is invalid!</AlertTitle>
                    <AlertDescription>Please provide an amount greater than zero.</AlertDescription>
                </Alert>
            )
            :
            null
        }
        {
            extAlertState
            ?
            (
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>URL Invalid!</AlertTitle>
                    <AlertDescription>Accepted URL extensions (.jpg, .png, .jpeg or .webp).</AlertDescription>
                </Alert>
            )
            :
            null
        }
        {
            input.desc === null || input.minContri === null || input.name === null || input.targetAmt === null || input.url === null || errorDesc || errorMinContri || errorName || errorTarget || errorUrl
            ?
            (
                <Button isLoading={loading} isActive={true} style={{ width: '100%', marginTop: '5%' }} colorScheme='orange' backgroundColor={'tomato'} leftIcon={<AiFillPlusCircle />} >Create</Button>
            )
            :
            (
                <Button isLoading={loading} isActive={false} onClick={handleCreate} style={{ width: '100%', marginTop: '5%' }} colorScheme='orange' backgroundColor={'tomato'} leftIcon={<AiFillPlusCircle />} >Create</Button>
            )
        }
    </div>
  )
}

export default CreateCampaign