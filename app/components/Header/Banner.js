import styled from 'styled-components';

// Conditionally formatted depending on props passed into the component

export default styled.div`
  text-align: center;
  font-size: ${props => props.fontSize || '25px'};
  border: ${props => props.border || 'none'};
  border-radius: ${props => props.borderRadius || 'none'};
  margin: ${props => props.margin || '0px'};
  padding: ${props => props.padding || '0px'};
  max-width: ${props => props.maxWidth || '100%'};
`;
