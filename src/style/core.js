import { StyleSheet } from 'react-native';

export const base = StyleSheet.create({
  red: {
    color: 'red'
  },
  navbar: {
    position: 'absolute',
    flex: 1,
    alignSelf: 'stretch',
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: 'blue',
    color: 'blue'
  },
  view: {
    padding: 20
  },
  scrollView: {
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 160,
    paddingLeft: 10
  },
  message: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000'
  },
  messageBody: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000'
  },
  messageCharacter: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000'
  },
  messageDate: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000'
  }
});
