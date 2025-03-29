import * as SecureStore from "expo-secure-store";

async function getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key); // Corrigido para getItemAsync
    } catch (error) {
        return null; // Melhor retornar null do que lançar erro
    }
}

async function saveToken(key: string, value: string){
    try {
        return SecureStore.setItemAsync(key, value);  
    } catch (error) {
        return; // Melhor retornar vazio do que lançar erro
    }
}

export const tokenCache = { getToken, saveToken };