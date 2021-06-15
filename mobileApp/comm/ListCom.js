// import React in our code
import React from 'react';
// import all the components we are going to use VirtualizedList,
import { StyleSheet, SafeAreaView, View, FlatList, Image,  Button, TouchableHighlight, Text, VirtualizedList, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';


const GridObj =  (data, shared) => {
  const Item = (title) => (
    <View style={styles.GridItem}>
      <Image style={styles.image} source={{uri:title.data}}/>
      <TouchableOpacity style={styles.buttonGrid} onPress={() => {
        shared.deleteFile(title);}}>
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
/*
const VirtualizedListObj =  (list, shared) => {
  const getItem = (data, index) => ({
      key: Math.random().toString(12).substring(0),
      title: `${data[index]}`}

    )
  const getItemCount = (data) => data.length;
  const Item = ({ title }) => (
    <View style={styles.VirtualizedListItem}>
        <View style={{flexDirection: "row",  flexWrap: "wrap",}}>
        <Text>{title}</Text>
            <Image style={styles.image} source={{uri:FileSystem.cacheDirectory + 'Camera/' + title}}/>
            <TouchableOpacity style={styles.button} onPress={() => {
                shared.deleteFile(title);;
              }}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
    </View>
  );
  return (

      <VirtualizedList
        data={list}
        initialNumToRender={4}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      />
  )
} 
*/
const ListObj =  (list, shared) => {
  
  const getItem = (data, index) => ({
    id: data[index].id,
    ipfs: data[index].ipfs,
    data: `${data[index].data}`,
    key: data[index].id,
  });
  const getItemCount = (data) => data.length;
  const Item = ({ title }) => (
    <View style={styles.VirtualizedListItem}>
        <View style={{flexDirection: "row",  flexWrap: "wrap",}} >
            <TouchableHighlight onPress={() => shared.viewPhoto(title.id)}>
                <Image style={styles.image} source={{uri: title.data}}/>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => {
                shared.deleteFile(title.id);
              }}>
              <Text>Delete</Text>
            </TouchableHighlight>
            <Text>{title.ipfs}</Text>
          </View>
    </View>
  );
  /*
  return (
    <Text>Niu{JSON.stringify(list[0].id)}</Text>
  )
  */
  return (
      <VirtualizedList
        data={list}
        initialNumToRender={4}
        renderItem={({ item }) => <Item title={item} />}
        keyExtractor={item => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      />
  )
} 
const ListView = (props) => {
  const data = (props.items) ? props.items : [];
  return GridObj(data, props.delete);
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
    height: 150,
    width: '100%',
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