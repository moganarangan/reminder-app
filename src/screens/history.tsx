import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Layout, Card, Text } from '@ui-kitten/components';
import { reminderActivity } from '../model/reminderActivity';

interface Props {
    navigation: any,
    ra: Array<reminderActivity>
}

class History extends React.Component<Props> {
    render() {
        return (
            <Layout style={styles.container}>
                <ScrollView>
                    {this.props.ra.map((item) =>
                        <Card key={item.reminderActivityId} style={styles.item}>
                            <Text category='h6'>{item.reminderName}</Text>
                            <Text category='s1'>{item.dueDate.toString()}</Text>
                        </Card>
                    )}
                </ScrollView>
            </Layout>
        );
    }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state: any) => {
    // Redux Store --> Component
    return {
        ra: state.reminderMaster.remindersActivity
    };
};

// Exports
export default connect(mapStateToProps, null)(History);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10
    },
    item: {
        marginTop: 10
    }
});
