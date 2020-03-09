import { execSync } from 'child_process';
import { outputFolder } from './constants';

const prepare = () => {
  execSync(`rm -rf ${outputFolder}`, { stdio: 'inherit' });
  execSync(`mkdir -p ${outputFolder}`, { stdio: 'inherit' });
  execSync(`mkdir -p ${outputFolder}/preview`, { stdio: 'inherit' });
};

export default prepare;
