import axios from 'axios';

// https://stackoverflow.com/questions/52751874/expo-run-on-android-emulator-using-windows-10
// https://stackoverflow.com/questions/28757003/how-to-install-google-play-app-in-android-studio-emulator

const PORT = '3000';
// localhost para local, ip fixo da maquina funciona para todos os casos(emulador/fisico)
const API = process.env.HOST || 'http://192.168.0.41';

/**
 * Para rodar essa API no emulador do android, é necessario ter um pacote UNIX instalado, chamado "adb" (sudo apt install adb)
 * Após ter esse pacote, é necessario rodar os seguintes comandos, onde PORT é a porta do backend:
 * 'adb reverse tcp:PORT tcp:PORT'
 */
export const api = axios.create({ baseURL: `${API}:${PORT}/api/` });
