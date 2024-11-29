import React, {useState} from 'react';
import {Text, View, TextInput, Button, Alert} from 'react-native';
import datasource from "./Data";
import RNPickerSelect from "react-native-picker-select";


const Edit = ({navigation, route}) => {
    const [status, setStatus] = useState(route.params.status);
    return (
        <View style={{margin: 10}}>
            <View style={{padding: 10}}>
                <Text style={{fontWeight: 'bold'}}> Update Task Status: </Text>
                <RNPickerSelect
                    value={status}
                    onValueChange={(value) => setStatus(value)}
                    items={[
                        {label: 'Completed', value: 'Completed'},
                        {label: 'Incomplete', value: 'Incomplete'}
                    ]}
                />
            </View>

            {/*Update Task Status Button*/}
            <View style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flex: 1, margin: 10}}>
                    <Button
                        title={'Update'}
                        onPress={() => {
                            let indexnum = route.params.key === 'Complete' ? 0 : 1;
                            const task = datasource[indexnum].data[route.params.index];
                            task.status = status;
                            if ((status === 'Completed' && indexnum === 1) || (status === 'Incomplete' && indexnum === 0)) {
                                datasource[indexnum].data.splice(route.params.index, 1);
                                let targetIndex = status === 'Completed' ? 0 : 1;
                                datasource[targetIndex].data.push(task);
                            }
                            else {
                                    datasource[indexnum].data[route.params.index] = task;
                                }
                            navigation.navigate('Home');
                        }}
                    />
                </View>

                {/*Remove Task Button*/}
                    <View style={{flex: 1, margin: 10}}>
                        <Button
                            title={"REMOVE"}
                            onPress={() => {
                                let indexnum = route.params.key === 'Complete' ? 0 : 1;
                                Alert.alert(
                                    "Remove Task?",
                                    " ",
                                    [
                                        {
                                            text: 'Yes',
                                            onPress: () => {
                                                datasource[indexnum].data.splice(route.params.index, 1);
                                                navigation.navigate('Home');
                                            }
                                        },
                                        {
                                            text: 'No',
                                            style: 'cancel'
                                        }
                                    ]
                                );
                            }}
                        />
                    </View>
                </View>
            </View>
    )
}
export default Edit;
