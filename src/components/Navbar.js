import React from 'react'
import { Button, Heading } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider
} from '@chakra-ui/react'
import { FaEthereum } from 'react-icons/fa'
import { AiOutlineAppstoreAdd, AiOutlineInfoCircle, AiOutlineHome } from 'react-icons/ai'
import { BsChevronDown, BsFillChatSquareQuoteFill } from 'react-icons/bs'
import { MdCampaign } from 'react-icons/md'

function Navbar({ address, loading, setPageState, pageState, metamask, setTypeWriter }) {

  const handleCreateCampaign = () => {
    setTypeWriter(true)
    setPageState('createCampaign')
  }

  const handleHome = () => {
    setPageState('home')
  }

  const handleScroll = () => {
    const element = document.getElementById('howitworks')
    if(element){
      element.scrollIntoView({behavior: 'smooth'})
    }
  }

  const handleMyCampaign = () => {
    setTypeWriter(true)
    setPageState('myCampaigns')
  }

  const handleViewRequests = () => {
    setTypeWriter(true)
    setPageState('viewRequests')
  }

  return (
    <div className='navbar'>
        <div>
            <Heading onClick={() => setPageState('home')} fontSize='4xl' color='tomato' style={{ cursor: 'pointer' }} >For The Crowd</Heading>
        </div>
        <div className='nav-items' >
          <Button onClick={handleCreateCampaign} colorScheme='orange' borderColor={'red.100'} color={'tomato'} leftIcon={<AiOutlineAppstoreAdd />} variant='outline' minW='30%' >Create Campaign</Button>
            {
              pageState==='home'
              ?
              (
                <Button onClick={handleScroll} colorScheme='orange' borderColor={'red.100'} color={'tomato'} leftIcon={<AiOutlineInfoCircle />} variant='outline' minW='30%' >How It Works</Button>
              )
              :
              (
                <Button onClick={handleHome} colorScheme='orange' borderColor={'red.100'} color={'tomato'} leftIcon={<AiOutlineHome />} variant='outline' minW='34.7%' >Home</Button>
              )
            }
            {
              !metamask
              ?
              (
                <Button colorScheme='orange' backgroundColor={'tomato'} leftIcon={<FaEthereum />} minW='30%' >Connect Wallet</Button>
              )
              :
              (
                loading
                ?
                (
                  <Button isLoading colorScheme='orange' backgroundColor={'tomato'} minW='30%' ></Button>
                )
                :
                (
                  <Menu colorScheme='orange' >
                    {({ isOpen }) => (
                      <>
                        <MenuButton isActive={isOpen} as={Button} colorScheme='orange' backgroundColor={'tomato'} rightIcon={<BsChevronDown />}>
                          {address.substring(0,5)+'...'+address.substring(address.length-4)}
                        </MenuButton>
                        <MenuList fontWeight='bold'>
                          <MenuGroup title='Your Profile' color='tomato' fontSize='1.1rem' >
                            <MenuDivider />
                            <MenuItem onClick= {handleMyCampaign} ><MdCampaign color='tomato' style={{ marginRight: '5%', fontSize: '1.5rem' }} /> My Campaigns</MenuItem>
                            <MenuItem onClick={handleViewRequests} ><BsFillChatSquareQuoteFill color='tomato' style={{ marginRight: '5%', fontSize: '1.5rem' }} /> View Requests</MenuItem>
                          </MenuGroup>
                        </MenuList>
                      </>
                    )}
                  </Menu>
                )
              )
            }
        </div>
    </div>
  )
}

export default Navbar