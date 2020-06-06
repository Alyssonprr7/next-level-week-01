import React, {useState, useEffect,ChangeEvent,FormEvent} from 'react'
import {View, Text, Image,StyleSheet,ImageBackground,TextInput, KeyboardAvoidingView,Platform} from 'react-native'
import {Feather as Icon} from "@expo/vector-icons"
import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios' 

const Home = () => {
  const navigation = useNavigation();
  const [uf, setUf] = useState('')

  const [ufs,setUfs] = useState<string[]>([])
  const [selectedUf, setSelectedUf] = useState('0')
  const [city, setCity] = useState<string[]>([])
  const [selectedCity, setSelectedCity] = useState('0')

  interface IBGECityResponse{
  nome:string
  }

  interface IBGEUFResponse{
    sigla:string
  }



  interface Params{
    uf:string,
    city:string
  }

  

  useEffect(()=> {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(response=>{
      const ufInitials= response.data.map(uf=> uf.sigla)
      setUfs(ufInitials)

    }) //Dentro do useEffect nao pode usar o async await
  }, [])

  useEffect(()=> {

    if(selectedUf==="0"){
      return;
    }

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
    .then(response=>{
      const cityNames = response.data.map(city=>{return city.nome})
      setCity(cityNames)
    }) //Dentro do useEffect nao pode usar o async await
  }, [selectedUf])


    useEffect(()=> {
      axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response=>{
        const ufInitials= response.data.map(uf=> uf.sigla)
        setUfs(ufInitials)

      }) //Dentro do useEffect nao pode usar o async await
    }, [])

  useEffect(()=> {

    if(selectedUf==="0"){
      return;
    }

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
    .then(response=>{
      const cityNames = response.data.map(city=>{return city.nome})
      setCity(cityNames)
    }) //Dentro do useEffect nao pode usar o async await
  }, [selectedUf])

  function handleNavigationPoints(){
    navigation.navigate('Points', {
      selectedUf,
      selectedCity
    });
  }


  console.log(selectedCity, selectedUf)
  return(
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS=='ios' ? 'padding' : "padding" }>
        <ImageBackground 
        source={require("../../assets/home-background.png")}
        style={styles.container}
        imageStyle={{width:274, height:368}}>
          <View>
            <Image style={{marginTop:64}}source={require("../../assets/logo.png")} />
            <Text style={styles.title}> Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}> Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>

          <View style = {styles.footer}>

          
           <RNPickerSelect
              onValueChange={(value)=> setSelectedUf(value)}
              items={ufs.map(uf=>(
                {label:uf, value:uf, key:uf}
              ))}
              value={selectedUf}
              placeholder={{label:"Selecione uma UF", value:null}}
            />
            <RNPickerSelect
              onValueChange={(value)=> setSelectedCity(value)}
              items={city.map(city=>(
                {label:city, value:city, key:city}
              ))}
              value={selectedCity}
              placeholder={{label:"Selecione uma Cidade", value:null}}
            />
            <RectButton style={styles.button} onPress={handleNavigationPoints}>
              <View style={styles.buttonIcon}>
                <Text>
                  <Icon name ="arrow-right" color="#FFF" size={24} />
                </Text>
              </View> 
              <Text style={styles.buttonText}>
                Entrar
              </Text>
            </RectButton>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView> 
  )  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});




export default Home;


