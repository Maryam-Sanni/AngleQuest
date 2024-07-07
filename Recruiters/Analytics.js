import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, ImageBackground, Modal, Picker, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Line, Text as SvgText, Circle } from 'react-native-svg';
import Topbar from '../components/Recruiterstopbar';
import Sidebar from '../components/Recruiterssidebar';
import { useFonts } from 'expo-font';
import OpenModal from './TargetPerformaces';
import OpenModal2 from './GrowthPlanPerformance';
import OpenModal3 from './AdvicePerformance';
import OpenModal4 from './HubsPerformance';
import { useTranslation } from 'react-i18next';

const screenWidth = Dimensions.get('window').width;

const data = [
  { label: 'Jan-Jun 2023', value: 65 },
  { label: 'Jul-Dec 2023', value: 77 },
  { label: 'Jan-Jun 2024', value: 60 },
  { label: 'Jul-Dec 2024', value: 35 },
];

// Get the maximum value in the data for scaling the bars
const maxValue = Math.max(...data.map(d => d.value));
const chartHeight = 200; // Height of the chart area

const groupdata = [
  {
    group: 'Jan-Jun 2023',
    values: [
      { label: 'Jan-Mar', value: 20, color: '#90ee90' },
      { label: 'Apr-Jun', value: 45, color: '#006400' },
    ],
  },
  {
    group: 'Jul-Dec 2023',
    values: [
      { label: 'Jul-Sep', value: 20, color: '#90ee90' },
      { label: 'Oct-Dec', value: 45, color: '#006400' },
    ],
  },
  {
    group: 'Jan-Jun 2024',
    values: [
      { label: 'Jan-Mar', value: 30, color: '#90ee90' },
      { label: 'Apr-Jun', value: 60, color: '#006400' },
    ],
  },
  {
    group: 'Jul-Dec 2024',
    values: [
      { label: 'Jul-Sep', value: 35, color: '#90ee90' },
      { label: 'Oct-Dec', value: 55, color: '#006400' },
    ],
  },
];

const groupmaxValue = Math.max(
  ...groupdata.flatMap(group => group.values.map(d => d.value))
);
const groupchartWidth = 300; // Width of the chart area


const { width } = Dimensions.get('window');
const graphWidth = 350;
const height = 200;
const padding = 20;
const linedata = [
  { period: 'Jan-Jun 2023', value: 55 },
  { period: 'Jul-Dec 2023', value: 75 },
  { period: 'Jan-Jun 2024', value: 60 },
  { period: 'Jul-Dec 2024', value: 65 },
];

const LmaxValue = Math.max(...linedata.map(d => d.value));
const minValue = Math.min(...linedata.map(d => d.value));
const valueRange = LmaxValue - minValue;

const points = linedata.map((d, index) => {
  const x = (index / (linedata.length - 1)) * (graphWidth - 2 * padding) + padding;
  const y = height - ((d.value - minValue) / valueRange) * (height - 2 * padding) - padding;
  return { x, y, period: d.period, value: d.value };
});

// Create Y-axis labels
const yAxisLabels = Array.from({ length: 5 }, (_, index) => {
  const value = minValue + (index * valueRange) / 4;
  const y = height - ((value - minValue) / valueRange) * (height - 2 * padding) - padding;
  return { value: Math.round(value), y };
});

const MyComponent = () => {
  const navigation = useNavigation();
  const [ModalVisible, setModalVisible] = useState(false);
  const [ModalVisible2, setModalVisible2] = useState(false);
  const [ModalVisible3, setModalVisible3] = useState(false);
  const [ModalVisible4, setModalVisible4] = useState(false);

  const [fontsLoaded] = useFonts({
    'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
  });


  const handleOpenPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  const handleOpenPress2 = () => {
    setModalVisible2(true);
  };

  const handleCloseModal2 = () => {
    setModalVisible2(false);
    onClose();
  };

  const handleOpenPress3 = () => {
    setModalVisible3(true);
  };

  const handleCloseModal3 = () => {
    setModalVisible3(false);
    onClose();
  };

  const handleOpenPress4 = () => {
    setModalVisible4(true);
  };

  const handleCloseModal4 = () => {
    setModalVisible4(false);
    onClose();
  };
  const {t}=useTranslation()

  return (
<View style={{backgroundColor: '#3F5B39', flex: 1}}>
      <View style={{ flex: 1 }}>
        <Topbar />
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Sidebar />
          <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
            <View style={{ marginLeft: 270 }}>
              <View style={styles.header}>
                <TouchableOpacity>
                  <View style={styles.item}>
                    <Image
                      source={{
                        uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/fa3093fa6656295c8b39535a911908d6555a356fccce78af145fec472c4bd154?apiKey=7b9918e68d9b487793009b3aea5b1a32&'
                      }}
                      style={styles.image}
                    />
                    <Text style={styles.headertext}>{t("Analytics")}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 5,
                    backgroundColor: 'rgba(211,249,216,0.1)',
                    width: 150,
                    alignItems: 'center',
                    marginTop: 50,
                    marginLeft: 50
                  }}
                >
                  <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold', fontFamily: 'Roboto-Light' }}>{t("Analytics")}</Text>
                </View>

                <Picker style={styles.picker}>
                  <Picker.Item label={t("All")} value="All" />
                  <Picker.Item label={t("Employee")} value="Employee" />
                  <Picker.Item label={t("Manager")} value="Manager" />
                  <Picker.Item label={t("Coach")} value="Coach" />
                  <Picker.Item label={t("Team")} value="Team" />
                </Picker>

                <Picker style={styles.picker}>
                  <Picker.Item label={t("Teams")} value="Teams" />
                  <Picker.Item label={t("Employees")} value="Employees" />
                  <Picker.Item label={t("Managers")} value="Managers" />
                  <Picker.Item label={t("Coaches")} value="Coaches" />
                </Picker>

                <Picker style={styles.picker}>
                  <Picker.Item label="From" value=" " />
                  <Picker.Item label="Jan" value="Jan" />
                  <Picker.Item label="Feb" value="Feb" />
                  <Picker.Item label="Mar" value="Mar" />
                  <Picker.Item label="Apr" value="Apr" />
                  <Picker.Item label="May" value="May" />
                  <Picker.Item label="Jun" value="Jun" />
                  <Picker.Item label="Jul" value="Jul" />
                  <Picker.Item label="Aug" value="Aug" />
                  <Picker.Item label="Sep" value="Sep" />
                  <Picker.Item label="Oct" value="Oct" />
                  <Picker.Item label="Nov" value="Nov" />
                  <Picker.Item label="Dec" value="Dec" />
                </Picker>

                <Picker style={styles.picker}>
                  <Picker.Item label={t("To")} value=" " />
                  <Picker.Item label="Jan" value="Jan" />
                  <Picker.Item label="Feb" value="Feb" />
                  <Picker.Item label="Mar" value="Mar" />
                  <Picker.Item label="Apr" value="Apr" />
                  <Picker.Item label="May" value="May" />
                  <Picker.Item label="Jun" value="Jun" />
                  <Picker.Item label="Jul" value="Jul" />
                  <Picker.Item label="Aug" value="Aug" />
                  <Picker.Item label="Sep" value="Sep" />
                  <Picker.Item label="Oct" value="Oct" />
                  <Picker.Item label="Nov" value="Nov" />
                  <Picker.Item label="Dec" value="Dec" />
                </Picker>

                <TouchableOpacity style={styles.PDF} >
                  <Text style={{ fontSize: 15, color: 'white' }}>{t("Download PDF")}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.container}>
              <TouchableOpacity onPress={handleOpenPress} style={styles.box}>
              <Text style={styles.title}>{t("Target")}</Text>
      <View style={styles.GchartContainer}>
        <View style={styles.GchartArea}>
          {groupdata.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.GgroupContainer}>
              <Text style={styles.GgroupLabel}>{group.group}</Text>
              <View style={styles.GgroupBars}>
                {group.values.map((item, index) => (
                  <View key={index} style={styles.GbarContainer}>
                    <View
                      style={[
                        styles.Gbar,
                        {
                          width: (item.value / groupmaxValue) * groupchartWidth,
                          backgroundColor: item.color,
                        },
                      ]}
                    />
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
        {/* X-axis labels */}
        <View style={styles.GxAxis}>
          {Array.from({ length: 5 }, (_, i) => (
            <Text key={i} style={styles.GxAxisLabel}>
              {Math.round(groupmaxValue * (i / 4))}
            </Text>
          ))}
        </View>
      </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleOpenPress2} style={styles.box}>
            <Text style={styles.title3}>{t("Growth Plan Performance")}</Text>
<View style={{ alignItems: 'center', marginTop: 10 }}>
<Svg width={graphWidth} height={height}>
        {/* Draw lines */}
        {points.map((point, index) => {
          if (index === 0) return null;
          const previousPoint = points[index - 1];
          return (
            <Line
              key={index}
              x1={previousPoint.x}
              y1={previousPoint.y}
              x2={point.x}
              y2={point.y}
              stroke="lightgreen"
              strokeWidth="2"
            />
          );
        })}
        {/* Draw points */}
        {points.map((point, index) => (
          <Circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="green"
          />
        ))}
        {/* Draw period labels */}
        {points.map((point, index) => (
          <SvgText
            key={index}
            x={point.x}
            y={height - padding + 15}
            fontSize="14"
            fill="black"
            textAnchor="middle"
          >
            {point.period}
          </SvgText>
        ))}
        {/* Draw value labels */}
        {points.map((point, index) => (
          <SvgText
            key={index}
            x={point.x}
            y={point.y - 10}
            fontSize="14"
            fill="black"
            textAnchor="middle"
          >
            {point.value}
          </SvgText>
        ))}
        {/* Draw Y-axis labels */}
        {yAxisLabels.map((label, index) => (
          <SvgText
            key={index}
            x={padding - 10}
            y={label.y}
            fontSize="12"
            fill="black"
            textAnchor="end"
          >
            {label.value}
          </SvgText>
        ))}
      </Svg>
    </View>
      </TouchableOpacity>
</View>

              <View style={styles.container}>
              <TouchableOpacity onPress={handleOpenPress3} style={styles.box}>
      <Text style={styles.title2}> {t("Career Advice Performance")}</Text>
      <View style={styles.chartContainer}>
        {/* Y-axis labels */}
        <View style={styles.yAxis}>
          {Array.from({ length: 5 }, (_, i) => (
            <Text key={i} style={styles.yAxisLabel}>
              {Math.round(maxValue * (1 - i / 4))}
            </Text>
          ))}
        </View>
        <View style={styles.chartArea}>
          <View style={styles.barsContainer}>
            {data.map((item, index) => (
              <View key={index} style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    { height: (item.value / maxValue) * chartHeight },
                  ]}
                />
                <Text style={styles.label}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={handleOpenPress4} style={styles.box}>
      <Text style={styles.title2}>{t("Hub Performance")}</Text>
      <View style={styles.chartContainer}>
        {/* Y-axis labels */}
        <View style={styles.yAxis}>
          {Array.from({ length: 5 }, (_, i) => (
            <Text key={i} style={styles.yAxisLabel}>
              {Math.round(maxValue * (1 - i / 4))}
            </Text>
          ))}
        </View>
        <View style={styles.chartArea}>
          <View style={styles.barsContainer}>
            {data.map((item, index) => (
              <View key={index} style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    { height: (item.value / maxValue) * chartHeight },
                  ]}
                />
                <Text style={styles.label}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
    </View>


    <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContent}>
          <OpenModal onClose={handleCloseModal} />
        </View>
      </Modal>
            
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible2}
        onRequestClose={handleCloseModal2}
      >
        <View style={styles.modalContent}>
          <OpenModal2 onClose={handleCloseModal2} />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible3}
        onRequestClose={handleCloseModal3}
      >
        <View style={styles.modalContent}>
          <OpenModal3 onClose={handleCloseModal3} />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible4}
        onRequestClose={handleCloseModal4}
      >
        <View style={styles.modalContent}>
          <OpenModal4 onClose={handleCloseModal4} />
        </View>
      </Modal>

              </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
    header: {
        marginLeft: -60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(225,225,212,0.3)',
        backgroundColor: '#f7fff4',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginRight: 10, 
    }, 
    headertext: {
      marginLeft: 5,
      fontSize: 14,
      fontWeight: '500',
      marginTop: 5,
      color: '#666',
      fontFamily:"Roboto-Light"
    },
    image: {
      width: 21,
      height: 21,
      marginRight: 5,
      marginTop: 5,
      marginLeft: 100
    },
    picker: {
        height: 40,
        width: 150,
        backgroundColor: 'lightgreen',
        borderColor: '#206C00',
        borderWidth: 1, 
        color:'black',
        fontSize: 14,
        marginLeft: 50,
        borderRadius: 5, marginLeft: 10, marginTop: 50
      },
      PDF: {
        height: 40,
        width: 150,
        backgroundColor: 'coral',
        borderColor: 'coral',
        borderWidth: 1, 
        color:'black',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 50,
        borderRadius: 5, marginLeft: 10, marginTop: 50
      },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  box: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '38%',
    marginRight: 30,
    marginTop: 20,
    height: 350,
    borderWidth: 2, 
    borderColor: 'rgba(225,225,212,0.3)',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'flex-start',
    marginBottom: 15,
    color: '#206C00',
    marginTop: 10,
  },
  title2: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'flex-start',
    marginBottom: 70,
    color: '#206C00',
    marginTop: 5,
  },
  title3: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'flex-start',
    marginTop: -10,
    marginBottom: 70,
    color: '#206C00',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  yAxis: {
    justifyContent: 'space-between',
    marginRight: 10,
    height: 200,
  },
  yAxisLabel: {
    fontSize: 12,
  },
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 200,
    justifyContent: 'space-around',
  },
  barContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 40,
    marginHorizontal: 10, // Add spacing between bars
  },
  bar: {
    width: '100%',
    backgroundColor: '#206C00',
  },
  label: {
    marginTop: 5,
    fontSize: 12,
  },
  GchartContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  GxAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300, // Adjust to match the width of the chart area
    marginTop: 5,
  },
  GxAxisLabel: {
    fontSize: 12,
  },
  GchartArea: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  GgroupContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  GgroupLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  GgroupBars: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  GbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2, // Add spacing between bars
  },
  Gbar: {
    height: 10,
    marginRight: 5,
  },
  Lchart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    minHeight: 200,
    paddingHorizontal: 0, // Removed horizontal padding
    width: '100%', // Adjusted width to 100% of the screen
  },
  LyAxis: {
    justifyContent: 'space-between',
    marginRight: 10,
    height: '100%',
  },
  LyAxisLabel: {
    fontSize: 12,
  },
  LchartArea: {
    flex: 1,
    marginLeft: 0, // Removed left margin
    position: 'relative',
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 0, // Removed horizontal padding
    paddingTop: 10,
    paddingBottom: 20,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'absolute',
    marginBottom: 40,
    width: '100%',
    height: '50%',
    zIndex: 0,
  },
  dataPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#006400',
    position: 'absolute',
    zIndex: 1,
  },
  connector: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#006400',
    zIndex: -1,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 0,
    marginTop: 0,
  },
  Llabel: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default MyComponent;
