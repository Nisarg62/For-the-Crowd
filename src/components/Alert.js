import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Link
  } from '@chakra-ui/react'

function Alert({ metamask }) {

  return (
    <div>
      <AlertDialog
        motionPreset='slideInBottom'
        isOpen={!metamask}
        isCentered
        
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize='2xl' >No Metamask Detected</AlertDialogHeader>
          <AlertDialogBody>
            Please install MetaMask to continue. Get it here: <Link color='tomato' href='https://metamask.io/' target='_blank'>https://metamask.io/</Link>
          </AlertDialogBody>
          <AlertDialogFooter style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
            <img alt="" style={{ width: '40%' }} src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"></img>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Alert