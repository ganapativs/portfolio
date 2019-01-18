import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import useMesh, { BLOCK_SIZE } from './useMesh';
import ThemeContext from '../../contexts/themeContext';

const DivWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Div = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: ${BLOCK_SIZE}px;
  height: ${BLOCK_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.div`
  background: var(--color-light-op-3);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  opacity: ${props => (props.theme === 'light' ? 0.7 : 0.3)};
  transition: opacity 0.1s ease-out, width 0.1s ease-out, height 0.1s ease-out;

  ${Column}:hover & {
    opacity: ${props => (props.theme === 'light' ? 0.9 : 0.5)};
    width: 20px;
    height: 20px;
    transition: opacity 0.2s ease-in, width 0.2s ease-in, height 0.2s ease-in;
  }
`;

const BackgroundMesh = React.memo(
  () => {
    const { theme } = useContext(ThemeContext);
    const mesh = useMesh();
    const fromRight = Math.random() > 0.5;
    const fromTop = Math.random() > 0.5;

    return (
      <DivWrapper>
        <Div>
          {mesh.map((row, i) => {
            return (
              <Row key={i}>
                {row.map((column, j) => {
                  return (
                    <Column
                      key={`${i}_${j}_${column.visibility}`}
                      className="animated fadeInUp"
                      style={{
                        display: column.visibility ? 'block' : 'none',
                        animationDelay: `${(fromTop ? mesh.length - i : i) *
                          0.02 +
                          (fromRight ? row.length - j : j) * 0.005}s`,
                      }}>
                      <Circle theme={theme} />
                    </Column>
                  );
                })}
              </Row>
            );
          })}
        </Div>
      </DivWrapper>
    );
  },
  () => true, // Never re-render
);

export default BackgroundMesh;
