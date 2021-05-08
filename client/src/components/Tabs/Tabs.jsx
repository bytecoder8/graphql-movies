import React, { useState, Children } from 'react'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const TabPanel = ({ value, index, children }) => {
  return(
    <div hidden={ value !== index }>
      { children }
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.any.isRequired,
  index: PropTypes.any.isRequired
}

const SimpleTabs = ({ children, labels }) => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => setValue(newValue)

  const panels = Children.map(children, (child, index) => (
    <TabPanel value={value} index={index}>{ child }</TabPanel>
  ))

  return(
    <>
      <Tabs value={ value } onChange={ handleChange }>
        { labels.map( label => (
          <Tab key={ label } label={ label } />
        )) }
      </Tabs>
      { panels }
    </>
  )
}

SimpleTabs.propTypes = {
  children: PropTypes.node.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default SimpleTabs
