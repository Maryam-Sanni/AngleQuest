import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';


function DateTimeRange({ days, timeRange }) {
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
      })

  return (
    <View style={{ flexDirection: 'row', marginTop: 5, borderWidth: 1, borderRadius: 3, borderColor: 'green', }}>
      <Text style={{ color: 'green', backgroundColor: 'lightgreen', borderRightWidth: 1, borderColor: 'green',fontFamily:"Roboto-Light"}}>{days}</Text>
      <Text style={{ marginLeft: 5, marginTop: 3, color: 'green',fontFamily:"Roboto-Light" }}>{timeRange}</Text>
    </View>
  );
}

export default function Profile() {
  const navigation = useNavigation();
  const BookSession = () => {
    navigation.navigate('BookaSession');
  };
  const [fontsLoaded]=useFonts({
    "Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
      })

  return (
    <View style={{ flex: 1  }}>
      <Topbar />
      <View style={{ flexDirection: 'row', height: '100%' }}>
        <Sidebar />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ padding: 20 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 5, marginLeft: 230 }}>
                <View style={{ flex: 1, alignSelf: "flex-start" }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10,fontFamily:'Roboto-Light' }}>Expert Profile</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Image
                      source={require("../assets/User.png")}
                      style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20 }}
                    />
                    <View style={{ marginTop: 40, marginRight: 260 }}>
                      <Text style={{ fontSize: 16, fontWeight: "bold",fontFamily:'Roboto-Light' }}>John Smith</Text>
                      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 3.5 }}>
                        <Image
                          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/00e648efb83f97ef0794d800368a6ad24636e8f2ce415b2e1c45f6156d62607e?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                          style={{ width: 15, height: 15 }}
                        />
                        <Text style={{ marginLeft: 5, fontSize: 12,fontFamily:'Roboto-Light' }}>Architectural Engineer</Text>
                      </View>
                      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 1 }}>
                        <Image
                          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/850489e67e110e1e378aa7319abe9ae108ac518609ed527f0cc3ad25b9c266cf?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                          style={{ width: 15, height: 15 }}
                        />
                        <Text style={{ marginLeft: 5, fontSize: 12,fontFamily:'Roboto-Light' }}>London, United Kingdom</Text>
                      </View>
                      <Text style={{ marginTop: 3, fontStyle: "italic", color: "#32CD32",fontFamily:'Roboto-Light' }}>Online</Text>
                      {/* Date and time range */}
                      <DateTimeRange days=" Mon - Fri " timeRange="09:00pm - 11:00pm GMT+2 " />
                      <DateTimeRange days=" Sat  " timeRange="10:00am - 01:00pm GMT+2  " />
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1, alignSelf: "flex-end", marginTop: 30 }}>
                  <View style={{ alignItems: "flex-end", width: 120, marginLeft: 375 }}>
                    <Text style={{ alignSelf: "flex-end", fontSize: 18, fontWeight: "bold",fontFamily:'Roboto-Light' }}>$25/hr</Text>
                    <Image
                      source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/062a4b916dc84a95b4866d498eb1782b06b6566947808ad4f57d366b7f59bd20?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                      style={{ alignSelf: "center", marginTop: 2, width: "70%", aspectRatio: 5, marginLeft: 40 }}
                    />
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 8, paddingVertical: 5, borderColor: "green", borderWidth: 1, borderRadius: 5, marginLeft: 280 }}>
                      <Text style={{ color: "green",fontFamily:'Roboto-Light' }}>Career Advice</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={BookSession}  style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 8, paddingVertical: 5, backgroundColor: "coral", borderRadius: 5, marginLeft: 10 }}>
                      <Text style={{ color: "white",fontFamily:'Roboto-Light' }}>Book Session</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ flex: 1, marginLeft: 230 }}>
            <View style={{ marginTop: 10, paddingHorizontal: 10, marginRight: 30 }}>
              <Text style={{ fontSize: 16, textAlign: 'justify', marginTop: 10, color: 'green', fontWeight: '500',fontFamily:'Roboto-Light' }}>About</Text>
              <Text style={{ fontSize: 14, textAlign: 'justify', marginTop: 10,fontFamily:'Roboto-Light' }}>
                John Smith is a passionate architectural engineer with over 10 years of
                experience in designing and implementing innovative building solutions.
                With a Bachelor's degree in Architectural Engineering from XYZ University
                and a Master's degree in Sustainable Design, John brings a unique blend of
                technical expertise and environmental consciousness to his projects.
              </Text>
              <Text style={{ fontSize: 14, textAlign: 'justify', marginTop: 10,fontFamily:'Roboto-Light' }}>
                Throughout his career, John has worked on a diverse range of projects,
                including residential, commercial, and institutional buildings. His
                portfolio showcases his ability to seamlessly integrate cutting-edge
                technology with elegant design principles, resulting in spaces that are
                both functional and aesthetically pleasing.
              </Text>
              <Text style={{ fontSize: 14, textAlign: 'justify', marginTop: 10,fontFamily:'Roboto-Light' }}>
                John is committed to sustainability and strives to incorporate
                energy-efficient solutions and green building practices into every project
                he undertakes. He is well-versed in LEED certification requirements and
                actively seeks out opportunities to minimize environmental impact while
                maximizing efficiency and comfort for building occupants.
              </Text>
              <Text style={{ fontSize: 14, textAlign: 'justify', marginTop: 10,fontFamily:'Roboto-Light' }}>
                In addition to his technical skills, John is a collaborative team player
                who excels at communication and project management. He thrives in dynamic
                environments and is adept at coordinating with architects, contractors,
                and other stakeholders to ensure successful project delivery.
              </Text>
              <Text style={{ fontSize: 14, textAlign: 'justify', marginTop: 10,fontFamily:'Roboto-Light' }}>
                Outside of work, John enjoys hiking, photography, and volunteering his
                time to support local community initiatives focused on sustainability and
                environmental conservation.
              </Text>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 30 }} />
            </View>
          </View>

          {/* Employment History */}
          <View style={{ flex: 1, marginLeft: 230, marginRight: 50, marginTop: -35, marginBottom: 70 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: '500', color: 'green',fontFamily:'Roboto-Light' }}>Employment History</Text>
            </View>
            <Text style={{ marginTop: 10, fontSize: 14, color: 'green',fontFamily:'Roboto-Light' }}>
              Senior Architectural Engineer | KIX Architecture Firm
            </Text>
            <Text style={{ marginTop: 3, fontSize: 12, color: 'grey',fontFamily:'Roboto-Light' }}>May 2020 - Present</Text>
            <Text style={{ marginTop: 15, fontSize: 14,fontFamily:'Roboto-Light' }}>
              - Lead the design and development of high-profile commercial projects, overseeing a team of engineers and architects.
              {'\n'}
              - Implemented innovative sustainable design strategies, resulting in LEED Platinum certification for several projects.
              {'\n'}
              - Collaborated closely with clients to understand their needs and objectives, delivering tailored solutions within budget and timeline constraints.
              {'\n'}
              - Conducted technical reviews and provided mentorship to junior staff members to foster professional growth and development.
            </Text>
            <Text style={{ marginTop: 15, fontSize: 14, color: 'green',fontFamily:'Roboto-Light' }}>
              Architectural Engineer | Phoenix Engineering Consultants
            </Text>
            <Text style={{ marginTop: 5, fontSize: 12, color: 'grey',fontFamily:'Roboto-Light' }}>July 2015 - Jan 2020</Text>
            <Text style={{ marginTop: 15, marginLeft: 5, fontSize: 14,fontFamily:'Roboto-Light' }}>
              - Designed and managed the construction of various residential and mixed-use developments, ensuring compliance with building codes and regulations.
              {'\n'}
              - Utilized advanced software tools such as Revit and AutoCAD to create detailed architectural drawings and 3D models.
              {'\n'}
              - Conducted site visits and inspections to monitor construction progress and address any design or engineering challenges.
              {'\n'}
              Coordinated with contractors, subcontractors, and vendors to procure materials and equipment, optimizing project efficiency and cost-effectiveness.
            </Text>
            <Text style={{ marginTop: 15, fontSize: 14, color: 'green',fontFamily:'Roboto-Light' }}>
              Junior Architectural Engineer | Zenith Design & Construction
            </Text>
            <Text style={{ marginTop: 5, fontSize: 12, color: 'grey',fontFamily:'Roboto-Light' }}>Sept 2012 - Feb 2015</Text>
            <Text style={{ marginTop: 15, marginLeft: 5, fontSize: 14,fontFamily:'Roboto-Light' }}>
              - Assisted senior engineers in the design and analysis of structural systems for commercial and institutional buildings.
              {'\n'}
              - Conducted feasibility studies and prepared design proposals, contributing to the successful acquisition of new projects.
              {'\n'}
              - Participated in interdisciplinary project meetings, communicating effectively with architects, MEP engineers, and other stakeholders.
              {'\n'}
              Developed proficiency in building information modeling (BIM) software and contributed to the integration of BIM workflows within the firm.
            </Text>
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 30 }} />

          {/* Skills */}
          <View style={{ marginLeft: 230, marginTop: 20, marginRight: 50 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: '500', color: 'green',fontFamily:'Roboto-Light' }}>Skills</Text>
            </View>
          </View>
          <View style={{ marginLeft: 220, marginRight: 50 }}>
            <View style={styles.container}>
              <View style={styles.row}>
                <Text style={[styles.text, { backgroundColor: '#d3f9d8' }]}>Building Information Modeling</Text>
                <Text style={[styles.text, { backgroundColor: '#d3f9d8' }]}>Structural Analysis Software</Text>
                <Text style={[styles.text, { backgroundColor: '#d3f9d8' }]}>Construction Documentation</Text>
                <Text style={[styles.text, { backgroundColor: '#d3f9d8' }]}>Cost Estimation</Text>
                <Text style={[styles.text, { backgroundColor: '#d3f9d8' }]}>AutoCAD</Text>
              </View>
            </View>
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 30 }} />
          {/* Certifications */}
          <View style={{ marginLeft: 230, marginTop: 20, marginRight: 50 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: '500', color: 'green',fontFamily:'Roboto-Light' }}>Certifications</Text>
            </View>
            <Text style={{ marginTop: 15, marginLeft: 5, fontSize: 14, fontFamily:'Roboto-Light'}}>
              - Licensed Professional Engineer (PE) - [London/United Kingdom]
              {'\n'}
              - LEED Accredited Professional (LEED AP)
              {'\n'}
              - Revit Architecture Certified Professional
              {'\n'}
              - Autodesk Certified Professional (AutoCAD)
              {'\n'}
              - Certified Passive House Designer (CPHD)
              {'\n'}
              - Building Performance Institute (BPI) Certification
              {'\n'}
              - Certified Construction Specifier (CCS)
              {'\n'}
              - Certified Energy Manager (CEM)
            </Text>
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 30 }} />
          {/* Other Experience*/}
          <View style={{ marginLeft: 230, marginTop: 20, marginRight: 50 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: '500', color: 'green',fontFamily:'Roboto-Light' }}>Other Experience</Text>
            </View>
            <Text style={{ marginTop: 15, marginLeft: 5, fontSize: 14,fontFamily:'Roboto-Light' }}>
              - Technical Writing
              {'\n'}
              - Research and Development
              {'\n'}
              - Quality Assurance/Quality Control (QA/QC)
              {'\n'}
              - Client Relationship Management
              {'\n'}
              - Construction Administration
              {'\n'}
              - Feasibility Studies
              {'\n'}
              - Risk Management
            </Text>
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 30 }} />
          {/* Expectations*/}
          <View style={{ marginLeft: 230, marginTop: 20, marginRight: 50 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',fontFamily:'Roboto-Light' }}>
              <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: '500', color: 'green' }}>What I Expect</Text>
            </View>
            <Text style={{ marginTop: 15, marginLeft: 5, fontSize: 14, textDecorationLine: 'underline',fontFamily:'Roboto-Light' }}>
              - Technical Competence: Demonstrating proficiency in architectural design principles, structural analysis, and building systems.
              {'\n'}
              - Problem-Solving Skills: Ability to solve complex design challenges and address technical issues effectively.
              {'\n'}
              - Communication: Clear communication of ideas, both verbally and visually, to convey design concepts and collaborate with team members.
              {'\n'}
              - Project Experience: Providing examples of past projects and contributions, showcasing relevant skills and experience.
              {'\n'}
              - Teamwork: Ability to work collaboratively with architects, engineers, and other stakeholders to achieve project goals.
              {'\n'}
              - Adaptability: Flexibility to adapt to changing project requirements and priorities.
              {'\n'}
              - Attention to Detail: Ensuring accuracy and precision in design documentation and calculations.
              {'\n'}
              - Commitment to Quality: Demonstrating a commitment to delivering high-quality, sustainable designs that meet client needs and regulatory requirements.
              {'\n'}
              - Continued Learning: Showing a willingness to stay updated on industry trends, technologies, and best practices.
              {'\n'}
              - Professionalism: Presenting oneself professionally, demonstrating integrity, and adhering to ethical standards in all interactions.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    marginTop: 5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  text: {
    borderRadius: 20,
    padding: 10,
    margin: 5,
    color: 'green',
    fontSize: 12,
    textAlign: 'center',
  },
};
