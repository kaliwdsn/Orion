import React from 'react'
import { Input } from 'react-photonkit'
import { multihash as isMultiHash } from 'is-ipfs'

class Form extends React.Component {
  /**
   * This method will be called onChange of the input and it will validate and
   * update the StatsStore hash value, in this way we can then perform API calls
   * and get more info about it before adding it recursively.
   *
   * Note: the full validation will be performed using API calls.
   */
  _handelOnTextChange (event) {
    if (!this.props.statsStore) return
    this.props.statsStore.reset()

    const hash = event.target.value
    const isValid = isMultiHash(hash)

    if (isValid) {
      this.props.statsStore.hash = hash
      this.props.statsStore.isValid = isValid
      this.props.statsStore.check()
        .then(() => { this.forceUpdate() })
    }
  }

  /**
   * This method will be called when the user has done editing the Input and
   * wants to submit the form. This will prenvent the page refresh, but will
   * validate the input and then initialize the API calls.
   */
  _handelOnSubit (event) {
    event.preventDefault()
    // ToDo.
  }

  render () {
    return (
      <form onSubmit={this._handelOnSubit.bind(this)}>
        <Input
          label='Insert the Object Hash to import:'
          type='text'
          placeholder='Qm1A2B3C4D....'
          onChange={this._handelOnTextChange.bind(this)}
        />
      </form>
    )
  }
}

export default Form
