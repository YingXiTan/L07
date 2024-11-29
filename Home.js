import React from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import datasource from "./Data";
import styles from './styles';

const Home = ({navigation}) => {
    const renderItem = ({item, index, section}) => {
        return (
            <TouchableOpacity style={styles.opacityStyle}
                              onPress={() => {
                                  navigation.navigate('Edit', {index:index, status:section.status, task:item.task});
                              }}
            >
                <Text style={styles.textStyle}>{item.key}</Text>
            </TouchableOpacity>
        );
    };
        return (
            <View>
                <StatusBar/>
                <SectionList sections={datasource} renderItem={renderItem}
                             renderSectionHeader={({section:{title,bgcolor}})=>(
                                 <Text style={[styles.headerText,{backgroundColor:bgcolor}]}>
                                     {title}
                                 </Text>
                             )}
                />

                <View style={{margin: 5}}></View>
                <View style={[styles.buttonStyle]}>
                    <Button
                        title='Add Task'
                        onPress={() => {navigation.navigate('Add')}}
                    />
                </View>

                <View style={[styles.buttonStyle]}>
                    <Button
                        title= 'Overall Status'
                        onPress={() => {
                            const completedCount = datasource[0].data.length;
                            const incompleteCount = datasource[1].data.length;
                            const totalTasks = completedCount + incompleteCount;
                            const completionPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
                            Alert.alert(
                                "Task Status",
                                `Completed Tasks: ${completedCount}\n` +
                                `Incomplete Tasks: ${incompleteCount}\n` +
                                `Completion: ${completionPercentage}%`,
                                [
                                    {
                                        text: 'Ok',
                                        onPress: () => {
                                            navigation.navigate('Home');
                                        }
                                    }]
                            );
                        }}/>
                </View>
            </View>
        );
};

export default Home;
