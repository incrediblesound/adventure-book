import styled from 'styled-components'

const colors = {
  'light-green': '#90EE90',
  'dark-green': '#2ECC40',
  'light-blue': '#00BFFF',
  'dark-blue': '#0074D9',
  'light-gray': '#DDD',
  'dark-gray': '#999',
}

const btnSizes = {
  'medium': '5px 10px',
  'large': '5px 25px;',
}

export const Panel = styled.div`
  position: relative;
  display: flex;
  height: auto;
  margin: 15px 0px;
  box-shadow: 0px 0px 3px 0px #ddd;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 10px;
  flex-direction: ${ props => props.direction || 'row' }
`

export const Button = styled.button`
  width: auto;
  background-color: ${ props => props.active
    ? colors[`dark-${props.color}`]
    : colors[`light-${props.color}`]
  };
  &:hover {
    background-color: ${ props => colors[`dark-${props.color}`]};
    color: white;
  }
  margin: ${ props => props.space ? '5px' : '0px' } 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: ${ props => props.size ? btnSizes[props.size] : '5px' };
`

export const Label = styled.p`
  text-transform: uppercase;
  font-weight: 100;
  font-size: ${ props => props.size === 'large' ? '18px;' : '13px;'}
  color: #333;
`

export const Value = styled.span`
  font-weight: bold;
  text-transform: none;
`

export const HighlightLabel = Label.extend`
  color: #90EE99;
  font-weight: bold;
`

export const InlineHeader = styled.span`
  text-transform: uppercase;
  font-weight: 400;
  font-size: ${ props => props.size === 'large' ? '18px;' : '13px;'}
  color: #333;
`

export const Title = styled.input`
  font-size: 14px;
  width: 100%;
  height: 20px;
  border-radius: 6px;
  border: solid 1px #666;
  padding: 5px;
`

export const Story = styled.textarea`
  font-size: 14px;
  width: 100%;
  margin: 15px 0px;
  padding: 5px;
  border-radius: 6px;
  border: solid 1px #666;
`
