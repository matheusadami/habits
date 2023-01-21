import './src/lib/dayjs'

import { StatusBar } from 'react-native'
import {
  useFonts,
  Inter_400Regular as InterRegular,
  Inter_600SemiBold as InterSemiBold,
  Inter_700Bold as InterBold,
  Inter_800ExtraBold as InterExtraBold
} from '@expo-google-fonts/inter'

import { Loading } from './src/components/Loading'
import { Routes } from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    InterRegular,
    InterSemiBold,
    InterBold,
    InterExtraBold
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <>
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </>
  )
}
