// @flow

import React from 'react';

import { Modal, Button } from 'react-bootstrap'
import { confirmable } from 'react-confirm';

type ConfirmationProps = {
  okLabbel: ? String,
  cancelLabel: ? String,
  title: ? String,
  confirmation: ? String,
  show: ? Boolean,
  proceed: ? () => void,     // called when ok button is clicked.
  cancel: ? () => void,      // called when cancel button is clicked.
  dismiss: ? () => void,     // called when backdrop is clicked or escaped.
  enableEscape: ? Boolean,
}

class Confirmation extends React.Component {
  props: ConfirmationProps;

  render () {
    const {
      okLabbel = 'OK',
      cancelLabel = 'Cancel',
      title,
      confirmation,
      show,
      proceed,
      dismiss,
      cancel,
      enableEscape = true,
    } = this.props;

    return (
      <div className="static-modal">
        <Modal show={show} onHide={dismiss} backdrop={enableEscape ? true : 'static'} keyboard={enableEscape}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {confirmation}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={cancel}>{cancelLabel}</Button>
            <Button className='button-l' bsStyle="primary" onClick={proceed}>{okLabbel}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default confirmable(Confirmation);