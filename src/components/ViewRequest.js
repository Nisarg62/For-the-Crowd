import React, {useEffect, useState} from 'react'
import { Button, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, useToast, Skeleton } from '@chakra-ui/react'
import { MdArrowBack } from 'react-icons/md'

function ViewRequest({ setPageState, pState, campaign, currentAdd, signer, weiToEther, setCallData, allCampaigns }) {
    
    const toast = useToast()
    const [loading, setLoading] = useState(true)
    const [approveLoading, setApproveLoading] = useState(false)
    const [finalLoading, setFinalLoading] = useState(false)
    const [requestsData, setRequestsData] = useState([])

    useEffect(() => {

        const getRequestsData = async () => {
            try{

                const requestsData = []

                for(let i=0;i<campaign.reqLength;i++){
                    const res = await campaign.contract.requests(i)
                    const signedContract = campaign.contract.connect(signer)
                    const approved = await signedContract.getApprovedSpecificRequest(i)
        
                    requestsData.push({
                        desc: res[0],
                        amt: weiToEther(res[1]),
                        recipient: res[2],
                        completed: res[3],
                        approvalCount: res[4].toNumber(),
                        index: i,
                        approved
                    })
                }

                setRequestsData(requestsData)
            }
            catch(error){
                toast({
                    title: 'Something went wrong',
                    description: "Please try again in some time",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
                console.log(error)
            }
            finally{
                setLoading(false)
            }
        }

        getRequestsData()
    }, [loading, allCampaigns])

    function approveReq(id){
        setApproveLoading(true)
        const signedContract = campaign.contract.connect(signer)
        signedContract.approveRequest(id).then(res => {
            toast({
              title: 'Please Wait',
              description: "While the action gets confirmed on the chain",
              status: 'info',
              duration: 9000,
              isClosable: true,
            })
            res.wait().then(receipt => {
                setLoading(true)
                setApproveLoading(false)
              console.log(receipt)
              setCallData(receipt)
              setPageState('viewRequest')
              toast({
                title: 'Request Approved.',
                description: "Your request has been approved.",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            }).catch(err => {
                setLoading(true)
                setApproveLoading(false)
              toast({
                  title: 'Something went wrong',
                  description: "Please try again in some time",
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
              console.log(err)
          })
          }).catch(err => {
            setLoading(true)
            setApproveLoading(false)
            toast({
                title: 'Something went wrong',
                description: "Please try again in some time",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            console.log(err)
        })
    }

    function finalizeReq(id){
        setFinalLoading(true)
        const signedContract = campaign.contract.connect(signer)
        signedContract.finalizeRequest(id).then(res => {
            toast({
              title: 'Please Wait',
              description: "While the action gets confirmed on the chain",
              status: 'info',
              duration: 9000,
              isClosable: true,
            })
            res.wait().then(receipt => {
                setLoading(true)
                setFinalLoading(false)
              console.log(receipt)
              setCallData(receipt)
              setPageState('viewRequest')
              toast({
                title: 'Request Finalized.',
                description: "Your request has been finalized.",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            }).catch(err => {
                setLoading(true)
                setFinalLoading(false)
              toast({
                  title: 'Something went wrong',
                  description: "Please try again in some time",
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
              console.log(err)
          })
          }).catch(err => {
            setLoading(true)
            setFinalLoading(false)
            toast({
                title: 'Something went wrong',
                description: "Please try again in some time",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            console.log(err)
        })
    }
    

  return (
    <div className='requests-container' >
        <div onClick={() => {
            setPageState(pState)
        }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', width: '8%' }} >
            <MdArrowBack color='tomato'/>
            <Text color='tomato' fontWeight='bold'>Go Back</Text>
        </div>
        <Heading style={{ marginBottom: '2%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >Withdrawal Requests <Text color='#0000006e' >{campaign.balance} ETH {`($${campaign.balance * 1661}`.substring(0, 7) +`)`}</Text> </Heading>
        <Text fontSize='2xl' style={{ marginBottom: '5%' }} >{campaign.title}</Text>

        <TableContainer>
            <Table colorScheme='orange'>
                <TableCaption>Found {requestsData.length} Requests</TableCaption>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>DESCREPTION</Th>
                        <Th>AMOUNT</Th>
                        <Th>WALLET ADDRESS</Th>
                        <Th>APPROVAL COUNT</Th>
                        {
                            campaign.approver
                            ?
                            (
                                <Th>APPROVE</Th>
                            )
                            :
                            (
                                <Th>STATUS</Th>
                            )
                        }
                        {
                            campaign.manager.toUpperCase() === currentAdd.toUpperCase()
                            ?
                            (
                                <Th>FINALIZE</Th>
                            )
                            :
                            null
                        }
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        loading
                        ?
                        (
                        <Tr>
                            <Td>
                                <Skeleton>0</Skeleton>
                            </Td>
                            <Td>
                                <Skeleton>Temp Desc</Skeleton>
                            </Td>
                            <Td>
                                <Skeleton>0.00001 ETH</Skeleton>
                            </Td>
                            <Td>
                                <Skeleton>0x369...9527</Skeleton>
                            </Td>
                            <Td>
                                <Skeleton>0/1</Skeleton>
                            </Td>
                            <Td>
                                <Skeleton>
                                    <Button colorScheme='orange' variant='outline' >Approve</Button>
                                </Skeleton>
                            </Td>
                            <Td>
                                <Skeleton>
                                    <Button colorScheme='green' variant='outline' >Finalize</Button>
                                </Skeleton>
                            </Td>
                        </Tr>
                        )
                        :
                        requestsData.map((request, id) => (
                            <Tr key={id} backgroundColor={ request.completed ? '#e0dcbe' : '#fffad6' } >
                                <Td>{request.index}</Td>
                                <Td>{request.desc}</Td>
                                <Td>{`${request.amt} ETH`}</Td>
                                <Td>{request.recipient.substring(0,5)+'...'+request.recipient.substring(request.recipient.length-4)}</Td>
                                <Td>{request.approvalCount}/{campaign.appCount}</Td>
                                {
                                    campaign.approver
                                    ?
                                        request.completed
                                        ?
                                        (
                                            <Td>
                                                <Heading size='sm' color='green' >Finalized</Heading>
                                            </Td>
                                        )
                                        :
                                        request.approved
                                        ?
                                        (
                                            <Td>
                                                <Heading size='sm' color='orange' >Approved</Heading>
                                            </Td>
                                        )
                                        :
                                        (
                                            <Td>
                                                <Button isLoading={approveLoading} isActive={!campaign.active} onClick={() => approveReq(id)} colorScheme='orange' >Approve</Button>
                                            </Td>
                                        )
                                    :
                                    (
                                        request.completed
                                        ?
                                        (
                                            <Td>
                                                <Heading size='sm' color='green' >Finalized</Heading>
                                            </Td>
                                        )
                                        :
                                        (
                                            <Td>
                                                <Heading size='sm' color='orange' >Active</Heading>
                                            </Td>
                                        )
                                    )
                                }
                                {
                                    campaign.manager.toUpperCase() === currentAdd.toUpperCase()
                                    ?
                                    !request.completed && campaign.active
                                    ?
                                    (
                                        <Td>
                                            <Button isLoading={finalLoading} onClick={() => finalizeReq(id)} colorScheme='green' >Finalize</Button>
                                        </Td>
                                    )
                                    :
                                    (
                                        <Td>
                                            <Button isActive={true} colorScheme='green' >Finalize</Button>
                                        </Td>
                                    )
                                    :
                                    null
                                }
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    </div>
  )
}

export default ViewRequest