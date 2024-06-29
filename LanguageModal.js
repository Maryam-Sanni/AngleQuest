import  { useContext } from 'react';
import { Modal, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { LanguageContext } from './LanguageContext';
import languageResources from './services/languageList.json';  // Assuming this is where your language resources are

const LanguageModal = () => {
  const { visible, setVisible, changeLanguage } = useContext(LanguageContext);

  return (
    <Modal visible={visible} onRequestClose={() => setVisible(false)}>
      <View >
        <FlatList
          data={Object.keys(languageResources)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => changeLanguage(item)}>
              <Text >
                {languageResources[item].nativeName}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>  );
};
export default LanguageModal;