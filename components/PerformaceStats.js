import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import OpenSchedule from '../Recruiters/EmPerfStat';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';

const ScheduledMeetingsTable = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const ProgressBar = ({ percentage }) => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${percentage}%` }]} />
        <Text style={styles.progressText}>{percentage}%</Text>
      </View>
    );
  };

  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
const {t}=useTranslation()
  return (
    <View style={styles.greenBox}>
      <BlurView intensity={100} style={styles.blurBackground}>
        <Text style={styles.title}>{t("Performance Statistics")}</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>{t("Name")}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>{t("Angle Badge")}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>{t("Hub's Attendance")}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>{t("Growth Plan")}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>{t("Advice")}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>{t("Mentor")}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.cell2}>
              <TouchableOpacity onPress={handleOpenPress}>
                <Text style={{ textDecoration: 'underline' }}>Jacob Ncube</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cell2}>
              <ProgressBar percentage={67} />
            </View>
            <View style={styles.cell2}>
              <ProgressBar percentage={78} />
            </View>
            <View style={styles.cell2}>
              <ProgressBar percentage={30} />
            </View>
            <View style={styles.cell2}>
              <ProgressBar percentage={45} />
            </View>
            <View style={styles.cell2}>
            <Text style={styles.cellText}>Emily Ray</Text>
            </View>
            </View>
            <View style={styles.row}>
            <View style={styles.cell}>
              <TouchableOpacity onPress={handleOpenPress}>
                <Text style={{ textDecoration: 'underline' }}>Sander Josef</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cell}>
              <ProgressBar percentage={40} />
            </View>
            <View style={styles.cell}>
              <ProgressBar percentage={39} />
            </View>
            <View style={styles.cell}>
              <ProgressBar percentage={47} />
            </View>
            <View style={styles.cell}>
              <ProgressBar percentage={45} />
            </View>
            <View style={styles.cell}>
            <Text style={styles.cellText}>Adewale Oni</Text>
            </View>
            </View>
            <View style={styles.row}>
            <View style={styles.cell2}>
              <TouchableOpacity onPress={handleOpenPress}>
                <Text style={{ textDecoration: 'underline' }}>Joe Jason</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cell2}>
              <ProgressBar percentage={95} />
            </View>
            <View style={styles.cell2}>
              <ProgressBar percentage={68} />
            </View>
            <View style={styles.cell2}>
              <ProgressBar percentage={70} />
            </View>
            <View style={styles.cell2}>
              <ProgressBar percentage={85} />
            </View>
            <View style={styles.cell2}>
            <Text style={styles.cellText}>Emily Ray</Text>
            </View>
            </View>
            <View style={styles.row}>
            <View style={styles.cell}>
              <TouchableOpacity onPress={handleOpenPress}>
                <Text style={{ textDecoration: 'underline' }}>Hussein Aliyu</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cell}>
              <ProgressBar percentage={34} />
            </View>
            <View style={styles.cell}>
              <ProgressBar percentage={81} />
            </View>
            <View style={styles.cell}>
              <ProgressBar percentage={40} />
            </View>
            <View style={styles.cell}>
              <ProgressBar percentage={40} />
            </View>
            <View style={styles.cell}>
            <Text style={styles.cellText}>Adewale Oni</Text>
            </View>
            </View>
          

        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContent}>
            <OpenSchedule onClose={handleCloseModal} />
          </View>
        </Modal>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    marginTop: 30,
    marginLeft: 50,
    color: "black",
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'flex-start',
  },
  table: {
    marginRight: 50,
    marginTop: 20,
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'space-around',
    marginLeft: 50,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(225,225,212,0.3)',
  },
  cell: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'flex-start',
  },
  cell2: {
    flex: 1,
    backgroundColor: 'none',
    padding: 10,
    alignItems: 'flex-start',
  },
  cellText: {
    textAlign: 'flex-start',
  },
  greenBox: {
    flex: 2,
    width: "90%",
    height: 550,
    marginLeft: 50,
    backgroundColor: 'rgba(225,225,212,0.3)',
    marginTop: 30,
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
  },
  blurBackground: {
    flex: 1,
    borderRadius: 20,
  },
  progressBarContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#63EC55',
  },
  progressText: {
    position: 'absolute',
    right: 10,
    color: '#000',
  },
});

export default ScheduledMeetingsTable;
