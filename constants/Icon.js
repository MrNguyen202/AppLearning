import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

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
    }
}

const Icon=({type, ...props})=>{
    const FontIcon = getIconFont(type);
    return <FontIcon {...props}/>
}

export default Icon