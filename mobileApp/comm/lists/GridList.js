// import React in our code
import React from 'react';
// import all the components we are going to use VirtualizedList,
import { StyleSheet, SafeAreaView, View, FlatList, Image,  TouchableHighlight, Text,  TouchableOpacity } from 'react-native';

const GridList =  (data, methods) => {
  const Item = (title) => (
    <View style={styles.GridItem}>
      <TouchableHighlight style={StyleSheet.absoluteFill} onPress={() => {
        methods.viewPhoto(title.id);}}>
        <Image style={styles.image} source={{uri:title.data}}/>
      </TouchableHighlight>

      <TouchableOpacity style={styles.buttonGrid} onPress={() => {

        methods.deleteFile(title.id);
      }}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View 
            style={{
              flex: 1,
              flexDirection: 'column',
              width:'33%',
              height:'100%',
              margin: 6
            }}>
            {Item(item)}
          </View>
        )}
        //Setting the number of column 
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  )
} 

const ListView = (props) => {
  const data = (props.items) ? props.items : [];
  return GridList(data, props.shared);
  // return ListObj(data, props.shared);
  // return VirtualizedListObj(data, props.delete);
};
export default ListView;

const styles = StyleSheet.create({
  VirtualizedListItem: {
    backgroundColor: '#ccc',
    height: 80,
    justifyContent: 'center',
    marginVertical: 6,
    marginHorizontal: 6,
    padding: 0,
  },
  GridItem: {
    flex:1,
    backgroundColor: 'transparent',
    height: 100,
    width: 120,
    justifyContent: 'center',
    alignItems : "center",
    marginVertical: 6,
    marginHorizontal: 0,
    padding: 0
  },
  image : {
    flex:1,
    padding: 0,
    margin: 0,
    width:'100%',
    height:'100%',
    borderRadius: 6
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginLeft: "16%",
    marginTop: 20,
    marginBottom: 3,
    minWidth: "48%",
    alignItems : "center",
    textAlign: "center"
  },
  buttonGrid: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    margin: 6,
    minWidth: "50%",
    alignItems : "center",
    textAlign: "center"
  }
});