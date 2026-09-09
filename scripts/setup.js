import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Ścieżka do głównego folderu projektu (jeden poziom wyżej niż /scripts)
const rootDir = path.resolve(import.meta.dirname, '..');
const backendDir = path.join(rootDir, 'backend-laravel');
const frontendDir = path.join(rootDir, 'frontend-react');

// Pomocnicza funkcja do uruchamiania komend w konsoli
function run(command, cwd = process.cwd()) {
  console.log(`\n▶ Wykonuję: ${command} [w ${path.basename(cwd)}]`);
  execSync(command, { cwd, stdio: 'inherit' });
}

async function main() {
  console.log('🚀 Sprawdzanie środowiska aplikacji...');

  let isFirstRunBackend = false;

  // --- FAZA 1: BACKEND ---
  const vendorExists = fs.existsSync(path.join(backendDir, 'vendor'));
  if (!vendorExists) {
    console.log('📦 Wykryto pierwsze uruchomienie backendu. Konfiguracja...');
    isFirstRunBackend = true;

    // Plik .env
    const envExists = fs.existsSync(path.join(backendDir, '.env'));
    if (!envExists) {
      console.log('📄 Tworzenie pliku .env z .env.example...');
      fs.copyFileSync(
        path.join(backendDir, '.env.example'),
        path.join(backendDir, '.env')
      );
    }

    // Zależności PHP
    run('composer install', backendDir);

    // Klucz aplikacji
    run('php artisan key:generate', backendDir);

    // OPCJONALNIE: Zależności NPM w backendzie (jeśli są wymagane)
    if (fs.existsSync(path.join(backendDir, 'package.json'))) {
      run('npm install', backendDir);
    }
  } else {
    console.log('✅ Backend posiada już folder vendor.');
  }

  // --- FAZA 2: FRONTEND ---
  const nodeModulesFrontendExists = fs.existsSync(path.join(frontendDir, 'node_modules'));
  if (!nodeModulesFrontendExists) {
    console.log('📦 Wykryto pierwsze uruchomienie frontendu. Instalacja paczek...');
    run('npm install', frontendDir);
  } else {
    console.log('✅ Frontend posiada już node_modules.');
  }

  // --- FAZA 3: DOCKER ---
  console.log('🐳 Uruchamianie kontenerów Docker...');
  run('docker compose up -d --build', backendDir);

  // --- FAZA 4: MIGRACJE I SEEDY (Tylko przy pierwszym uruchomieniu) ---
  if (isFirstRunBackend) {
    console.log('⏳ Oczekiwanie 10s na uruchomienie bazy danych MySQL...');
    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log('🗄️ Wykonywanie migracji i seedów...');
    run('docker exec -it laravel_app php artisan migrate:fresh --seed --force', backendDir);
  }

  // --- FAZA 5: URUCHOMIENIE FRONTENDU ---
  console.log('✨ Uruchamianie serwera deweloperskiego React...');
  run('npm run dev', frontendDir);
}

main().catch((err) => {
  console.error('❌ Wystąpił błąd podczas uruchamiania skryptu:', err);
  process.exit(1);
});