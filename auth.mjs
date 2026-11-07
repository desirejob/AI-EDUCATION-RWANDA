import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash,randomBytes, scrypt as scryptCallback, timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';

const scrypt=promisify(scryptCallback),SESSION_MS=8*60*60*1000,COOKIE='umuseke_session';
export async function hashPassword(password,salt=randomBytes(16).toString('hex')){
  const derived=await scrypt(password,salt,64);
  return{salt,hash:derived.toString('hex')};
}
const json=(res,status,payload)=>{res.writeHead(status,{'content-type':'application/json; charset=utf-8','cache-control':'no-store'});res.end(JSON.stringify(payload))};
const cookieValue=req=>{const pair=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(`${COOKIE}=`));if(!pair)return'';try{return decodeURIComponent(pair.slice(COOKIE.length+1))}catch{return''}};
const safeUsername=value=>typeof value==='string'&&/^[a-zA-Z0-9_-]{3,24}$/.test(value);

export async function createAuth({dataDir,teacherSignupCode=process.env.UMUSEKE_TEACHER_SIGNUP_CODE||''}){
  const file=path.join(dataDir,'users.json'),sessions=new Map(),attempts=new Map();let users=[],registrationQueue=Promise.resolve();
  try{const saved=JSON.parse(await fs.readFile(file,'utf8'));if(!Array.isArray(saved.users)||saved.users.some(user=>!safeUsername(user.username)||!['student','teacher','admin'].includes(user.role)||typeof user.salt!=='string'||typeof user.hash!=='string'))throw Error('Invalid authentication data file.');users=saved.users}catch(error){if(error.code!=='ENOENT')throw error}
  const save=async()=>{await fs.mkdir(dataDir,{recursive:true});const tmp=`${file}.${process.pid}.tmp`;await fs.writeFile(tmp,JSON.stringify({version:1,users},null,2),{mode:0o600});await fs.rename(tmp,file);await fs.chmod(file,0o600).catch(()=>{})};
  const sameOrigin=req=>{const origin=req.headers.origin;if(!origin||!req.headers.host)return false;try{return new URL(origin).host.toLowerCase()===req.headers.host.toLowerCase()}catch{return false}};
  const limited=(key,limit=8,windowMs=15*60*1000)=>{const now=Date.now();let entry=attempts.get(key);if(attempts.size>=5000&&!entry){for(const [name,value] of attempts)if(value.until<now)attempts.delete(name);if(attempts.size>=5000)return true;entry=attempts.get(key)}if(!entry||entry.until<now){attempts.set(key,{count:1,until:now+windowMs});return false}entry.count++;return entry.count>limit};
  const issueSession=(res,user)=>{const now=Date.now();for(const [token,session] of sessions)if(session.username===user.username||session.expires<now)sessions.delete(token);const token=randomBytes(32).toString('base64url');sessions.set(token,{username:user.username,role:user.role,expires:now+SESSION_MS});const secure=process.env.NODE_ENV==='production'?'; Secure':'';res.setHeader('Set-Cookie',`${COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_MS/1000}${secure}`)};
  const publicUser=user=>({username:user.username,role:user.role});
  const userForRequest=req=>{const token=cookieValue(req),session=sessions.get(token);if(!session)return null;if(session.expires<Date.now()){sessions.delete(token);return null}return{username:session.username,role:session.role}};
  const handleRoute=async(req,res,url)=>{
    if(req.method==='GET'&&url.pathname==='/api/auth/config')return json(res,200,{registration_open:true,teacher_signup_enabled:Boolean(teacherSignupCode)}),true;
    if(req.method==='GET'&&url.pathname==='/api/me')return json(res,200,{user:userForRequest(req)}),true;
    if(!url.pathname.startsWith('/api/auth/'))return false;
    if(req.method==='POST'&&!sameOrigin(req))return json(res,403,{detail:'Origine de requête refusée.'}),true;
    if(req.method==='POST'&&url.pathname==='/api/auth/logout'){const token=cookieValue(req);if(token)sessions.delete(token);const secure=process.env.NODE_ENV==='production'?'; Secure':'';res.setHeader('Set-Cookie',`${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`);return json(res,200,{ok:true}),true}
    if(req.method!=='POST'||!['/api/auth/login','/api/auth/signup'].includes(url.pathname))return json(res,404,{detail:'Route introuvable.'}),true;
    if(!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type']||''))return json(res,415,{detail:'Type de contenu non pris en charge.'}),true;
    const chunks=[];let size=0;for await(const part of req){size+=part.length;if(size>8192)return json(res,413,{detail:'Requête trop volumineuse.'}),true;chunks.push(part)}
    let input;try{input=JSON.parse(Buffer.concat(chunks).toString('utf8'))}catch{return json(res,400,{detail:'JSON invalide.'}),true}
    if(!input||typeof input!=='object'||Array.isArray(input))return json(res,400,{detail:'Corps JSON invalide.'}),true;
    const username=typeof input.username==='string'?input.username.trim().toLowerCase():'';
    const address=req.socket.remoteAddress||'unknown';if(limited(`ip:${address}`,40)||limited(`account:${username}`,8))return json(res,429,{detail:'Trop de tentatives. Réessayez dans 15 minutes.'}),true;
    if(!safeUsername(username))return json(res,422,{detail:'Le pseudonyme doit contenir 3 à 24 lettres, chiffres, tirets ou tirets bas.'}),true;
    if(typeof input.password!=='string'||input.password.length<12||input.password.length>128||Buffer.byteLength(input.password,'utf8')>512)return json(res,422,{detail:'Le mot de passe doit contenir entre 12 et 128 caractères.'}),true;
    if(url.pathname==='/api/auth/signup'){
      const requestedRole=input.role==='teacher'?'teacher':'student';
      const providedCode=typeof input.inviteCode==='string'?input.inviteCode:'';
      const codeMatches=Boolean(teacherSignupCode)&&timingSafeEqual(createHash('sha256').update(providedCode).digest(),createHash('sha256').update(teacherSignupCode).digest());
      if(requestedRole==='teacher'&&!codeMatches)return json(res,403,{detail:'Un code d’invitation enseignant valide est requis.'}),true;
      const operation=registrationQueue.then(async()=>{if(users.some(user=>user.username===username))return null;if(users.length>=5000)return false;const credential=await hashPassword(input.password),user={username,role:requestedRole,...credential,createdAt:new Date().toISOString()};users.push(user);try{await save()}catch(error){users.pop();throw error}return user});registrationQueue=operation.catch(()=>{});const user=await operation;if(user===null)return json(res,409,{detail:'Ce pseudonyme est déjà utilisé.'}),true;if(!user)return json(res,429,{detail:'La capacité de comptes de ce serveur est atteinte.'}),true;issueSession(res,user);return json(res,201,{user:publicUser(user)}),true;
    }
    const user=users.find(entry=>entry.username===username);
    let valid=false;if(user){const supplied=await scrypt(input.password,user.salt,64),expected=Buffer.from(user.hash,'hex');valid=expected.length===supplied.length&&timingSafeEqual(expected,supplied)}else{await hashPassword(input.password)}
    if(!valid)return json(res,401,{detail:'Pseudonyme ou mot de passe incorrect.'}),true;
    issueSession(res,user);return json(res,200,{user:publicUser(user)}),true;
  };
  return{handleRoute,userForRequest,sameOrigin,save,users,limited};
}
