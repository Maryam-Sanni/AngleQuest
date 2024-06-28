import React, { useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, ImageBackground, Modal,  } from 'react-native';
import Sidebar from '../components/expertssidebar';
import Topbar from '../components/expertstopbar';
import { BlurView } from 'expo-blur';
import EmploymentHistoryModal from'../components/EditEmplyHistory'; 
import SkillsEditModal from '../components/SkillsEditModal';
import CertificationsEditModal from '../components/CertificationsEditModal';
import OtherExperiencesEditModal from '../components/OtherExperiencesEditModal';
import PreferredLocationsEditModal from '../components/PreferredLocationsEditModal';
import PreferredRolesEditModal from '../components/PreferredRolesEditModal';

import {useFonts} from "expo-font"

export default function Profile() {
  const initialHistory = [
    {
      id: 1,
      position: 'Senior Architectural Engineer',
      company: 'KIX Architecture Firm',
      duration: 'May 2020 - Present',
      description: `- Lead the design and development of high-profile commercial projects, overseeing a team of engineers and architects.
- Implemented innovative sustainable design strategies, resulting in LEED Platinum certification for several projects.
- Collaborated closely with clients to understand their needs and objectives, delivering tailored solutions within budget and timeline constraints.
- Conducted technical reviews and provided mentorship to junior staff members to foster professional growth and development.`,
    },
    {
      id: 2,
      position: 'Architectural Engineer',
      company: 'Phoenix Engineering Consultants',
      duration: 'July 2015 - Jan 2020',
      description: `- Designed and managed the construction of various residential and mixed-use developments, ensuring compliance with building codes and regulations.
- Utilized advanced software tools such as Revit and AutoCAD to create detailed architectural drawings and 3D models.
- Conducted site visits and inspections to monitor construction progress and address any design or engineering challenges.
- Coordinated with contractors, subcontractors, and vendors to procure materials and equipment, optimizing project efficiency and cost-effectiveness.`,
    },
    {
      id: 3,
      position: 'Junior Architectural Engineer',
      company: 'Zenith Design & Construction',
      duration: 'Sept 2012 - Feb 2015',
      description: `- Assisted senior engineers in the design and analysis of structural systems for commercial and institutional buildings.
- Conducted feasibility studies and prepared design proposals, contributing to the successful acquisition of new projects.
- Participated in interdisciplinary project meetings, communicating effectively with architects, MEP engineers, and other stakeholders.
- Developed proficiency in building information modeling (BIM) software and contributed to the integration of BIM workflows within the firm.`,
    },
  ];

  const [isModalVisible, setModalVisible] = useState(false);
  const [currentHistory, setCurrentHistory] = useState(null);
  const [employmentHistories, setEmploymentHistories] = useState(initialHistory);

  const handleOpenPress = (history) => {
    setCurrentHistory(history);
    setModalVisible(true);
  };

  const handleSave = (updatedHistory) => {
    const updatedHistories = employmentHistories.map((history) =>
      history.id === updatedHistory.id ? updatedHistory : history
    );
    setEmploymentHistories(updatedHistories);
  };

  const [skills, setSkills] = useState([
    'Building Information Modeling',
    'Structural Analysis Software',
    'Construction Documentation',
    'Cost Estimation',
    'AutoCAD'
  ]);

  const [skillsmodalVisible, setskillsModalVisible] = useState(false);

  const handleOpenSkills = () => {
    setskillsModalVisible(true);
  };

  const handleCloseModal = () => {
    setskillsModalVisible(false);
  };

  const handleSaveSkills = (newSkills) => {
    setSkills(newSkills);
  };

  const [preferredLocations, setPreferredLocations] = useState([
    'United States',
    'Germany',
    'Canada',
    'UAE',
    'Nigeria',
  ]);

  const [preferredLocationsModalVisible, setPreferredLocationsModalVisible] = useState(false);

  const handleOpenPreferredLocations = () => {
    setPreferredLocationsModalVisible(true);
  };

  const handleClosePreferredLocationsModal = () => {
    setPreferredLocationsModalVisible(false);
  };

  const handleSavePreferredLocations = (newPreferredLocations) => {
    setPreferredLocations(newPreferredLocations);
  };

  const [certifications, setCertifications] = useState([
    'Licensed Professional Engineer (PE) - [London/United Kingdom]',
    'LEED Accredited Professional (LEED AP)',
    'Revit Architecture Certified Professional',
    'Autodesk Certified Professional (AutoCAD)',
    'Certified Passive House Designer (CPHD)',
    'Building Performance Institute (BPI) Certification',
    'Certified Construction Specifier (CCS)',
    'Certified Energy Manager (CEM)'
  ]);

  const [certificationsmodalVisible, setcertificationsModalVisible] = useState(false);

  const handleOpenCertifications = () => {
    setcertificationsModalVisible(true);
  };

  const handleClosecertificationsModal = () => {
    setcertificationsModalVisible(false);
  };

  const handleSaveCertifications = (newCertifications) => {
    setCertifications(newCertifications);
  };

  const [otherExperiences, setOtherExperiences] = useState([
    'Technical Writing',
    'Research and Development',
    'Quality Assurance/Quality Control (QA/QC)',
    'Client Relationship Management',
    'Construction Administration',
    'Feasibility Studies',
    'Risk Management'
  ]);
  const [otherExperiencesModalVisible, setOtherExperiencesModalVisible] = useState(false);

  const handleOpenOtherExperiences = () => {
    setOtherExperiencesModalVisible(true);
  };

  const handleCloseOtherExperiencesModal = () => {
    setOtherExperiencesModalVisible(false);
  };

  const handleSaveOtherExperiences = (newOtherExperiences) => {
    setOtherExperiences(newOtherExperiences);
  };

  const [preferredRoles, setPreferredRoles] = useState([
    'Java Programming',
    'Microsoft Azure',
    'SAP',
  ]);
  
  const [preferredRolesModalVisible, setPreferredRolesModalVisible] = useState(false);
  
  const handleOpenPreferredRoles = () => {
    setPreferredRolesModalVisible(true);
  };
  
  const handleClosePreferredRolesModal = () => {
    setPreferredRolesModalVisible(false);
  };
  
  const handleSavePreferredRoles = (newPreferredRoles) => {
    setPreferredRoles(newPreferredRoles);
  };

  const [fontsLoaded]=useFonts({
    'Varta-Light':require("../assets/fonts/Varta-Light.ttf"),
"Roboto-Light":require("../assets/fonts/Roboto-Light.ttf"),
  })
  return (
    <ImageBackground
    source={require ('../assets/Background.png') }
  style={{ height: '110%', width: '100%',flex: 1}}
>
<BlurView intensity={70} style={styles.blurBackground}>
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
         <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
         <View style={styles.glassBox}>
         <View style={styles.pagecontainer}>
         <View style={{ padding: 20 }}>
            <View style={{ flex: 1 }}>
              {/* Profile Card */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
              <View style={{ flex: 1, alignSelf: "flex-start" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold",fontFamily:"Roboto-Light" }}>My Profile</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Image
                    source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/42eb8a1c745d5f4771d12d615bda303b93fe9d7cb8d0941022cdd47c4212a79e?apiKey=7b9918e68d9b487793009b3aea5b1a32&width=200' }}
                    style={{ width: 79, height: 79, borderRadius: 79, marginRight: 20 }}
                    resizeMode="cover"
                  />
                  <View style={{ marginRight: 800 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold',fontFamily:"Roboto-Light" }}>John Smith</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                      <Image
                        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/00e648efb83f97ef0794d800368a6ad24636e8f2ce415b2e1c45f6156d62607e?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                        style={{ width: 20, height: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ marginLeft: 5, fontSize: 12,fontFamily:"Roboto-Light" }}>Architectural Engineer</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                      <Image
                        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/850489e67e110e1e378aa7319abe9ae108ac518609ed527f0cc3ad25b9c266cf?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                        style={{ width: 20, height: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ marginLeft: 5, fontSize: 12,fontFamily:"Roboto-Light" }}>London, United Kingdom</Text>
                    </View>
                    <Text style={{ marginTop: 5, fontSize: 12, fontStyle: 'italic', color: '#63EC55',fontFamily:"Roboto-Light" }}>Online</Text>
                  </View>
                </View>
                </View>
                <View style={{ alignItems: 'flex-end', alignSelf: 'flex-start', justifyContent: 'center', marginRight: 20 }}>
                  <Text style={{ fontSize: 16, color: '#206C00', textAlign: 'right', fontWeight: 'bold',fontFamily:"Roboto-Light" }}>Available Balance</Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5,fontFamily:"Roboto-Light" }}>$1,234.00</Text>
                  <Text style={{ fontSize: 16, color: 'black', marginTop: 10,fontFamily:"Roboto-Light" }}>$25/hr</Text>
                  <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 10, marginTop: 10, backgroundColor: '#f7fff4', borderRadius: 5, borderWidth: 1, borderColor: '#206C00' }}>
                    <Text style={{ fontSize: 12,fontFamily:"Roboto-Light" }}>Preview Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Profile Description */}
          <View style={{ }}>
            <View style={{ marginTop: 10, paddingHorizontal: 10, marginRight: 30 }}>
              <Text style={{ fontSize: 16, textAlign: 'justify', marginTop: 10, color: '#206C00', fontWeight: 'bold',    fontFamily:"Roboto-Light"
 }}>About</Text>
              <Text style={{ fontSize: 14, textAlign: 'justify', marginTop: 10,    fontFamily:"Roboto-Light"
 }}>
                John Smith is a passionate architectural engineer with over 10 years of
                experience in designing and implementing innovative building solutions.
                With a Bachelor's degree in Architectural Engineering from XYZ University
                and a Master's degree in Sustainable Design, John brings a unique blend of
                technical expertise and environmental consciousness to his projects.
              </Text>
              <Text style={{ fontSize: 14, textAlign: 'justify', marginTop: 10,    fontFamily:"Roboto-Light" }}>
                Throughout his career, John has worked on a diverse range of projects,
                including residential, commercial, and institutional buildings. His
                portfolio showcases his ability to seamlessly integrate cutting-edge
                technology with elegant design principles, resulting in spaces that are
                both functional and aesthetically pleasing.
              </Text>
              <Text style={{ fontSize: 14, textAlign: 'justify', marginTop: 10,    fontFamily:"Roboto-Light" }}>
                John is committed to sustainability and strives to incorporate
                energy-efficient solutions and #206C00 building practices into every project
                he undertakes. He is well-versed in LEED certification requirements and
                actively seeks out opportunities to minimize environmental impact while
                maximizing efficiency and comfort for building occupants.
              </Text>
              <Text style={{ fontSize: 14, textAlign: 'justify', marginTop: 10,    fontFamily:"Roboto-Light"
 }}>
                In addition to his technical skills, John is a collaborative team player
                who excels at communication and project management. He thrives in dynamic
                environments and is adept at coordinating with architects, contractors,
                and other stakeholders to ensure successful project delivery.
              </Text>
              <Text style={{ fontSize: 14, textAlign: 'justify', marginTop: 10,    fontFamily:"Roboto-Light"
 }}>
                Outside of work, John enjoys hiking, photography, and volunteering his
                time to support local community initiatives focused on sustainability and
                environmental conservation.
              </Text>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCC', marginTop: 30 }} />
            </View>
          </View>

          {/* Employment History */}
          <View style={{ marginTop: 20}}>
          {employmentHistories.map((history) => (
        <View key={history.id} style={styles.historyItem}>
          <View style={styles.historyheader}>
            <Text style={styles.historyheaderText}>{history.position} | {history.company}</Text>
            <TouchableOpacity onPress={() => handleOpenPress(history)}>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6326875147d814303309b6b133e12c983f42b31e7c4e6b223f7fbc169c262b88?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.duration}>{history.duration}</Text>
          <Text style={styles.description}>{history.description}</Text>
        </View>
      ))}

      {currentHistory && (
        <EmploymentHistoryModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          employmentHistory={currentHistory}
          onSave={handleSave}
        />
      )}
      </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCC', marginTop: 30 }} />

          {/* Skills */}
          <View style={{ marginTop: 20, marginRight: 30 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: 'bold', color: '#206C00',    fontFamily:"Roboto-Light"
 }}>Skills</Text>
        <TouchableOpacity onPress={handleOpenSkills}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6326875147d814303309b6b133e12c983f42b31e7c4e6b223f7fbc169c262b88?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
            style={{ width: 20, height: 20 }} // adjust width and height as needed
            resizeMode="cover" // or any other resizeMode that suits your need
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginRight: 50 }}>
        <View style={styles.container}>
          <View style={styles.row}>
            {skills.map((skill, index) => (
              <Text key={index} style={[styles.text, { backgroundColor: '#d3f9d8' }]}>{skill}</Text>
            ))}
          </View>
        </View>
      </View>

      <SkillsEditModal
        visible={skillsmodalVisible}
        skills={skills}
        onClose={handleCloseModal}
        onSave={handleSaveSkills}
      />
    </View>
    
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCC',  marginTop: 30 }} />
                           {/* Certifications */}
                           <View style={{ marginTop: 20, marginRight: 30 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: '500', color: '#206C00' ,    fontFamily:"Roboto-Light"
}}>Certifications</Text>
        <TouchableOpacity onPress={handleOpenCertifications}>
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6326875147d814303309b6b133e12c983f42b31e7c4e6b223f7fbc169c262b88?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
            style={{ width: 20, height: 20 }} // adjust width and height as needed
            resizeMode="cover" // or any other resizeMode that suits your need
          />
        </TouchableOpacity>
      </View>
      <Text style={{ marginTop: 15, marginLeft: 5, fontSize: 14,    fontFamily:"Roboto-Light"
 }}>
        {certifications.map((cert, index) => (
          <Text key={index}>
            - {cert} {'\n'}
          </Text>
        ))}
      </Text>

      <CertificationsEditModal
        visible={certificationsmodalVisible}
        certifications={certifications}
        onClose={handleClosecertificationsModal}
        onSave={handleSaveCertifications}
      />
    </View>
 <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCC', marginTop: 30 }} />
                      {/* Other Experience*/}
  <View style={{ marginTop: 20, marginRight: 30 }}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: '500', color: '#206C00',    fontFamily:"Roboto-Light"
 }}>Other Experience</Text>
    <TouchableOpacity onPress={handleOpenOtherExperiences}>
      <Image
        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6326875147d814303309b6b133e12c983f42b31e7c4e6b223f7fbc169c262b88?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
        style={{ width: 20, height: 20 }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  </View>
  <Text style={{ marginTop: 15, marginLeft: 5, fontSize: 14,    fontFamily:"Roboto-Light"
 }}>
    {otherExperiences.map((experience, index) => (
      <Text key={index}>
        - {experience} {'\n'}
      </Text>
    ))}
  </Text>

  <OtherExperiencesEditModal
    visible={otherExperiencesModalVisible}
    otherExperiences={otherExperiences}
    onClose={handleCloseOtherExperiencesModal}
    onSave={handleSaveOtherExperiences}
  />
</View>

<View style={{ borderBottomWidth: 1, borderBottomColor: '#CCC', marginTop: 30 }} />
                     {/*Location*/}
                     <View style={{ marginTop: 20, marginRight: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: '500', color: '#206C00',    fontFamily:"Roboto-Light"
 }}>Preferred Locations</Text>
                      <TouchableOpacity onPress={handleOpenPreferredLocations}>
                        <Image
                          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6326875147d814303309b6b133e12c983f42b31e7c4e6b223f7fbc169c262b88?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                          style={{ width: 20, height: 20 }}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    </View>
                    
                    <View style={{ marginRight: 50 }}>
        <View style={styles.container}>
          <View style={styles.row}>
          {preferredLocations.map((location, index) => (
              <Text key={index} style={[styles.text, { backgroundColor: '#d3f9d8',    fontFamily:"Roboto-Light"
              }]}>{location}</Text>
            ))}
          </View>
        </View>
      </View>

                    <PreferredLocationsEditModal
                      visible={preferredLocationsModalVisible}
                      preferredLocations={preferredLocations}
                      onClose={handleClosePreferredLocationsModal}
                      onSave={handleSavePreferredLocations}
                    />
                  </View>
                   {/*Roles*/}
                   <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCC', marginTop: 30 }} />
                  <View style={{ marginTop: 20, marginRight: 30 }}>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
    <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: '500', color: '#206C00' ,    fontFamily:"Roboto-Light"
}}>Preferred Roles</Text>
    <TouchableOpacity onPress={handleOpenPreferredRoles}>
      <Image
        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6326875147d814303309b6b133e12c983f42b31e7c4e6b223f7fbc169c262b88?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
        style={{ width: 20, height: 20 }} // adjust width and height as needed
        resizeMode="cover" // or any other resizeMode that suits your need
      />
    </TouchableOpacity>
  </View>
  <View style={{ marginRight: 50 }}>
        <View style={styles.container}>
          <View style={styles.row}>
          {preferredRoles.map((role, index) => (
              <Text key={index} style={[styles.text, { backgroundColor: '#d3f9d8',    fontFamily:"Roboto-Light"
              }]}>{role}</Text>
            ))}
          </View>
        </View>
      </View>


  <PreferredRolesEditModal
    visible={preferredRolesModalVisible}
    preferredRoles={preferredRoles}
    onClose={handleClosePreferredRolesModal}
    onSave={handleSavePreferredRoles}
  />
</View>
    </View>
    </View>
        </ScrollView>
      </View>
    </View>
    </BlurView>
    </ImageBackground>
  );
}

const styles = {
  pagecontainer: {
    backgroundColor: '#f7fff4',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20, 
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    borderWidth: 2, 
    borderColor: 'rgba(225,225,212,0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
 glassBox: {
  backgroundColor: 'rgba(225,255,212,0.3)',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 30,
    marginLeft: 240,
    marginRight: 30,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
    color: '#206C00',
    textAlign: 'center',
  },
  blurBackground: {
    flex: 1, 
    backgroundColor: 'rgba(125,255,212,0.3)',
  },
  duration: {
    marginTop: 3,
    fontSize: 12,
    color: 'grey',
    fontFamily:"Roboto-Light"

  },
  description: {
    marginTop: 15,
    fontSize: 14,
    fontFamily:"Roboto-Light"

  },
  historyItem: {
    marginBottom: 20,
  },
  historyheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyheaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#206C00',
    fontFamily:"Roboto-Light"

  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
};