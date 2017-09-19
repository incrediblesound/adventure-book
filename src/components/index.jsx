import styled from 'styled-components'

export const colors = {
  'light-green': '#90EE90',
  'dark-green': '#2ECC40',
  'light-blue': '#7FDBFF',
  'dark-blue': '#0074D9',
  'light-gray': '#DDD',
  'dark-gray': '#999',
  'dark-yellow': '#FFDC00',
  'light-yellow': '#fcf8ab'
}

const btnSizes = {
  'medium': '5px 10px',
  'large': '5px 25px;',
}

export const Panel = styled.div`
  position: relative;
  display: flex;
  height: auto;
  width: auto;
  margin: 15px 0px;
  ${ props => props.spaceTop ? 'margin-top: 10px;' : '' }
  ${ props => props.spaceLeft ? 'margin-left: 10px;' : '' }
  ${ props => props.spaceBottom ? 'margin-bottom: 10px;' : '' }
  ${ props => props.spaceRight ? 'margin-right: 10px;' : '' }
  border: 3px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  flex-direction: ${ props => props.direction || 'row' }
`

export const Button = styled.button`
  font-weight: 400;
  width: ${ props => props.fill ? '100%' : 'auto' };
  background-color: ${ props => props.active
    ? colors[`dark-${props.color}`]
    : colors[`light-${props.color}`]
  };
  &:hover {
    background-color: ${ props => !props.disabled
      ? colors[`dark-${props.color}`]
      : colors[`light-${props.color}`]
    };
    color: white;
  }
  margin-top: ${ props => props.spaceTop ? '5px' : '0px' };
  margin-left: ${ props => props.spaceLeft ? '5px' : '0px' };
  margin-bottom: ${ props => props.spaceBottom ? '5px' : '0px' };
  margin-right: ${ props => props.spaceRight ? '5px' : '0px' };
  border: none;
  border-radius: 5px;
  cursor: ${ props => props.disabled ? 'default' : 'pointer' };
  padding: ${ props => props.size ? btnSizes[props.size] : '5px' };
`

export const Label = styled.p`
  user-select: none;
  text-transform: uppercase;
  font-weight: 100;
  font-size: ${ props => props.size === 'large' ? '18px;' : '13px;'}
  color: #333;
`

export const Value = styled.span`
  user-select: none;
  font-weight: bold;
  text-transform: none;
`

export const HighlightLabel = Label.extend`
  user-select: none;
  color: #90EE99;
  font-weight: bold;
`

export const InlineHeader = styled.span`
  user-select: none;
  text-transform: uppercase;
  font-weight: 400;
  font-size: ${ props => {
      if(props.size === 'large') return '18px;'
      if(props.size === 'medium') return '15px;'
      return '13px;'
  }}
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
  margin: 15px 0px 0px 0px;
  padding: 5px;
  border-radius: 6px;
  border: solid 1px #666;
`

export const StoryBox = styled.div`
  padding: 7px;
  border: 1px solid #DDD;
  &:hover {
    background-color: #f7f7f7;
  }
  user-select: none;
  border-radius: 5px;
  margin: 5px 0px;
  p {
    font-weight: 100;
  }
`

export const Category = styled.div`
  display: inline-block;
  padding: 0px 4px;
  border-radius: 3px;
  margin-left: 5px;
  background-color: ${colors['light-gray']};
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  height: ${ props => props.height || 'auto'};
  width: ${ props => props.width || 'auto'};
`
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: ${ props => props.height || 'auto'};
  width: ${ props => props.width || 'auto'};
`
