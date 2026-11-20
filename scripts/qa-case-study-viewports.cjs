// Responsive geometry regression checks, including constrained-height fallback.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('fs');
const path=require('path');
const artifactDir=process.env.QA_ARTIFACT_DIR || path.join(require('os').tmpdir(),'case-study-qa');
fs.mkdirSync(artifactDir,{recursive:true});
const baseURL=process.env.QA_BASE_URL || 'http://localhost:3000';
(async()=>{
const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_BROWSER_PATH || undefined});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));const findings=[];
await page.goto(baseURL+'/teams');
if(await page.locator('input[type=password]').count()){
 const action=fs.readFileSync(path.join(__dirname,'../src/app/_actions/case-access.ts'),'utf8');
 await page.locator('input[type=password]').fill(process.env.QA_CASE_PASSWORD || action.match(/const DEFAULT_PASSWORD = "([^"]+)"/)[1]);
 await page.locator('button[type=submit]').click();
 await page.getByRole('button',{name:'Present Mode',exact:true}).waitFor();
}
for(const route of ['teams','fluent']){
 await page.goto(baseURL+'/'+route);
 const initial=await page.evaluate(()=>({playing:[...document.querySelectorAll('video')].filter(v=>!v.paused).length,media:[...document.querySelectorAll('video')].map(v=>({src:v.currentSrc,ready:v.readyState}))}));
 console.log(JSON.stringify({route,initial}));
 for(const [width,height] of [[1920,1080],[1440,900],[1366,768],[1280,720],[1024,768],[768,1024],[390,844],[375,667],[844,390],[683,384],[600,400]]){
  await page.setViewportSize({width,height});
  const normal=await page.evaluate(()=>({sw:document.documentElement.scrollWidth,vw:innerWidth}));
  if(normal.sw>width+1)findings.push({route,width,height,mode:'normal',normal});
  await page.getByRole('button',{name:'Present Mode',exact:true}).click();
  await page.waitForTimeout(150);
  const count=Number((await page.locator('.presentation-announcement').innerText()).match(/of (\d+)/)[1]);
  for(let i=0;i<count;i++){
   const m=await page.locator('[data-presentation-slide=active]').evaluate(e=>{
    const b=e.getBoundingClientRect();
    const descendants=[...e.querySelectorAll('p,h1,h2,img,video,.case-study-pill,.case-role-section')].filter(x=>x.getBoundingClientRect().width>0).map(x=>({tag:x.tagName,cls:x.className,rect:x.getBoundingClientRect().toJSON()}));
    return {scrollFallback:e.dataset.presentationOverflow === "true" && getComputedStyle(e).overflowY === "auto" && e.scrollWidth <= e.clientWidth + 1,box:b.toJSON(),scroll:e.scrollHeight,client:e.clientHeight,media:descendants.filter(x=>['IMG','VIDEO'].includes(x.tag)),outside:descendants.filter(x=>x.rect.right>innerWidth||x.rect.left<0||x.rect.top<0||x.rect.bottom>innerHeight),badMedia:descendants.filter(x=>['IMG','VIDEO'].includes(x.tag)&&x.rect.height<20),hiddenPlaying:[...document.querySelectorAll('[data-presentation-slide=hidden] video')].filter(v=>!v.paused).length};
   });
   if((m.outside.length&&!m.scrollFallback)||m.badMedia.length||m.hiddenPlaying)findings.push({route,width,height,mode:'present',i,...m});
   if(i<count-1)await page.keyboard.press('ArrowRight');
  }
  await page.keyboard.press('Escape');
 }
}
fs.writeFileSync(path.join(artifactDir,'viewports.json'),JSON.stringify({findings,errors},null,2));
console.log('Viewport findings: '+findings.length);
if(findings.length || errors.length)process.exitCode=1;
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
