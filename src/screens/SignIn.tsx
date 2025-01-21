import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../constants';
import Logo from '../components/Logo';

const {width} = Dimensions.get('window');
const SignIn = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentView}>
        <Logo />
        <Text style={styles.signInText}>Sign in</Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Email or username"
            placeholderTextColor={colors.darkGray}
            style={styles.inputStyle}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.darkGray}
            style={styles.inputStyle}
            secureTextEntry
          />
          <TouchableOpacity style={styles.buttonView}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.helpView}>
            <Text style={styles.helpText}>Need Help signing in?</Text>
          </TouchableOpacity>
          <View style={{paddingVertical:20,}}>
            <Text style={styles.noAccountText}>Don't have a BBC account?</Text>
            <TouchableOpacity>
              <Text style={[styles.helpText, {textAlign: 'center'}]}>
                Register now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default SignIn;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 25,
    fontWeight: '700',
    marginTop: 20,
  },
  inputView: {
    width: width - 30,
    paddingVertical: 20,
  },

  inputStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.black,
    paddingHorizontal: 6,
    marginTop: 15,
    fontSize: 18,
    fontWeight: '500',
  },

  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
  buttonView: {
    backgroundColor: colors.blue,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 7,
  },
  helpView: {
    paddingVertical: 15,
    borderBottomColor: colors.black,
    borderBottomWidth: 0.5,
  },

  helpText: {
    color: colors.blue,
    fontWeight: '700',
    fontSize: 17,
    textDecorationLine: 'underline',
  },
  noAccountText: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 17,
    textAlign: 'center',
  },
});
