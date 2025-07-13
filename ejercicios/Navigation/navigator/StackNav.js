import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import InicioSc from "../screens/Inicio";
import CamaraSc from "../screens/Camara";
import ListaScreens from "../screens/ListaScreens";
import TablaSc from "../screens/Tabla";
import ConfiguracionSc from "../screens/Configuracion";

const drawer = createDrawerNavigator();
const stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
        <drawer.Navigator initialRouteName="Inicio">
            <drawer.Screen name="Inicio" component={InicioSc}/>
            <drawer.Screen name="Tabla" component={TablaSc}/>
            <drawer.Screen name="Configuracion" component={ConfiguracionSc}/>
            <drawer.Screen name="Camara" component={CamaraSc}/>
            <drawer.Screen name="Lista de pantallas" component={ListaScreens}/>
        </drawer.Navigator>
    </NavigationContainer>
  );
}
