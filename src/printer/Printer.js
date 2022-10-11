/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, useState } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  NativeModules,
  Platform,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';


import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

export default function Printer() {
  const [selectedPrinter, setSelectedPrinter] = useState(null)
  const [singleFile, setSingleFile] = useState([]);
  console.log('singleFile', singleFile[0]?.name);
  const printRemotePDF = async () => {
    // await RNPrint.print({ filePath: 'https://graduateland.com/api/v2/users/jesper/cv' })
    await RNPrint.print({ filePath: singleFile[0]?.uri, printerURL: '' })
  }

  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [ DocumentPicker.types.allFiles
          // DocumentPicker.types.pdf,
        //   DocumentPicker.types.csv,
        //   DocumentPicker.types.doc,
        //   DocumentPicker.types.docx,
        //   DocumentPicker.types.ppt,
        //   DocumentPicker.types.pptx,
        //   DocumentPicker.types.xls,
        //   DocumentPicker.types.xlsx,
        //   DocumentPicker.types.plainText,
        ],

      });
      setSingleFile(res);
      printRemotePDF()
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };


  // @NOTE iOS Only
  const selectPrinter = async () => {
    const selectedPrinter = await RNPrint.selectPrinter({ x: 100, y: 100 })
    this.setState({ selectedPrinter })
  }

  // @NOTE iOS Only
  const silentPrint = async () => {
    if (!selectedPrinter) {
      alert('Must Select Printer First')
    }

    const jobName = await RNPrint.print({
      printerURL: selectedPrinter.url,
      html: '<h1>Silent Print</h1>'
    })

  }


  const customOptions = () => {
    return (
      <View>
        {selectedPrinter &&
          <View>
            <Text>{`Selected Printer Name: ${selectedPrinter.name}`}</Text>
            <Text>{`Selected Printer URI: ${selectedPrinter.url}`}</Text>
          </View>
        }
        <Button onPress={() => selectPrinter()} title="Select Printer" />
        <Button onPress={() => silentPrint()} title="Silent Print" />
      </View>

    )
  }

  return (
    <View style={styles.container}>
      <View style={{
        height: 50,
        width: '100%',
        backgroundColor: 'rgb(11,46,76)',
        justifyContent: 'center',
        paddingHorizontal: 16
      }}>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>Pdf Printer</Text>

      </View>
      {/* {Platform.OS === 'ios' && customOptions()} */}
      {/* <Button onPress={() => printRemotePDF()} title="Print Remote PDF" /> */}
     
     <View style={styles.innerContainer}>
      <View  style={{borderRadius: 999, backgroundColor: 'rgb(165,164,165)', justifyContent: 'center', alignItems: 'center', width:110, height: 110}}>
        <Image style={{ width: 100, height: 100, tintColor: '#fff' }} source={require('../assets/doc.png')} />
      </View>
     </View>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={selectOneFile}
        style={{ position: 'absolute', bottom: 0, backgroundColor: 'rgb(11,46,76)', height: 50, width: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={{ fontSize: 15, color: '#fff', fontWeight: '500' }}>SELECT</Text>
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',

  },
  innerContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIconStyle: {
    width: 20,
    height: 20
  },
  buttonStyle: {
    flexDirection: 'row',
  }
});
