import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const getIconFont = (type) => {
    switch (type) {
        case 'antdesign':
            return AntDesign;
        case 'ionicons':
            return Ionicons;
        case 'feather':
            return Feather;
        case 'fontawesome6':
            return FontAwesome6;
        case 'fontawesome5':
            return FontAwesome5;
        case 'octicons':
            return Octicons;
        case 'materialcommunityicons':
            return MaterialCommunityIcons;
    }
}

const Icon = ({ type, ...props }) => {
    const FontIcon = getIconFont(type);
    return <FontIcon {...props} />
}

export default Icon