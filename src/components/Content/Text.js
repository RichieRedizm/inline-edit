import CircularProgress from '@material-ui/core/CircularProgress'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckIcon from '@material-ui/icons/Check'
import { Alert } from '@material-ui/lab'
import React, { Fragment, useState } from 'react'

const Text = () => {
  const [status, setStatus] = useState('')
  const [inputtext, setInputtext] = useState('Hello World')

  // handles key characters enetered to input and sets as state
  const handleOnChange = (e) => setInputtext(e.target.value)

  // handles key down events.
  // If key pressed is 'enter' call checkText function
  const handleOnKeyDown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault()
      checkText()
    }
  }

  // handles leaving the input field and calls checkText function
  const handleOnBlur = (e) => {
    checkText()
  }

  const checkText = async () => {
    // set status to show loading
    setStatus('loading')

    if (isTextValid()) {
      // set state to show success alert
      setStatus('success')

      // hide the status alert after 5 seconds
      setTimeout(() => setStatus(''), 5000)

      // use browser localStorage to save validated text
      asyncLocalStorage
        .setItem('inline-edit', inputtext)
        .then(function () {
          return asyncLocalStorage.getItem('inline-edit')
        })
        .then(function (value) {
          console.log('LocalStorage text was updated to: ', value)
        })
    } else {
      // set status to show error alert
      setStatus('error')

      // hide the status alert after 5 seconds and reset the text
      setTimeout(() => {
        setStatus('')
        setInputtext('Hello World')
      }, 5000)
    }
  }

  // text valid condition
  const isTextValid = () => {
    return inputtext === 'Thanks for all the fish'
  }

  // save the updated text to local storage
  const asyncLocalStorage = {
    setItem: (key, value) =>
      Promise.resolve().then(() => localStorage.setItem(key, value)),
    getItem: (key) => Promise.resolve().then(() => localStorage.getItem(key)),
  }

  // return icon related to the status
  const loadIcon = (status) => {
    switch (status) {
      case 'loading':
        return <CircularProgress />
      case 'success':
        return <CheckIcon style={{ color: '#7CFC00', fontSize: '2rem' }} />
      case 'error':
        return <CancelIcon color={'error'} style={{ fontSize: '2rem' }} />
      default:
        return null
    }
  }

  return (
    <Fragment>
      <form className='form' onKeyDown={(e) => handleOnKeyDown(e)}>
        <input
          type='textarea'
          value={inputtext}
          placeholder={inputtext}
          onChange={(e) => handleOnChange(e)}
          onBlur={(e) => handleOnBlur(e)}
        />
        <div className='IconWrapper'>{loadIcon(status)}</div>
      </form>

      {status === 'error' && (
        <Alert severity={status}>
          <span>
            <strong>Ooops!</strong> Something has gone terribly wrong!
          </span>
        </Alert>
      )}
    </Fragment>
  )
}

export default Text
