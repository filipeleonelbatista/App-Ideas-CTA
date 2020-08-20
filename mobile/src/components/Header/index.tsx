import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

interface PageHeaderProps {
    title: string;
}

const Header: React.FC<PageHeaderProps> = ({title, children}) => {
    return (
        <View style={styles.header} >
            <View style={styles.headerRow} >
                <Text style={styles.headerTitle} >{title}</Text>
                {children}
            </View>
        </View>
    );
}

export default Header;