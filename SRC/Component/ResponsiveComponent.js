
import { Dimensions } from 'react-native';
// import Spacer from './Spacer';

// Calculate width percentage based on screen width
const wp = (widthPercent) => {
    const screenWidth = Dimensions.get('window').width;
    return (widthPercent * screenWidth) / 100;
};

// Calculate height percentage based on screen height
const hp = (heightPercent) => {
    const screenHeight = Dimensions.get('window').height;
    return (heightPercent * screenHeight) / 100;
};

export { wp, hp };