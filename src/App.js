import { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios'
import { ethers } from 'ethers';
import { ChakraProvider, Divider, Heading, useToast } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Stats from './components/Stats';
import CardsContainer from './components/CardsContainer';
import Working from './components/Working';
import Footer from './components/Footer';
import CreateCampaign from './components/CreateCampaign';
import CampaignPage from './components/CampaignPage';
import Contact from './components/Contact';
import MyCampaigns from './components/MyCampaigns';
import ViewRequests from './components/ViewRequests';
import Alert from './components/Alert';
import { TbLayersLinked } from 'react-icons/tb'
import { BiShowAlt } from 'react-icons/bi'
import './App.css';
import CreateRequest from './components/CreateRequest';
import ViewRequest from './components/ViewRequest';

function App() {

  const [callData, setCallData] = useState()
  const [typewriter, setTypeWriter] = useState(false)
  const [address, setAddress] = useState('')
  const [signer, setSigner] = useState()
  const [loading, setLoading] = useState(true)
  const [pageState, setPageState] = useState('home')
  const [pState, setPState] = useState('')
  const [totalEther, setTotalEther] = useState(0)
  const [ethToUsd, setEthToUsd] = useState([]);
  const [campaignsLoading, setCampaignsLoading] = useState(true)
  const [campaignIndex, setCampaignIndex] = useState(0)
  const [metamask, setMetamask] = useState(true)

  const scrollTop = useRef()

  const abi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "minimum",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "target",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "url",
          "type": "string"
        }
      ],
      "name": "createCampaign",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "deployedCampaigns",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDeployedCampaigns",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  const campaignAbi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "minimum",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "target",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "url",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "approveRequest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "approvers",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "approversCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "campaignActiveStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "contribute",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "recipient",
          "type": "address"
        }
      ],
      "name": "createRequest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "finalizeRequest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getApprovedSpecificRequest",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getRequestsCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSummary",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "manager",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "minimumContribution",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newTarget",
          "type": "uint256"
        }
      ],
      "name": "modifyTarget",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pool",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "requests",
      "outputs": [
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "complete",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "approvalCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "switchCampaignActiveStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  const [campaignFactory, setCampaignFactory] = useState()

  const [allCampaigns, setAllCampaigns] = useState([])

  const [managerCampaigns, setManagerCampaigns] = useState([])

  const [donatedCampaigns, setDonatedCampaigns] = useState([])

  const toast = useToast()

  const getAllCampaignsData = () => {

    if(window.ethereum){
      
      setMetamask(true)

      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      
      const contract = new ethers.Contract('0xb2a95452beb0b349315667aa9a5ea37ac5b82ea3', abi, provider)
      
      setCampaignFactory(contract)
      
      provider.send("eth_requestAccounts", [])
      .then((signerRes)=>{
        const signer = provider.getSigner();
        setSigner(signer);
        setAddress(signerRes[0]);
        setLoading(false)
        
        
        contract.getDeployedCampaigns().then((depCampaigns)=>{
          
          let campaignsEther = 0;
          
          depCampaigns.map((add, index) => {
            const campaignContract = new ethers.Contract(add, campaignAbi, provider)
            
            campaignContract.getSummary().then((res) => {
              let approver;
              
              campaignContract.approvers(signerRes[0]).then(approval => {
                approver = approval
                
                let data = {
                  minContri: weiToEther(res[0]),
                  balance: weiToEther(res[1]),
                  reqLength: res[2].toNumber(),
                  appCount: res[3].toNumber(),
                  manager: res[4],
                  title: res[5],
                  desc: res[6],
                  url: res[7],
                  targetAmt: weiToEther(res[8]),
                  address: add,
                  contract: campaignContract,
                  index: index,
                  active: res[9],
                  approver
                }
                
                campaignsEther += Number(data.balance)
                
                if(!allCampaigns.find(camp => camp.address === data.address)){
                  allCampaigns.push(data)
                }
                
                allCampaigns.map(camp => {
                  if(camp.address === data.address){
                    camp.active = data.active
                    camp.balance = data.balance
                    camp.targetAmt = data.targetAmt
                    camp.reqLength = data.reqLength
                    camp.appCount = data.appCount
                  }
                })
                
                if(!managerCampaigns.find(camp => camp.address === data.address) && (data.manager.toUpperCase() === signerRes[0].toUpperCase())){
                  managerCampaigns.push(data)
                }
                
                if(!donatedCampaigns.find(camp => camp.address === data.address) && approver){
                  donatedCampaigns.push(data)
                }
                
                setTotalEther(campaignsEther)
                setAllCampaigns([...allCampaigns])
                setManagerCampaigns([...managerCampaigns])
                setDonatedCampaigns([...donatedCampaigns])
              })
              .catch(err=>{
                toast({
                  title: 'Something went wrong',
                  description: "Please try again in some time",
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
                
              })
            })
            .catch(err => {
              toast({
                title: 'Something went wrong',
                description: "Please try again in some time",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              
            })
          })
          
          setCampaignsLoading(false)
  
        })
        .catch(err => {
          toast({
            title: 'Something went wrong',
            description: "Please try again in some time",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
  
        })

      })
      .catch(err=>{
        toast({
          title: 'Something went wrong',
          description: "Please try again in some time",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      });
    }
    else{
      setMetamask(false)
    }
  }

  useEffect(() => {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR&api_key=4d2fb25f67f0c398d8fcdbdb464046fbb940e7f5101d8f7ec9f62e46b08b72fc')
      .then(response => {
        setEthToUsd(response.data.ETH.USD);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    getAllCampaignsData()
  }, [callData]);
  
  useEffect(() => {
    scrollTop.current.scrollTo(0, 0)
  }, [pageState])
  

  const etherToWei = amount => {
    return ethers.utils.parseUnits(amount, "ether")
  }

  const weiToEther = amount => {
    return ethers.utils.formatEther(amount)
  }
  

  return (
    <ChakraProvider>
      <Alert metamask={metamask} />
      <div className={pageState === 'home' ? 'background' : 'background-two'} ></div>
      <div className='scroll-container' ref={scrollTop} >
        <Navbar address={address} loading={loading} metamask={metamask} pageState={pageState} setPageState={setPageState}
        setTypeWriter = {setTypeWriter} />
        <Divider/>
        {
          pageState==='createCampaign'
          ?
          (
            <CreateCampaign setPageState={setPageState} campaignFactory={campaignFactory} signer={signer} etherToWei={etherToWei} setCallData={setCallData} />
          )
          :
          null
        }
        {
          pageState==='home'
          ?
          (
            <>
            <div className='design-header' >
              <Header setPageState={setPageState} callData = {typewriter} setTypeWriter={setTypeWriter}/>
              <div className='design' ></div>
            </div>
            <Stats allCampaigns={allCampaigns} totalEther={totalEther} setTypeWriter={setTypeWriter} typewriter= {typewriter}/>
            <Heading fontSize='4xl' color={'white'} style={{ width:'23%', margin: '5%', marginBottom: '2%', marginTop: '8%' , display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} ><TbLayersLinked/> Active Campaigns</Heading>
            <CardsContainer loading={campaignsLoading} setPageState={setPageState} allCampaigns={allCampaigns} setCampaignIndex={setCampaignIndex} setTypeWriter={setTypeWriter} ethToUsd={ethToUsd}/>
            <Heading id='howitworks' fontSize='4xl' color={'white'} style={{ width:'21%', margin: '5%', marginBottom: '2%', marginTop: '8%' , display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} ><BiShowAlt/> How FTC Works</Heading>
            <Working/>
            </>
          )
          :
          null
        }
        {
          pageState === 'campaign'
          ?
          (
            <CampaignPage setPageState={setPageState} setPState = {setPState} campaign={allCampaigns.find(camp => camp.index === campaignIndex)} currentAdd={address} signer={signer} etherToWei={etherToWei} setCallData={setCallData} 
            ethToUsd={ethToUsd} />
          )
          :
          null
        }
        {
          pageState === 'createRequest'
          ?
          (
            <CreateRequest setPageState={setPageState} campaign={allCampaigns.find(camp => camp.index === campaignIndex)} signer={signer} etherToWei={etherToWei} setCallData={setCallData} />
          )
          :
          null
        }
        {
          pageState === 'viewRequest'
          ?
          (
            <ViewRequest setPageState={setPageState} pState = {pState} campaign={allCampaigns.find(camp => camp.index === campaignIndex)} currentAdd={address} signer={signer} weiToEther={weiToEther} setCallData={setCallData} allCampaigns={allCampaigns} ethToUsd={ethToUsd} />
          )
          :
          null
        }
        {
          pageState === 'contact'
          ?
          (
            <Contact setPageState={setPageState} />
          )
          :
          null
        }
        {
          pageState === 'myCampaigns'
          ?
          (
            <MyCampaigns setPageState={setPageState} managerCampaigns={managerCampaigns} setCampaignIndex={setCampaignIndex} 
            ethToUsd={ethToUsd}/>
          )
          :
          null
        }
        {
          pageState === 'viewRequests'
          ?
          (
            <ViewRequests setPageState={setPageState} setPState={setPState} donatedCampaigns={donatedCampaigns} setCampaignIndex={setCampaignIndex} ethToUsd={ethToUsd} />
          )
          :
          null
        }
        <Footer setPageState={setPageState} />
      </div>
    </ChakraProvider>
  );
}

export default App;
