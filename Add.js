import React from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import datasource from "./Data";

const Add= ({navigation}) => {
    const [task, setTask] = React.useState('');
    const [status, setStatus] = React.useState('');
    return (
        <View style={{margin:10}}>
            <View style={{margin: 10}}>
                <Text style={{fontWeight: 'bold'}}> Task: </Text>
                <TextInput style={{borderWidth: 1}} onChangeText={(text)=>setTask(text)}/>
            </View>

            <View style={{padding: 10}}>
                <RNPickerSelect
                    value={status}
                    onValueChange={(value)=>setStatus(value)}
                    items = {[
                        {label: 'Completed', value: 'Completed'},
                        {label: 'Incomplete', value: 'Incomplete'}
                    ]}
                />
            </View>

            <Button
                title= "ADD"
                onPress={()=> {
                    let item = {key:task};
                    let indexnum = 1;
                    if (status == "Completed") {
                        indexnum = 0;
                    } else if (status == "Incomplete") {
                        indexnum = 1;
                    }
                    datasource[indexnum].data.push(item);
                    navigation.navigate('Home');
                }}
            />
        </View>
    )
}
export default Add;














