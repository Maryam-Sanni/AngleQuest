import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import Sidebar from '../components/expertssidebar';
import Topbar from '../components/expertstopbar';

export default function Profile() {
  return (
    <View style={{ flex: 1 }}>
      <Topbar />
      <View style={{ flexDirection: 'row', flex: 1 }}>
        <Sidebar />
         <ScrollView contentContainerStyle={{ flexGrow: 1, maxHeight: 500 }}>
          <View style={{ padding: 20 }}>
            <View style={{ flex: 1 }}>
              {/* Profile Card */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50, backgroundColor: 'white', marginLeft: 220 }}>
              <View style={{ flex: 1, alignSelf: "flex-start" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>My Profile</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Image
                    source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/42eb8a1c745d5f4771d12d615bda303b93fe9d7cb8d0941022cdd47c4212a79e?apiKey=7b9918e68d9b487793009b3aea5b1a32&width=200' }}
                    style={{ width: 79, height: 79, borderRadius: 79, marginRight: 20 }}
                    resizeMode="cover"
                  />
                  <View style={{ marginRight: 800 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>John Smith</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                      <Image
                        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/00e648efb83f97ef0794d800368a6ad24636e8f2ce415b2e1c45f6156d62607e?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                        style={{ width: 20, height: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ marginLeft: 5, fontSize: 12 }}>Architectural Engineer</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                      <Image
                        source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/850489e67e110e1e378aa7319abe9ae108ac518609ed527f0cc3ad25b9c266cf?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                        style={{ width: 20, height: 20 }}
                        resizeMode="contain"
                      />
                      <Text style={{ marginLeft: 5, fontSize: 12 }}>London, United Kingdom</Text>
                    </View>
                    <Text style={{ marginTop: 5, fontSize: 12, fontStyle: 'italic', color: '#20C600' }}>Online</Text>
                  </View>
                </View>
                </View>
                <View style={{ alignItems: 'flex-end', alignSelf: 'flex-start', justifyContent: 'center', marginRight: 20 }}>
                  <Text style={{ fontSize: 14, color: 'green', textAlign: 'right', fontWeight: '600' }}>Available Balance</Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5 }}>$1,234.00</Text>
                  <Text style={{ fontSize: 16, color: 'grey', marginTop: 10 }}>$25/hr</Text>
                  <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 10, marginTop: 10, backgroundColor: '#FFFFFF', borderRadius: 5, borderWidth: 1, borderColor: 'green' }}>
                    <Text style={{ fontSize: 12 }}>Preview Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Profile Description */}
          <View style={{ marginLeft: 230 }}>
            <View style={{ marginTop: 10, paddingHorizontal: 10, marginRight: 30 }}>
              <Text style={{ fontSize: 16, textAlign: 'justify', marginTop: 10, color: 'green', fontWeight: '500' }}>About</Text>
              <Text style={{ fontSize: 14, textAlign: 'justify', marginTop: 10 }}>
                John Smith is a passionate architectural engineer with over 10 years of
                experience in designing and implementing innovative building solutions.
                With a Bachelor's degree in Architectural Engineering from XYZ University
                and a Master's degree in Sustainable Design, John brings a unique blend of
                technical expertise and environmental consciousness to his projects.
              </Text>
              <Text style={{ fontSize: 14, textAlign: 'justify', marginTop: 10 }}>
                Throughout his career, John has worked on a diverse range of projects,
                including residential, commercial, and institutional buildings. His
                portfolio showcases his ability to seamlessly integrate cutting-edge
                technology with elegant design principles, resulting in spaces that are
                both functional and aesthetically pleasing.
              </Text>
              <Text style={{ fontSize: 14, textAlign: 'justify', marginTop: 10 }}>
                John is committed to sustainability and strives to incorporate
                energy-efficient solutions and green building practices into every project
                he undertakes. He is well-versed in LEED certification requirements and
                actively seeks out opportunities to minimize environmental impact while
                maximizing efficiency and comfort for building occupants.
              </Text>
              <Text style={{ fontSize: 14, textAlign: 'justify', marginTop: 10 }}>
                In addition to his technical skills, John is a collaborative team player
                who excels at communication and project management. He thrives in dynamic
                environments and is adept at coordinating with architects, contractors,
                and other stakeholders to ensure successful project delivery.
              </Text>
              <Text style={{ fontSize: 14, textAlign: 'justify', marginTop: 10 }}>
                Outside of work, John enjoys hiking, photography, and volunteering his
                time to support local community initiatives focused on sustainability and
                environmental conservation.
              </Text>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: 30 }} />
            </View>
          </View>

          {/* Employment History */}
          <View style={{ marginLeft: 230, marginRight: 30, marginTop: 20, marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: '500', color: 'green' }}>Employment History</Text>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6326875147d814303309b6b133e12c983f42b31e7c4e6b223f7fbc169c262b88?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={{ width: 20, height: 20 }} // adjust width and height as needed
                resizeMode="cover" // or any other resizeMode that suits your need
              />
            </View>
            <Text style={{ marginTop: 10, fontSize: 14, color: 'green' }}>
              Senior Architectural Engineer | KIX Architecture Firm
            </Text>
            <Text style={{ marginTop: 3, fontSize: 12, color: 'grey' }}>May 2020 - Present</Text>
            <Text style={{ marginTop: 15, fontSize: 14 }}>
              - Lead the design and development of high-profile commercial projects, overseeing a team of engineers and architects.
              {'\n'}
              - Implemented innovative sustainable design strategies, resulting in LEED Platinum certification for several projects.
              {'\n'}
              - Collaborated closely with clients to understand their needs and objectives, delivering tailored solutions within budget and timeline constraints.
              {'\n'}
              - Conducted technical reviews and provided mentorship to junior staff members to foster professional growth and development.
            </Text>
            <Text style={{ marginTop: 15, fontSize: 14, color: 'green' }}>
              Architectural Engineer | Phoenix Engineering Consultants
            </Text>
            <Text style={{ marginTop: 5, fontSize: 12, color: 'grey' }}>July 2015 - Jan 2020</Text>
            <Text style={{ marginTop: 15, marginLeft: 5, fontSize: 14 }}>
              - Designed and managed the construction of various residential and mixed-use developments, ensuring compliance with building codes and regulations.
              {'\n'}
              - Utilized advanced software tools such as Revit and AutoCAD to create detailed architectural drawings and 3D models.
              {'\n'}
              - Conducted site visits and inspections to monitor construction progress and address any design or engineering challenges.
              {'\n'}
              Coordinated with contractors, subcontractors, and vendors to procure materials and equipment, optimizing project efficiency and cost-effectiveness.
            </Text>
            <Text style={{ marginTop: 15, fontSize: 14, color: 'green' }}>
              Junior Architectural Engineer | Zenith Design & Construction
            </Text>
            <Text style={{ marginTop: 5, fontSize: 12, color: 'grey'  }}>Sept 2012 - Feb 2015</Text>
            <Text style={{ marginTop: 15, marginLeft: 5, fontSize: 14 }}>
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
              <View style={{ marginLeft: 230, marginTop: 20, marginRight: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: '500', color: 'green' }}>Skills</Text>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6326875147d814303309b6b133e12c983f42b31e7c4e6b223f7fbc169c262b88?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={{ width: 20, height: 20 }} // adjust width and height as needed
                resizeMode="cover" // or any other resizeMode that suits your need
              />
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
    <View style={{ marginLeft: 230, marginTop: 20, marginRight: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: '500', color: 'green' }}>Certifications</Text>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6326875147d814303309b6b133e12c983f42b31e7c4e6b223f7fbc169c262b88?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={{ width: 20, height: 20 }} // adjust width and height as needed
                resizeMode="cover" // or any other resizeMode that suits your need
              />
            </View>
            <Text style={{ marginTop: 15, marginLeft: 5, fontSize: 14 }}>
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
 <View style={{ marginLeft: 230, marginTop: 20, marginRight: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: '500', color: 'green' }}>Other Experience</Text>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6326875147d814303309b6b133e12c983f42b31e7c4e6b223f7fbc169c262b88?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={{ width: 20, height: 20 }} // adjust width and height as needed
                resizeMode="cover" // or any other resizeMode that suits your need
              />
            </View>
            <Text style={{ marginTop: 15, marginLeft: 5, fontSize: 14 }}>
              - Technical Writing
              {'\n'}
              -Research and Development
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
                     {/*Location*/}
                     <View style={{ marginLeft: 230, marginTop: 20, marginRight: 30  }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: '500', color: 'green' }}>Preferred Locations</Text>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6326875147d814303309b6b133e12c983f42b31e7c4e6b223f7fbc169c262b88?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={{ width: 20, height: 20 }} // adjust width and height as needed
                resizeMode="cover" // or any other resizeMode that suits your need
              />
            </View>
                    </View>
                    <View style={{ marginLeft: 220, marginRight: 50, marginBottom: 50 }}>
                    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.text, { backgroundColor: '#d3f9d8' }]}>United States</Text>
        <Text style={[styles.text, { backgroundColor: '#d3f9d8' }]}>Germany</Text>
        <Text style={[styles.text, { backgroundColor: '#d3f9d8' }]}>Canada</Text>
        <Text style={[styles.text, { backgroundColor: '#d3f9d8' }]}>UAE</Text>
        <Text style={[styles.text, { backgroundColor: '#d3f9d8' }]}>Nigeria</Text>
      </View>
    </View>
    </View>
     <View style={{ marginLeft: 230, marginTop: 5, marginRight: 30  }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, textAlign: 'justify', fontWeight: '500', color: 'green' }}>Preferred Roles</Text>
              <Image
                source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6326875147d814303309b6b133e12c983f42b31e7c4e6b223f7fbc169c262b88?apiKey=7b9918e68d9b487793009b3aea5b1a32&' }}
                style={{ width: 20, height: 20 }} // adjust width and height as needed
                resizeMode="cover" // or any other resizeMode that suits your need
              />
            </View>
                    </View>
                    <View style={{ marginLeft: 220, marginRight: 50, marginBottom: 50 }}>
                    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.text, { backgroundColor: '#d3f9d8' }]}>Auto CAD</Text>
        <Text style={[styles.text, { backgroundColor: '#d3f9d8' }]}>Microsoft Azure</Text>
        <Text style={[styles.text, { backgroundColor: '#d3f9d8' }]}>SAP</Text>
      </View>
    </View>
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
    textAlign: 'center',
  },
};