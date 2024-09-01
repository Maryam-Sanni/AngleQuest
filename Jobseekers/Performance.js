import React, { useState, useEffect, useRef} from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions, ImageBackground, Picker } from 'react-native';
import Topbar from '../components/topbar';
import Sidebar from '../components/sidebar';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {useFonts} from "expo-font"
import Svg, { Line, Text as SvgText, Circle } from 'react-native-svg';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function MyComponent() { 
    const navigation = useNavigation();
  const [groupdata, setGroupData] = useState([]);
  const [analysisResults, setAnalysisResults] = useState({});

    const [fontsLoaded]=useFonts({
      'Roboto-Light':require("../assets/fonts/Roboto-Light.ttf"),
      })
      const { t } = useTranslation()

  const data = [
    { label: 'Jan-Jun 2023', value: 65 },
    { label: 'Jul-Dec 2023', value: 77 },
    { label: 'Jan-Jun 2024', value: 60 },
    { label: 'Jul-Dec 2024', value: 35 },
  ]; 

  // Get the maximum value in the data for scaling the bars
  const maxValue = Math.max(...data.map(d => d.value));
  const chartHeight = 200; // Height of the chart area

 


  const groupmaxValue = 100; // Set based on your data


  const { width } = Dimensions.get('window');
  const graphWidth = 350;
  const height = 200;
  const padding = 20;
  const linedata = [
    { period: 'M1', value: 61 },
    { period: 'M2', value: 39 },
    { period: 'M3', value: 61 },
    { period: 'M4', value: 60 },
     { period: 'M5', value: 60 },
     { period: 'M6', value: 62 },
     { period: 'M7', value: 80 },
     { period: 'M8', value: 20 },
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const storedUserId = await AsyncStorage.getItem('user_id');
        if (token && storedUserId) {
          const response = await fetch('https://recruitangle.com/api/expert/growthplan/getAllExpertsGrowthPlanFeedbacks', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (data.status === 'success') {
            // Extract percentages from the response data
            const extractedData = extractPercentages(data.allGrowthPlan.filter(plan => plan.jobseeker_id === storedUserId));
            // Transform data for chart
            const transformedData = transformDataForChart(extractedData);
            setGroupData(transformedData);

            const results = performGAPAnalysis(extractedData);
            setAnalysisResults(results);
            
          } else {
            console.error('Failed to fetch data:', data.message); // Log error message
          }
        } else {
          console.error('Token or user ID is missing');
        }
      } catch (error) {
        console.error('Failed to load data', error);
      }
    };

    fetchData();
  }, []);

  // Function to extract percentages
  const extractPercentages = (growthPlans) => {
    return growthPlans.map(plan => {
      // Ensure 'descriptions' is an array and has at least 3 items
      const percentages = plan.descriptions.slice(0, 3).map(desc => desc.percentage || 0);
      return {
        id: plan.id,
        percentages
      };
    });
  };

  // Transform data for chart
  const transformDataForChart = (extractedData) => {
    // Define a list of colors
    const colors = ['darkblue', 'coral', 'green'];

    // Example transformation using extracted percentages
    const groupData = extractedData.map(plan => ({
      values: plan.percentages.map((percentage, index) => ({
        value: percentage, // Percentage value for the chart
        color: colors[index % colors.length], // Assign color based on index
      })),
    }));

    return groupData;
  };

  const performGAPAnalysis = (extractedData) => {
    // Example GAP analysis logic
    const analysis = extractedData.reduce((acc, plan) => {
      plan.percentages.forEach((percentage) => {
        if (percentage < 50) {
          acc['Low'] = (acc['Low'] || 0) + 1;
        } else if (percentage < 75) {
          acc['Medium'] = (acc['Medium'] || 0) + 1;
        } else {
          acc['High'] = (acc['High'] || 0) + 1;
        }
      });
      return acc;
    }, {});

    return analysis;
  };

    return (
      <ImageBackground
    source={require ('../assets/backgroundimg2.png') }
  style={{ height: '150%', width: '100%',flex: 1}}
>
        <View style={{ flex: 1 }}>
            <Topbar />
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <Sidebar />
                <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
                    <View style={{ marginLeft: 210 }}>
                    <View style={styles.header}>
            <TouchableOpacity>
              <View style={styles.item}>
              <Image
  source={{ uri: 'https://img.icons8.com/?size=100&id=42208&format=png&color=000000' }}
  style={styles.image}
/>
                <Text style={styles.headertext}>{t("My Performance")}</Text>
              </View>
            </TouchableOpacity>
            </View>

                      <View style={styles.container}>
                      <View style={{flexDirectiom: 'column'}}>
                      <Text style={styles.title}>{t("Hub Attendance")}</Text>
                      
                      
                        <View style={styles.box}>
                          <View style={{flexDirection: 'row'}}>
                          <View style={styles.smallbox}>
                            <Text style={{fontSize: 14}}>{t("TOTAL")}</Text>
                            <Text style={{fontSize: 32, marginTop: 10, color: 'white', textShadowColor: 'black', textShadowRadius: 2, }}>0</Text>
                            <Text style={{fontSize: 16, fontWeight: '600', marginTop: 10}}>{t("Sessions")}</Text>
                          </View>
                          <View style={styles.smallbox}>
                            <Text style={{fontSize: 14}}>{t("LAST WEEK")}</Text>
                            <Text style={{fontSize: 32, marginTop: 10, color: 'white', textShadowColor: 'black', textShadowRadius: 2, }}>0</Text>
                            <Text style={{fontSize: 16, fontWeight: '600', marginTop: 10}}>{t("Sessions")}</Text>
                            </View>
                          </View>
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
                              stroke="darkblue"
                              strokeWidth="2"
                            />
                            );
                            })}
                           
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
                            
                            {/* Draw Y-axis labels */}
                            {yAxisLabels.map((label, index) => (
                            <SvgText
                            key={index}
                            x={padding - 5}
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
                      </View>
                      </View>

                        <View style={{flexDirectiom: 'column'}}>
                          <Text style={styles.title}>{t("Growth Plan")}</Text>
                           <Text style={{color: 'white', marginLeft: 10 }}>{t("GOOD JOB")}</Text>
                          <Text style={{color: 'white', marginLeft: 10 }}>{t("We are glad to see that your GROWTH pattern is great. Keep up the good work!")}</Text>
                      <View style={styles.box2}>
                        <View style={styles.GchartContainer}>
                         
                          <View style={styles.GchartArea}>
                            {/* Y-axis */}
                            <View style={[styles.GyAxis, { marginLeft: 10, marginBottom: 10 }]}>
                              {Array.from({ length: 5 }, (_, i) => {
                                const value = groupmaxValue - (i * groupmaxValue) / 4; 
                                return (
                                  <Text key={i} style={styles.GyAxisLabel}>
                                    {Math.round(value)}
                                  </Text>
                                );
                              })}
                            </View>
                            {groupdata.map((group, groupIndex) => (
                              <View key={groupIndex} style={styles.GgroupContainer}>
                                
                                <View style={styles.GgroupBars}>
                                  {group.values.map((item, index) => (
                                    <View key={index} style={styles.GbarContainer}>
                                      <View
                                        style={[
                                          styles.Gbar,
                                          {
                                            height: (item.value / groupmaxValue) * 200,
                                            backgroundColor: item.color,
                                          },
                                        ]}
                                      />
                                      <Text style={styles.GbarLabel}>{item.label}</Text> {/* Add this line */}
                                    </View>
                                  ))}
                                </View>
                              </View>
                            ))}
                          </View>
                          {/* X-axis labels */}
                          <View style={styles.GxAxis}>
                            {Array.from({ length: 8 }, (_, i) => (
                              <Text key={i} style={styles.GxAxisLabel}>
                                {`P${i + 1}`}
                              </Text>
                            ))}
                          </View>
                        </View>




                         <View style={{flexDirection: 'row', marginTop:10}}>
                            <View style={{height: 10, width: 10, backgroundColor:'darkblue', marginTop: 4, marginRight: 5}}>
                            </View>
                           <Text style={{fontSize: 14}}>Guide 1</Text>
                           <View style={{height: 10, width: 10, backgroundColor:'coral', marginTop: 5, marginRight: 4, marginLeft: 30}}>
                             </View>
                            <Text style={{fontSize: 14}}>Guide 2</Text>
                           <View style={{height: 10, width: 10, backgroundColor:'green', marginTop: 5, marginRight: 4, marginLeft: 30}}>
                              </View>
                            <Text style={{fontSize: 14}}>Guide 3</Text>
                         </View>


                        
                        
                        </View>
                        </View>
                        </View>
            

                      <View style={styles.container}>
                        <View style={styles.whitebox}>
                           <Text style={styles.title2}>{t("Hub Overview")}</Text>
                          <View style={{flexDirection: 'row', marginTop:10}}>
                           <Text style={{fontSize: 14, marginRight: 50}}>Hub Name</Text>
                             <Text style={{fontSize: 14, marginRight: 15}}>24/07/2024,</Text>
                             <Text style={{fontSize: 14}}>5:30 PM</Text>
                             </View>
                        </View>
                        <View style={styles.whitebox}>
                          <Text style={styles.title2}>Gap Analysis Result</Text>
                          <View style={styles.resultContainer}>
                            <Text style={styles.resultText}>Low Percentage Count: {analysisResults['Low'] || 0}</Text>
                            <Text style={styles.resultText}>Medium Percentage Count: {analysisResults['Medium'] || 0}</Text>
                            <Text style={styles.resultText}>High Percentage Count: {analysisResults['High'] || 0}</Text>
                          </View>
                        </View>
                      </View>
     

                       
                       
                    </View>
                </ScrollView>
            </View>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10
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
      marginTop: 7,
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
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 30, marginRight: 30, marginTop: 40
      },
      box: {
        backgroundColor: '#9EC481',
        marginTop: 65,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '98%',
        height: 300,
        borderWidth: 2, borderColor: 'coral',
      },
  box2: {
    backgroundColor: '#9EC481',
    marginTop: 30,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '98%',
    height: 300,
    borderWidth: 2, borderColor: 'coral',
  },
  whitebox: {
    backgroundColor: 'white',
    marginTop: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: 200,
    marginBottom: 50,
  },
  smallbox: {
    backgroundColor: 'white',
    marginTop: -120,
    padding: 10,
    width: 150,
    height: 120,
    borderWidth: 2,
    borderColor: 'darkgreen',
    marginHorizontal: 10
  },
      boximage: {
        width: 30,
        height: 30,
        position: 'absolute',
        left: 130,
        borderRadius: 25
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
        width: 180,
        backgroundColor: 'coral',
        borderColor: 'coral',
        borderWidth: 1, 
        color:'black',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
       position: 'absolute',
       right: 60,
        borderRadius: 5, marginTop: 50
      },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
    color: 'coral',
    marginTop: 5,
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'coral',
    marginTop: 5,
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
    marginHorizontal: 50,
    marginTop: 5,
  },
  GxAxisLabel: {
    fontSize: 12,
   marginHorizontal: 30
  },
  GchartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  GgroupContainer: {
    flexDirection: 'column',
     alignItems: 'flex-end',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  GgroupLabel: {
    fontSize: 14,
    marginBottom: 5,
    marginHorizontal: 30
  },
  GgroupBars: {
    flexDirection: 'row', // Change to 'row' to align items in a row
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  GbarContainer: {
    flexDirection: 'column', // Change to 'column' to align items vertically
    alignItems: 'flex-end',
    marginHorizontal: 2, // Add spacing between bars
  },
  Gbar: {
    width: 12, 
      height: '100%', 
      marginBottom: 5,
  },
  GgroupLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  GxAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 50,
    marginTop: 5,
  },
  GxAxisLabel: {
    fontSize: 14,
    marginHorizontal: 22,
  },
  GyAxis: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 200, // Height of the chart area
    marginRight: 10,
  },
  GyAxisLabel: {
    fontSize: 12,
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
  resultContainer: {
    marginTop: 16,
  },
  resultText: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default MyComponent;
