import { existsSync, readFileSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import process from 'node:process';

const envPath = new URL('../.env', import.meta.url);

if (!existsSync(envPath)) {
  console.error('Arquivo .env não encontrado na raiz do projeto.');
  process.exit(1);
}

const envContent = readFileSync(envPath, 'utf8');

for (const line of envContent.split(/\r?\n/)) {
  const trimmedLine = line.trim();

  if (!trimmedLine || trimmedLine.startsWith('#')) {
    continue;
  }

  const separatorIndex = trimmedLine.indexOf('=');

  if (separatorIndex === -1) {
    continue;
  }

  const key = trimmedLine.slice(0, separatorIndex).trim();
  const value = trimmedLine.slice(separatorIndex + 1).trim();

  if (key && process.env[key] === undefined) {
    process.env[key] = value;
  }
}

function resolveDockerComposeCommand() {
  const dockerComposeResult = spawnSync('docker', ['compose', 'version'], {
    stdio: 'ignore',
    env: process.env,
  });

  if (dockerComposeResult.status === 0) {
    return { command: 'docker', args: ['compose'] };
  }

  if (dockerComposeResult.error?.code === 'ENOENT') {
    console.error(getDockerMissingMessage());
    process.exit(1);
  }

  const legacyComposeResult = spawnSync('docker-compose', ['version'], {
    stdio: 'ignore',
    env: process.env,
  });

  if (legacyComposeResult.status === 0) {
    return { command: 'docker-compose', args: [] };
  }

  if (legacyComposeResult.error?.code === 'ENOENT') {
    console.error(getDockerMissingMessage());
    process.exit(1);
  }

  console.error(getDockerComposeUnavailableMessage());
  process.exit(1);
}

function getDockerMissingMessage() {
  if (process.platform === 'win32') {
    return [
      'Docker não foi encontrado no Windows.',
      'Abra o Docker Desktop e aguarde ele iniciar antes de rodar pnpm dev.',
      'Se o Docker Desktop não estiver instalado, instale-o e tente novamente.',
      'Se quiser apenas subir os apps sem banco, use pnpm dev:apps.',
    ].join('\n');
  }

  return [
    'Docker não foi encontrado no sistema.',
    'Instale e inicie o Docker Engine com o plugin Docker Compose antes de rodar pnpm dev.',
    'Se quiser apenas subir os apps sem banco, use pnpm dev:apps.',
  ].join('\n');
}

function getDockerComposeUnavailableMessage() {
  if (process.platform === 'win32') {
    return [
      'Docker foi encontrado, mas o Docker Compose não está disponível no Windows.',
      'Abra o Docker Desktop e verifique se o suporte a Compose está habilitado.',
      'Se quiser apenas subir os apps sem banco, use pnpm dev:apps.',
    ].join('\n');
  }

  return [
    'Docker foi encontrado, mas o Docker Compose não está disponível.',
    'Confirme se o plugin Docker Compose está instalado e acessível no terminal.',
    'Se quiser apenas subir os apps sem banco, use pnpm dev:apps.',
  ].join('\n');
}

const { command: dockerCommand, args: dockerBaseArgs } = resolveDockerComposeCommand();

const dockerCompose = spawn(dockerCommand, [...dockerBaseArgs, 'up', '-d', 'postgres'], {
  stdio: 'inherit',
  env: process.env,
});

dockerCompose.on('exit', (code) => {
  if (code !== 0) {
    process.exit(code ?? 1);
  }

  const pnpmCommand = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

  const turboDev = spawn(pnpmCommand, ['dev:apps'], {
    stdio: 'inherit',
    env: process.env,
  });

  const forwardSignal = (signal) => {
    if (!turboDev.killed) {
      turboDev.kill(signal);
    }
  };

  process.on('SIGINT', () => forwardSignal('SIGINT'));
  process.on('SIGTERM', () => forwardSignal('SIGTERM'));

  turboDev.on('exit', (turboCode) => {
    process.exit(turboCode ?? 0);
  });
});