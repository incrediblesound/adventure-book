import styled from 'styled-components'

export const Panel = styled.div`
  position: relative;
  display: flex;
  width: 640px;
  height: auto;
  margin: 15px 0px;
  box-shadow: 0px 1px 4px 1px #ddd;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 10px;
`

export const Label = styled.p`
  text-transform: uppercase;
  font-weight: 100;
  font-size: 13px;
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
