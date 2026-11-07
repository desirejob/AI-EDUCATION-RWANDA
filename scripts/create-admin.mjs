import path from 'node:path';
import {fileURLToPath} from 'node:url';
import readline from 'node:readline/promises';
import {stdin,stdout} from 'node:process';
import {createAuth,hashPassword} from '../auth.mjs';

if(!stdin.isTTY||typeof stdin.setRawMode!=='function'){
  console.error('Lancez cette commande depuis un terminal interactif.');process.exit(1);
}
const rl=readline.createInterface({input:stdin,output:stdout});
const username=(await rl.question('Pseudonyme admin (3-24 caractères) : ')).trim().toLowerCase();rl.close();
if(!/^[a-zA-Z0-9_-]{3,24}$/.test(username)){console.error('Pseudonyme invalide.');process.exit(1)}
function hiddenPassword(prompt){return new Promise(resolve=>{let value='';stdout.write(prompt);stdin.setRawMode(true);stdin.resume();const onData=chunk=>{for(const char of chunk.toString('utf8')){if(char==='\u0003'){stdin.setRawMode(false);stdin.pause();stdout.write('\n');process.exit(130)}if(char==='\r'||char==='\n'){stdin.removeListener('data',onData);stdin.setRawMode(false);stdin.pause();stdout.write('\n');resolve(value);return}if(char==='\u007f'||char==='\b')value=value.slice(0,-1);else if(char.charCodeAt(0)>=32)value+=char}};stdin.on('data',onData)})}
const password=await hiddenPassword('Mot de passe admin (12 caractères minimum, saisie masquée) : ');
if(password.length<12||password.length>128){console.error('Le mot de passe doit contenir 12 à 128 caractères.');process.exit(1)}
const dataDir=path.resolve(process.env.AUTH_DATA_DIR||path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../data'));
const auth=await createAuth({dataDir});const existing=auth.users.find(user=>user.username===username);
if(existing){existing.role='admin';const credential=await hashPassword(password);Object.assign(existing,credential)}
else auth.users.push({username,role:'admin',...await hashPassword(password),createdAt:new Date().toISOString()});
await auth.save();console.log(`Compte administrateur prêt : ${username}`);
