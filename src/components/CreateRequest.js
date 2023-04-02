import React, {useState} from 'react'
import { Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Heading, Text, InputGroup, InputRightAddon, Alert, AlertIcon, AlertTitle, AlertDescription, useToast } from '@chakra-ui/react'
import { MdArrowBack } from 'react-icons/md'
import { AiFillPlusCircle } from 'react-icons/ai'

function CreateRequest({ setPageState, campaign, signer, etherToWei, setCallData }) {

    const toast = useToast()
    const [loading, setLoading] = useState(false)

    const [input, setInput] = useState({
        reqDesc: null,
        amt: null,
        add: null
    })

    const errorReqDesc = input.reqDesc === ''
    const errorAmt = input.amt === ''
    const errorAdd = input.add === ''

    const [alertState, setAlertState] = useState(false)

    const handleCreateRequest = () => {
        setLoading(true)
        if(etherToWei(input.amt) <= 0){
            setAlertState(true)
            setLoading(false)
            return
        }
        setAlertState(false)

        const signedContract = campaign.contract.connect(signer)
        signedContract.createRequest(input.reqDesc, etherToWei(input.amt), input.add).then(res => {
            toast({
              title: 'Please Wait',
              description: "While the action gets confirmed on the chain",
              status: 'info',
              duration: 9000,
              isClosable: true,
            })
            res.wait().then(receipt => {
                setLoading(false)
              setCallData(receipt)
              setPageState('viewRequest')
              toast({
                title: 'Request Added.',
                description: "Your new request has been added to the campaign.",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            }).catch(err => {
                setLoading(false)
              toast({
                  title: 'Something went wrong',
                  description: "Please try again in some time",
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
          })
          }).catch(err => {
            setLoading(false)
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
        <div onClick={() => {
            setPageState("campaign")
        }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', width: '15%' }} >
            <MdArrowBack color='tomato'/>
            <Text color='tomato' fontWeight='bold'>Go Back</Text>
        </div>
        <Heading style={{ marginBottom: '5%' }} >Create a Withdrawal Request</Heading>

        <FormControl style={{ marginBottom: '3%' }} >
            <FormLabel>Request Description</FormLabel>
                <InputGroup>
                    <Input type='text' value={input.reqDesc} onChange={(e) => {
                        setInput({...input, reqDesc: e.target.value})
                    }} />
                </InputGroup>
                {!errorReqDesc ? (
                    <FormHelperText >
                    Describe your goal.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage >Description is required.</FormErrorMessage>
                )}
        </FormControl>
        <FormControl isInvalid={errorAmt} style={{ marginBottom: '3%' }} >
            <FormLabel>Amount in Ether</FormLabel>
                <InputGroup>
                    <Input type='number' value={input.amt} onChange={(e) => {
                        setInput({...input, amt: e.target.value})
                    }} />
                    <InputRightAddon children='ETH' />
                </InputGroup>
                {!errorAmt ? (
                    <FormHelperText >
                    This is the amount that you want to collect for this goal.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage >Minimum amount is required.</FormErrorMessage>
                )}
        </FormControl>
        <FormControl isInvalid={errorAdd} style={{ marginBottom: '3%' }} >
            <FormLabel>Recipient Ethereum Wallet Address</FormLabel>
                <InputGroup>
                    <Input type='text' value={input.add} onChange={(e) => {
                        setInput({...input, add: e.target.value})
                    }} />
                </InputGroup>
                {!errorAdd ? (
                    <FormHelperText >
                    This will be address to which the amount will be transfered.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage >Wallet Address is required.</FormErrorMessage>
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
            input.add === null || input.amt === null || input.reqDesc === null || errorAdd || errorAmt || errorReqDesc
            ?
            (
                <Button isLoading={loading} isActive={true} style={{ width: '100%', marginTop: '5%' }} colorScheme='orange' backgroundColor={'tomato'} leftIcon={<AiFillPlusCircle />} >Create</Button>
            )
            :
            (
                <Button isLoading={loading} isActive={false} onClick={handleCreateRequest} style={{ width: '100%', marginTop: '5%' }} colorScheme='orange' backgroundColor={'tomato'} leftIcon={<AiFillPlusCircle />} >Create</Button>
            )
        }
    </div>
  )
}

export default CreateRequest